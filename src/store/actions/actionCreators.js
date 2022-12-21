import * as at from './actionTypes';

// ACTION CREATORS;
/** needs to be an action creator
 * for each action type
 */

// All employees
export const fetchAllEmployees = (employees) => {
  return {
    type: at.FETCH_ALL_EMPLOYEES,
    payload: employees,
  };
};

//Single instructor
export const fetchEmployee= (employee) => {
  return {
    type: at.FETCH_EMPLOYEE,
    payload: employee,
  };
};

export const addEmployee = (employee) => {
  return {
    type: at.ADD_EMPLOYEE,
    payload: employee,
  };
};

export const deleteEmployee = (employeeId) => {
  return {
    type: at.DELETE_EMPLOYEE,
    payload: employeeId,
  };
};

export const editEmployee = (employee) => {
  return {
    type: at.EDIT_EMPLOYEE,
    payload: employee,
  };
};

//All courses
export const fetchAllTasks = (tasks) => {
  return {
    type: at.FETCH_ALL_TASKS,
    payload: tasks,
  };
};

export const addTask = (task) => {
  return {
    type: at.ADD_TASK,
    payload: task,
  };
};

export const deleteTask = (taskId) => {
  return {
    type: at.DELETE_TASK,
    payload: taskId,
  };
};


export const editTask = (task) => {
  return {
    type: at.EDIT_TASK,
    payload: task,
  };
};

//Single course
export const fetchTask = (task) => {
  return {
    type: at.FETCH_TASK,
    payload: task,
  };
};