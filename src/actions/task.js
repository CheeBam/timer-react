export const GET_TASK = 'GET_TASK';
export const GET_TASK_LOADING = 'GET_TASK_LOADING';
export const GET_TASK_SUCCESS = 'GET_TASK_SUCCESS';
export const GET_TASK_FAILED = 'GET_TASK_FAILED';
export const CLEAR_TASK = 'CLEAR_TASK';

export function getTask(id) {
    return { type: GET_TASK, payload: id }
}

export function getTaskSuccess(item) {
    return { type: GET_TASK_SUCCESS, payload: item }
}

export function getTaskLoading() {
    return { type: GET_TASK_LOADING }
}

export function getTaskError(error) {
    return { type: GET_TASK_FAILED, payload: error }
}

export function clearTask() {
    return { type: CLEAR_TASK }
}


