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


(function(pybossa, $, undefined) {
    var token="";
    var url = '/';

    //AJAX calls
    // 发起请求  工程进度条
    function _userProgress(projectname) {
        return $.ajax({
            // 工程进度条
            // 输入：
            //     请求头中加Authorization:token
            //     project_id
            //     short_name
            // 返回：
            //     完成进度
            //     总进度
            url: url + 'token/project/' + projectname + '/userprogress',
            beforeSend: function (request)
            {
                if (token==="") {
                    return;
                } else {
                    request.setRequestHeader("Authorization", token);
                }
            },
            cache: false,
            dataType: 'json'
        });
    }

    // 发起请求  工程信息查询
    function _fetchProject(projectname) {
        return $.ajax({
            // 工程信息查询
            url: url + 'token/project',
            beforeSend: function (request)
            {
                if (token==="") {
                    return;
                } else {
                    request.setRequestHeader("Authorization", token);
                }
            },
            data: 'all=1&short_name='+projectname,
            dataType:'json'
        });
    }

    // 发起请求  为用户分配一个任务
    // 这是当前用户在本任务页面能获取到下一个任务信息的关键函数
    function _fetchNewTask(projectId, offset) {
        offset = offset || 0;
        return $.ajax({
            // 为用户分配一个任务
            url: url + 'token/project/' + projectId + '/newtask',
            beforeSend: function (request)
            {
                if (token==="") {
                    return;
                } else {
                    request.setRequestHeader("Authorization", token);
                }
            },
            data: 'offset=' + offset,
            cache: false,
            dataType: 'json'
        });
    }

    // 发起请求  获取任务信息
    function _fetchTask(taskId) {
        return $.ajax({
            // 获取任务信息
            url: url + 'token/task/' + taskId,
            beforeSend: function (request)
            {
                if (token==="") {
                    return;
                } else {
                    request.setRequestHeader("Authorization", token);
                }
            },
            cache: false,
            dataType: 'json'
        });
    }

    // 发起请求  获取执行任务信息
    function _saveTaskRun(taskrun) {
        return $.ajax({
            type: 'POST',
            // 获取执行任务信息
            url: url + 'token/taskrun',
            beforeSend: function (request)
            {
                if (token==="") {
                    return;
                } else {
                    request.setRequestHeader("Authorization", token);
                }
            },
            dataType: 'json',
            contentType: 'application/json',
            data: taskrun
        });
    }

    // Private methods
    // 发起请求 工程信息查询 后返回第一个数据'body'
    function _getProject(projectname){
        return _fetchProject(projectname)
        .then(function(data) {return data[0];});
    }

    // 发起请求 为用户分配一个任务 后触发then回调并返回工程描述信息
    function _getNewTask(project) {
        return _fetchNewTask(project.id)
        .then(_addProjectDescription.bind(undefined, project));
    }

    // 返回project描述对象和任务
    function _addProjectDescription(project, task) {
        return { question: project.description, task: task};
        }

    // 给task对象添加answer属性
    function _addAnswerToTask(task, answer) {
        task.answer = answer;
        return task;
    }

    // 整理task有关信息组成一个json对象作为参数发起请求并触发then回调返回数据
    // 根据id获取任务执行信息
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
    // http://192.168.0.182:5000/project/sn/task/2072
    // http://192.168.0.182:5000/project/sn/newtask-token
    // 当url里包含/task/时获取紧跟在后面的一个参数并返回
    function _getCurrentTaskId(url) {
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
    // 调用.done或.then的回调并把task作为参数传给回调
    // 将延迟对象执行状态变成成功
    var _taskLoaded = function(task, deferred) {
        deferred.resolve(task);
    };

    // 调用.done或.then的回调并把task作为参数传给回调
    // 将延迟对象执行状态变成成功
    var _presentTask = function(task, deferred) {
        deferred.resolve(task);
    };

    // 给_taskLoaded赋值
    function _setUserTaskLoaded (userFunc) {
        _taskLoaded = userFunc;
    }

    // 给_presentTask赋值
    function _setUserPresentTask (userFunc) {
        _presentTask = userFunc;
    }

    // 把udef作为参数给done回调并执行done回调
    // 将第一个参数作为第二个参数的延迟对象所对应的回调函数的参数并执行
    function _resolveNextTaskLoaded(task, deferred) {
        var udef = $.Deferred();
        _taskLoaded(task, udef);
        udef.done(function(task) {
            deferred.resolve(task);
        });
    }

    // 发起1请求成功后触发done回调，回调里发起2请求成功后触发loop，2请求里根据id确定发起3请求成功后再4请求或直接4请求
    // _fetchProject工程信息查询  _fetchTask获取任务信息  _fetchNewTask为用户分配一个任务  _resolveNextTaskLoaded执行_taskLoaded
    function _run (projectname, _window) {
        _window = _window || window;
        _fetchProject(projectname).done(function(project) {
            project = project[0];

            // 根据第二参数请求接口1或接口2，成功后进一步根据第二参数决定是再次请求接口2成功后请求接口3还是直接请求接口3
            function getNextTask(offset, previousTask) {
                offset = offset || 0;
                var def = $.Deferred();
                var taskId = _getCurrentTaskId(_window.location.pathname);
              // _fetchNewTask根据projectId获取下一个任务信息，所以在当前页面已经可以知道下一个任务信息了
                var xhr = (taskId && (previousTask === undefined)) ? _fetchTask(taskId) : _fetchNewTask(project.id, offset);
                xhr.done(function(task) {
                    // done表示旧任务完成后去获取新分配的任务成功done后再去加载下一个
                    if (previousTask && task.id === previousTask.id) {
                        var secondTry = _fetchNewTask(project.id, offset+1)
                        .done(function(secondTask){
                            _resolveNextTaskLoaded(secondTask, def);
                        });
                    }
                    else {
                        _resolveNextTaskLoaded(task, def);
                        // 直接加载下一个任务
                    }
                });
                return def.promise();
            }
            // previousTask代表执行状态：成功或失败
            // 没taskId或有但是执行失败则重新加载对应task，否则如果有taskId而且任务完成则加载project的下一个task

            // 执行上面的函数getNextTask，根据url确定nextUrl后把nextUrl放入历史栈
            // 对调用_presentTask和getNextTask完成后继续执行loop
            function loop(task) {
                var nextLoaded = getNextTask(1, task),
                taskSolved = $.Deferred(),
                nextUrl;
                if (task.id) {

// 解决传参问题
// *********************************修改前代码开始*******************************
                    /*
                    if (url != '/') {
                        nextUrl = url + '/project/' + projectname + '/task/' + task.id;
                    }
                    else {
                        nextUrl = '/project/' + projectname + '/task/' + task.id;
                    }
                    history.pushState({}, "Title", nextUrl);
                    */
// *********************************修改前代码结束*********************************
// *********************************修改后代码开始*********************************

                     var para = location.search;
                     console.log(location.href);
                     if (url != '/') {
                        nextUrl = url + '/project/' + projectname + '/task/' + task.id + para;
                     }
                     else {
                        nextUrl = '/project/' + projectname + '/task/' + task.id + para;
                     }
                     history.pushState({}, "Title", nextUrl);

// *********************************修改后代码结束***********************************

                }
                _presentTask(task, taskSolved);
                $.when(nextLoaded, taskSolved).done(loop);
            }
            getNextTask(0, undefined).done(loop);
        });
    }


    // Public methods
    // 发起1请求后触发then回调，回调里发起2请求
    // _getProject工程信息查询  _getNewTask为用户分配一个任务
    pybossa.newTask = function (projectname) {
        return _getProject(projectname).then(_getNewTask);
    };

    // 第一个参数是数字则将它作为参数发起1请求并触发then回调，回调里再发2请求；
    // 如果是对象则直接发2请求；
    // _fetchTask获取任务信息  _createTaskRun根据id获取任务执行信息
    pybossa.saveTask = function (taskId, answer) {
        if (typeof(taskId) === "number") {
            return _fetchTask(taskId).then(_createTaskRun.bind(undefined, answer));
        }
        if (typeof(taskId) === "object") {
            var task = taskId;
            return _createTaskRun(answer, task);
        }
    };

    // 调用_getCurrentTaskId函数，获取参数或地址栏的id
    pybossa.getCurrentTaskId = function (url) {
        if (url !== undefined) {
            return _getCurrentTaskId(url);
        }
        else {
            return _getCurrentTaskId(window.location.pathname);
        }
    };

    // 发起请求并返回ajax对象
    // _userProgress工程进度条
    pybossa.userProgress = function (projectname) {
        return _userProgress( projectname );
    };

    // 获取token值后返回_run调用结果
    pybossa.run = function (projectname, _window) {
        token = $("#token").data("token");
        console.log('$("#token").data("token") '+token);
        return _run(projectname, _window);
    };

    // 返回_setUserTaskLoaded调用结果
    // _setUserTaskLoaded 给_taskLoaded赋值
    pybossa.taskLoaded = function (userFunc) {
        return _setUserTaskLoaded( userFunc );
    };

    // 返回_setUserPresentTask调用结果
    // _setUserPresentTask 给_presentTask赋值
    pybossa.presentTask = function (userFunc) {
        return _setUserPresentTask( userFunc );
    };

    // 传入url并保证url以'/'结尾，返回url
    pybossa.setEndpoint = function (endpoint) {
        // Check that the URL has the trailing slash, otherwise add it
        if ( endpoint.charAt(endpoint.length-1) != '/' ) {
            endpoint += '/';
        }
        url = endpoint;
        return url;
    };

    // 设置token_value的值
    pybossa.setToken = function (token_value) {
        token_value = token_value;
    };

} (window.pybossa = window.pybossa || {}, jQuery));

// task是一个任务，比如，识别“1234567”
// 一个task会被分配给三个用户，他们每个人接到的，是一个task_run
