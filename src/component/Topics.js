import React,{useEffect,useState} from 'react'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import {useSelector,useDispatch} from 'react-redux'
import Grid from '@material-ui/core/Grid';
import { BrowserRouter, Route, Switch,Link } from 'react-router-dom';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Circle } from 'rc-progress';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import Toolbar from '@material-ui/core/Toolbar';
import ShareIcon from '@material-ui/icons/Share';
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {fetchTopics} from '../action/content'
import uuid from 'react-uuid'
import {createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

const myTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#55b5ff',
    }
  }
})

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
    paddingTop: '100%', // 16:9
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



const Topics=props=>{

  const lang=props.match.params.lang;
  const level=props.match.params.level;

  const topics=useSelector(state=>state.topics)
  const dispatch=useDispatch()

  const classes = useStyles();
  useEffect(() => {
    getTopics()
  },[level]);

  const getTopics=()=>{
      fetchTopics(dispatch,lang,level)
  }

  return(
    <Grid item xs={12}>
      {
        topics==null?(
            <MuiThemeProvider theme={myTheme}>
              <LinearProgress color="primary"/>
            </MuiThemeProvider>
        ):(
          <div>
            <Breadcrumbs style={{marginLeft:'16px',marginBottom:'12px'}} separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
              <Link color="inherit" to={'/lang/'+lang+"/level/"+level+'/'} >
                <font style={{color:'#888888'}}>
                Topics
                </font>
              </Link>
            </Breadcrumbs>
            <Grid direction='row' alignItems="stretch" container spacing={1} className={classes.grid}>
              {
                topics.map((topic,ind)=>{
                  return(
                    <Grid key={uuid()} style={{minHeight:'100%'}} item xs={6} md={2}>
                      <Link color="inherit" to={'/lang/'+lang+"/level/"+level+'/topic/'+topic.topic_id+'/'} onClick={(e) => {e.stopPropagation();}}>
                        <Card className={classes.root1}>
                          <CardActionArea>
                            <img src={topic.logo} style={{width:'100%',padding:'20%',marginBottom:'-20%'}}/>
                            <CardContent>
                              <Typography gutterBottom variant="h5" component="h2">
                                {topic.name}
                              </Typography>
                              <Typography variant="body2" color="textSecondary" component="p">
                                {topic.nseries} Series<br/>
                                {topic.nproblem} Problems<br/>
                              </Typography>
                            </CardContent>

                          </CardActionArea>
                        </Card>
                      </Link>
                    </Grid>
                  )
                })
              }


              </Grid>
            </div>
        )
      }


    </Grid>
  )
  
}


export default Topics
