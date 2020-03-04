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
  TablePagination,
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

  const [pending, setpending] = React.useState(false);
  const [reviewed, setreviewed] = React.useState(false);
  const [declined, setdeclined] = React.useState(false);
  const [selectedIN, setSelectedIN] = React.useState(false);


  return (
    <Paper className={classes.paper}>

      <div className={classes.contentWrapper}>
        <div className={classes.root}>
          <ToggleButton

            selected={pending}
            onClick={() => {
              setpending(!pending);
              console.log(!pending);
              props.state.pending = !pending;
              console.log(props.state.pending);
            }}
            onChange={props.onChangeStatusFilter}
          >
            Pending
          </ToggleButton>
&nbsp;&nbsp;
          <ToggleButton

            selected={reviewed}
            onClick={() => {
              setreviewed(!reviewed);
              console.log(!reviewed);
              props.state.reviewed = !reviewed;
              console.log(props.state.reviewed);
            }}
            onChange={props.onChangeStatusFilter}
          >
            Reviewed
          </ToggleButton>
&nbsp;&nbsp;
          <ToggleButton

            selected={declined}
            onClick={() => {
              setdeclined(!declined);
              console.log(!declined);
              props.state.declined = !declined;
              console.log(props.state.declined);
            }}
            onChange={props.onChangeStatusFilter}
          >
            Declined
          </ToggleButton>
&nbsp;&nbsp;

          <div className={classes.content}>
            {props.state.applications.map((application, i) => (
              <Card>
                <CardHeader

                  title={application.title}
                  subheader={application.name}
                />
                <CardContent>
                  <Typography variant="body2" color="textSecondary" component="p">
                    Submitted:
                    {' '}
                    {application.created}
                    {' '}
&nbsp;&nbsp;&nbsp;   Status:
                    {' '}
                    {application.status}

                  </Typography>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Paper>
  );
}

Content.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Content);
