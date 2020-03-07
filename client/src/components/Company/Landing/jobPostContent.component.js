import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Form from 'react-bootstrap/Form';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';

import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Moment from 'react-moment';
import PerfectScrollbar from 'react-perfect-scrollbar';


const styles = (theme) => ({
  paper: {
    maxWidth: '80%',
    margin: 'auto',
    marginLeft: '15%',
    marginRight: '5%',
    overflow: 'hidden',
  },

  tableTitle: {
    paddingLeft: '2%',
  },
  block: {
    display: 'block',
  },

  contentWrapper: {
    margin: '40px 16px',
  },
  root: {
    padding: theme.spacing(4),
  },
  table: {
    minWidth: 650,
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  button: {
    backgroundColor: '#232f3e',
    color: 'white',
  },
});

function Content(props) {
  const {
    classes, state, onSubmit,
    onChangeJobTitle,
    onChangeCreated,
    onChangeDeadline,
    onChangeJobLoc,
    onChangeSalary,
    onChangeJobDescription,
    onChangeCategory,
    onChangeApplicationStatus,
  } = props;
  const [treeExpanded, treeSetExpanded] = React.useState([]);
  const handleChange = (event, nodes) => {
    treeSetExpanded(nodes);
  };

  const [cardExpandedID, cardSetExpandedID] = React.useState(-1);
  const handleExpandClick = (i) => {
    cardSetExpandedID(cardExpandedID === i ? -1 : i);
  };


  return (
    <Paper className={classes.paper}>

      <div className={classes.contentWrapper}>
        <div className={classes.root}>


          <Grid
            item

            xs={12}
          >
            <TreeView
              defaultCollapseIcon={<ExpandMoreIcon />}
              defaultExpandIcon={<ChevronRightIcon />}
              expanded={treeExpanded}
              onNodeToggle={handleChange}
            >
              <TreeItem nodeId="1" label="Post New Job Opening">
                <h1>Post Job Opening</h1>
                <Form onSubmit={onSubmit}>
                  <Form.Group controlId="Title">
                    <Form.Label>Job Title</Form.Label>

                    <Form.Control required type="text" value={state.title} onChange={onChangeJobTitle} />
                  </Form.Group>

                  <Form.Group controlId="Created">
                    <Form.Label>Created On</Form.Label>
                    <Form.Control required type="date" value={state.created} onChange={onChangeCreated} />
                  </Form.Group>

                  <Form.Group controlId="Deadline">
                    <Form.Label>Application Deadline</Form.Label>
                    <Form.Control required type="date" value={state.deadline} onChange={onChangeDeadline} />
                  </Form.Group>

                  <Form.Group controlId="Loc">
                    <Form.Label>Location</Form.Label>
                    <Form.Control required type="text" value={state.loc} onChange={onChangeJobLoc} />
                  </Form.Group>

                  <Form.Group controlId="Salary">
                    <Form.Label>Salary</Form.Label>
                    <Form.Control required type="number" value={state.salary} onChange={onChangeSalary} />
                  </Form.Group>

                  <Form.Group controlId="Description">
                    <Form.Label>Job Description</Form.Label>
                    <Form.Control required as="textarea" rows="10" value={state.description} onChange={onChangeJobDescription} />
                  </Form.Group>

                  <Form.Group controlId="Category">
                    <Form.Label>Job Category</Form.Label>
                    <Form.Control required as="select" value={state.cat} onChange={onChangeCategory}>
                      <option value="Full Time">Full Time</option>
                      <option value="Part Time">Part Time</option>
                      <option value="Intern">Intern</option>
                      <option value="On Campus">On Campus</option>
                    </Form.Control>
                  </Form.Group>


                  <Button className={classes.button} size="medium" block="block" type="submit">
                    Post Job
                  </Button>
                </Form>
              </TreeItem>
            </TreeView>
            <br />
            <br />
            <h1>Jobs Posted</h1>
            {state.jobs.map((job, i) => (
              <Card>
                <CardHeader

                  title={job.title}
                  subheader={state.companyName}
                />
                <CardContent>
                  <Typography variant="body2" color="textSecondary" component="p">
                    Category:
                    {' '}
                    {job.cat}
                    {' '}
&nbsp;&nbsp;&nbsp;   Salary: $
                    {job.salary}
                    {' '}
&nbsp;&nbsp;&nbsp;   Location:
                    {' '}
                    {job.loc}

                  </Typography>
                </CardContent>
                <CardActions className={classes.tableTitle} disableSpacing>
                  View full description
                  <IconButton

                    onClick={() => handleExpandClick(i)}
                    aria-expanded={cardExpandedID === i}
                    aria-label="show more"
                  >
                    <ExpandMoreIcon />
                  </IconButton>
                </CardActions>
                <Collapse in={cardExpandedID === i} timeout="auto" unmountOnExit>
                  <CardContent>
                    <Typography paragraph>
                      {' '}
                      Created on:
                      <Moment format="YYYY-MM-DD ">{job.created}</Moment>
                    </Typography>
                    <Typography paragraph>
                      Deadline:
                      {' '}
                      <Moment format="YYYY-MM-DD ">{job.deadline}</Moment>
                    </Typography>
                    <Typography paragraph>
                      Description:
                      {' '}
                      {job.description}
                    </Typography>

                    <PerfectScrollbar>
                      <div className={classes.inner}>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell>Students Applied</TableCell>
                              <TableCell>Resume</TableCell>
                              <TableCell>Application Status</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {job.applicants.map((student) => (
                              <TableRow
                                className={classes.tableRow}
                                hover
                              >
                                <TableCell>
                                  <div>
                                    <a href={`/company/student/${student.id}`}>
                                      <Typography variant="body1">{student.name}</Typography>
                                    </a>
                                  </div>
                                  {/* {job.applicants} */}
                                </TableCell>
                                <TableCell><a href={`http://localhost:4000/applications/getResume/${student.resFile}`}>View Resume</a></TableCell>
                                <TableCell>
                                  <Form>
                                    <Form.Group>
                                      <Form.Control id={student.appID} required as="select" value={student.status} onChange={onChangeApplicationStatus}>
                                        <option value="Pending">Pending</option>
                                        <option value="Reviewed">Reviewed</option>
                                        <option value="Declined">Declined</option>
                                      </Form.Control>
                                    </Form.Group>
                                  </Form>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </PerfectScrollbar>
                  </CardContent>
                </Collapse>
              </Card>
            ))}
            {/* </Grid> */}
          </Grid>

        </div>
      </div>

    </Paper>
  );
}

Content.propTypes = {
  classes: PropTypes.node.isRequired,
  state: PropTypes.node.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChangeJobTitle: PropTypes.func.isRequired,
  onChangeCreated: PropTypes.func.isRequired,
  onChangeDeadline: PropTypes.func.isRequired,
  onChangeJobLoc: PropTypes.func.isRequired,
  onChangeSalary: PropTypes.func.isRequired,
  onChangeJobDescription: PropTypes.func.isRequired,
  onChangeCategory: PropTypes.func.isRequired,
  onChangeApplicationStatus: PropTypes.func.isRequired,
};

export default withStyles(styles)(Content);
