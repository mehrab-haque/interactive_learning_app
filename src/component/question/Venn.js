import React,{useState,createRef,useRef,useCallback,useEffect,forwardRef, useImperativeHandle} from 'react'
import * as d3 from "d3";
import * as venn from "venn.js";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

const Venn=forwardRef((props,ref1)=>{


    var data=props.data
    var containerRef=useRef()

    var width=null;


    useImperativeHandle(ref1, () => ({

        getData(){
            return data
        },
        isValid(){
            return true
        },
        getVerdict(){
            return JSON.stringify(data.sets)===JSON.stringify(props.data.data.answer.sets)
        }

    }));

    useEffect(()=>{
        loadUI()
        window.addEventListener('resize',loadUI);
        console.log('vennnnnn')
        console.log(props.data)
    },[])


    const loadUI=()=>{
        if(containerRef.current.offsetWidth!==width) {
            width=containerRef.current.offsetWidth
            var chart = venn.VennDiagram().width(width)
            var div = d3.select('#' + props.containerId)
            div.datum(data.sets).call(chart);

            d3.selectAll("#" + props.containerId + " text")
                .style("fill", 'black')
                .style('fill-opacity', 1)
                .style('font-size', '1.6em')

            d3.selectAll("#" + props.containerId + " path")
                .style("stroke-opacity", 1)
                .style("stroke", "#000000")
                .style("stroke-width", 2)
                .style('fill', '#ffffff')
                .style('fill-opacity', 1)

            div.selectAll('g').each(function (d, i) {
                if (data.sets[d.id].selected) {
                    var node = d3.select(this).transition();
                    node.select("path")
                        .style('fill', data.sets[d.id].color)
                        .style('fill-opacity', 1)
                        .style('cursor', 'pointer')
                    for (var indDed in data.sets[d.id].exclude) {
                        var indDedTmp = data.sets[d.id].exclude[indDed]
                        div.selectAll('g').each(function (d1, i1) {
                            if (indDedTmp == d1.id && !data.sets[indDedTmp].selected) {
                                var node = d3.select(this).transition();
                                node.select("path")
                                    .style('fill', '#ffffff')
                                    .style('fill-opacity', 1)
                                    .style('cursor', 'pointer')
                            }
                        })
                    }
                }
            })

            div.selectAll('g').on('mouseover', function (d, i) {
                if (!data.sets[i.id].selected) {
                    div.selectAll('g').each(function (d1, i1) {
                        if (i.id === d1.id) {
                            var node = d3.select(this).transition();
                            node.select("path")
                                .style('fill', data.sets[i.id].color)
                                .style('fill-opacity', 1)
                                .style('cursor', 'pointer')
                        }
                    })
                    for (var indDed in data.sets[i.id].exclude) {
                        var indDedTmp = data.sets[i.id].exclude[indDed]
                        div.selectAll('g').each(function (d1, i1) {
                            if (indDedTmp == d1.id && !data.sets[indDedTmp].selected) {
                                var node = d3.select(this).transition();
                                node.select("path")
                                    .style('fill', '#ffffff')
                                    .style('fill-opacity', 1)
                                    .style('cursor', 'pointer')
                            }
                        })
                    }
                }
            })

            div.selectAll('g').on('mouseout', function (d, i) {
                if (!data.sets[i.id].selected) {
                    div.selectAll('g').each(function (d1, i1) {
                        if (i.id === d1.id) {
                            var node = d3.select(this).transition();
                            node.select("path")
                                .style('fill', '#ffffff')
                                .style('fill-opacity', 1)
                                .style('cursor', 'pointer')
                        }
                    })
                }

            })

            div.selectAll('g').on('click', function (d, i) {
                if (!data.sets[i.id].selected) {
                    div.selectAll('g').each(function (d1, i1) {
                        if (i.id == d1.id) {
                            var node = d3.select(this).transition();
                            node.select("path")
                                .style('fill', data.sets[d1.id].color)
                                .style('fill-opacity', 1)
                                .style('cursor', 'pointer')
                        }
                    })
                    for (var indDed in data.sets[i.id].exclude) {
                        var indDedTmp = data.sets[i.id].exclude[indDed]
                        div.selectAll('g').each(function (d1, i1) {
                            if (indDedTmp == d1.id && !data.sets[indDedTmp].selected) {
                                var node = d3.select(this).transition();
                                node.select("path")
                                    .style('fill', '#ffffff')
                                    .style('fill-opacity', 1)
                                    .style('cursor', 'pointer')
                            }
                        })
                    }
                } else {
                    div.selectAll('g').each(function (d1, i1) {
                        if (i.id == d1.id) {
                            var node = d3.select(this).transition();
                            node.select("path")
                                .style('fill', '#ffffff')
                                .style('fill-opacity', 1)
                                .style('cursor', 'pointer')
                        }
                    })
                }
                data.sets[i.id].selected = !data.sets[i.id].selected
            })
        }
    }

    return(
        <Grid
            justify="center"
            container>
            <Grid item xs={11}>
                <Paper style={{padding:'10px'}}>
                    <div id={props.containerId} ref={containerRef}>
                    </div>
                </Paper>
            </Grid>
        </Grid>
    )

})

export default Venn


