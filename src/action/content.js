import axios from 'axios'
import Cookies from 'universal-cookie';
import {base_url} from '../'
const cookies = new Cookies();

export const fetchTopics=(dispatcher)=>{
  axios.get(base_url+'topics/1',{headers:{authorization:cookies.get('token')}}).then(res=>{
    dispatcher(topicsDispatch(res.data))
  }).catch(err=>{
    console.log(err)
  })
}

const topicsDispatch=data=>{
  return{
    type:'UPDATE_TOPICS',
    data:data
  }
}

export const fetchSerieses=(dispatcher,topicID)=>{
  dispatcher(clearSeriesesDispatch())
  axios.get(base_url+'topic/'+topicID,{headers:{authorization:cookies.get('token')}}).then(res=>{
    dispatcher(seriesesDispatch(res.data))
  }).catch(err=>{
    console.log(err)
  })
}

const seriesesDispatch=data=>{
  return{
    type:'UPDATE_SERIESES',
    data:data
  }
}

const clearSeriesesDispatch=()=>{
  return{
    type:'CLEAR_SERIESES'
  }
}
