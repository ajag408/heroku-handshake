
import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import handshake from '../images/handshake.png';
import sjsu from '../images/sjsu.jpg';


const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  homeBackground: {
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      'blue',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  iconImg: {
    height: '100px',
    width: '100px',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  homeTitle: {
    color: 'white',
    fontWeight: 'bold',
    paddingLeft: '15%',
    fontType: "Suisse Int'l",
  },

  homeLink: {
    color: 'gold',
  },

  sjsu: {
    paddingLeft: '45%',
  },
}));

export default function Home() {
  const classes = useStyles();

  axios.get('/companies/user')
    .then((res) => {
      if (res.data.isCompany) {
        window.location.href = '/company/landing';
      }
    });

  axios.get('/students/user')
    .then((res) => {
      console.log(res.data);
      if (res.data.isStudent) {
        window.location.href = '/student/landing';
      }
    });
  return (

    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.homeBackground}>
        <img className={classes.iconImg} src={handshake} alt="" />
        <h1 className={classes.homeTitle}>Get the Job done .</h1>
        <br />
        <br />
        <br />
        <h3 className={classes.homeTitle}>Students</h3>
        <h5 className={classes.homeTitle}>
          Launch the next step in your career.{' '}
          <a className={classes.homeLink} href="/student-signin">Sign in.</a>
          {' '}
          <a className={classes.homeLink} href="/signup-student">Sign up.</a>
        </h5>
        <br />
        <br />
        <h3 className={classes.homeTitle}>Companies</h3>
        <h5 className={classes.homeTitle}>
          Hire the next generation of talent.{' '}
          <a className={classes.homeLink} href="/company-signin">Sign in.</a>
          {' '}
          <a className={classes.homeLink} href="/signup-company">Sign up.</a>
        </h5>
      </Grid>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Grid container>
            <Grid item>
              <img className={classes.sjsu} src={sjsu} alt="" />
            </Grid>
          </Grid>
        </div>
      </Grid>
    </Grid>
  );
}
