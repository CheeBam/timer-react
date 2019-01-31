import { CREATE_ITEM, CREATE_LOG, ITEM_SET_NAME, ADD_TO_LOG, DELETE_FROM_LOG, CLEAR_LOG } from '../actions/timer';

export const INITIAL_STATE = {
    item: {
        id: 0,
        name: '',
        start: null,
        end: null,
        duration: null,
    },
    list: [],
};

export default function timerReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case CREATE_ITEM:
            return {
                item: action.payload,
                list: state.list,
            };
        case CREATE_LOG:
            return {
                item: state.item,
                list: action.payload,
            };
        case ITEM_SET_NAME:
            return {
                item: {
                    ...state.item,
                    name: action.payload,
                },
                list: state.list,
            };
        case ADD_TO_LOG:
            return {
                item: INITIAL_STATE.item,
                list: [ ...state.list, action.payload ],
            };
        case DELETE_FROM_LOG:
            return {
                item: state.item,
                list: state.list.filter(item => item.id !== action.payload),
            };
        case CLEAR_LOG:
            return {
                item: state.item,
                list: INITIAL_STATE.list,
            };
        default: return state;
    }

};
