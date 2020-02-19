import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Form from 'react-bootstrap/Form';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Moment from 'react-moment';


const styles = theme => ({
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
    padding: theme.spacing(4)
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
  }
});

function Content(props) {
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
          item

          xs={12}
        >
      <TreeView
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      expanded={treeExpanded}
      onNodeToggle={handleChange}
     >
      <TreeItem nodeId = "1" label = "Post New Event Opening">
      <h1>Post Job Opening</h1>
      <Form onSubmit={props.onSubmit}>
        <Form.Group controlId="Title">
          <Form.Label>Event Name</Form.Label>
               
          <Form.Control required type="text" value={props.state.event} onChange={props.onChangeEventName}/>  
        </Form.Group>

        <Form.Group controlId="Description">
          <Form.Label>Description</Form.Label>
          <Form.Control rows="10" required as="textarea" value={props.state.description} onChange={props.onChangeEventDescription}/>
        </Form.Group>

        <Form.Group controlId="When">
          <Form.Label>When</Form.Label>
          <Form.Control required type="datetime" value={props.state.time} onChange={props.onChangeTime}/>
        </Form.Group>

        <Form.Group controlId="Loc">
          <Form.Label>Location</Form.Label>
          <Form.Control required type="text" value={props.state.loc} onChange={props.onChangeEventLoc}/>
        </Form.Group>

        <Form.Group controlId="Eligibility">
          <Form.Label>Eligibility</Form.Label>
          <Form.Control required type="text" list="majorList" value={props.state.eligibility} onChange={props.onChangeEventEligibility}/>
            <datalist id = "majorList">
              <option value="All">All</option>
              <option value="Software Engineering">Software Engineering</option>
           </datalist>  
        </Form.Group>


        <Button className = {classes.button} size="medium" block="block" type="submit">
          Post Event
        </Button>
      </Form>
      </TreeItem>
      </TreeView>
<br></br><br></br>
<h1>Jobs Posted</h1>
      {props.state.events.map((job, i) => (
          <Card>
          <CardHeader
          
            title = {job.title}
            subheader= {props.state.companyName}
          />
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              Category: {job.cat} &nbsp;&nbsp;&nbsp;   Salary: ${job.salary}(per hour)  &nbsp;&nbsp;&nbsp;   Location: {job.loc}
              
            </Typography>
          </CardContent>
          <CardActions className = {classes.tableTitle} disableSpacing>
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
              <Typography paragraph> Created on: <Moment format = "YYYY-MM-DD ">{job.created}</Moment></Typography>
              <Typography paragraph>
              Deadline: <Moment format = "YYYY-MM-DD ">{job.deadline}</Moment>
              </Typography>
              <Typography paragraph>
                Description:  {job.description}
              </Typography>
              {/* <Typography>
        
              </Typography> */}
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
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Content);