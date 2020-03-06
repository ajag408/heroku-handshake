import React from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import Paper from '@material-ui/core/Paper';

import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';


import {
  Card,
  CardHeader,
  CardActions,
  CardContent,
  Avatar,
  Typography,
  Divider,
  Button,
  TextField,
} from '@material-ui/core';


const styles = (theme) => ({
  root: {
    padding: theme.spacing(4),
  },
  details: {
    display: 'flex',
  },
  avatar: {
    marginLeft: 'auto',
    height: 110,
    width: 100,
    flexShrink: 0,
    flexGrow: 0,
  },
  progress: {
    marginTop: theme.spacing(2),
  },
  uploadButton: {
    marginRight: theme.spacing(2),
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
  },

});

function Content(props) {
  const { className, ...rest } = props;
  const {
    classes, state, onUpload, onChangeName,
    onChangeDob, onChangeCity, onChangeState,
    onChangeCountry, onChangeStudentEmail, onChangeStudentPhone,
    onChangeCareerObjective, onSubmit, onChangeCollegeName,
    onChangeEducationLocation,
    onChangeDegree,
    onChangeMajor,
    onChangeGPA,
    onChangeGradYear,
    onSubmitEducation,
    onChangeCompanyName,
    onChangeJobLocation,
    onChangeJobTitle,
    onChangeStartDate,
    onChangeEndDate,
    onChangeWorkDescription,
    onChangeSkillset,
    onSubmitSkillset,
    onSubmitExperience,

  } = props;
  const {
    name, city, state: countryState, country, careerObjective,
    profPic, dob, email, phone, education: pastEdu,

    collegeName, educationLocation, degree, major,
  } = state;
  const [treeExpanded, treeSetExpanded] = React.useState([]);
  const handleChange = (event, nodes) => {
    treeSetExpanded(nodes);
  };
  // const [cardExpandedID, cardSetExpandedID] = React.useState(-1);
  // const handleExpandClick = (i) => {
  //   cardSetExpandedID(cardExpandedID == i ? -1 : i);
  // };


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
                        {name}
                      </Typography>
                      <Typography
                        className={classes.locationText}
                        color="textSecondary"
                        variant="body1"
                      >
                        {city}
                        ,
                        {countryState}
                        ,
                        {country}

                      </Typography>
                      <br />
                      <Typography
                        className={classes.dateText}
                        color="textSecondary"
                        variant="body1"
                      >
                        {careerObjective}
                      </Typography>
                    </div>
                    <Avatar
                      className={classes.avatar}
                      src={profPic}
                    />
                  </div>
                </CardContent>
                <Divider />
                <CardActions>

                  <Button
                    className={classes.uploadButton}
                    // onClick = {onUpload}
                    color="primary"
                    variant="contained"
                    component="label"
                  >
                    Upload picture
                    <input
                      type="file"
                      id="INPUT_TAG"
                      style={{ display: 'none' }}
                      onChange={onUpload}
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
              <br />
              <br />
              <TreeItem nodeId="1" label="View/Update Basic Details">
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
                              onChange={onChangeName}
                              required
                              value={name}
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
                              onChange={onChangeDob}
                              value={dob}
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
                              onChange={onChangeCity}
                              value={city}
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
                              onChange={onChangeState}
                              value={countryState}
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
                              onChange={onChangeCountry}
                              value={country}
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
                              onChange={onChangeStudentEmail}
                              required
                              value={email}
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
                              onChange={onChangeStudentPhone}
                              type="number"
                              value={phone}
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
                              style={{ width: 300 }}
                              onChange={onChangeCareerObjective}
                                // eslint-disable-next-line react/jsx-sort-props
                              SelectProps={{ native: true }}
                              value={careerObjective}
                              variant="outlined"
                            />
                          </Grid>
                          <Grid
                            item
                            md={6}
                            xs={12}
                          />
                        </Grid>
                      </CardContent>
                      <Divider />
                      <CardActions>
                        <Button
                          color="primary"
                          variant="contained"
                          onClick={onSubmit}
                        >
                          Save details
                        </Button>
                      </CardActions>
                    </form>
                  </Card>
                </Grid>
              </TreeItem>
              <br />
              <br />
              <TreeItem nodeId="2" label="View Education">
                <Grid
        //   item
        //   lg={8}
        //   md={6}
        //   xl={8}
                  xs={12}
                >
                  {pastEdu.map((education) => (
                    <Card>
                      <CardHeader

                        title={education.collegeName}
                        subheader={education.loc}
                      />
                      <CardContent>
                        <Typography variant="body2" color="textSecondary" component="p">
                          Degree:
                          {' '}
                          {education.degree}
                          {' '}
&nbsp;&nbsp;&nbsp;   Major:
                          {education.major}
                          {' '}
                          <br />
                          <br />
                          Graduation Year:
                          {' '}
                          {education.gradYear}
                          {' '}
                          <br />
                          <br />
                          GPA:
                          {' '}
                          {education.gpa}
                          {' '}
                          <br />
                          <br />


                        </Typography>
                      </CardContent>
                    </Card>
                  ))}
                </Grid>
              </TreeItem>
              <br />
              <br />
              <TreeItem nodeId="3" label="Add Education">
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
                              onChange={onChangeCollegeName}
                              required
                              value={collegeName}
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
                              onChange={onChangeEducationLocation}
                              value={educationLocation}
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
                              onChange={onChangeDegree}
                              value={degree}
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
                              onChange={onChangeMajor}
                              value={major}
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
                              onChange={onChangeGradYear}
                              value={state.gradYear}
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
                              onChange={onChangeGPA}
                              required
                              value={state.gpa}
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
                          onClick={onSubmitEducation}
                        >
                          Add
                        </Button>
                      </CardActions>
                    </form>
                  </Card>
                </Grid>
              </TreeItem>
              <br />
              <br />
              <TreeItem nodeId="4" label="View Experience">
                <Grid
        //   item
        //   lg={8}
        //   md={6}
        //   xl={8}
                  xs={12}
                >
                  {state.experience.map((experience) => (
                    <Card>
                      <CardHeader

                        title={experience.companyName}
                        subheader={experience.title}
                      />
                      <CardContent>
                        <Typography variant="body2" color="textSecondary" component="p">
                          Location:
                          {' '}
                          {experience.loc}
                          {' '}
&nbsp;&nbsp;&nbsp;   Start Date:
                          {experience.startDate}
                          {' '}
                          <br />
                          <br />
                          End Date:
                          {' '}
                          {experience.endDate}
                          {' '}
                          <br />
                          <br />
                          Work Description:
                          {' '}
                          {experience.description}
                          {' '}
                          <br />
                          <br />


                        </Typography>
                      </CardContent>
                    </Card>
                  ))}
                </Grid>
              </TreeItem>
              <br />
              <br />
              <TreeItem nodeId="5" label="Add Experience">
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
                              onChange={onChangeCompanyName}
                              required
                              value={state.companyName}
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
                              onChange={onChangeJobTitle}
                              value={state.jobTitle}
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
                              onChange={onChangeJobLocation}
                              value={state.jobLocation}
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
                              type="date"
                              margin="dense"
                              name="startDate"
                              onChange={onChangeStartDate}
                              value={state.stDate}
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
                              type="date"
                              onChange={onChangeEndDate}
                              value={state.endDate}
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
                              onChange={onChangeWorkDescription}
                              multiline
                              rows={15}
                              style={{ width: 300 }}
                              value={state.workDescription}
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
                          onClick={onSubmitExperience}
                        >
                          Add
                        </Button>
                      </CardActions>
                    </form>
                  </Card>
                </Grid>
              </TreeItem>
              <br />
              <br />
              <TreeItem nodeId="6" label="View/Update Skillset">
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
                              style={{ width: 300 }}
                              onChange={onChangeSkillset}
                              required
                              value={state.skillset}
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
                          onClick={onSubmitSkillset}
                        >
                          Save skills
                        </Button>
                      </CardActions>
                    </form>
                  </Card>
                </Grid>
              </TreeItem>
              <br />
              <br />
            </TreeView>
          </Grid>
        </div>
      </div>
    </Paper>
  );
}

