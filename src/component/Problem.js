import React,{useState,createRef,useRef,useEffect,forwardRef, useImperativeHandle} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {fetchProblem} from '../action/content'
import {Grid,Paper,CardHeader,Avatar,Divider,Button} from '@material-ui/core';
import MDEditor from '@uiw/react-md-editor';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MCQ from './question/MCQ'
import Text from './question/Text'
import Exclusion from './question/Exclusion'

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
    height: 0,
    paddingTop: '56.25%', // 16:9
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

const timeConverter=UNIX_timestamp=>{
    var a = new Date(UNIX_timestamp );
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + '-' + month + '-' + year + ' at ' + hour + ':' + min + ':' + sec ;
    return time;
  }

const Problem=props=>{

  const classes = useStyles();

  const interactiveRef=useRef()
  const questionRef=useRef()

  console.log(props.data)

  const evaluate=()=>{
      if(props.data.data.data.type!=='interactive'){
          if(questionRef.current.isValid())
              window.alert(questionRef.current.getVerdict()?'correct answer':'incorrect answer')
          else
              window.alert('enter your answer')
      }else{
          if(interactiveRef.current.isValid())
              window.alert(interactiveRef.current.getVerdict()?'correct answer':'incorrect answer')
          else
              window.alert('enter your answer')
      }

  }



  return(
      <Grid container>
        <Grid item xs={12}>
          <Paper style={{padding:'15px'}}>
            <CardHeader
               avatar={
                 <Avatar aria-label="recipe" src={props.data.author_image} className={classes.avatar}>
                     {props.data.author_name.substr(0,1)}
                 </Avatar>
               }

               title={props.data.title}
               titleTypographyProps={{variant:'h6' }}
               subheader={'-by '+props.data.author_name+' on '+timeConverter(parseInt(props.data.timestp))}
             />
            <MDEditor.Markdown source={props.data.data.description} />
            <Divider style={{margin:'10px'}}/>
            <MDEditor.Markdown source={props.data.data.statement} />
          </Paper>
            <Paper style={{padding:'15px'}}>
                <Interactive ref={interactiveRef} data={props.data.data}/>
                <Question ref={questionRef} data={props.data.data}/>
                <Button
                    style={{marginTop:'25px'}}
                    variant='outlined'
                    color='primary'
                    onClick={evaluate}
                    fullWidth>
                    Submit Answer
                </Button>
            </Paper>
        </Grid>

      </Grid>
  )
}

const Interactive=forwardRef((props,ref)=>{

    const interactiveRef=useRef()

    //console.log(props.data)

    useImperativeHandle(ref, () => ({
        isValid(){
            return interactiveRef.current.isValid()
        },
        getVerdict(){
            return interactiveRef.current.getVerdict()
        }
    }));

    //console.log(props.data)
    if(props.data.type==='exclusion_grid'){
        //console.log(props.data)
        var data={
            rows:props.data.data.rowHeading,
            cols:props.data.data.columnHeading,
            data:props.data.data.cell,
            state:props.data.data.initialState,
            sol:props.data.data.data.answer
        }
        return(
            <Exclusion ref={interactiveRef} data={data}/>
        )
    }
    else
        return <div/>
})

const Question=forwardRef((props,ref)=>{

  const questionRef=useRef()

    //console.log(props.data)

  useImperativeHandle(ref, () => ({
    isValid(){
      return questionRef.current.isValid()
    },
    getVerdict(){
      return questionRef.current.getVerdict()
    }
 }));

  //console.log(props.data)

  if(props.data.data.type==='mcq')
    return(
      <MCQ ref={questionRef} data={props.data.data}/>
    )
  else if(props.data.data.type==='text')
    return(
      <Text ref={questionRef} data={props.data.data}/>
    )
  else
      return <div/>
})


export default Problem;
