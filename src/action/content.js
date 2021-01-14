import axios from 'axios'
import Cookies from 'universal-cookie';
import {base_url} from '../'
const cookies = new Cookies();

export const fetchTopics=(dispatcher)=>{
  axios.get(base_url+'topics/en',{headers:{authorization:cookies.get('token')}}).then(res=>{
    dispatcher(topicsDispatch(res.data))
    //console.log(res.data)
  }).catch(err=>{
    //console.log(err)
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
    //console.log(err)
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

export const fetchProblem=(dispatcher,problem_id)=>{
  dispatcher(clearProblemDispatch())
  axios.get(base_url+'problem/'+problem_id,{headers:{authorization:cookies.get('token')}}).then(res=>{
    dispatcher(problemDispatch(res.data[0]))
  }).catch(err=>{
    //console.log(err)
  })
}

export const fetchProblemBySerial=(dispatcher,seriesId,serial)=>{
  dispatcher(clearProblemDispatch())
  axios.get(base_url+'problemBySerial/'+seriesId+'/'+serial,{headers:{authorization:cookies.get('token')}}).then(res=>{
    dispatcher(problemDispatch(res.data))
  }).catch(err=>{
    //console.log(err)
  })
}

export const checkFeedback=(problem_id,user_id)=>{
  return axios.post(base_url+'/feedback/submissionStatus/',
      {
        "problem_id": problem_id,
        "user_id": user_id
      },
      {headers:{authorization:cookies.get('token')}}
  ).then(res=>{
    console.log(res.data)
    return res.data
  }).catch(err=>{
    //console.log(err)
  })
}

export const submitFeedback=feedback=>{
  return axios.post(base_url+'/feedback/submitFeedback/',feedback,
      {headers:{authorization:cookies.get('token')}}
  ).then(res=>{
    console.log(res.data)
  }).catch(err=>{
    //console.log(err)
  })
}

const problemDispatch=data=>{
  return{
    type:'UPDATE_PROBLEM',
    data:data
  }
}

const clearProblemDispatch=()=>{
  return{
    type:'CLEAR_PROBLEM'
  }
}



