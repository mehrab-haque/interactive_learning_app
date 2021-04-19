import axios from 'axios'
import Cookies from 'universal-cookie';
import {base_url} from '../'
const cookies = new Cookies();

const COOKIE_AGE=315360000

export const checkAuth=(dispatcher)=>{
  console.log(cookies.get('token'))
  if(cookies.get('token')==undefined || cookies.get('token')==null)
    dispatcher(logoutDispatch())
  else
    dispatcher(loginDispatch())
}

/*export const loadingRedux=(dispatcher)=>{
    dispatcher(loadingDispatch())
}

export const logoutRedux=(dispatcher)=>{
    dispatcher(logoutDispatch())
}*/

export const googleAuth=(data,dispatcher)=>{
  dispatcher(loadingDispatch())
  axios.post(base_url+'auth/googleoauth',data).then(res=>{
    cookies.set('token',res.data.token,{ path: '/', maxAge: COOKIE_AGE })
    checkAuth(dispatcher)
  }).catch(err=>{
    //console.log(err)
    checkAuth(dispatcher)
  })
}

export const register=(data,dispatcher,callBack)=>{
  dispatcher(loadingDispatch())
  axios.post(base_url+'auth/registration',data).then(res=>{
    if(!('error' in res.data)){
      //console.log(res.data.token)

      //console.log(cookies.get('token'))
      cookies.set('token',res.data.token,{ path: '/', maxAge: COOKIE_AGE })

      checkAuth(dispatcher)
    }else{
      callBack(res.data.error)
      checkAuth(dispatcher)
    }
  }).catch(err=>{
    //console.log(err)
    checkAuth(dispatcher)
  })
}

export const login=(data,dispatcher,callBack)=>{
  dispatcher(loadingDispatch())
  axios.post(base_url+'auth/login',data).then(res=>{
    if(!('error' in res.data)){
      cookies.set('token',res.data.token,{ path: '/', maxAge: COOKIE_AGE })
      checkAuth(dispatcher)
    }else{
      callBack(res.data.error)
      checkAuth(dispatcher)
    }
  }).catch(err=>{
    //console.log(err)
    checkAuth(dispatcher)
  })
}

export const logout=(dispatcher)=>{
  cookies.remove('token',{ path: '/' })
  checkAuth(dispatcher)
}

const loginDispatch=()=>{
  return {
    type:'SIGN_IN'
  }
}
const logoutDispatch=()=>{
  return {
    type:'SIGN_OUT'
  }
}
const loadingDispatch=()=>{
  return {
    type:'LOADING'
  }
}
