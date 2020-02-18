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
                        {props.state.name}
                        </Typography>
                        <Typography
                        className={classes.locationText}
                        color="textSecondary"
                        variant="body1"
                        >
                        {props.state.loc}
                
                        </Typography>
                        <br></br>
                        <Typography
                        className={classes.dateText}
                        color="textSecondary"
                        variant="body1"
                        >
                        {props.state.description}
                        </Typography>
                    </div>
                    <Avatar
                        className={classes.avatar}
                        src={props.state.profPic}
                    />
                    </div>
                </CardContent>
                <Divider />
                <CardActions>
                
                    <Button
                    className={classes.uploadButton}
                    color="primary"
                    variant="contained"
                    component = "label"
                    >
                    Upload picture
                    <input
                        type="file"
                        style={{ display: "none" }}
                    />
                    </Button>
              
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
                                label="Name"
                                margin="dense"
                                name="name"
                                onChange={props.onChangeName}
                                required
                                value={props.state.name}
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
                                label="Location"
                                margin="dense"
                                name="location"
                                onChange={props.onChangeLoc}
                                value={props.state.loc}
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
                                onChange={props.onChangeCompanyEmail}
                                required
                                value={props.state.email}
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
                                onChange={props.onChangeCompanyPhone}
                                type="number"
                                value={props.state.phone}
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
                                label="Description"
                                margin="dense"
                                name="description"
                                multiline
                                rows={15}
                                style = {{width: 300}}
                                onChange={props.onChangeDescription}
                                // eslint-disable-next-line react/jsx-sort-props
                                SelectProps={{ native: true }}
                                value={props.state.description}
                                variant="outlined"
                            >
                            </TextField>
                            </Grid>
                            <Grid
                            item
                            md={6}
                            xs={12}
                            >
                            
                            </Grid>
                        </Grid>
                        </CardContent>
                        <Divider />
                        <CardActions>
                        <Button
                            color="primary"
                            variant="contained"
                            onClick = {props.onSubmit}
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
