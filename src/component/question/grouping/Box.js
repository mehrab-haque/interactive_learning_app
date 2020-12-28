import React from 'react';
import { useDrag } from 'react-dnd';
var style = {
    border: '1px solid #0090ff',
    backgroundColor: 'white',
    padding: '0.5rem 1rem',
    marginRight: '0.5rem',
    borderRadius:'8px',
    marginBottom: '0.5rem',
    boxShadow:'5px 5px 5px #0090ff44',
    float: 'left',
};
export const Box = ({ name, type, isDropped }) => {
    const [{ opacity }, drag] = useDrag({
        item: { name, type },
        collect: (monitor) => ({
            opacity: monitor.isDragging() ? 0 : 1,
        }),
    });
    if(!isDropped)style['cursor']='move'
    if(!isDropped)
    return (<div ref={drag} style={{ ...style, opacity }}>
        {isDropped ? <s>{name}</s> : name}
    </div>);
    else
        if(!isDropped)return (<div style={{ ...style, opacity }}>
            {name}
        </div>);
        else
            return (
                <div style={{ ...style,opacity:0 }}>
                    {name}
                </div>
            )
};
