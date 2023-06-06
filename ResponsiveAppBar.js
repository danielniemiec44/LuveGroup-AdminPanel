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
import { Drawer, Grid, List, ListItem, ListItemText, Paper } from '@mui/material';
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
    height: 50,
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
  const [calendarOpen, setCalendarOpen] = React.useState(false);
  const [calendarDaysBefore, setCalendarDaysBefore] = React.useState(null)
  const [calendarDaysAfter, setCalendarDaysAfter] = React.useState(null)
  const [calendarSelection, setCalendarSelection] = React.useState([1, 20])
  const isMouseDownRef = React.useRef(false); // Ref for mouse button
  const calendarSelectionStart = React.useRef(-1); // Ref for mouse button

  const calendarRef = useRef();
  const calendarButtonRef = useRef();



  const getDaysInMonth = (dateString) => {
    var date = new Date(dateString);
    return new Date(date.getFullYear(), date.getMonth(), 0).getDate();
  };
  



  const handleMouseDown = (event, index) => {
    if (event.button === 0) {
      calendarSelectionStart.current = index;
      
      // Left mouse button is pressed
      isMouseDownRef.current = true;
      console.log("index: " + calendarSelectionStart.current)
      setCalendarSelection([calendarSelectionStart.current, calendarSelectionStart.current]);
      console.log("Mouse down over calendar detected. Start value: " + calendarSelectionStart.current)
    }
  };
  
  
  const handleMouseEnter = (index) => {
    if (isMouseDownRef.current) {
      console.log("Start value: " + calendarSelectionStart.current)
  
      //var selection = [calendarSelectionStart]; // Use spread syntax to create a new array
  
      if (index > calendarSelectionStart.current) {
        setCalendarSelection([calendarSelectionStart.current, index])
      } else {
        setCalendarSelection([index, calendarSelectionStart.current])
      }
  
      console.log(calendarSelection)
    }
  };
  
  const handleMouseUp = () => {
    isMouseDownRef.current = false;
    calendarSelectionStart.current = -1;
    console.log("Mouse up")
  };
  

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







  React.useEffect(() => {
    window.addEventListener("mouseup", handleMouseUp);


    var date = new Date(props.selectedMonth);
      date.setDate(0);

    var date2 = new Date(props.selectedMonth);
    //date2.setMonth(date2.getMonth() + 1)
    date2.setDate(0)

    var date3 = new Date(props.selectedMonth);

    // Get the last day of the current month


    const daysInMonth = getDaysInMonth(date3.getMonth(), date3.getFullYear());
    const lastDayOfMonth = new Date(date3.getFullYear(), date3.getMonth() + 1, 0).getDay();
    const remainingDays = 7 - ((new Date(date3.getFullYear(), date3.getMonth(), 1).getDay() + (date.getDate() - 1)) % 7);

    var date4 = new Date(props.selectedMonth)
    var date5 = new Date(date4.getFullYear(), date4.getMonth(), 0)

    //var selectedDays = calendarSelectionEnd - calendarSelectionStart;




  setCalendarDaysAfter([...Array(remainingDays)].map((_, index) => {
    return (
      <ListItem button disabled component="div" className={classes.calendarItem}>
        <Typography style={{ flex: 1, textAlign: 'center' }}>
          {index + 1}
        </Typography>
      </ListItem>
    );
  }));


      setCalendarDaysBefore([...Array(date.getDay())].map((_, index) => {
        return (
          <ListItem button disabled component="div" className={classes.calendarItem}>
            <Typography style={{ flex: 1, textAlign: 'center' }}>
              { date2.getDate() - date.getDay() + index + 1 }
            </Typography>
          </ListItem>
        );
        }))



        //setCalendarDays();

        

        const handleClickCalendarOutside = (event) => {
          //console.log(calendarButtonRef.current.contains(event.target))
          console.log("Calendar open state: " + (calendarButtonRef.current && event && calendarButtonRef.current.contains(event.target)))
          if (calendarRef.current && event && calendarRef.current.contains(event.target)) {
            setCalendarOpen(true);
          } else if (calendarButtonRef.current && event && calendarButtonRef.current.contains(event.target)) {
            setCalendarOpen(!calendarOpen);
          } else {
            setCalendarOpen(false)
          }
        };
      
        window.addEventListener('click', handleClickCalendarOutside);
        return () => {
          window.removeEventListener('click', handleClickCalendarOutside);
        };
        
  }, [props.selectedMonth, calendarOpen])




  return (
    <React.Fragment>
      <AppBar position="fixed">
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
          
          {(props.showAdminPanel && props.userId !== null) ? (
            <Grid item xs={12} display="flex" alignItems="center" justifyContent="center">
              <Box display="flex" alignItems="center" justifyContent="center" width="100%">
                <Drawer
                  className={classes.drawer}
                  variant="permanent"
                  classes={{
                    paper: classes.drawerPaper,
                  }}
                >
                  <List className={classes.list}>
                    <ListItem button className={classes.listItem} onClick={() => { props.setMonthState(false) }}>
                      <ListItemText primary={(
                        <Box display="flex" alignItems="center" justifyContent="center">
                          <ArrowBackIosNewIcon />
                        </Box>
                      )} />
                    </ListItem>

                    <ListItem button className={classes.listItemLong} ref={calendarButtonRef}>
                      <ListItemText primary={(
                        <Box display="flex" alignItems="center" justifyContent="center">
                          <Typography fontSize={17}>{props.dateLabel}</Typography>
                        </Box>
                      )} />
                      {calendarOpen && (
                        <div className={classes.navList} style={{ boxShadow: "0px 0px 5px 0px rgb(0, 0, 0, 0.5)" }} ref={calendarRef}>
                          <nav aria-label="nav" className={classes.nav}>
                            <List style={{ display: "flex", flexWrap: "wrap" }}>


                            <ListItem component="div" className={classes.calendarItem}>
                              <Typography style={{ flex: 1, textAlign: 'center' }}>Pn</Typography>
                              </ListItem>

                              <ListItem component="div" className={classes.calendarItem}>
                              <Typography style={{ flex: 1, textAlign: 'center' }}>Wt</Typography>
                              </ListItem>

                              <ListItem component="div" className={classes.calendarItem}>
                              <Typography style={{ flex: 1, textAlign: 'center' }}>Śr</Typography>
                              </ListItem>

                              <ListItem component="div" className={classes.calendarItem}>
                              <Typography style={{ flex: 1, textAlign: 'center' }}>Czw</Typography>
                              </ListItem>

                              <ListItem component="div" className={classes.calendarItem}>
                              <Typography style={{ flex: 1, textAlign: 'center' }}>Pt</Typography>
                              </ListItem>

                              <ListItem component="div" className={classes.calendarItem}>
                              <Typography style={{ flex: 1, textAlign: 'center' }}>Sb</Typography>
                              </ListItem>

                              <ListItem component="div" className={classes.calendarItem}>
                              <Typography style={{ flex: 1, textAlign: 'center' }}>Ndz</Typography>
                              </ListItem>


                            { calendarDaysBefore }


                           { [...Array(getDaysInMonth(props.selectedMonth))].map((_, index) => {
          var day = index + 1; // Calculate the day value based on the iteration index
          console.log("Selection start: " + calendarSelection[0] + "\nSelection end: " + calendarSelection[1]);
          var listItemStyle = {
            background: (day >= calendarSelection[0] && day <= calendarSelection[1]) ? "rgba(0, 0, 255, 0.25)" : "none"
          };
        
          return (
            <ListItem
              key={day}
              button
              component="div"
              className={classes.calendarItem}
              style={listItemStyle}
              onMouseDown={(event) => handleMouseDown(event, day)}
              onMouseEnter={() => handleMouseEnter(day)}
              onMouseUp={handleMouseUp}
            >
              <Typography style={{ flex: 1, textAlign: 'center' }}>
                {day}
              </Typography>
            </ListItem>
          )})}


{ calendarDaysAfter }
                            </List>
                          </nav>
                        </div>
                      )}
                    </ListItem>

                    <ListItem button className={classes.listItem} onClick={() => { props.setMonthState(true) }}>
                      <ListItemText primary={(
                        <Box display="flex" alignItems="center" justifyContent="center">
                          <ArrowForwardIosIcon />
                        </Box>
                      )} />
                    </ListItem>

                    <NavOption />
                  </List>
                </Drawer>
              </Box>
            </Grid>
          ) : null}
        </Grid>
      </AppBar>
    </React.Fragment>
  );


  
}

export default ResponsiveAppBar;
