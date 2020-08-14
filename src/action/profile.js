import axios from 'axios'
import Cookies from 'universal-cookie';
import {base_url} from '../'
const cookies = new Cookies();

export const fetchProfile=(dispatcher)=>{
  axios.get(base_url+'auth/profile',{headers:{authorization:cookies.get('token')}}).then(res=>{
    console.log(res.data)
  }).catch(err=>{
    console.log(err)
  })
}

const profileDispatch=data=>{
  return{
    type:'UPDATE',
    data:data
  }
}
