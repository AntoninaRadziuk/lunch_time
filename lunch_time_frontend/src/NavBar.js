import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
    main: {
        backgroundColor: "transparent",
        color: "black"
    },
    title: {
        flexGrow: 1,
        marginLeft: -250,
    },
  }));
  
  export default function ButtonAppBar() {
    const classes = useStyles();
  
    return (
      <div className={classes.root}>
        <AppBar position="static" className={classes.main}>
          <Toolbar>
            {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            </IconButton> */}
            <Typography variant="h6" className={classes.title} >
              Lunch time
            </Typography>
            {/* <Typography variant="h6" className={classes.title}>
              News
            </Typography>
            <Typography variant="h6" className={classes.title}>
              News
            </Typography> */}
            <Button color="inherit">Sign out</Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
  