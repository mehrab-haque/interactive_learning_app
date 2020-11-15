import React,{useEffect} from 'react'
import {TextField} from '@material-ui/core'

const Text=props=>{

  useEffect(()=>{
    console.log(props.data)
  },[])

  return(
    <div>
      <h2 style={{color:'#666666'}}>
        Submit your answer here
      </h2>
      <TextField
        variant='outlined'
        label='Your Answer'
        fullWidth
        />
    </div>
  )
}

export default Text;
