import React,{useState,createRef,useRef,useEffect,forwardRef, useImperativeHandle} from 'react'
import {RadioGroup,Radio,FormControlLabel} from '@material-ui/core'

const MCQ=forwardRef((props,ref)=>{

  const [value, setValue] = React.useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  useEffect(()=>{
    ////console.log(props.data)
  },[])

  useImperativeHandle(ref, () => ({
    isValid(){
      return value!==''
    },
    getVerdict(){
      return value===props.data.data.answer
    }
 }));

  return(
    <div>
      <h2 style={{color:'#666666'}}>
        Submit your answer here
      </h2>
      <RadioGroup aria-label="gender" name="a" value={value} onChange={handleChange}>
        {
          props.data.data.options.map(option=>{
            return(
              <FormControlLabel value={option} control={<Radio />} label={option} />
            )
          })
        }
      </RadioGroup>
    </div>
  )
})

export default MCQ;
