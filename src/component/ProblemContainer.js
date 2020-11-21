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


const useStyles = makeStyles((theme) => ({
    stepperRoot: {
        width: '100%',
    }
}));

const ProblemContainer=props=>{

    const classes = useStyles();

    const seriesId=props.match.params.series_id;
    const serial=props.match.params.serial;
    const problem=useSelector(state=>state.problem)
    const dispatch=useDispatch()

    useEffect(()=>{
        getProblems()
    },[seriesId,serial])


    const getProblems=()=>{
        fetchProblemBySerial(dispatch,seriesId,serial);
    }

    const goto=sl=>{
        props.history.push('/series/'+seriesId+'/'+sl+'/')
        //window.location.reload()
    }

    return(
        <Grid item xs={12} md={8}>
            {
                problem!=null?(
                    <Grid container>
                        <Grid item xs={12}>
                            <Breadcrumbs style={{marginLeft:'16px',marginBottom:'12px'}} separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                                <Link color="inherit" to="/" >
                                    <font style={{color:'#888888'}}>
                                        Topics
                                    </font>
                                </Link>
                                <Link color="inherit" to={'/topic/'+problem.topic_id+'/'}>
                                    <font style={{color:'#888888'}}>
                                    {problem.topic_name}
                                    </font>
                                </Link>
                                <Link color="inherit">
                                    <font style={{color:'#888888'}}>
                                    {problem.series_name}
                                    </font>
                                </Link>

                            </Breadcrumbs>
                        </Grid>
                        <Grid item xs={12}>
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
                        </Grid>
                        <Grid item xs={12}>
                            <Problem data={problem}/>
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
