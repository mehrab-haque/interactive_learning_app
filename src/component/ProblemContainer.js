import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import {fetchProblemBySerial} from '../action/content'
import Problem from "./Problem"
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import LinearProgress from "@material-ui/core/LinearProgress";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import {Grid} from "@material-ui/core";
import uuid from 'react-uuid'
import FaceIcon from "@material-ui/icons/Face";
import Chip from "@material-ui/core/Chip";
import ShareIcon from '@material-ui/icons/Share';
import ParticlesBg from "particles-bg";


import {createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

const myTheme = createMuiTheme({
    palette: {
        text: {
            default: '#fff',
        },
        textColor: '#fff',
        primary: {
            main: '#55b5ff',
            contrastText: "#fff"
        }
    },
    stepper: {
        iconColor: 'green',
        textColor: 'white'// or logic to change color
    }
})


const useStyles = makeStyles((theme) => ({
    stepperRoot: {
        width: '100%',
    }
}));

const ProblemContainer=props=>{

    const classes = useStyles();

    const lang=props.match.params.lang;
    const level=props.match.params.level;
    const seriesId=props.match.params.series_id;
    const serial=props.match.params.serial;
    const problem=useSelector(state=>state.problem)
    const dispatch=useDispatch()

    useEffect(()=>{
        getProblems()
        console.log(window.innerWidth*window.innerHeight)
    },[seriesId,serial])


    const getProblems=()=>{
        fetchProblemBySerial(dispatch,seriesId,serial);
    }

    const goto=sl=>{
        props.history.push('/lang/'+lang+"/level/"+level+'/series/'+seriesId+'/problem/'+sl+'/')
        //window.location.reload()
    }

    const nextProblem=()=>{
        if(problem.serial<problem.nproblem)
            goto(parseInt(problem.serial)+1)
    }

    return(
        <Grid item xs={12}>

            <ParticlesBg  type="cobweb" color={'#0090ff'}  num={window.innerWidth*window.innerHeight*40.0/825497.0} bg={true}/>
            {
                problem!=null?(
                    <Grid container>
                        <Grid item xs={12}>
                            <Breadcrumbs style={{marginLeft:'16px',marginBottom:'12px'}} separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                                <Link color="inherit" to={'/lang/'+lang+"/level/"+level+'/'} >
                                    <font style={{color:'#888888'}}>
                                        Topics
                                    </font>
                                </Link>
                                <Link color="inherit" to={'/lang/'+lang+"/level/"+level+'/topic/'+problem.topic_id+'/'}>
                                    <font style={{color:'#888888'}}>
                                    {problem.topic_name}
                                    </font>
                                </Link>
                                <Link color="inherit">
                                    <font style={{color:'#888888'}}>
                                    {problem.series_name}
                                    </font>
                                </Link>

                                <Chip
                                    style={{marginTop:'5px',marginLeft:'5px',background:'#0090ffaa',color:'#ffffff'}}
                                    icon={<ShareIcon/>}
                                    label="Recommend"
                                    color="primary"
                                    />

                            </Breadcrumbs>
                        </Grid>
                        <Grid xs={0} md={3}/>
                        <Grid item xs={12} md={6}>
                            <MuiThemeProvider theme={myTheme}>

                            <Stepper style={{marginTop:'12px',marginBottom:'-12px',padding:'10px'}} activeStep={serial-1} alternativeLabel>
                                {
                                    Array(problem.nproblem).fill().map((_, i) =>{
                                        return(
                                            <Step key={uuid()} style={{cursor:'pointer'}} onClick={()=>{if(serial!=i+1)goto(i+1)}}>
                                                <StepLabel>

                                                </StepLabel>
                                            </Step>
                                        )
                                    })
                                }
                            </Stepper>
                            </MuiThemeProvider>
                            <Problem serial={serial} next={nextProblem} data={problem}/>
                        </Grid>
                    </Grid>
                ):(
                    <LinearProgress/>
                )
            }
        </Grid>
    )
}

export default ProblemContainer
