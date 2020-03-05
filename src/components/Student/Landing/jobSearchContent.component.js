import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

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

  Typography,

} from '@material-ui/core';
import Moment from 'react-moment';
import Collapse from '@material-ui/core/Collapse';

import SearchIcon from '@material-ui/icons/Search';


const styles = (theme) => ({
  root: {
    padding: theme.spacing(3),

  },
  content: {
    marginTop: theme.spacing(2),
  },
  icon: {
    marginRight: theme.spacing(1),
    color: theme.palette.text.secondary,
  },
  inner: {
    minWidth: 1050,
  },
  input: {
    flexGrow: 1,
    fontSize: '14px',
    lineHeight: '16px',
    letterSpacing: '-0.05px',
    width: '60%',

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
  const {
    classes, state, onChangeSearchInput, onChangeSearchFilter, onChangeSearchLoc,
    onUpload,
  } = props;
  const { search, loc, jobs } = state;
  const [selectedFT, setSelectedFT] = React.useState(false);
  const [selectedPT, setSelectedPT] = React.useState(false);
  const [selectedON, setSelectedON] = React.useState(false);
  const [selectedIN, setSelectedIN] = React.useState(false);
  // const i = -1;
  const [cardExpandedID, cardSetExpandedID] = React.useState(-1);
  const handleExpandClick = (i) => {
    cardSetExpandedID(cardExpandedID === i ? -1 : i);
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
            onChange={onChangeSearchInput}
            value={search}
          />
          <br />
          <br />
          <ToggleButton

            selected={selectedFT}
            onClick={() => {
              setSelectedFT(!selectedFT);
              console.log(!selectedFT);
              props.state.selectedFT = !selectedFT;
              // console.log(props.state.selectedFT);
            }}
            onChange={onChangeSearchFilter}
          >
            Full Time
          </ToggleButton>
&nbsp;&nbsp;
          <ToggleButton

            selected={selectedPT}
            onClick={() => {
              setSelectedPT(!selectedPT);
              console.log(!selectedPT);
              props.state.selectedPT = !selectedPT;
              console.log(props.state.selectedPT);
            }}
            onChange={onChangeSearchFilter}
          >
            Part Time
          </ToggleButton>
&nbsp;&nbsp;
          <ToggleButton

            selected={selectedON}
            onClick={() => {
              setSelectedON(!selectedON);
              console.log(!selectedON);
              props.state.selectedON = !selectedON;
              console.log(props.state.selectedON);
            }}
            onChange={onChangeSearchFilter}
          >
            On Campus
          </ToggleButton>
&nbsp;&nbsp;
          <ToggleButton

            selected={selectedIN}
            onClick={() => {
              setSelectedIN(!selectedIN);
              console.log(!selectedIN);
              props.state.selectedIN = !selectedIN;
              console.log(props.state.selectedIN);
            }}
            onChange={onChangeSearchFilter}
          >
            Intern
          </ToggleButton>
          <br />
          <br />
          <Input


            placeholder="Filter by location"
            className={classes.input}
            disableUnderline
            onChange={onChangeSearchLoc}
            value={loc}
          />
          <div className={classes.content}>
            {jobs.map((job, i) => (
              <Card>
                <CardHeader

                  title={job.title}
                />
                <a href={`/company/${job.id}`}>
                  <CardHeader

                    subheader={job.name}
                  />
                </a>
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
                    {/* <Typography>

              </Typography> */}
                  </CardContent>
                  <CardActions>

                    <Button
                      className={classes.uploadButton}
                // onClick = {props.onUpload}
                      color="primary"
                      variant="contained"
                      component="label"
                    >
                      Upload Resume (PDF)
                      <input
                        type="file"
                        id="INPUT_TAG"
                        style={{ display: 'none' }}

                        required
                      />
                    </Button>
                    <button
                      type="submit"
                      className={classes.uploadButton}
                // onClick = {props.onUpload}
                      color="primary"
                      variant="contained"
                      component="label"
                      onClick={onUpload}
                      value={job.jobID}
                      key={job.jobID}
                    >
                      Submit Application
                    </button>

                  </CardActions>
                </Collapse>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Paper>
  );
}

Content.propTypes = {
  classes: PropTypes.node.isRequired,
  state: PropTypes.node.isRequired,
  onChangeSearchInput: PropTypes.func.isRequired,
  onChangeSearchFilter: PropTypes.func.isRequired,
  onChangeSearchLoc: PropTypes.func.isRequired,
  onUpload: PropTypes.func.isRequired,
};

export default withStyles(styles)(Content);
