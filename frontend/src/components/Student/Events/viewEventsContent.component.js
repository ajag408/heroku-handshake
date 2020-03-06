
import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';


import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';

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
  const { classes } = props;
  const { onChangeSearchInput, onRegister } = props;
  const { state } = props;
  const { search, registered, events } = state;
  const [cardExpandedID, cardSetExpandedID] = React.useState(-1);
  const handleExpandClick = (i) => {
    cardSetExpandedID(cardExpandedID === i ? -1 : i);
  };

  const [treeExpanded, treeSetExpanded] = React.useState([]);
  const handleChange = (event, nodes) => {
    treeSetExpanded(nodes);
  };


  return (
    <Paper className={classes.paper}>

      <div className={classes.contentWrapper}>
        <TreeView
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
          expanded={treeExpanded}
          onNodeToggle={handleChange}
        >
          <TreeItem nodeId="1" label="View Registered Events">
            <h1> Registered</h1>
            {registered.map((event, i) => (
              <Card>
                <CardHeader

                  title={event.name}
                  subheader={event.companyName}
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
                    {/* <Typography>

                </Typography> */}
                  </CardContent>
                </Collapse>
              </Card>
            ))}
          </TreeItem>
        </TreeView>
        <div className={classes.root}>
          <SearchIcon className={classes.icon} />
          <Input


            placeholder="Search events by name"
            className={classes.input}
            disableUnderline
            onChange={onChangeSearchInput}
            value={search}
          />
          <br />
          <br />

          <div className={classes.content}>
            {events.map((event, i) => (
              <Card>
                <CardHeader

                  title={event.name}
                  subheader={event.companyName}
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
                    <button
                      type="submit"
                      className={classes.uploadButton}
                // onClick = {props.onUpload}
                      color="primary"
                      variant="contained"
                      component="label"
                      id={event.id}
                      onClick={onRegister}
                    >
                      Register
                    </button>
                  </CardContent>
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
  onRegister: PropTypes.func.isRequired,
};

export default withStyles(styles)(Content);
