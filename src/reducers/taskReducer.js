import { GET_TASK, GET_TASK_SUCCESS, GET_TASK_LOADING, GET_TASK_FAILED, CLEAR_TASK } from '../actions/task';

export const INITIAL_STATE = {
    loading: false,
    success: false,
    failed: false,
    item: {
        id: 0,
        name: null,
        start: null,
        end: null,
        duration: null,
    },
};

export default function taskReducer(state = INITIAL_STATE, action) {
    switch (action.type) {

        case GET_TASK_LOADING:
            return {
                ...state,
                loading: true,
            };

        case GET_TASK_SUCCESS:
            return {
                loading: false,
                success: true,
                failed: false,
                item: action.payload,
            };

        case GET_TASK_FAILED:
            return {
                loading: false,
                success: false,
                failed: true,
                item: action.payload,
            };

        case GET_TASK:
            return state;

        case CLEAR_TASK:
            return INITIAL_STATE;

        default:
            return state;
    }
}
