import React,{useEffect,useState} from 'react'
import {logout} from '../action/auth'
import {fetchProfile} from '../action/profile'
import {useSelector,useDispatch} from 'react-redux'
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {BrowserRouter,Route, Switch,Link } from 'react-router-dom';
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
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import './Home.css'
import Topics from './Topics'
import Serieses from './Serieses'
import ProblemContainer from './ProblemContainer'
import { createBrowserHistory } from "history";
import { useHistory } from "react-router-dom";

import CardActionArea from "@material-ui/core/CardActionArea";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import {fetchErroredProblems} from "../action/content";
import ErrorList from "./ErrorList";
import Chip from "@material-ui/core/Chip";
import FaceIcon from "@material-ui/icons/Face";




const drawerWidth = 260;


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
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
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

const Home=props=>{

  const history=useHistory()

  const profile=useSelector(state=>state.profile)

  const dispatch=useDispatch()

  const logoutClick=event=>{
    logout(dispatch)
  }

  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const container = window !== undefined ? () => window().document.body : undefined;


  const goTo=(seriesId,problemSerial)=>{
    history.push(`/series/${seriesId}/${problemSerial}/`)
  }

  const drawer = (
    <div style={{padding:'10px'}}>

          <ErrorList history={history}  style={{marginRight:'20px'}}/>

    </div>
  );

  useEffect(() => {
    getProfile()
  }, []);


  useEffect(()=>{
    if(profile!==null)
      fetchErroredProblems(dispatch,{
        user_id:profile.user_id
      })
      //console.log(profile)
  },[profile])

  const getProfile=()=>{
    fetchProfile(dispatch)
  }

  return(
      <BrowserRouter history={history}>
    <div className={classes.root}>
      <CssBaseline />
      <AppBar style={{backgroundColor:'#ffffff',color:'#0090ff',boxShadow:'none'}} position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>

          <img src={require('../assets/icons/logo.png')} style={{height:'36px'}}/>
          <Typography variant="h6" noWrap>
            Interact
          </Typography>
          {
            profile!==null?(
                <div  style={{position:'absolute',right:'20px',display:'flex'}}>

                  <Avatar onClick={logoutClick} src={profile.image}>
                    A
                  </Avatar>
                </div>

            ):(
                <div/>
            )
          }

        </Toolbar>
        <Divider/>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Route>
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
          </Route>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {
          profile!=null?(

              <Grid container spacing={1}>
                  <Route path = "/" exact component={Redirect}/>
                  <Route path="/lang/:lang/level/:level" exact  component={Topics}/>
                  <Route path="/lang/:lang/level/:level/topic/:id" exact component={Serieses}/>
                  <Route path="/lang/:lang/level/:level/series/:series_id/problem/:serial" exact component={ProblemContainer}/>


              </Grid>

          ):(
            <div/>
          )
        }
      </main>
    </div>
      </BrowserRouter>
  )
}

const Redirect=props=>{

  useEffect(()=>{
    props.history.push('/lang/en/level/3/')
  },[])

  return(
      <div/>
  )
}



export default Home;
