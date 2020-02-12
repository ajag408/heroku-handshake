
import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import handshake from '../images/handshake.png';
import sjsu from '../images/sjsu.jpg';


const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  homeBackground: {
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      "blue",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  iconImg: {
    height: "100px",
    width: "100px",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  homeTitle: {
    color: "white",
    fontWeight: "bold",
    paddingLeft: '15%',
    fontType: "Suisse Int'l",
  },

  homeLink: {
    color:"gold",
  },

  sjsu: {
    paddingLeft: "45%",
  }
}));

export default function Home() {
  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.homeBackground} >
        <img className = {classes.iconImg} src = {handshake}/>
        <h1 className={classes.homeTitle}>Get the Job done .</h1>
        <br></br><br></br><br></br>
        <h3 className={classes.homeTitle}>Students</h3>
        <h5 className={classes.homeTitle}>Launch the next step in your career. <a className = {classes.homeLink} href = "/#">Sign in.</a> <a className = {classes.homeLink} href = "/signup">Sign up.</a></h5>
        <br></br><br></br>
        <h3 className={classes.homeTitle}>Companies</h3>
        <h5 className={classes.homeTitle}>Hire the next generation of talent. <a className = {classes.homeLink} href = "/#">Sign in.</a> <a className = {classes.homeLink} href = "/#">Sign up.</a></h5>
      </Grid>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
            <Grid container>
              <Grid item>
              <img className = {classes.sjsu} src = {sjsu}/>
              </Grid>
            </Grid>
      </div>
    </Grid>
    </Grid>
  );
}