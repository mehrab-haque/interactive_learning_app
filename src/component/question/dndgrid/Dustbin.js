import React, {useEffect, useState} from 'react';
import { useDrop } from 'react-dnd';
import {Box} from "../grouping/Box";
const style = {
    minHeight: '6rem',
    width: '4.5rem',
    marginRight: '0.5rem',
    marginBottom: '0.5rem',
    padding: '0.5rem',
    color:'#0090ff',
    textAlign: 'center',
    borderRadius:'10px',
    fontSize: '1rem',
    lineHeight: 'normal',
    float: 'left',
    border: '1px solid #0090ff',
    boxShadow:'2px 2px 2px #0090ff44',

};

const itemStyle = {
    border: '1px solid #0090ff',
    backgroundColor: 'white',
    padding: '0.5rem 1rem',
    marginRight: '0.5rem',
    borderRadius:'8px',
    marginBottom: '0.5rem',
    boxShadow:'5px 5px 5px #0090ff44',
    float: 'left',
};

export const Dustbin = ({ accept, items, onDrop,name }) => {

    var tmpBoxes=[]
    items.map(item=>{
        tmpBoxes.push({
            name:item,
            type:item
        })
    })

    //console.log(tmpBoxes)




    const [boxes,setBoxes]=useState(tmpBoxes)

    useEffect(()=>{
        if(boxes.length!=tmpBoxes.length){
            setBoxes(tmpBoxes)
        }
    },[tmpBoxes])



    const [{ isOver, canDrop }, drop] = useDrop({
        accept,
        drop: onDrop,
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    });
    const isActive = isOver && canDrop;
    let backgroundColor = 'white';
    if (isActive) {
        backgroundColor = '#00bb0033';
    }
    else if (canDrop) {
        backgroundColor = '#0090ff33';
    }
    return (
        <div ref={drop} style={{ ...style, backgroundColor }}>

            {name}

          <div style={{
              marginTop:'10px',
              display:'flex',
              flexWrap:'wrap'
          }}>
              {boxes.map(({ name, type }, index) => (<Box name={name} type={type} isDropped={false} key={index}/>))}

          </div>
        </div>);
};
