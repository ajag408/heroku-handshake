import React from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';

import Moment from 'react-moment';
import {
  Card,
  CardHeader,
  CardActions,
  CardContent,
  Avatar,
  Typography,
  Divider,
  Button,
  LinearProgress,
  TextField
} from '@material-ui/core';


const styles = theme => ({
    root: {
        padding: theme.spacing(4)
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
    const { className, ...rest } = props;
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
            {props.state.company.map((company, i) => (
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
                        {company.name}
                        </Typography>
                        <Typography
                        className={classes.locationText}
                        color="textSecondary"
                        variant="body1"
                        >
                        {company.loc}
                
                        </Typography>
                        <br></br>
                        <Typography
                        className={classes.dateText}
                        color="textSecondary"
                        variant="body1"
                        >
                        {company.description}
                        </Typography>
                    </div>
                    {/* // <Avatar */}
                    {/* //     className={classes.avatar}
                    //     src={`http://localhost:4000/companies/profPicBlind/${student.id}`}
                    // /> */}
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
         <br></br><br></br>
      <TreeItem nodeId = "1" label = "View Basic Details">
        <Grid
        //   item
        //   lg={8}
        //   md={6}
        //   xl={8}
          xs={12}
        >
            {props.state.company.map((company, i) => (
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
                                value={company.name}
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
                                label="Location"
                                
                                margin="dense"
                                name="loc"
                                disabled
                                value={company.loc}
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
                                value={company.email}
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
                                
                                value={company.phone}
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
                                label="Description"
                                margin="dense"
                                name="description"
                                multiline
                                rows={15}
                                style = {{width: 300}}
                                disabled
                                // eslint-disable-next-line react/jsx-sort-props
                                SelectProps={{ native: true }}
                                value={company.description}
                                variant="outlined"
                            >
                            </TextField>
                            </Grid>
        
                        </Grid>
                        </CardContent>
                    </form>
                    </Card>
                ))}
        </Grid>
        </TreeItem>
        <br></br><br></br>
       
        </TreeView>
      </Grid>
    </div>
    </div>
    </Paper>
  );
};

Content.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Content);
