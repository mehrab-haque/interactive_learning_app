import React,{useState,createRef,useRef,useEffect,forwardRef, useImperativeHandle} from 'react'
import './exclusion.css'
import uuid from 'react-uuid'

const Exclusion=forwardRef((props,ref1)=>{


    const [key,setKey]=useState(Date.now())
    const [data,setData]=useState(props.data)


  useEffect(() => {
    //console.log('data')
   console.log(props.data)
 },[]);

  useImperativeHandle(ref1, () => ({

    getData(){
      return data
      /*var verdict=true;
      data.map.map((v1,i1)=>{
        data.map[i1].map((v2,i2)=>{
          if(data.map[i1][i2]!==data.ansMap[i1][i2])
            verdict=false;
        })
      })
      return verdict*/
    },
    isValid(){
      return true
    },
    getVerdict(){
        var schema1=props.data.sol
        var schema2=data.state
        return JSON.stringify(schema1)===JSON.stringify(schema2)
    }

 }));

  const updateTable=state=>{
      var updatedData=data
      updatedData['state']=state
      setData(updatedData)
      setKey(Date.now())
      /*var verdict=true;
      data.map.map((v1,i1)=>{
        data.map[i1].map((v2,i2)=>{
          if(data.map[i1][i2]!==data.ansMap[i1][i2])
            verdict=false;
        })
      })
      //console.log(data.map)
      //console.log(data.ansMap)
      //console.log(verdict)
      if(verdict)props.correctCallBack();*/
  }

  return(
    <div>
      <ExclusionFields callBack={updateTable} key={key} data={data}/>
    </div>
  )
})

const ExclusionFields=props=>{

  return(
    <table style={{width:'100%',cellSpacing:'2px'}}>
        <tbody><tr>
      <td><pre>    </pre></td>
      {
        props.data.cols.map(c=>{
          return(
            <td key={uuid()}>{c}</td>
          )
        })
      }
    </tr>
    {
      props.data.rows.map((row,indY)=>{
        return(
          <tr key={uuid()}>
            <td style={{valign:"center"}}>{row}</td>
            {
              props.data.cols.map((col,indX)=>{
                return(
                  <td key={uuid()}>
                  <img
                   onClick={()=>{
                      var state=props.data.state
                      state[indY][indX]=!state[indY][indX]
                      props.callBack(state)
                    }} className={!props.data.state[indY][indX]?"bw" : ""} style={{maxHeight:'26px',cursor:'pointer'}} src={props.data.data[indY][indX]}/>
                  </td>
                )
              })
            }
          </tr>
        )
      })
    }
        </tbody>
    </table>
  )
}

export default Exclusion
