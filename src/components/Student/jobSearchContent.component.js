import React from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import ToggleButton from '@material-ui/lab/ToggleButton';
import {
    Paper,
    Input,
    Card,
    CardActions,
    CardContent,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
    TablePagination
} from '@material-ui/core';
import Moment from 'react-moment';
import Collapse from '@material-ui/core/Collapse';

import SearchIcon from '@material-ui/icons/Search';


const styles = theme => ({
    root: {
        padding: theme.spacing(3),

      },
      content: {
        marginTop: theme.spacing(2)
      },
      icon: {
        marginRight: theme.spacing(1),
        color: theme.palette.text.secondary,
      },
      inner: {
        minWidth: 1050
      },
      input: {
        flexGrow: 1,
        fontSize: '14px',
        lineHeight: '16px',
        letterSpacing: '-0.05px',
        width: '60%',

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
    const { classes } = props;
    const [selected, setSelected] = React.useState(false);
    var i = -1;
    const [cardExpandedID, cardSetExpandedID] = React.useState(-1);
    const handleExpandClick = i => {
      cardSetExpandedID(cardExpandedID == i ? -1: i);
    };
  
  return (
    <Paper className={classes.paper}>

        <div className={classes.contentWrapper}>
    <div className={classes.root}>
                <SearchIcon className={classes.icon} />
                <Input

                    
                    placeholder="Search jobs by company name or job title"
                    className={classes.input}
                    disableUnderline
                    onChange={props.onChangeSearch}
                    value = {props.state.search}
                /><br></br><br></br>
        <ToggleButton
           
            selected={selected}
            // onChange={() => {
              
            //   setSelected(!selected);
            //   console.log(!selected);
            //   // props.state.selectedFT = !selected;

            // }}
            onChange={props.onChangeFT}
        >
          Full Time
        </ToggleButton>
        <Button  size="medium" block="block" type="submit">
          Full Time
        </Button>&nbsp;&nbsp;
        <Button  size="medium" block="block" type="submit">
          Post Time
        </Button>&nbsp;&nbsp;
        <Button  size="medium" block="block" type="submit">
          On Campus
        </Button>&nbsp;&nbsp;
        <Button  size="medium" block="block" type="submit">
          Intern
        </Button>&nbsp;&nbsp;
      <div className={classes.content}>
      {props.state.jobs.map((job, i) => (
          <Card>
          <CardHeader
          
            title = {job.title}
            subheader= {job.name}
          />
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              Category: {job.cat} &nbsp;&nbsp;&nbsp;   Salary: ${job.salary}  &nbsp;&nbsp;&nbsp;   Location: {job.loc}
              
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
      </div>
    </div>
    </div>
    </Paper>
  );
};

Content.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Content);