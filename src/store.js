import { createStore } from 'redux';

const initialState = {
    user: JSON.parse(window.localStorage.getItem('token-data')) ?? null,
    theme: 'info'
  }

const reducer = (state = initialState, action) => {
    switch(action.type){
      case 'change-theme':
        return {
          ...state,
          theme: state.theme === 'primary' ? 'warning' :  'primary'
        }
      case 'login':
        return {
          ...state,
          user: action.user
        }
      case 'logout':
        return {
          ...state,
          user: null
        }
      default:
        return state;
    }
  }

  const store = createStore(reducer);

  export default store;
