import React from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';

import Moment from 'react-moment';
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
    const [treeExpanded, treeSetExpanded] = React.useState([]);
    const handleChange = (event, nodes) => {
      treeSetExpanded(nodes);
    };
    var i = -1;
    const [cardExpandedID, cardSetExpandedID] = React.useState(-1);
    const handleExpandClick = i => {
      cardSetExpandedID(cardExpandedID == i ? -1: i);
    };
  

  return (
    <Paper className={classes.paper}>

        <div className={classes.contentWrapper}>
    <div className={classes.root}>
      <Grid
        container
        spacing={4}
      >
        <Grid
        //   item
        //   lg={4}
        //   md={6}
        //   xl={4}
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
                        {props.state.city}, {props.state.state}, {props.state.country}
                
                        </Typography>
                        <br></br>
                        <Typography
                        className={classes.dateText}
                        color="textSecondary"
                        variant="body1"
                        >
                        {props.state.careerObjective}
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
                    // onClick = {props.onUpload}
                    color="primary"
                    variant="contained"
                    component = "label"
                    >
                    Upload picture
                    <input
                        type="file"
                        id ="INPUT_TAG"
                        style={{ display: "none" }}
                        onChange = {props.onUpload}
                        required
                    />
                    </Button>
              
                </CardActions>
                </Card>
        </Grid>
        <TreeView
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      expanded={treeExpanded}
      onNodeToggle={handleChange}
     >
         <br></br><br></br>
      <TreeItem nodeId = "1" label = "View/Update Basic Details">
        <Grid
        //   item
        //   lg={8}
        //   md={6}
        //   xl={8}
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
                            Date of Birth
                            <TextField
                                fullWidth
                                // label="Date of Birth"
                                type="date"
                                margin="dense"
                                name="dob"
                                onChange={props.onChangeDob}
                                value={props.state.dob}
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
                                label="City"
                               
                                margin="dense"
                                name="city"
                                onChange={props.onChangeCity}
                                value={props.state.city}
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
                                label="State"
                                margin="dense"
                                name="state"
                                onChange={props.onChangeState}
                                value={props.state.state}
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
                                label="Country"
                                margin="dense"
                                name="country"
                                onChange={props.onChangeCountry}
                                value={props.state.country}
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
                                onChange={props.onChangeStudentEmail}
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
                                onChange={props.onChangeStudentPhone}
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
                                label="Career Objective"
                                margin="dense"
                                name="careerObjective"
                                multiline
                                rows={15}
                                style = {{width: 300}}
                                onChange={props.onChangeCareerObjective}
                                // eslint-disable-next-line react/jsx-sort-props
                                SelectProps={{ native: true }}
                                value={props.state.careerObjective}
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
        </TreeItem>
        <br></br><br></br>
        <TreeItem nodeId = "2" label = "View Education">
        <Grid
        //   item
        //   lg={8}
        //   md={6}
        //   xl={8}
          xs={12}
        >
            {props.state.education.map((education, i) => (
                <Card>
                <CardHeader
                
                    title = {education.collegeName}
                    subheader = {education.loc}
                />
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                    Degree: {education.degree} &nbsp;&nbsp;&nbsp;   Major: {education.major} <br></br><br></br>  
                     Graduation Year: {education.gradYear} <br></br><br></br>
                     GPA: {education.gpa} <br></br><br></br>

                    
                    </Typography>
                </CardContent>
                </Card>
            ))}
        </Grid>
        </TreeItem>
        <br></br><br></br>
        <TreeItem nodeId = "3" label = "Add Education">
        <Grid
        //   item
        //   lg={8}
        //   md={6}
        //   xl={8}
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
                        title="Education"
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
                                label="College Name"
                                margin="dense"
                                name="name"
                                onChange={props.onChangeCollegeName}
                                required
                                value={props.state.collegeName}
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
                                onChange={props.onChangeEducationLocation}
                                value={props.state.educationLocation}
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
                                label="Degree"
                               
                                margin="dense"
                                name="degree"
                                onChange={props.onChangeDegree}
                                value={props.state.degree}
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
                                label="Major"
                                margin="dense"
                                name="major"
                                onChange={props.onChangeMajor}
                                value={props.state.major}
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
                                label="Graduation Year"
                                margin="dense"
                                name="Graduation Year"
                                onChange={props.onChangeGradYear}
                                value={props.state.gradYear}
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
                                label="Cumulative GPA"
                                margin="dense"
                                name="gpa"
                                onChange={props.onChangeGPA}
                                required
                                value={props.state.gpa}
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
                            onClick = {props.onSubmitEducation}
                        >
                            Add
                        </Button>
                        </CardActions>
                    </form>
                    </Card>
        </Grid>
        </TreeItem>
        <br></br><br></br>
        <TreeItem nodeId = "4" label = "View Experience">
        <Grid
        //   item
        //   lg={8}
        //   md={6}
        //   xl={8}
          xs={12}
        >
            {props.state.experience.map((experience, i) => (
                <Card>
                <CardHeader
                
                    title = {experience.companyName}
                    subheader = {experience.title}
                />
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                    Location: {experience.loc} &nbsp;&nbsp;&nbsp;   Start Date: {experience.startDate} <br></br><br></br>  
                     End Date: {experience.endDate} <br></br><br></br>
                     Work Description: {experience.description} <br></br><br></br>

                    
                    </Typography>
                </CardContent>
                </Card>
            ))}
        </Grid>
        </TreeItem>
        <br></br><br></br>
        <TreeItem nodeId = "5" label = "Add Experience">
        <Grid
        //   item
        //   lg={8}
        //   md={6}
        //   xl={8}
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
                        title="Experience"
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
                                label="Company Name"
                                margin="dense"
                                name="name"
                                onChange={props.onChangeCompanyName}
                                required
                                value={props.state.companyName}
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
                                label="Title"
                               
                                margin="dense"
                                name="title"
                                onChange={props.onChangeJobTitle}
                                value={props.state.jobTitle}
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
                                onChange={props.onChangeJobLocation}
                                value={props.state.jobLocation}
                                variant="outlined"
                            />
                          </Grid>
                          <Grid
                            item
                            md={6}
                            xs={12}
                            >
                                Start Date: 
                           <TextField
                                fullWidth
                                // label="Start Date"
                                type = 'date'
                                margin="dense"
                                name="startDate"
                                onChange={props.onChangeStartDate}
                                value={props.state.stDate}
                                variant="outlined"
                            />
                         </Grid>
                            <Grid
                            item
                            md={6}
                            xs={12}
                            >
                                End Date
                            <TextField
                                fullWidth
                                // label="Graduation Year"
                                margin="dense"
                                name="endDate"
                                type = "date"
                                onChange={props.onChangeEndDate}
                                value={props.state.endDate}
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
                                label="Work Description"
                                margin="dense"
                                name="description"
                                onChange={props.onChangeWorkDescription}
                                multiline
                                rows={15}
                                style = {{width: 300}}
                                value={props.state.workDescription}
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
                            onClick = {props.onSubmitExperience}
                        >
                            Add 
                        </Button>
                        </CardActions>
                    </form>
                    </Card>
        </Grid>
        </TreeItem>
        <br></br><br></br>
      <TreeItem nodeId = "6" label = "View/Update Skillset">
        <Grid
        //   item
        //   lg={8}
        //   md={6}
        //   xl={8}
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
                        title="Skillset"
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
                                label="Skillset"
                                margin="dense"
                                name="skillset"
                                multiline
                                rows={15}
                                style = {{width: 300}}
                                onChange={props.onChangeSkillset}
                                required
                                value={props.state.skillset}
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
                            onClick = {props.onSubmitSkillset}
                        >
                            Save skills
                        </Button>
                        </CardActions>
                    </form>
                    </Card>
        </Grid>
        </TreeItem>
        <br></br><br></br>
        </TreeView>
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
