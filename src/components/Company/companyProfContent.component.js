import React from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardActions,
  CardContent,
  Avatar,
  Typography,
  Divider,
  Button,
  LinearProgress,
  TextField
} from '@material-ui/core';


const styles = theme => ({
    root: {
        padding: theme.spacing(4)
    },
      details: {
        display: 'flex'
      },
      avatar: {
        marginLeft: 'auto',
        height: 110,
        width: 100,
        flexShrink: 0,
        flexGrow: 0
      },
      progress: {
        marginTop: theme.spacing(2)
      },
      uploadButton: {
        marginRight: theme.spacing(2)
      },
      paper: {
        maxWidth: '80%',
        margin: 'auto',
        marginLeft: '15%',
        marginRight: '5%',
        overflow: 'hidden',
      },
      contentWrapper: {
        margin: '40px 16px',
      }

});

function Content(props) {
    const { className, ...rest } = props;
    const { classes } = props;
    const user = {
        name: 'Shen Zhi',
        city: 'Los Angeles',
        country: 'USA',
        timezone: 'GTM-7',
        avatar: '/images/avatars/avatar_11.png'
      };

      const [values, setValues] = React.useState({
        firstName: 'Shen',
        lastName: 'Zhi',
        email: 'shen.zhi@devias.io',
        phone: '',
        state: 'Alabama',
        country: 'USA'
      });

      const handleChange = event => {
        setValues({
          ...values,
          [event.target.name]: event.target.value
        });
      };

      const states = [
        {
          value: 'alabama',
          label: 'Alabama'
        },
        {
          value: 'new-york',
          label: 'New York'
        },
        {
          value: 'san-francisco',
          label: 'San Francisco'
        }
      ];
  return (
    <Paper className={classes.paper}>

        <div className={classes.contentWrapper}>
    <div className={classes.root}>
      <Grid
        container
        spacing={4}
      >
        <Grid
          item
          lg={4}
          md={6}
          xl={4}
          xs={12}
        >
                <Card
                {...rest}
                className={clsx(classes.root, className)}
                >
                <CardContent>
                    <div className={classes.details}>
                    <div>
                        <Typography
                        gutterBottom
                        variant="h2"
                        >
                        John Doe
                        </Typography>
                        <Typography
                        className={classes.locationText}
                        color="textSecondary"
                        variant="body1"
                        >
                        {user.city}, {user.country}
                        </Typography>
                        <Typography
                        className={classes.dateText}
                        color="textSecondary"
                        variant="body1"
                        >
                        {moment().format('hh:mm A')} ({user.timezone})
                        </Typography>
                    </div>
                    <Avatar
                        className={classes.avatar}
                        src={user.avatar}
                    />
                    </div>
                    <div className={classes.progress}>
                    <Typography variant="body1">Profile Completeness: 70%</Typography>
                    <LinearProgress
                        value={70}
                        variant="determinate"
                    />
                    </div>
                </CardContent>
                <Divider />
                <CardActions>
                    <Button
                    className={classes.uploadButton}
                    color="primary"
                    variant="text"
                    >
                    Upload picture
                    </Button>
                    <Button variant="text">Remove picture</Button>
                </CardActions>
                </Card>
        </Grid>
        <Grid
          item
          lg={8}
          md={6}
          xl={8}
          xs={12}
        >
                    <Card
                    {...rest}
                    className={clsx(classes.root, className)}
                    >
                    <form
                        autoComplete="off"
                        noValidate
                    >
                        <CardHeader
                        subheader="The information can be edited"
                        title="Profile"
                        />
                        <Divider />
                        <CardContent>
                        <Grid
                            container
                            spacing={3}
                        >
                            <Grid
                            item
                            md={6}
                            xs={12}
                            >
                            <TextField
                                fullWidth
                                helperText="Please specify the first name"
                                label="First name"
                                margin="dense"
                                name="firstName"
                                onChange={handleChange}
                                required
                                value={values.firstName}
                                variant="outlined"
                            />
                            </Grid>
                            <Grid
                            item
                            md={6}
                            xs={12}
                            >
                            <TextField
                                fullWidth
                                label="Last name"
                                margin="dense"
                                name="lastName"
                                onChange={handleChange}
                                required
                                value={values.lastName}
                                variant="outlined"
                            />
                            </Grid>
                            <Grid
                            item
                            md={6}
                            xs={12}
                            >
                            <TextField
                                fullWidth
                                label="Email Address"
                                margin="dense"
                                name="email"
                                onChange={handleChange}
                                required
                                value={values.email}
                                variant="outlined"
                            />
                            </Grid>
                            <Grid
                            item
                            md={6}
                            xs={12}
                            >
                            <TextField
                                fullWidth
                                label="Phone Number"
                                margin="dense"
                                name="phone"
                                onChange={handleChange}
                                type="number"
                                value={values.phone}
                                variant="outlined"
                            />
                            </Grid>
                            <Grid
                            item
                            md={6}
                            xs={12}
                            >
                            <TextField
                                fullWidth
                                label="Select State"
                                margin="dense"
                                name="state"
                                onChange={handleChange}
                                required
                                select
                                // eslint-disable-next-line react/jsx-sort-props
                                SelectProps={{ native: true }}
                                value={values.state}
                                variant="outlined"
                            >
                                {states.map(option => (
                                <option
                                    key={option.value}
                                    value={option.value}
                                >
                                    {option.label}
                                </option>
                                ))}
                            </TextField>
                            </Grid>
                            <Grid
                            item
                            md={6}
                            xs={12}
                            >
                            <TextField
                                fullWidth
                                label="Country"
                                margin="dense"
                                name="country"
                                onChange={handleChange}
                                required
                                value={values.country}
                                variant="outlined"
                            />
                            </Grid>
                        </Grid>
                        </CardContent>
                        <Divider />
                        <CardActions>
                        <Button
                            color="primary"
                            variant="contained"
                        >
                            Save details
                        </Button>
                        </CardActions>
                    </form>
                    </Card>
        </Grid>
      </Grid>
    </div>
    </div>
    </Paper>
  );
};

Content.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Content);
