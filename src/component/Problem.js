import React, {useState, createRef, useRef, useEffect, forwardRef, useImperativeHandle} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {fetchProblem} from '../action/content'
import {
    Grid,
    Paper,
    CardHeader,
    Avatar,
    Divider,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography
} from '@material-ui/core';
import MDEditor from '@uiw/react-md-editor';
import {deepOrange, deepPurple} from '@material-ui/core/colors';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import MCQ from './question/MCQ'
import Text from './question/Text'
import Exclusion from './question/Exclusion'
import Grouping from './question/Grouping'
import Rearranging from './question/Rearranging'
import Matchsticks from './question/Matchsticks'
import Venn from './question/Venn'
import Answer from "./Answer";

import toastr from 'reactjs-toastr';
import 'reactjs-toastr/lib/toast.css';
import './problem.css'


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
        padding: theme.spacing(2, 1),
    },
    root1: {
        height: '100%'
    },
    eliminationGrid: {
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

const timeConverter = UNIX_timestamp => {
    var a = new Date(UNIX_timestamp);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + '-' + month + '-' + year + ' at ' + hour + ':' + min + ':' + sec;
    return time;
}

const Problem = props => {

    //console.log(props.data.data.statement.split('![]'))



    const classes = useStyles();

    const [verdict, setVerdict] = useState(false)
    const [prompt,setPrompt]=useState(false)
    const [explanation,setExplanation]=useState(false)

    const interactiveRef = useRef()
    const questionRef = useRef()


    console.log('hi')
    console.log(props.data)


    const evaluate = () => {
        if (props.data.data.data.type !== 'interactive') {
            if (questionRef.current.isValid()){
                setVerdict(questionRef.current.getVerdict())
                setPrompt(true)
            }
            else
                toastr.error('Enter Your Answer', 'Error')
        } else {
            if (interactiveRef.current.isValid()) {
                setVerdict(interactiveRef.current.getVerdict())
                setPrompt(true)
            }
            else
                toastr.error('Enter Your Answer', 'Error')
        }

    }


    return (
        <Grid container>
            <Dialog open={prompt} onClose={()=>{setPrompt(false)}}>
                <DialogTitle>
                    {
                        verdict?(
                            <div>
                                Congratulations !
                            </div>
                        ):(
                            <div>
                                It's Ok
                            </div>
                        )
                    }
                </DialogTitle>
                <DialogContent>
                    <center>
                    <img style={{height:'200px',width:'200px'}} src={verdict?require('../assets/animations/celebration.gif'):require('../assets/animations/oops.gif')}/>
                    <Typography style={{marginTop:'10px'}}>
                        {
                            verdict?(
                                <div>
                                    Your answer is correct !!!
                                </div>
                            ):(
                                <div>
                                    Your answer is incorrect.
                                </div>
                            )
                        }
                    </Typography>
                    {
                        verdict?(
                            <div>
                                <Button
                                    style={{marginTop:'10px'}}
                                    fullWidth
                                    variant='outlined'
                                    onClick={()=>{setExplanation(true)}}
                                    color='secondary'>
                                    Show Explanation
                                </Button>
                                <Button
                                    style={{marginTop:'10px'}}
                                    fullWidth
                                    variant='outlined'
                                    onClick={()=>{
                                        setPrompt(false);
                                        props.next()
                                    }}
                                    color='primary'>
                                    Go to next problem
                                </Button>
                            </div>
                        ):(
                            <div>
                                <Button
                                    style={{marginTop:'10px'}}
                                    fullWidth
                                    variant='outlined'
                                    onClick={()=>{setExplanation(true)}}
                                    color='secondary'>
                                    View Solution
                                </Button>
                                <Button
                                    style={{marginTop:'10px'}}
                                    fullWidth
                                    variant='outlined'
                                    color='primary'
                                    onClick={()=>{setPrompt(false)}}
                                    >
                                    Try Again
                                </Button>
                            </div>
                        )
                    }
                    </center>
                </DialogContent>

                <Dialog open={explanation} onClose={()=>{setExplanation(false)}}>
                    <DialogTitle>
                        Solution
                    </DialogTitle>
                    <DialogContent>
                        <Typography>
                            <Answer interactive={props.data.data.type} data={props.data.data.data}/>
                        </Typography><br/>
                        <u>Explanation :</u>
                        <MDEditor.Markdown source={props.data.data.explanation}/>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            color='primary'
                            onClick={()=>{setExplanation(false)}}>
                            Ok
                        </Button>
                    </DialogActions>
                </Dialog>

            </Dialog>
            <Grid item xs={12}>
                <Paper style={{padding: '15px'}}>
                    <CardHeader
                        avatar={
                            <Avatar aria-label="recipe" src={props.data.logo}>
                                {props.data.author_name.substr(0, 1)}
                            </Avatar>
                        }

                        title={props.data.title}
                        titleTypographyProps={{variant: 'h6'}}
                        subheader={'grade :' + props.data.grade + ', difficulty: ' + props.data.difficulty}
                    />
                    <MDEditor.Markdown className='md' source={props.data.data.description}/>
                    <Divider style={{margin: '10px'}}/>
                    <MDEditor.Markdown className='md' source={props.data.data.statement}/>
                </Paper>
                <Paper style={{padding: '15px'}}>
                    <Interactive ref={interactiveRef} data={props.data.data}/>
                    <Question ref={questionRef} data={props.data.data}/>
                    <Button
                        style={{marginTop: '25px'}}
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

const Interactive = forwardRef((props, ref) => {

    const interactiveRef = useRef()

    //console.log(props.data)


    useImperativeHandle(ref, () => ({
        isValid() {
            return interactiveRef.current.isValid()
        },
        getVerdict() {
            return interactiveRef.current.getVerdict()
        }
    }));

    //console.log(props.data)
    if (props.data.type === 'exclusion_grid') {
        //console.log(props.data)
        var data = {
            rows: props.data.data.rowHeading,
            cols: props.data.data.columnHeading,
            data: props.data.data.cell,
            state: props.data.data.initialState,
            sol: props.data.data.data.answer
        }
        return (
            <Exclusion ref={interactiveRef} data={data}/>
        )
    } else if(props.data.type==='dragAndDrop-1') {
        var containers=[],schema=[]
        props.data.data.containers.map(container=>{
            containers.push(container.label)
            schema.push([])
        })
        var tmpData={
            containers:containers,
            items:props.data.data.unselected,
            schema:schema,
            answer:props.data.data.data.answer
        }
        //console.log('hi')
        //console.log(tmpData)
        return (
            <Grouping ref={interactiveRef} data={tmpData}/>
        )
    } else if(props.data.type==='rearrange') {

        var tmpData={
            items:props.data.data.fields,
            sol: props.data.data.data.answer
        }
        return (
            <Rearranging ref={interactiveRef} data={tmpData}/>
        )
    }
    else if(props.data.type==='matchstick') {

        console.log(props.data)
        return (
            <Matchsticks containerId='question' ref={interactiveRef} editor={false} data={props.data.data}/>
        )
    }
    else if(props.data.type==='venn') {

        //console.log(props.data)
        return (
            <Venn containerId='question' ref={interactiveRef} editor={false} data={props.data.data}/>
        )
    }
    else
        return <div/>

})

const Question = forwardRef((props, ref) => {

    const questionRef = useRef()

    //console.log(props.data)

    useImperativeHandle(ref, () => ({
        isValid() {
            return questionRef.current.isValid()
        },
        getVerdict() {
            return questionRef.current.getVerdict()
        }
    }));

    //console.log(props.data)

    if (props.data.data.type === 'mcq')
        return (
            <MCQ ref={questionRef} data={props.data.data}/>
        )
    else if (props.data.data.type === 'text')
        return (
            <Text ref={questionRef} data={props.data.data}/>
        )
    else
        return <div/>
})


export default Problem;
