export const CREATE_ITEM = 'CREATE_ITEM';
export const CREATE_LOG = 'CREATE_LOG';
export const ITEM_SET_NAME = 'ITEM_SET_NAME';
export const ADD_TO_LOG = 'ADD_TO_LOG';
export const DELETE_FROM_LOG = 'DELETE_FROM_LOG';
export const CLEAR_LOG = 'CLEAR_LOG';

export function createItemAction(item) {
    return { type: CREATE_ITEM, payload: item }
}

export function createLogAction(list) {
    return { type: CREATE_LOG, payload: list }
}

export function setNameAction(name) {
    return { type: ITEM_SET_NAME, payload: name }
}

export function addLogAction(object) {
    return { type: ADD_TO_LOG, payload: object }
}

export function deleteFromLogAction(id) {
    return { type: DELETE_FROM_LOG, payload: id }
}

export function clearLogAction() {
    return { type: CLEAR_LOG }
}





