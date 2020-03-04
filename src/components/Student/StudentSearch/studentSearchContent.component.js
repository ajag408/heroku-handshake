import React from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TablePagination,
} from '@material-ui/core';
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
          <TreeItem nodeId="1" label="View All Students Enrolled on Handshake">

            <Card>


              <CardContent>
                <PerfectScrollbar>
                  <div className={classes.inner}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Name</TableCell>
                          <TableCell>College Name</TableCell>
                          <TableCell>Skillset</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {props.state.allStudents.map((student) => (
                          <TableRow
                            className={classes.tableRow}
                            hover
                          >
                            <TableCell>
                              <div>
                                <a href={`/student/${student.id}`}>
                                  <Typography variant="body1">{student.name}</Typography>
                                </a>
                              </div>
                            </TableCell>
                            <TableCell>{student.collegeName}</TableCell>
                            <TableCell>{student.skillset}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </PerfectScrollbar>
              </CardContent>

            </Card>
          </TreeItem>
        </TreeView>
        <div className={classes.root}>
          <SearchIcon className={classes.icon} />
          <Input


            placeholder="Search students by name, college name, or skillset"
            className={classes.input}
            disableUnderline
            onChange={props.onChangeSearch}
            value={props.state.search}
          />
          <br />
          <br />

          <Input
            placeholder="Filter by major"
            className={classes.input}
            disableUnderline
            onChange={props.onChangeMajor}
            value={props.state.major}
          />
          <div className={classes.content}>
            <Card>


              <CardContent>
                <PerfectScrollbar>
                  <div className={classes.inner}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Name</TableCell>
                          <TableCell>College Name</TableCell>
                          <TableCell>Skillset</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {props.state.students.map((student) => (
                          <TableRow
                            className={classes.tableRow}
                            hover
                          >
                            <TableCell>
                              <div>
                                <a href={`/student/${student.id}`}>
                                  <Typography variant="body1">{student.name}</Typography>
                                </a>
                              </div>
                            </TableCell>
                            <TableCell>{student.collegeName}</TableCell>
                            <TableCell>{student.skillset}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </PerfectScrollbar>
              </CardContent>
              {/* <CardActions className={classes.actions}>
                <TablePagination
                component="div"
                count={users.length}
                onChangePage={handlePageChange}
                onChangeRowsPerPage={handleRowsPerPageChange}
                page={page}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[5, 10, 25]}
                />
            </CardActions> */}
            </Card>
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
