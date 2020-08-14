import React,{useEffect} from 'react'
import {logout} from '../action/auth'
import {fetchProfile} from '../action/profile'
import {useSelector,useDispatch} from 'react-redux'




const Home=props=>{

  const dispatch=useDispatch()

  const logoutClick=event=>{
    logout(dispatch)
  }

  useEffect(() => {
      fetchProfile(dispatch)
  }, []);

  return(
    <center><button onClick={logoutClick}>
      Logout
    </button></center>
  )
}

export default Home;
