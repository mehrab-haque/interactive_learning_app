import React,{useEffect} from 'react'
import {RadioGroup,Radio,FormControlLabel} from '@material-ui/core'

const MCQ=props=>{

  useEffect(()=>{
    console.log(props.data)
  },[])

  return(
    <div>
      <h2 style={{color:'#666666'}}>
        Submit your answer here
      </h2>
      <RadioGroup aria-label="gender" name="a" value={0}>
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
}

export default MCQ;
