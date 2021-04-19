import React,{useState,createRef,useRef,useCallback,useEffect,forwardRef, useImperativeHandle} from 'react'
import { NativeTypes } from 'react-dnd-html5-backend';
import { Dustbin } from './dndgrid/Dustbin';
import { Box } from './dndgrid/Box';
import update from 'immutability-helper';



const DragAndDropGrid=forwardRef((props,ref1)=>{

    useImperativeHandle(ref1, () => ({

        isValid(){
            return true
        },
        getVerdict(){
            //console.log('hiiii')
            var ansSet=[],currSet=[]
            props.data.answer.map(ans=>{
                ansSet.push(ans.items.sort())
            })
            dustbins.map(dustbin=>{
                currSet.push(dustbin.items.sort())
            })
            return JSON.stringify(ansSet)===JSON.stringify(currSet)
        }

    }));




    var tmpDustbins=[],tmpBoxes=[]
    props.data.containers.map(container=>{
        tmpDustbins.push({
            name:container,
            accepts:props.data.items,
            items:[]
        })
    })
    props.data.items.map(item=>{
        tmpBoxes.push({
            name:item,
            type:item
        })
    })



    const [dustbins, setDustbins] = useState(tmpDustbins);
    const [boxes] = useState(tmpBoxes);
    const [droppedBoxNames, setDroppedBoxNames] = useState('dropped' in props.data?props.data.dropped:[]);
    function isDropped(boxName) {
        return droppedBoxNames.indexOf(boxName) > -1;
    }
    const handleDrop = useCallback((index, item) => {
        const { name } = item;
        setDroppedBoxNames(update(droppedBoxNames, name ? { $push: [name] } : { $push: [] }));
        var items=dustbins[index].items
        if(!items.includes(name))items.push(name)
        setDustbins(update(dustbins, {
            [index]: {
                items: {
                    $set: items,
                },
            },
        }));
        dustbins.map((d,i)=>{
            if(i!==index && d.items.includes(name)){
                var it=d.items
                it.splice(it.indexOf(name), 1);
                setDustbins(update(dustbins, {
                    [i]: {
                        items: {
                            $set: it,
                        },
                    },
                }));
            }
        })
    }, [droppedBoxNames, dustbins]);

    return (
        <div>
            <div style={{ overflow: 'hidden', clear: 'both' }}>
                <table>
                    {
                        Array(props.data.nRows).fill().map((_,i)=>{
                            return(
                                <tr>
                                    {
                                        Array(props.data.nCols).fill().map((_,j)=>{
                                            return(
                                                <td>
                                                    <Dustbin accept={props.data.active[i*props.data.nRows+j]?props.data.items:[]} name={dustbins[i*props.data.nRows+j].name} items={dustbins[i*props.data.nRows+j].items} onDrop={(item) => handleDrop(i*props.data.nRows+j, item)} key={i*props.data.nRows+j}/>
                                                </td>
                                            )
                                        })
                                    }
                                </tr>
                            )
                        })
                    }

                </table>
            </div>

            <div style={{ overflow: 'hidden', clear: 'both' }}>
                {boxes.map(({ name, type }, index) => (<Box name={name} type={type} isDropped={isDropped(name)} key={index}/>))}
            </div>
        </div>
    );
})

export default DragAndDropGrid


