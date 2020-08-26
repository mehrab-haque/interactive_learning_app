import React, {useRef,useState,useEffect} from 'react'
import LockIcon from '@material-ui/icons/Lock';
import GoogleLogin from 'react-google-login'
import Divider from '@material-ui/core/Divider';
import LinearProgress from '@material-ui/core/LinearProgress';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import PhoneIcon from '@material-ui/icons/Phone';
import Dialog from '@material-ui/core/Dialog';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Snackbar from '@material-ui/core/Snackbar';
import { makeStyles,withStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {checkAuth,googleAuth,login,register} from './action/auth'
import {useSelector,useDispatch} from 'react-redux'
import Home from './component/Home'
import uuid from 'react-uuid'

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  }
}));

function App() {

  const isAuth=useSelector(state=>state.isLogged)
  const dispatch=useDispatch()

  const classes = useStyles();

  const phoneRef=useRef();
  const passRef=useRef();
  const nameRef=useRef();
  const repassRef=useRef();


  const [loading,setLoading]=useState(true)
  const [notification,setNotification]=useState(false)
  const [message,setMessage]=useState('')
  const [dialogState,setDialogState]=useState(1)

  const notify=message=>{
    setMessage(message)
    setNotification(true)
  }

  useEffect(() => {
      checkAuth(dispatch)
      //loginRedux(dispatch)

  }, []);


  const google=res=>{
    console.log(res)
    if(res.accessToken!=undefined)
      googleAuth({access_token:res.accessToken},dispatch)
  }


  const loginClick=()=>{
    //setLoading(true)
    var phone=phoneRef.current.value
    var pass=passRef.current.value

    if(phone.trim().length!=11)
      notify('Please enter a valid phone number')
    else if(pass.length<6)
      notify('Password must contain at least 6 characters')
    else
      login({
        phone:phone,
        password:pass
      },dispatch,notify)
    //notify(passRef.current.value)
    /*firebase.auth().signInWithEmailAndPassword(emailRef.current.value,passRef.current.value ).then(res=>{
      setLoading(false)
    }).catch(error=> {
      setLoading(false)
      notify(error.message)
    });*/
  }

  const registerClick=()=>{
    //setLoading(true)
    var name=nameRef.current.value
    var phone=phoneRef.current.value
    var pass=passRef.current.value
    var repass=repassRef.current.value

    if(name.trim().length==0)
      notify('Please enter a valid name')
    else if(phone.trim().length!=11)
      notify('Please enter a valid phone number')
    else if(pass.length<6)
      notify('Password must contain at least 6 characters')
    else if (pass!=repass)
      notify('Retype password correctly')
    else
      register({
        name:name.trim(),
        phone:phone,
        password:pass
      },dispatch,notify)
    //notify(passRef.current.value)
    /*firebase.auth().signInWithEmailAndPassword(emailRef.current.value,passRef.current.value ).then(res=>{
      setLoading(false)
    }).catch(error=> {
      setLoading(false)
      notify(error.message)
    });*/
  }

  if(isAuth==1)
    return(
      <Home/>
    )
  else
    return(
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={notification}
          onClose={()=>{setNotification(false)}}
          autoHideDuration={4000}
          message={message}
        />
        <Dialog open={true} aria-labelledby="form-dialog-title">
          {
              isAuth==0?(
                <LinearProgress />
              ):(
                <div/>
              )
          }
            <DialogTitle id="form-dialog-title">
              {
                dialogState==1?(<div>Register</div>):(<div>Login</div>)
              }
            </DialogTitle>
            <DialogContent >
            {
              dialogState==1?(
                <div ><TextField

                  inputRef={nameRef}
                  style={{marginTop:'8px'}}

                  margin="dense"
                  label="Name"
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircleIcon color='primary'/>
                      </InputAdornment>
                    ),
                    style: {
                       padding: 2
                     }
                  }}
                /><br/></div>
              ):(
                <div/>
              )
            }
              <TextField

                inputRef={phoneRef}
                style={{marginTop:'8px'}}
                margin="dense"
                label="Phone"
                type="tel"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneIcon color='primary'/>
                    </InputAdornment>
                  ),
                  style: {
                     padding: 2
                   }
                }}
              /><br/>

              <TextField

                inputRef={passRef}
                style={{marginTop:'8px'}}
                margin="dense"
                label="Password"
                type="password"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon color='primary'/>
                    </InputAdornment>
                  ),
                  style: {
                     padding: 2
                   }
                }}
              /><br/>

              {
                dialogState==1?(
                  <TextField

                    inputRef={repassRef}
                    style={{marginTop:'8px'}}
                    margin="dense"
                    label="Retype Password"
                    type="password"
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockOpenIcon color='primary'/>
                        </InputAdornment>
                      ),
                      style: {
                         padding: 2
                       }
                    }}
                  />
                ):(
                  <div/>
                )
              }

              <Divider style={{marginTop:'5px'}}/>

              {
                dialogState==1?(
                  <div>
                  <center><Button   style={{marginTop:'8px'}} variant="outlined" color="primary" onClick={registerClick}>
                    Register
                  </Button></center>
                    <center style={{marginTop:'8px'}}>or Already Have An Account ?</center>
                    <center><Button  onClick={()=>{setDialogState(2)}} style={{marginTop:'8px',marginBottom:'8px'}} variant="outlined" color="secondary" >
                      Login to existing account
                    </Button></center>
                  </div>
                ):(
                  <div>
                  <center><Button   style={{marginTop:'8px'}} variant="outlined" color="primary" onClick={loginClick} >
                    Login
                  </Button></center>
                    <center style={{marginTop:'8px'}}>or Need An Account ?</center>
                    <center><Button  onClick={()=>{setDialogState(1)}} style={{marginTop:'8px',marginBottom:'8px'}} variant="outlined" color="secondary" >
                      Create A New Account
                    </Button></center>
                  </div>
                )
              }

                <Divider style={{marginBottom:'5px',marginTop:'5px'}}/>

                <center><GoogleLogin

                  clientId="384400786106-ep0igg2mrvq1f3vkvavpdlt7pkcp3d34.apps.googleusercontent.com"
                  buttonText="Sign in using google"
                  onSuccess={google}
                  onFailure={google}
                  cookiePolicy={'single_host_origin'}
                /></center>

            </DialogContent>

          </Dialog>

        </div>
    )
}

export default App;
