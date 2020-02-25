const initialState = {
    name: '',
    email: '',
    password: '',
    collegeName: ''
  };

  export const reducer = (state = initialState, action) => {
    switch(action.type){
        // case 'ADD_NAME':
        //     return {
        //         ...state,
        //         names: [...state.names, action.payload]
        //     }
        default:
            return state
    }
  }