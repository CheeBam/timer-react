import {
  CREATE_ITEM,
  CREATE_LOG,
  ITEM_SET_NAME,
  ADD_TO_LOG,
  DELETE_FROM_LOG,
  CLEAR_LOG,
} from '../actions/timer';

export default () => () => next => action => {
  if (action.type) {
    switch (action.type) {
      case CREATE_ITEM: {
        localStorage.setItem('item', JSON.stringify(action.payload));
        break;
      }
      case CREATE_LOG: {
        localStorage.setItem('list', JSON.stringify(action.payload));
        break;
      }
      case ADD_TO_LOG: {
        const list = JSON.parse(localStorage.getItem('list')) || [];
        list.push(action.payload);
        localStorage.removeItem('item');
        localStorage.removeItem('name');
        localStorage.setItem('list', JSON.stringify(list));
        break;
      }
      case DELETE_FROM_LOG: {
        let list = JSON.parse(localStorage.getItem('list'));
        if (list) {
          list = list.filter(item => item.id !== action.payload);
          localStorage.setItem('list', JSON.stringify(list));
        }
        break;
      }
      case ITEM_SET_NAME: {
        const item = JSON.parse(localStorage.getItem('item'));
        if (item) {
          item.name = action.payload;
          localStorage.setItem('item', JSON.stringify(item));
        }
        localStorage.setItem('name', action.payload || '');
        break;
      }
      case CLEAR_LOG: {
        localStorage.removeItem('list');
        break;
      }
      default:
        break;
    }
  }

  return next(action);
};
