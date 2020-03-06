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

  CardContent,
  Avatar,
  Typography,
  Divider,

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
  const { classes, state } = props;
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
              {state.student.map((student) => (
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
                          {student.name}
                        </Typography>
                        <Typography
                          className={classes.locationText}
                          color="textSecondary"
                          variant="body1"
                        >
                          {student.city}
                          ,
                          {student.state}
                          ,
                          {student.country}

                        </Typography>
                        <br />
                        <Typography
                          className={classes.dateText}
                          color="textSecondary"
                          variant="body1"
                        >
                          {student.careerObjective}
                        </Typography>
                      </div>
                      <Avatar
                        className={classes.avatar}
                        src={`http://localhost:4000/students/profPicBlind/${student.id}`}
                      />
                    </div>
                  </CardContent>
                  <Divider />
                </Card>
              ))}
            </Grid>
            <TreeView
              defaultCollapseIcon={<ExpandMoreIcon />}
              defaultExpandIcon={<ChevronRightIcon />}
              expanded={treeExpanded}
              onNodeToggle={handleChange}
            >
              <br />
              <br />
              <TreeItem nodeId="1" label="View Basic Details">
                <Grid
        //   item
        //   lg={8}
        //   md={6}
        //   xl={8}
                  xs={12}
                >
                  {state.student.map((student) => (
                    <Card
                      {...rest}
                      className={clsx(classes.root, className)}
                    >
                      <form
                        autoComplete="off"
                        noValidate
                      >
                        <CardHeader
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
                                disabled
                                value={student.name}
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
                                disabled
                                value={student.dob}
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
                                disabled
                                value={student.city}
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
                                disabled

                                value={student.state}
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
                                disabled
                                value={student.country}
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
                                disabled


                                value={student.email}
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
                                disabled
                                type="number"
                                value={student.phone}
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
                                disabled
                                // eslint-disable-next-line react/jsx-sort-props
                                SelectProps={{ native: true }}
                                value={student.careerObjective}
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
                      </form>
                    </Card>
                  ))}
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
                  {state.education.map((education) => (
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
              <TreeItem nodeId="3" label="View Experience">
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
              <TreeItem nodeId="4" label="View Skillset">
                <Grid
        //   item
        //   lg={8}
        //   md={6}
        //   xl={8}
                  xs={12}
                >
                  {state.student.map((student) => (
                    <Card
                      {...rest}
                      className={clsx(classes.root, className)}
                    >
                      <form
                        autoComplete="off"
                        noValidate
                      >
                        <CardHeader

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
                                disabled
                                required
                                value={student.skillset}
                                variant="outlined"
                              />
                            </Grid>

                          </Grid>
                        </CardContent>
                      </form>
                    </Card>
                  ))}
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
};

export default withStyles(styles)(Content);
