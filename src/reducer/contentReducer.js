export const topicsReducer=(state=null,action)=>{
  switch(action.type){
    case 'UPDATE_TOPICS':
      return action.data;
    default:
      return state;
  }
}
