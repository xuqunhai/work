// pybossa.taskLoaded - img.load + task.info.image = img - deferred.resolve
// pybossa.presentTask - btn.click - pybossa.saveTask (saveTask - _createTaskRun - _saveTaskRun - ajax - deferred.resolve()
// pybossa.run

// taskLoaded(fn) - _setUserTaskLoaded - _taskLoaded = fn
// presentTask(fn) - _setUserPresentTask - _presentTask = fn
// run - _run - _fetchProject - getNextTask(0, undefined)

// getNextTask(0, undefined) : _fetchNewTask(project.id, 0) - _resolveNextTaskLoaded -
// loop - nextLoaded = getNextTask(1, task) - history.pushState - _presentTask(task, taskSolved)

// $.when(nextLoaded, taskSolved).done(loop)

// # Pre-load the next task for the user
// getNextTask(1, task) : _fetchNewTask(project.id, 1) -  _resolveNextTaskLoaded
// _resolveNextTaskLoaded : _taskLoaded(task, udef) - deferred.resolve(task)
