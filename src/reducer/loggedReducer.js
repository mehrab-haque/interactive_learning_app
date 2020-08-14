const loggedReducer=(state=0,action)=>{
  switch(action.type){
    case 'SIGN_IN':
      return 1;
    case 'LOADING':
      return 0;
    case 'SIGN_OUT':
      return -1;
    default:
      return state;
  }
}

export default loggedReducer;
