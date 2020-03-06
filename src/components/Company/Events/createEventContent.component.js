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
    onChangeEventName,
    onChangeEventDescription,
    onChangeDate,
    onChangeTime,
    onChangeEventLoc,
    onChangeEligibility,
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
              <TreeItem nodeId="1" label="Create New Event">
                <h1>Post New Event</h1>
                <Form onSubmit={onSubmit}>
                  <Form.Group controlId="Title">
                    <Form.Label>Event Name</Form.Label>

                    <Form.Control required type="text" value={state.event} onChange={onChangeEventName} />
                  </Form.Group>

                  <Form.Group controlId="Description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control rows="10" required as="textarea" value={state.description} onChange={onChangeEventDescription} />
                  </Form.Group>

                  <Form.Group controlId="Date">
                    <Form.Label>Date</Form.Label>
                    <Form.Control required type="date" value={state.date} onChange={onChangeDate} />
                  </Form.Group>
                  <Form.Group controlId="Time">
                    <Form.Label>Time</Form.Label>
                    <Form.Control required type="time" value={state.time} onChange={onChangeTime} />
                  </Form.Group>

                  <Form.Group controlId="Loc">
                    <Form.Label>Location</Form.Label>
                    <Form.Control required type="text" value={state.loc} onChange={onChangeEventLoc} />
                  </Form.Group>

                  <Form.Group controlId="Eligibility">
                    <Form.Label>Eligibility</Form.Label>
                    <Form.Control required type="text" list="majorList" value={state.eligibility} onChange={onChangeEligibility} />
                    <datalist id="majorList">
                      <option value="All">All</option>
                      <option value="Software Engineering">Software Engineering</option>
                    </datalist>
                    {/* </Form.Control> */}
                  </Form.Group>


                  <Button className={classes.button} size="medium" block="block" type="submit">
                    Post Event
                  </Button>
                </Form>
              </TreeItem>
            </TreeView>
            <br />
            <br />
            <h1>Events Posted</h1>
            {state.events.map((event, i) => (
              <Card>
                <CardHeader

                  title={event.name}
                  subheader={state.companyName}
                />
                <CardContent>
                  <Typography variant="body2" color="textSecondary" component="p">
                    Eligibility:
                    {' '}
                    {event.eligibility}
                    {' '}
&nbsp;&nbsp;&nbsp;  Location:
                    {' '}
                    {event.loc}

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
                      Which day?:
                      <Moment format="MM/DD/YYYY ">{event.date}</Moment>
                    </Typography>
                    <Typography paragraph>
                      What time?:
                      {' '}
                      {event.time}

                    </Typography>
                    <Typography paragraph>
                      Description:
                      {' '}
                      {event.description}
                    </Typography>
                    <PerfectScrollbar>
                      <div className={classes.inner}>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell>Students Registered</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {event.students.map((student) => (
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
  onChangeEventName: PropTypes.func.isRequired,
  onChangeEventDescription: PropTypes.func.isRequired,
  onChangeDate: PropTypes.func.isRequired,
  onChangeTime: PropTypes.func.isRequired,
  onChangeEventLoc: PropTypes.func.isRequired,
  onChangeEligibility: PropTypes.func.isRequired,
};

export default withStyles(styles)(Content);
