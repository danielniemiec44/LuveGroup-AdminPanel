import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import logo from "./logo.jpg"
import { Link } from 'react-router-dom';
import { Drawer, Grid, List, ListItem, ListItemText, Paper, Stack } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { createContext, useContext } from 'react';


import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import FadeMenu from './FadeMenu';
import NavOption from './NavOption';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useRef } from 'react';



const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];



export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: 1,
 
  },
  drawer: {
    width: "100%",
    flexShrink: 0,
  },
  drawerPaper: {
    width: "100%",
    height: 60,
    position: "relative",
    margin: 0,
    padding: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "visible"
  },
  content: {
    flexGrow: 1,
  },
  listItem: {
    width: 100,
    display: 'inline-flex',
    boxSizing: 'border-box',
    height: "100%"
  },
  listItemLong: {
    width: 300,
    display: 'inline-flex',
    boxSizing: 'border-box'
  },
  list: {
    padding: 0,
    margin: 0,
    boxSizing: 'border-box',
  },
  navList: {
    position: 'absolute',
    background: 'white',
    width: 500,
    zIndex: 1,
    top: 55,
    left: -100,
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  nav: {
    width: 350
  },
  calendarItem: {
    position: "relative",
    width: 50,
    height: 50,
  }
}));

function ResponsiveAppBar(props) {
  const classes = useStyles();
  

  




  
  




  

  

  /*
  const handleClickCalendarOutside = (event) => {
    //if ((calendarButtonRef.current && event && !calendarButtonRef.current.contains(event.target)) || (calendarRef.current && event && !calendarRef.current.contains(event.target))) {
      //setCalendarOpen(false);
    //}

    if (calendarButtonRef.current && event && calendarButtonRef.current.contains(event.target)) {
      setCalendarOpen(!calendarOpen);
    }// else if(calendarRef.current && event && !calendarRef.current.contains(event.target)) {
     // setCalendarOpen(false)
    //}
  };
*/







  




  return (
    <React.Fragment>
      <AppBar position="relative">
        <Grid container>
          <Grid item xs={12} style={{ paddingLeft: 10, paddingRight: 10 }}>
            <Toolbar disableGutters>
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  display: { md: 'flex' },
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                <img src={logo} style={{ height: '50px' }} />
              </Typography>
              <Box sx={{ flexGrow: 1, display: { md: 'flex' } }}>
                <Typography variant="h6" sx={{ width: '100%' }}>Leaks - Test nieszczelności</Typography>
              </Box>
              <Typography variant="h6" sx={{ mx: 5 }}>
                {props.userId == null ? (
                  <div>Niezalogowany</div>
                ) : (
                  <div>Zalogowany jako: {props.name} {props.surname} ({props.userId})</div>
                )}
              </Typography>
              {props.showAdminPanel == false ? (
                <Button color="inherit" variant="outlined" onClick={() => { window.location.href = "/panelv2" }}>Panel administracyjny</Button>
              ) : (
                <Button color="inherit" variant="outlined" onClick={() => { window.location.href = "/" }}>Powrót</Button>
              )}
            </Toolbar>
          </Grid>
          
          
        </Grid>
      </AppBar>
    </React.Fragment>
  );


  
}

export default ResponsiveAppBar;
