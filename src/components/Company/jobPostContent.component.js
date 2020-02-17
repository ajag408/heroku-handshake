import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Form from 'react-bootstrap/Form'

const styles = theme => ({
  paper: {
    maxWidth: 936,
    margin: 'auto',
    overflow: 'hidden',
  },
  searchBar: {
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
  },
  searchInput: {
    fontSize: theme.typography.fontSize,
  },
  block: {
    display: 'block',
  },
  addUser: {
    marginRight: theme.spacing(1),
  },
  contentWrapper: {
    margin: '40px 16px',
  },
  button: {
    backgroundColor: '#232f3e',
    color: 'white',
  }
});

function Content(props) {
  const { classes } = props;

  return (
    <Paper className={classes.paper}>
      <div className={classes.contentWrapper}>
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
      </div>
    </Paper>
  );
}

Content.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Content);