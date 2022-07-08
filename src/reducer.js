export const reducer = (state, action) => {
    switch(action.type){
      case 'change-theme':
        return {
          ...state,
          theme: state.theme === 'primary' ? 'warning' :  'primary'
        }
      case 'login':
        return {
          ...state,
          isAuthenticated: true
        }
      case 'logout':
        return {
          ...state,
          isAuthenticated: false
        }
      default:
        throw new Error('Nie ma akcji: ' + action.type)
    }

  }

  export const initialState = {
    isAuthenticated: true,
    theme: 'warning'
  }