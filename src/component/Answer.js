import React from "react";
import Exclusion from "./question/Exclusion";

const Answer=props=>{

    //console.log(props.data)

    return(
        <div>
            {
                props.data.type==='mcq'?(
                    <div>
                        {
                            props.data.data.answer
                        }
                    </div>
                ):(
                    props.data.type==='text'?(
                        <div>
                            {
                                props.data.data.answer.map((ans,ind)=>{
                                    return(
                                        <div>
                                            {ans}
                                            {
                                                ind<props.data.data.answer.length-1?(
                                                    <div>
                                                        /
                                                    </div>
                                                ):(
                                                    <div/>
                                                )
                                            }
                                        </div>
                                    )
                                })
                            }
                        </div>
                    ):(
                        props.data.type==='interactive'?(
                            props.interactive==='exclusion_grid'?(
                                <Exclusion
                                    key={Date.now()}
                                    data={{
                                        cols:props.data.columnHeading,
                                        rows:props.data.rowHeading,
                                        data:props.data.cell,
                                        state:props.data.data.answer
                                    }}/>
                                ):(
                                 <div/>
                                )

                        ):(
                            <div/>
                        )
                    )

                )
            }
        </div>
    )
}

export default Answer
