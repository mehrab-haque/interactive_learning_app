import React,{useEffect,useState} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {fetchProblem} from '../action/content'
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';


const Problem=props=>{

  console.log(props.data)

  return(
    <div/>
  )
}


export default Problem;
