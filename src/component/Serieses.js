import React,{useEffect,useState} from 'react'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import { BrowserRouter, Route, Switch,Link } from 'react-router-dom';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Circle,Line } from 'rc-progress';
import ProgressBar from 'react-animated-progress-bar';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {useSelector,useDispatch} from 'react-redux'
import {fetchSerieses} from '../action/content'
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
  }
}));

const Serieses=props=>{
  const topicID=props.match.params.id
  const classes = useStyles();
  const serieses=useSelector(state=>state.serieses)
  const dispatch=useDispatch()


  useEffect(() => {
    ////////console.log(props.profile)
      /*firebase.firestore().collection('data').where('type','==','series').where('topic_id','==',topicID).orderBy("serial").get().then(res=>{
        setSerieses(res.docs)
        count(res.docs.length)
      })*/
    getSerieses()
  },[]);

  const getSerieses=()=>{
    //if(serieses==null)
      fetchSerieses(dispatch,topicID)
  }

  return(
    <Grid item xs={12} md={9}>
      {
        serieses==null?(
          <LinearProgress />
        ):(
          <div>
            <Breadcrumbs style={{marginLeft:'16px',marginBottom:'12px'}} separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
              <Link color="inherit" to="/" >
                <font style={{color:'#888888'}}>
                Topics
                </font>
              </Link>
              <Link color="inherit" to={'/topic/'+topicID+'/'}>
                <font style={{color:'#888888'}}>
                {serieses[0].topic_name}
                </font>
              </Link>
            </Breadcrumbs>
            <Grid direction='row' alignItems="stretch" container spacing={1} className={classes.grid}>

              {
                serieses.map((series,ind)=>{
                  return(
                    <Grid style={{minHeight:'100%'}} item xs={6} md={4}>
                      <Link color="inherit" to={'/series/'+series.series_id+'/1'}>
                        <Card style={{height:'100%'}} className={classes.root1}>
                          <CardActionArea>
                            <CardMedia
                              className={classes.media}
                              image={series.logo}
                              title="Contemplative Reptile"
                            />
                            <CardContent>
                              <Typography gutterBottom variant="h5" component="h2">
                                {series.name}
                              </Typography>
                              <Typography variant="body2" color="textSecondary" component="p">
                                {series.topic_name}<br/>
                                {series.nproblem} Problems<br/>

                              </Typography>
                              <div style={{marginTop:'10px'}}><ProgressBar

                                height="20px"
                                rect
                                fontColor="#0090ff"
                                percentage="40"
                                rectPadding="0px"
                                fontSize="0em"
                                trackPathColor="#D5D5D5"
                                bgColor="transparent"
                                trackBorderColor="transparent"
                                defColor={{
                                  fair: '#0090ff',
                                  good: '#0090ff',
                                  excellent: '#0090ff',
                                  poor: '#0090ff',
                                }}
                              /></div>

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

export default Serieses
