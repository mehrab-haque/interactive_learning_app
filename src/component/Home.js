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
import CardActionArea from "@material-ui/core/CardActionArea";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";


const history = createBrowserHistory();
const drawerWidth = 240;


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

  const drawer = (
    <div>


      {profile==null?(
        <LinearProgress />
      ):(<div>
        <div style={{marginBottom:'-40px'}} className={classes.toolbar} />
          <center>
            <Avatar className={classes.orange} src={profile.image} style={{marginBottom:'20px',marginTop:'-20px',height:'80px',width:'80px'}} >{'name' in profile ? profile.name.substr(0,1):'N'}</Avatar>
            <Typography variant="h6" noWrap>
              <font style={{color:'#666666'}}>
              {profile.name}
              </font>
            </Typography>

            <Divider style={{marginTop:'20px'}}/>

            <img style={{width:'100%'}} src={require('../assets/icons/graph1.png')}/>
            <img style={{width:'100%'}} src={require('../assets/icons/graph2.png')}/>

            <Divider style={{marginTop:'20px'}}/>
            <Button onClick={logoutClick} style={{marginTop:'20px'}} variant="outlined" color="primary" >
              Logout
            </Button>


          </center>


        </div>
      )}


    </div>
  );

  useEffect(() => {
      getProfile()
  }, []);

  const getProfile=()=>{
    fetchProfile(dispatch)
  }

  return(
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
            Interactive Problems
          </Typography>
        </Toolbar>
        <Divider/>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
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
              <BrowserRouter history={history}>
                <Switch>
                  <Route path="/" exact component={Topics}/>
                  <Route path="/topic/:id" component={Serieses}/>}/>
                  <Route path="/series/:series_id/:serial" component={ProblemContainer}/>}/>
                </Switch>
              </BrowserRouter>
              <Grid item xs={12} md={4}>
                <Card className={classes.root}>
                  <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image={require('../assets/icons/pr.png')}
                        title="Contemplative Reptile"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">

                        <div>Start your journey</div>

                      </Typography>

                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            </Grid>
          ):(
            <div/>
          )
        }
      </main>
    </div>
  )
}

export default Home;
