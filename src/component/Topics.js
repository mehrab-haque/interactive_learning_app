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
import Hidden from '@material-ui/core/Hidden';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import Toolbar from '@material-ui/core/Toolbar';
import Collapse from '@material-ui/core/Collapse';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {fetchTopics} from '../action/content'
import uuid from 'react-uuid'

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
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}));

const Topics=props=>{

  const topics=useSelector(state=>state.topics)
  const dispatch=useDispatch()

  const [expanded, setExpanded] = useState(0);
  const handleExpandClick = pos => {
    setExpanded(pos);
  };

  const classes = useStyles();
  useEffect(() => {
    getTopics()
  },[]);

  const getTopics=()=>{
    if(topics==null)
      fetchTopics(dispatch)
  }

  return(
    <Grid item xs={12} md={8}>
      {
        topics==null?(
          <LinearProgress />
        ):(
          <div>
            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
              <Link color="inherit" to="/" >
                Topics
              </Link>
            </Breadcrumbs><br/>
            <Grid direction='row' alignItems="stretch" container spacing={1} className={classes.grid}>
              {
                topics.map((topic,ind)=>{
                  return(
                    <Grid key={uuid()} style={{minHeight:'100%'}} item xs={6} md={4}>
                      <Link color="inherit" to={'/topic/'+topic.topic_id+'/'} onClick={(e) => {e.stopPropagation();}}>
                        <Card className={classes.root1}>
                          <CardActionArea>
                            <CardMedia
                              className={classes.media}
                              image={topic.logo}
                              title="Contemplative Reptile"
                            />
                            <CardContent>
                              <Typography gutterBottom variant="h5" component="h2">
                                {topic.name}
                              </Typography>
                              <Typography variant="body2" color="textSecondary" component="p">
                                {topic.nseries} Serieses<br/>
                                {topic.nproblem} Problems<br/>
                              </Typography>
                            </CardContent>
                            <CardActions disableSpacing>
                              <IconButton
                                className={clsx(classes.expand, {
                                  [classes.expandOpen]: expanded==ind+1,
                                })}
                                onClick={(e) => {e.preventDefault(); if(expanded==0)setExpanded(ind+1); else setExpanded(0);}}
                                aria-expanded={expanded==ind+1}
                                aria-label="show more"
                                >
                                <ExpandMoreIcon />
                              </IconButton>
                            </CardActions>
                            <Collapse in={expanded==ind+1} timeout="auto" unmountOnExit>
                              <CardContent>
                                <Typography variant='body2'>
                                  {topic.description}
                                </Typography>
                              </CardContent>
                            </Collapse>
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
