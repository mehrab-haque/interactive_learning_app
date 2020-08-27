export const topicsReducer=(state=null,action)=>{
  switch(action.type){
    case 'UPDATE_TOPICS':
      return action.data;
    default:
      return state;
  }
}

export const seriesesReducer=(state=null,action)=>{
  switch(action.type){
    case 'UPDATE_SERIESES':
      return action.data;
    case 'CLEAR_SERIESES':
      return null;
    default:
      return state;
  }
}
