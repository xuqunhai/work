// pybossa.js library
//
// Copyright (C) 2015 SciFabric LTD.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

var jumpProjectFlag = false;
(function(pybossa, $, undefined) {
    var token="";
    var url = '/';

    //AJAX calls
    function _userProgress(projectname) {
        return $.ajax({
            url: url + 'token/project/' + projectname + '/userprogress',
            beforeSend: function (request)
            {
                if (token==="") {
                    return;
                } else {
                    request.setRequestHeader("Authorization", token);
                }
            },
            success: function (data) {
                console.log('/userprogress: '+data);
                console.log(data);
            },
            cache: false,
            dataType: 'json'
        });
    }

    function _fetchProject(projectname) {
        return $.ajax({
            url: url + 'token/project',
            beforeSend: function (request)
            {
                if (token==="") {
                    return;
                } else {
                    request.setRequestHeader("Authorization", token);
                }
            },
            success: function (data) {
                console.log('_fetchProjectt: '+data);
                console.log('token/project: '+data);
                console.log(data);
            },
            data: 'all=1&short_name='+projectname,
            dataType:'json'
        });
    }

    function _fetchNewTask(projectId, offset) {
        offset = offset || 0;
        return $.ajax({
            url: url + 'token/project/' + projectId + '/newtask',
            beforeSend: function (request)
            {
                if (token==="") {
                    return;
                } else {
                    request.setRequestHeader("Authorization", token);
                }
            },
            success: function (data) {
                console.log('_fetchNewTask: '+data);
                console.log('/newtask: '+data);
                console.log(data);
                console.log(data['id']);
                if(!data['id']){
                    jumpProjectFlag = true;
                }
            },
            data: 'offset=' + offset,
            cache: false,
            dataType: 'json'
        });
    }
    function _fetchTask(taskId) {
        return $.ajax({
            url: url + 'token/task/' + taskId,
            beforeSend: function (request)
            {
                if (token==="") {
                    return;
                } else {
                    request.setRequestHeader("Authorization", token);
                }
            },
            success: function (data) {
                console.log('_fetchTask: '+data);
                console.log('token/task/: '+data);
                console.log(data);
            },
	    error: function(data){
		console.log('token/task/error'+data);
		console.log(data);
		if(data.status == 401){
		    console.log('notifyToReligon gogogo');
		    jobTask.notifyToRelogin();
		}
	    },
            cache: false,
            dataType: 'json'
        });
    }

    function _saveTaskRun(taskrun) {
        return $.ajax({
            type: 'POST',
            url: url + 'token/taskrun',
            beforeSend: function (request)
            {console.log('runrunrun');console.log('tasktun:'+token);
                if (token==="") {
                    return;
                } else {
                    request.setRequestHeader("Authorization", token);
                }
            },
            success: function (data) {
                console.log('_saveTaskRun: '+data);
                console.log('token/taskrun: '+data);
                console.log(data);
            },
            dataType: 'json',
            contentType: 'application/json',
            data: taskrun
        });
    }

    // Private methods
    function _getProject(projectname){
        return _fetchProject(projectname)
        .then(function(data) {return data[0];});
    }

    function _getNewTask(project) {
        return _fetchNewTask(project.id)
        .then(_addProjectDescription.bind(undefined, project));
    }

    function _addProjectDescription(project, task) {
        return { question: project.description, task: task};
        }

    function _addAnswerToTask(task, answer) {
        task.answer = answer;
        return task;
    }

    function _createTaskRun(answer, task) {
        task = _addAnswerToTask(task, answer);
        var taskrun = {
            'project_id': task.project_id,
            'task_id': task.id,
            'info': task.answer
        };
        taskrun = JSON.stringify(taskrun);
        return _saveTaskRun(taskrun).then(function(data) {return data;});
    }

    function _getCurrentTaskId(url) {
        console.log('url: '+url);
        pathArray = url.split('/');
        if (url.indexOf('/task/')!=-1) {
            var l = pathArray.length;
            var i = 0;
            for (i=0;i<l;i++) {
                if (pathArray[i]=='task') {
                    return pathArray[i+1];
                }
            }
        }
        return false;
    }

    // fallback for user defined action
    var _taskLoaded = function(task, deferred) {
        deferred.resolve(task);
    };

    var _presentTask = function(task, deferred) {
        deferred.resolve(task);
    };

    function _setUserTaskLoaded (userFunc) {
        _taskLoaded = userFunc;
    }

    function _setUserPresentTask (userFunc) {
        _presentTask = userFunc;
    }

    function _resolveNextTaskLoaded(task, deferred) {
        var udef = $.Deferred();
        _taskLoaded(task, udef);
        udef.done(function(task) {
            deferred.resolve(task);
        });
    }

    function _run (projectname, _window) {
        _window = _window || window;
        _fetchProject(projectname).done(function(project) {
            project = project[0];
            function getNextTask(offset, previousTask) {
                offset = offset || 0;
                var def = $.Deferred();
                var taskId = _getCurrentTaskId(_window.location.pathname);
                console.log('previousTask: '+previousTask);
                console.log(previousTask);
                console.log('taskId:'+taskId);
                console.log(taskId && (previousTask === undefined));

                var xhr = (taskId && (previousTask === undefined)) ? _fetchTask(taskId) : _fetchNewTask(project.id, offset);

                xhr.done(function(task) {

                    if (previousTask && task.id === previousTask.id) {
                console.log('task.id: '+task.id);
                console.log('previousTask.id: '+previousTask.id);
                        var secondTry = _fetchNewTask(project.id, offset+1)
                        .done(function(secondTask){
                            _resolveNextTaskLoaded(secondTask, def);
                        });
                    }
                    else {
                        _resolveNextTaskLoaded(task, def);
                    }
                });
                return def.promise();
            }

            function loop(task) {
                var nextLoaded = getNextTask(1, task),
                taskSolved = $.Deferred(),
                nextUrl;
                console.log('nextUrltask.id:'+task.id);
                if (task.id) {

                    if (url != '/') {
                        nextUrl = url + '/project/' + projectname + '/task/' + task.id;
                    }
                    else {
                        nextUrl = '/project/' + projectname + '/task/' + task.id;
                    }
                    console.log(nextUrl);
                    history.pushState({}, "Title", nextUrl);
                }

                _presentTask(task, taskSolved);
                $.when(nextLoaded, taskSolved).done(loop);
            }
            getNextTask(0, undefined).done(loop);
        });
    }


    // Public methods
    pybossa.newTask = function (projectname) {
        return _getProject(projectname).then(_getNewTask);
    };

    pybossa.saveTask = function (taskId, answer) {
        if (typeof(taskId) === "number") {
            return _fetchTask(taskId).then(_createTaskRun.bind(undefined, answer));
        }
        if (typeof(taskId) === "object") {
            var task = taskId;
            return _createTaskRun(answer, task);
        }
    };

    pybossa.getCurrentTaskId = function (url) {
        if (url !== undefined) {
            return _getCurrentTaskId(url);
        }
        else {
            return _getCurrentTaskId(window.location.pathname);
        }
    };

    pybossa.userProgress = function (projectname) {
        return _userProgress( projectname );
    };

    pybossa.run = function (projectname, _window) {
        token = $("#token").data("token");
        console.log(token);
        return _run(projectname, _window);
    };

    pybossa.taskLoaded = function (userFunc) {
        return _setUserTaskLoaded( userFunc );
    };

    pybossa.presentTask = function (userFunc) {
        return _setUserPresentTask( userFunc );
    };

    pybossa.setEndpoint = function (endpoint) {
        // Check that the URL has the trailing slash, otherwise add it
        if ( endpoint.charAt(endpoint.length-1) != '/' ) {
            endpoint += '/';
        }
        url = endpoint;
        return url;
    };

    pybossa.setToken = function (token_value) {
        token_value = token_value;
    };

} (window.pybossa = window.pybossa || {}, jQuery));
