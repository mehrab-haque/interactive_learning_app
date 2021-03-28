import React,{useState,createRef,useRef,useEffect,forwardRef, useImperativeHandle} from 'react'
import {TextField} from '@material-ui/core'

const Text=forwardRef((props,ref)=>{

  const textRef=useRef()

  useEffect(()=>{
    //console.log(props.data)
  },[])

  useImperativeHandle(ref, () => ({
    isValid(){
      return textRef.current.value.trim().length>0
    },
    getVerdict(){
      return props.data.data.answer.includes(textRef.current.value.trim())
    }
 }));

  return(
    <div>
      <h2 style={{color:'#666666'}}>
        Submit your answer here
      </h2>
      <TextField
        inputRef={textRef}
        variant='outlined'
        label='Your Answer'
        />
    </div>
  )
})

export default Text;
