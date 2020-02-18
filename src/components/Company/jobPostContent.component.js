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
      <TreeItem nodeId = "1" label = "Post New Job Opening">
      <h1>Post Job Opening</h1>
      <Form onSubmit={props.onSubmit}>
        <Form.Group controlId="Title">
          <Form.Label>Job Title</Form.Label>
               
          <Form.Control required type="text" value={props.state.title} onChange={props.onChangeJobTitle}/>  
        </Form.Group>

        <Form.Group controlId="Created">
          <Form.Label>Created On</Form.Label>
          <Form.Control required type="date" value={props.state.created} onChange={props.onChangeCreated}/>
        </Form.Group>

        <Form.Group controlId="Deadline">
          <Form.Label>Application Deadline</Form.Label>
          <Form.Control required type="date" value={props.state.deadline} onChange={props.onChangeDeadline}/>
        </Form.Group>

        <Form.Group controlId="Loc">
          <Form.Label>Location</Form.Label>
          <Form.Control required type="text" value={props.state.loc} onChange={props.onChangeJobLoc}/>
        </Form.Group>

        <Form.Group controlId="Salary">
          <Form.Label>Salary</Form.Label>
          <Form.Control required type="number" value={props.state.salary} onChange={props.onChangeSalary}/>
        </Form.Group>

        <Form.Group controlId="Description">
          <Form.Label>Job Description</Form.Label>
          <Form.Control required type="text" value={props.state.description} onChange={props.onChangeJobDescription}/>
        </Form.Group>

        <Form.Group controlId="Category">
          <Form.Label>Job Category</Form.Label>
          <Form.Control required as="select" value = {props.state.cat} onChange={props.onChangeCategory}>
              <option value="Full Time">Full Time</option>
              <option value="Part Time">Part Time</option>
              <option value="Intern">Intern</option>
              <option value="On Campus">On Campus</option>
          </Form.Control>
        </Form.Group>


        <Button className = {classes.button} size="medium" block="block" type="submit">
          Post Job
        </Button>
      </Form>
      </TreeItem>
      </TreeView>
<br></br><br></br>
<h1>Jobs Posted</h1>
      {props.state.jobs.map((job, i) => (
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

      //  <h1 className = {classes.tableTitle}>Jobs Posted</h1>
      // <TableContainer component={Paper}>
      // <Table className={classes.table} aria-label="simple table">
 
      //   <TableHead>
      //     <TableRow>
      //       <TableCell>Applicants</TableCell>
      //       <TableCell align="right">Title</TableCell>
      //       <TableCell align="right">Location</TableCell>
      //       <TableCell align="right">Description</TableCell>
      //       <TableCell align="right">Protein&nbsp;(g)</TableCell>
      //     </TableRow>
      //   </TableHead>
      //   <TableBody>
      //     {rows.map(row => (
      //       <TableRow key={row.name}>
      //         <TableCell component="th" scope="row">
      //           {row.name}
      //         </TableCell>
      //         <TableCell align="right">{row.calories}</TableCell>
      //         <TableCell align="right">{row.fat}</TableCell>
      //         <TableCell align="right">{row.carbs}</TableCell>
      //         <TableCell align="right">{row.protein}</TableCell>
      //       </TableRow>
      //     ))}
      //    </TableBody>
      //     </Table>
      //     </TableContainer>
        