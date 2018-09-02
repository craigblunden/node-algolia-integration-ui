import React from 'react';
import axios from 'axios'

import CssBaseline from '@material-ui/core/CssBaseline';
import './App.css';

import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import BookmarksIcon from '@material-ui/icons/Bookmarks';


const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 430,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
});

class App extends React.Component {
  state = {
    open: false,
    data: [],
    netoWebsiteURL: '',
    netoAPIUsername: '',
    netoAPIKey: '',
    algoliaAppID: '',
    algoliaAPIKey: '',
    algoliaIndex: '',
  };

  fetchData() {

    if( !this.state.netoWebsiteURL && !this.state.netoAPIUsername && !this.state.netoAPIKey && !this.state.algoliaAppID && !this.state.algoliaAPIKey && !this.state.algoliaIndex) return false
    // Make a request for a user with a given ID
    let that = this
    axios.post('/api/send', {
      netoWebsiteURL: this.state.netoWebsiteURL,
      netoAPIUsername: this.state.netoAPIUsername,
      netoAPIKey: this.state.netoAPIKey,
      algoliaAppID: this.state.algoliaAppID,
      algoliaAPIKey: this.state.algoliaAPIKey,
      algoliaIndex: this.state.algoliaIndex,
    })
    .then(function (response) {
      that.setState({
        data: response.data,
        websiteURL: ''
      })
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
  }

  handleChange(e){
    let name = e.target.name;
    let val = e.target.value;
    this.setState({
      [name]: val
    })
  }

  handleSubmit(e) {
    console.log("submit")
    e.preventDefault();
    // this.fetchData();
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes, theme } = this.props;

    return (
      <div className={classes.root}>
      <CssBaseline />
        <AppBar
          position="absolute"
          className={classNames(classes.appBar, this.state.open && classes.appBarShift)}
        >
          <Toolbar disableGutters={!this.state.open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, this.state.open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" noWrap>
              Mini variant drawer
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
          }}
          open={this.state.open}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </div>
          <Divider />
          <List>
            <ListItem button>
              <ListItemIcon>
                <BookmarksIcon />
              </ListItemIcon>
              <ListItemText primary="Servers" />
            </ListItem>
          </List>
          <Divider />

        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />

          <Typography noWrap>{'You think water moves fast? You should see ice.'}</Typography>
          <Form 
            onSubmit={this.handleSubmit}
            netoWebsiteURL={this.state.netoWebsiteURL}
            netoAPIUsername={this.state.netoAPIUsername}
            netoAPIKey={this.state.netoAPIKey}
            algoliaAppID={this.state.algoliaAppID}
            algoliaAPIKey={this.state.algoliaAPIKey}
            algoliaIndex={this.state.algoliaInde}
          />
        <ul>
        {
          this.state.data.map(itm => <li key={itm.objectID}>{itm.Name}</li>)
        }
        </ul>
        </main>
      </div>
    );
  }
}



App.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(App);
