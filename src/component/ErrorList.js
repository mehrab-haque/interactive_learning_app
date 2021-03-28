import {makeStyles} from "@material-ui/core/styles";
import {deepOrange, deepPurple} from "@material-ui/core/colors";
import Grid from "@material-ui/core/Grid";
import {Link} from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {Avatar} from "@material-ui/core";
import FaceIcon from '@material-ui/icons/Face';
import Chip from "@material-ui/core/Chip";
import Divider from "@material-ui/core/Divider";

import { useHistory } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    media: {
        height: 100,
         // 16:9
    },
    stepperRoot: {
        width: '100%',
    },
    canvasPaper: {
        padding: theme.spacing(1),
        color: theme.palette.text.secondary,
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing(2,1),
    },
    root1:{
        height:'100%'
    },
    eliminationGrid : {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    },
    orange: {
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500],
    },
    purple: {
        color: theme.palette.getContrastText(deepPurple[500]),
        backgroundColor: deepPurple[500],
    }
}));

const ErrorList=props=>{

    var pieces = props.history.location.pathname.split('/')



    const lang='en'
    const [level,setLevel] = useState(3)



    const erroredProblems=useSelector(state=>state.erroredProblems)

    const classes = useStyles();

    let history = useHistory();

    const goTo=(seriesId,problemSerial)=>{
        history.push('/lang/'+lang+"/level/"+level+`/series/${seriesId}/problem/${problemSerial}/`)
    }

    const goToLevel=(levelNo)=>{
        history.push('/lang/'+lang+"/level/"+levelNo+'/')
        setLevel(levelNo)
    }

    useEffect(()=>{
        setLevel(parseInt(props.history.location.pathname.split('/')[4]))
    },[props])


    return(
        <Grid item xs={12} md={12}>

            {
                level==1?(
                    <div>
                        <Chip
                            style={{marginTop:'5px',marginLeft:'5px',background:'#0090ffaa',color:'#ffffff'}}
                            onClick={()=>{goToLevel(1)}}
                            label="Level-1"
                        />
                        <Chip
                            onClick={()=>{goToLevel(2)}}

                            style={{marginTop:'5px',marginLeft:'5px'}}                            label="Level-2"
                        />
                        <Chip
                            onClick={()=>{goToLevel(3)}}

                            style={{marginTop:'5px',marginLeft:'5px'}}
                            label="Level-3"
                        />

                        <Divider style={{marginTop:'20px'}}/>
                    </div>
                ):(
                    level==2?(
                        <div>
                            <Chip
                                onClick={()=>{goToLevel(1)}}

                                style={{marginTop:'5px',marginLeft:'5px'}}

                                label="Level-1"
                            />
                            <Chip
                                onClick={()=>{goToLevel(2)}}

                                style={{marginTop:'5px',marginLeft:'5px',background:'#0090ffaa',color:'#ffffff'}}                            label="Level-2"
                            />
                            <Chip
                                onClick={()=>{goToLevel(3)}}

                                style={{marginTop:'5px',marginLeft:'5px'}}
                                label="Level-3"
                            />

                            <Divider style={{marginTop:'20px'}}/>
                        </div>
                    ):(
                        <div>
                            <Chip
                                onClick={()=>{goToLevel(1)}}

                                style={{marginTop:'5px',marginLeft:'5px'}}

                                label="Level-1"
                            />
                            <Chip
                                onClick={()=>{goToLevel(2)}}

                                style={{marginTop:'5px',marginLeft:'5px'}}                            label="Level-2"
                            />
                            <Chip
                                onClick={()=>{goToLevel(3)}}

                                style={{marginTop:'5px',marginLeft:'5px',background:'#0090ffaa',color:'#ffffff'}}
                                label="Level-3"
                            />

                            <Divider style={{marginTop:'20px'}}/>
                        </div>
                    )
                )
            }




            <div style={{color:'#666666',marginTop:'10px',fontSize:'1.2em'}}>
                Recommendation by friends
            </div>
                <Card style={{cursor:'pointer'}} onClick={()=>{goTo(62,1)}} className={classes.root} style={{marginTop:'10px'}}>
                    <Grid container style={{padding:'10px'}}>
                        <Grid item xs={3}>
                            <Avatar src='https://buet-edu-1.s3.ap-south-1.amazonaws.com/mehrab/venn_icon.png'/>
                        </Grid>
                        <Grid item xs={9}>
                            <h3 style={{margin:0}}>
                                Guard The Valley
                            </h3>

                            <div style={{color:'#888888'}}>
                                Math > Venn Diagram
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <div style={{color:'#0090ffaa',marginTop:'14px',textAlign:'right'}}>
                                - Recommended by Md. Mehrab Haque
                            </div>
                        </Grid>
                    </Grid>
                </Card>
                <Card style={{cursor:'pointer'}}  onClick={()=>{goTo(64,1)}} className={classes.root} style={{marginTop:'10px'}}>
                    <Grid container style={{padding:'10px'}}>
                        <Grid item xs={3}>
                            <Avatar src='https://buet-edu-1.s3.ap-south-1.amazonaws.com/Aditto/Paying+the+builders/Capture71.png'/>
                        </Grid>
                        <Grid item xs={9}>
                            <h3 style={{margin:0}}>
                                Paying The Builders
                            </h3>

                            <div style={{color:'#888888'}}>
                                Math > Inequalities
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <div style={{color:'#0090ffaa',marginTop:'14px',textAlign:'right'}}>
                                - Recommended by Rabib Jahin
                            </div>
                        </Grid>
                    </Grid>
                </Card>

            <Divider style={{marginTop:'20px'}}/>


            {
                erroredProblems!==null && erroredProblems.problemlist.length>0?(
                    <div>
                        <div style={{color:'#666666',marginTop:'10px',fontSize:'1.2em'}}>
                            Problems you got stuck
                        </div>
                        {
                            erroredProblems.problemlist.map(problem=>{
                                return(

                                        <Card style={{cursor:'pointer'}} onClick={()=>{goTo(problem.series_id,problem.serial)}} className={classes.root} style={{marginTop:'10px'}}>
                                            <Grid container style={{padding:'14px'}}>
                                                <Grid item xs={3}>
                                                    <Avatar src={problem.logo}/>
                                                </Grid>
                                                <Grid item xs={9}>
                                                    {
                                                        'title' in problem?(
                                                            <h3 style={{margin:0}}>
                                                                {
                                                                    problem.title
                                                                }
                                                            </h3>
                                                        ):(
                                                            <h3 style={{margin:0}}>
                                                                {
                                                                    problem.problem_title
                                                                }
                                                            </h3>
                                                        )
                                                    }

                                                    <div style={{color:'#888888'}}>
                                                        {problem.topic_name} > {problem.series_name}
                                                    </div>
                                                </Grid>
                                            </Grid>
                                        </Card>
                                )
                            })
                        }
                    </div>
                ):(
                   <div/>
                )
            }

        </Grid>
    )
}

export default ErrorList
