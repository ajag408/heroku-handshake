import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import WorkIcon from '@material-ui/icons/Work';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import EventIcon from '@material-ui/icons/Event';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import axios from 'axios';

const categories = [
  {
    id: 'Manage',
    children: [
      { id: 'Job Postings', icon: <WorkIcon />, action: () => { window.location.href = '/company/landing'; } },
      { id: 'Profile', icon: <AccountBoxIcon />, action: () => { window.location.href = '/company/profile'; } },
      { id: 'Students', icon: <EmojiPeopleIcon />, action: () => { window.location.href = '/company/students'; } },
      { id: 'Events', icon: <EventIcon />, action: () => { window.location.href = '/company/events'; } },
    //   { id: 'Functions', icon: <SettingsEthernetIcon /> },
    //   { id: 'ML Kit', icon: <SettingsInputComponentIcon /> },
    ],
  },
  {
    id: 'Logout',
    children: [
      {
        id: 'Logout',
        icon: <ExitToAppIcon />,
        action: () => {
          axios.get('http://localhost:4000/companies/logout')
            .then((res) => {
              console.log(res);
              window.location.href = '/';
            });
        },
      },
    //   { id: 'Performance', icon: <TimerIcon /> },
    //   { id: 'Test Lab', icon: <PhonelinkSetupIcon /> },
    ],
  },
];

const styles = (theme) => ({
  categoryHeader: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    // backgroundColor: '#232f3e',
  },
  categoryHeaderPrimary: {
    color: theme.palette.common.gray,
  },
  item: {
    paddingTop: 1,
    paddingBottom: 1,
    color: 'rgba(255, 255, 255, 0.7)',
    '&:hover,&:focus': {
    //   backgroundColor: 'rgba(255, 255, 255, 0.08)',
      backgroundColor: '#232f3e',
    },
  },
  itemCategory: {
    backgroundColor: '#232f3e',
    boxShadow: '0 -1px 0 #404854 inset',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  firebase: {
    fontSize: 24,
    color: theme.palette.common.white,

  },
  itemActiveItem: {
    color: '#4fc3f7',
  },
  itemPrimary: {
    fontSize: 'inherit',
    color: '#a17f1a',
  },
  itemIcon: {
    minWidth: 'auto',
    marginRight: theme.spacing(2),
    color: 'gray',
  },
  divider: {
    marginTop: theme.spacing(2),
  },
});

function Navigator(props) {
  const { classes, ...other } = props;

  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        <ListItem className={clsx(classes.firebase, classes.item, classes.itemCategory)}>
          Handshake
        </ListItem>
        <ListItem className={clsx(classes.item, classes.itemCategory)} button onClick={() => { window.location.href = '/company/landing'; }}>
          <ListItemIcon className={classes.itemIcon}>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText
            classes={{
              primary: classes.itemPrimary,
            }}
          >
            Dashboard
          </ListItemText>
        </ListItem>
        {categories.map(({ id, children }) => (
          <React.Fragment key={id}>
            <ListItem className={classes.categoryHeader}>
              <ListItemText
                classes={{
                  primary: classes.categoryHeaderPrimary,
                }}
              >
                {id}
              </ListItemText>
            </ListItem>
            {children.map(({
              id: childId, icon, action, active,
            }) => (
              <ListItem
                key={childId}
                button
                onClick={action}
                className={clsx(classes.item, active && classes.itemActiveItem)}
              >
                <ListItemIcon className={classes.itemIcon}>{icon}</ListItemIcon>
                <ListItemText
                  classes={{
                    primary: classes.itemPrimary,
                  }}
                >
                  {childId}
                </ListItemText>
              </ListItem>
            ))}

            <Divider className={classes.divider} />
          </React.Fragment>
        ))}
      </List>
    </Drawer>
  );
}

Navigator.propTypes = {
  classes: PropTypes.node.isRequired,
};

export default withStyles(styles)(Navigator);