Content.propTypes = {
  classes: PropTypes.node.isRequired,
  className: PropTypes.node.isRequired,
  state: PropTypes.node.isRequired,
  onUpload: PropTypes.func.isRequired,
  onChangeName: PropTypes.func.isRequired,
  onChangeDob: PropTypes.func.isRequired,
  onChangeCity: PropTypes.func.isRequired,
  onChangeState: PropTypes.func.isRequired,
  onChangeCountry: PropTypes.func.isRequired,
  onChangeStudentEmail: PropTypes.func.isRequired,
  onChangeStudentPhone: PropTypes.func.isRequired,
  onChangeCareerObjective: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChangeCollegeName: PropTypes.func.isRequired,
  onChangeEducationLocation: PropTypes.func.isRequired,
  onChangeDegree: PropTypes.func.isRequired,
  onChangeMajor: PropTypes.func.isRequired,
  onChangeGPA: PropTypes.func.isRequired,
  onChangeGradYear: PropTypes.func.isRequired,
  onSubmitEducation: PropTypes.func.isRequired,
  onChangeCompanyName: PropTypes.func.isRequired,
  onChangeJobLocation: PropTypes.func.isRequired,
  onChangeJobTitle: PropTypes.func.isRequired,
  onChangeStartDate: PropTypes.func.isRequired,
  onChangeEndDate: PropTypes.func.isRequired,
  onChangeWorkDescription: PropTypes.func.isRequired,
  onChangeSkillset: PropTypes.func.isRequired,
  onSubmitSkillset: PropTypes.func.isRequired,
  onSubmitExperience: PropTypes.func.isRequired,
};

export default withStyles(styles)(Content);
