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
import { Alert, CircularProgress, Divider, Drawer, Grid, List, ListItem, ListItemText, Paper, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { createContext, useContext } from 'react';


import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import FadeMenu from './FadeMenu';
import NavOption from './NavOption';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { dark } from '@mui/material/styles/createPalette';

import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import { useEffect, useState, useRef } from 'react';
import { CSVLink } from 'react-csv';
import SearchIcon from '@mui/icons-material/Search';

import SquareButton from './SquareButton';




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
    justifyContent: "flex-start",
    overflow: "visible"
  },
  content: {
    flexGrow: 1,
  },
  listItem: {
    //width: 100,
    display: 'inline-flex',
    boxSizing: 'border-box',
    height: "100%"
  },
  list: {
    padding: 0,
    margin: 0,
    boxSizing: 'border-box',
  },
  navList: {
    position: 'absolute',
    background: 'white',
    width: 600,
    zIndex: 1,
    top: 67,
    //left: -200,
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    maxWidth: "100%",
  },
  nav: {
    width: 350,
  },
  calendarItem: {
    position: "relative",
    width: "13%",
    height: "13%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 20,
    fontWeight: 600,
    color: "black",
    background: "white",
    boxSizing: "border-box",
    cursor: "pointer",
    "&:hover": {
      background: "rgba(0, 0, 0, 0.1)",
    },
  },
  arrow: {
    display: 'inline-flex',
    boxSizing: 'border-box',
    height: "100%"
  },
  listPrimaryNoBtn: {
    background: "rgba(25, 118, 210, 0.8)",
    color: "white",
    textShadow: "4px 4px 5px rgba(66, 68, 90, 1)",
  },
  listSuccess: {
    background: "rgba(0, 255, 0, 1)", color: "white",
    textShadow: "4px 4px 5px rgba(66, 68, 90, 1)" 
  },
  listDanger: {
    background: "rgba(255, 0, 0, 0.6)", color: "white",
    textShadow: "4px 4px 5px rgba(66, 68, 90, 1)" 
  },
  listItemLong: {
    width: 400,
    display: 'flex',
    boxSizing: 'border-box',
    height: 60,
    paddingLeft: 20,
    paddingRight: 20,
    margin: 0,
    //background: "rgba(0, 60, 122, 1)",
    //color: "white",
  },

  separator: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 30
  }

  }));

export default function Nav(props) {
  const { dateStart, setDateStart, dateEnd, setDateEnd, refreshData, setRefreshData } = props;

    const calendarRef = useRef();
    const timeRef = useRef();
    const calendarButtonRef = useRef(); 

    const [calendarOpen, setCalendarOpen] = React.useState(false);

  
    
    const isMouseDownRef = React.useRef(false); // Ref for mouse button
    const calendarSelectionStart = React.useRef(-1); // Ref for mouse button
    const [calendarDaysAfter, setCalendarDaysAfter] = React.useState(null)
    const [calendarDaysBefore, setCalendarDaysBefore] = React.useState(null)
    const [calendarVisibleMonth, setCalendarVisibleMonth] = React.useState(new Date(Date.now()))
    
    const [calendarSelection, setCalendarSelection] = React.useState([])
    const [selectFromDate, setSelectFromDate] = React.useState(dateStart)
    const [selectToDate, setSelectToDate] = React.useState(dateEnd)

    const classes = useStyles();


    const selectionFromDate = React.useRef(null);

    const componentRef = useRef();

    const darkRef = useRef();

    const closeCalendarRef = useRef();

    const { pagesCount, setPagesCount, currentPage, setCurrentPage } = props;

    const [manualSelection, setManualSelection] = React.useState(true);

    const [isMobile, setIsMobile] = React.useState(false);

    const { rows, setRows } = props;
    const searchInputRef = useRef(null);

    

    /*
    const getCalendarVisibleMonth = () => {
      var date = new Date(calendarVisibleMonth);
      const options = { month: 'long', year: 'numeric' };
      const formattedDate = calendarVisibleMonth.toLocaleString('pl-PL', options);
      return ( formattedDate) ;
    }
    */

    const refresh = () => {
      console.log("Refreshing now...")
      setRefreshData(true)
    }

    const getCalendarVisibleMonth = () => {
      const options = { month: 'long', year: 'numeric' };
      const formattedDate = calendarVisibleMonth.toLocaleString('pl-PL', options);
      return formattedDate;
    };

    const handleMouseDown = (event, index) => {
        if (event.button === 0) {
          calendarSelectionStart.current = index;
          
          // Left mouse button is pressed
          isMouseDownRef.current = true;
          console.log("index: " + calendarSelectionStart.current)
          setCalendarSelection([calendarSelectionStart.current, calendarSelectionStart.current]);

          var date = new Date(calendarVisibleMonth.getFullYear(), calendarVisibleMonth.getMonth(), calendarSelectionStart.current);
          date.setHours(0);
          date.setMinutes(0);
          date.setSeconds(0);
          setSelectFromDate(date)

          var date2 = new Date(calendarVisibleMonth.getFullYear(), calendarVisibleMonth.getMonth(), calendarSelectionStart.current);
          date2.setHours(23);
          date2.setMinutes(59);
          date2.setSeconds(59);
          setSelectToDate(date2)
          
          console.log("Mouse down over calendar detected. Start value: " + calendarSelectionStart.current)
        }
      };
      
      
      const handleMouseEnter = (index) => {
        if (isMouseDownRef.current) {
      
          //var selection = [calendarSelectionStart]; // Use spread syntax to create a new array
      
          if (index > calendarSelectionStart.current) {
            setCalendarSelection([calendarSelectionStart.current, index])
            var date = new Date(calendarVisibleMonth.getFullYear(), calendarVisibleMonth.getMonth(), calendarSelectionStart.current);
            date.setHours(0);
            date.setMinutes(0);
            date.setSeconds(0);
            setSelectFromDate(date)

            var date2 = new Date(calendarVisibleMonth.getFullYear(), calendarVisibleMonth.getMonth(), index);
            date2.setHours(23);
            date2.setMinutes(59);
            date2.setSeconds(59);
            setSelectToDate(date2)
          } else {
            setCalendarSelection([index, calendarSelectionStart.current])
            var date = new Date(calendarVisibleMonth.getFullYear(), calendarVisibleMonth.getMonth(), index);
            date.setHours(0);
            date.setMinutes(0);
            date.setSeconds(0);
            setSelectFromDate(date)

            var date2 = new Date(calendarVisibleMonth.getFullYear(), calendarVisibleMonth.getMonth(), calendarSelectionStart.current);
            date2.setHours(23);
            date2.setMinutes(59);
            date2.setSeconds(59);
            setSelectToDate(date2)
          }
      
        }
      };



  React.useEffect(() => {
    /*
      if(calendarVisibleMonth ){
        calendarSelection[0]
        calendarSelection[1] = new Date(selectToDate).getDate();
      }
      */ 

    window.addEventListener("mouseup", handleMouseUp);


    var date = new Date(calendarVisibleMonth);
    date.setDate(0);

    var date2 = new Date(calendarVisibleMonth);
    date2.setMonth(date2.getMonth() + 1);
    date2.setDate(0)

    const remainingDays = 7 - ((date.getDay() + new Date(calendarVisibleMonth.getFullYear(), calendarVisibleMonth.getMonth() + 1, 0).getDate()) % 7);
    console.log("remainingDays: " + remainingDays)
    console.log("date.getDay(): " + date.getDay())
    console.log("date.getDate(): " + date.getDate())
      console.log("date2.getDay(): " + date2.getDay())
      console.log("date2.getDate(): " + date2.getDate())



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
              { date.getDate() + index + 1 - date.getDay()}
            </Typography>
          </ListItem>
        );
        }))



        //setCalendarDays();

        

        const handleClickOutside = (event) => {
          //console.log(calendarButtonRef.current.contains(event.target))
          if (!((calendarRef.current && timeRef.current) && event && (calendarRef.current.contains(event.target) || timeRef.current.contains(event.target))) || (closeCalendarRef.current && closeCalendarRef.current.contains(event.target))) {
      
            
            if(calendarOpen) {
              if(dateStart !== selectFromDate || dateEnd !== selectToDate) {
                setDateStart(selectFromDate);
                setDateEnd(selectToDate);
                setRefreshData(true);
              }
            }
            

          if (event && calendarButtonRef.current &&  calendarButtonRef.current.contains(event.target)) {
            setCalendarOpen(!calendarOpen);
          } else if(calendarOpen) {
            setCalendarOpen(false)
            
          }

          
        }
      }




      
      var start = null;
      var end = null;

      
      if(selectFromDate <= new Date(calendarVisibleMonth.getFullYear(), calendarVisibleMonth.getMonth(), 1)) {
        start = 1;
      } else {
        if(calendarVisibleMonth.getFullYear() == selectFromDate.getFullYear() && calendarVisibleMonth.getMonth() == selectFromDate.getMonth()) {
          start = selectFromDate.getDate();
        }
        
      }

      var date = new Date(calendarVisibleMonth.getFullYear(), calendarVisibleMonth.getMonth() + 1, 0);
      if(selectToDate >= date) {
        end = date.getDate();
      } else {
        if(calendarVisibleMonth.getFullYear() == selectToDate.getFullYear() && calendarVisibleMonth.getMonth() == selectToDate.getMonth()) {
          end = selectToDate.getDate();
        }
      }

      console.log("Start: " + start + " End: " + end)
      setCalendarSelection([start, end])
      



      



      window.addEventListener('resize', handleWindowResize);
      handleWindowResize();



        window.addEventListener('click', handleClickOutside);
        return () => {
          window.removeEventListener('click', handleClickOutside);
          window.removeEventListener('resize', handleWindowResize);
        };
  }, [selectFromDate, selectToDate, calendarOpen, calendarVisibleMonth])




  const handleWindowResize = (event) => {
    var screenWidth = window.innerWidth;
    
    if (screenWidth >= 1280) {
      setIsMobile(false);
    } else {
      setIsMobile(true);
    }
}


/*
  const getDaysInMonth = (dateString) => {
    var date = new Date(dateString);
    return new Date(date.getFullYear(), date.getMonth(), 0).getDate();
  };
  */

  const handleMouseUp = () => {
    isMouseDownRef.current = false;
    calendarSelectionStart.current = -1;
    console.log("Mouse up")
  };




  const changeVisibleMonth = (delta) => {
    var date = new Date(calendarVisibleMonth);
    date.setMonth(date.getMonth() + delta);
    setCalendarVisibleMonth(date)
  }



    return (
      <React.Fragment>
        <Paper>
    <Grid item xs={12} display="flex" alignItems="center" justifyContent="center">
      <Box display="flex" alignItems="center" justifyContent="center" width="100%">
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <List className={classes.list} style={{ display: "inline-flex" }}>
          <NavOption variant="back" autoWidth />
            

            <ListItem button className={classes.listItemLong} ref={calendarButtonRef}>
            
              <ListItemText primary={(
                <Box display="flex" alignItems="center" justifyContent="center">
                  <Grid container style={{ textAlign: "center" }}>
                    <Grid item xs={12}>
                  <Typography sx={{ color: 'text.secondary' }}>Aktualnie wyświetlam wyniki dla:</Typography>
                  </Grid>
                  <Grid item xs={12}>
                  <Typography>{ dateStart.toLocaleString() } => { dateEnd.toLocaleString() }</Typography>
                  </Grid>
                  </Grid>
                </Box>
              )} />
              
              
            </ListItem>








            <NavOption variant="pagination" label={`Strona: ${currentPage + 1}/${pagesCount}`} count={pagesCount} setCurrentPage={setCurrentPage} />
            
             { /*TODO: Check why does not work properly: 
             <NavOption variant="refresh" refresh={refresh} label="Odśwież" autoWidth />
              */ }

            <CSVLink data={props.filteredRows} filename={'Export.csv'} separator=";" headers={ props.headers }>
              <NavOption variant="export" label="Exportuj do CSV" autoWidth />
            </CSVLink>

            {/* Odświeżanie danych */}
            


            
            
          </List>

          <Box sx={{ position: 'absolute', right: 20, boxSizing: 'border-box', display: "flex", alignItems: 'center', justifyContent: 'center', top: 5 }}>
                  <form onSubmit={(event) => {
                      event.preventDefault();
                      if(searchInputRef.current.value != props.searchValue) {
                        props.setIsSearching(true);
                      }
                      
                      props.setSearchValue(searchInputRef.current.value);
                      console.log("Search value: " + searchInputRef.current.value)
                      
                    }}>
                  <TextField
                    id="standard-search"
                    label="Wyszukaj"
                    type="search"
                    variant="standard"
                    inputRef={searchInputRef}
                    sx={{ marginRight: 2 }}
                  />

                  <SquareButton type="submit" size="50" variant='contained'>
                    { props.isSearching ? (
                      <CircularProgress size={20} color="inherit" style={{ }} />
                    ) : (
                      <SearchIcon fontSize='large' />
                    ) }
                  
                  
                  </SquareButton>
                  </form>
                </Box>
                
          
        </Drawer>
      </Box>
    </Grid>
    </Paper>
    { calendarOpen && (
      <div style={{position: "absolute", background: "rgba(0,0,0,0.75)", top: 0, left: 0, width: "100vw", height: "105vh"}} ref={darkRef}>


<React.Fragment>
  
                    <Grid container style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
                      <Grid item xs={12} xl={5} lg={6} sx={{  display: isMobile && !manualSelection ? ("none") : ("flex"), alignItems: "center", justifyContent: "center" }}>
                <div className={classes.navList} style={{ boxShadow: "0px 0px 5px 0px rgb(0, 0, 0, 0.5)", color: "black" }} ref={timeRef}>




                  
                  <Grid container sx={{ display: 'flex', justifyContent: 'center' }}>
                    {!isMobile && (
                      <Grid item xs={12}>
                    <Alert sx={{ display: "flex", alignItems: "center", justifyContent: 'center' }} severity='info'>Wybierz czas a następnie zamknij kalendarz, aby odświeżyć wyniki. Możesz zaznaczyć dni bezpośrednio na kalendarzu po prawej stronie.
                    </Alert>
                    </Grid>
                    )}
                  

            <Grid item xs={12}>
                  <ListItem onClick={() => {  }} className={classes.listPrimaryNoBtn}>
              <ListItemText primary={(
                <Box display="flex" alignItems="center" justifyContent="center">
                  ZAZNACZ CZAS POCZĄTKOWY:
                </Box>
                
              )} />
            </ListItem>
            </Grid>
            
            <Grid item xs={3} sx={{ display: "flex", alignItems: "center", paddingLeft: 1 }}>
            <Typography style={{ fontSize: "clamp(5px, 3vw, 15px)" }}>Data początkowa:</Typography>
            </Grid>

            
            <Grid item xs={3}>
            <NavOption variant="day" label={selectFromDate.getDate()} setDate={setSelectFromDate} date={selectFromDate} context="from" />
            </Grid>


            <Grid item xs={3}>
            <NavOption variant="month" label={selectFromDate.toLocaleString(props.selectedLanguage, { month: 'long' })} setDate={setSelectFromDate} date={selectFromDate} selectedLanguage={props.selectedLanguage} context="from" />
            </Grid>

            <Grid item xs={3}>
            <NavOption variant="year" label={selectFromDate.getFullYear()} setDate={setSelectFromDate} date={selectFromDate} context="from" />
            </Grid>

            

            <Grid item xs={4} sx={{ display: "flex", alignItems: "center", paddingLeft: 1 }}>
            <Typography style={{ fontSize: "clamp(5px, 3vw, 15px)" }}>Godzina początkowa:</Typography>
            </Grid>

            <Grid item xs={8}>
            <Grid container>

            <Grid item xs={3}>
<NavOption variant="hour" label={selectFromDate.getHours().toString().padStart(2, '0')} setDate={setSelectFromDate} date={selectFromDate} autoWidth />
</Grid>

<Typography variant='h5' sx={{ display: "flex", alignItems: "center", justifyContent: 'center' }}>:</Typography>

<Grid item xs={3}>
<NavOption variant="minutes" label={selectFromDate.getMinutes().toString().padStart(2, '0')} setDate={setSelectFromDate} date={selectFromDate} autoWidth />
</Grid>

<Typography variant='h5' sx={{ display: "flex", alignItems: "center", justifyContent: 'center' }}>:</Typography>

<Grid item xs={3}>
<NavOption variant="seconds" label={selectFromDate.getSeconds().toString().padStart(2, '0')} setDate={setSelectFromDate} date={selectFromDate} autoWidth />
</Grid>

</Grid>
</Grid>


            <Grid item xs={12} className={classes.listPrimaryNoBtn}>
                  <ListItem onClick={() => {  }}>
              <ListItemText primary={(
                <Box display="flex" alignItems="center" justifyContent="center">
                  ZAZNACZ CZAS KOŃCOWY:
                </Box>
                
              )} />
            </ListItem>
            </Grid>

            <Grid item xs={3} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Typography variant='body1'>Data końcowa:</Typography>
            </Grid>


            <Grid item xs={3}>
            <NavOption variant="day" label={selectToDate.getDate()} setDate={setSelectToDate} date={selectToDate} context="to" />
            </Grid>


            <Grid item xs={3}>
            <NavOption variant="month" label={selectToDate.toLocaleString(props.selectedLanguage, { month: 'long' })} setDate={setSelectToDate} date={selectToDate} selectedLanguage={props.selectedLanguage} context="to" />
            </Grid>

            <Grid item xs={3}>
            <NavOption variant="year" label={selectToDate.getFullYear()} setDate={setSelectToDate} date={selectToDate} context="to"  />
            </Grid>

            


            <Grid item xs={4} sx={{ display: "flex", alignItems: "center", paddingLeft: 1 }}>
            <Typography style={{ fontSize: "clamp(5px, 3vw, 15px)" }}>Godzina końcowa:</Typography>
            </Grid>

            <Grid item xs={8}>
            <Grid container>
            <Grid item xs={3}>
<NavOption variant="hour" label={selectToDate.getHours().toString().padStart(2, '0')} setDate={setSelectToDate} date={selectToDate} autoWidth />
</Grid>
<Typography variant='h5' sx={{ display: "flex", alignItems: "center", justifyContent: 'center' }}>:</Typography>
<Grid item xs={3}>
<NavOption variant="minutes" label={selectToDate.getMinutes().toString().padStart(2, '0')} setDate={setSelectToDate} date={selectToDate} autoWidth />
</Grid>
<Typography variant='h5' sx={{ display: "flex", alignItems: "center", justifyContent: 'center' }}>:</Typography>
<Grid item xs={3}>
<NavOption variant="seconds" label={selectToDate.getSeconds().toString().padStart(2, '0')} setDate={setSelectToDate} date={selectToDate} autoWidth />
</Grid>





</Grid>
</Grid>


{isMobile && (
  <Grid item xs={6}>
            <ListItem button className={classes.arrow} onClick={() => { setManualSelection(false) }}>
              <ListItemText style={{ fontSize: "clamp(5px, 3vw, 15px)" }} primary={(
            <Box display="flex" alignItems="center" justifyContent="center">Pokaż widok kalendarza</Box>
              )} />
            </ListItem>

            </Grid>
)}


<Grid item xs={isMobile ? 6 : 12}>
            <ListItem button className={classes.arrow} onClick={() => { setManualSelection(true) }} ref={closeCalendarRef}>
              <ListItemText sx={{ display: "flex", alignItems: "center", justifyContent: "center" }} primary={(
            <Box display="flex" alignItems="center" justifyContent="center">Zamknij i wyświetl wyniki</Box>
              )} />
            </ListItem>

            </Grid>

            
              </Grid>
                </div>
                </Grid>








              
                <Grid item xl={5} xs={12} lg={6} sx={{ display: isMobile && manualSelection ? ("none") : ("flex"), alignItems: "center", justifyContent: "center" }}>
                  
                <div className={classes.navList} style={{ boxShadow: "0px 0px 5px 0px rgb(0, 0, 0, 0.5)", color: "black" }} ref={calendarRef}>
                  <Grid container>
                <Grid item xs={12} className={classes.listPrimaryNoBtn}>
                  <ListItem onClick={() => {  }}>
              <ListItemText primary={(
                <Box display="flex" alignItems="center" justifyContent="center">
                  <Typography>{ getCalendarVisibleMonth() }</Typography>
                </Box>
                
              )} />
            </ListItem>
            </Grid>
            <Grid item xs={2}>
                  <ListItem button className={classes.arrow} onClick={() => { changeVisibleMonth(-1) }}>
              <ListItemText primary={(
                <Box display="flex" alignItems="center" justifyContent="center">
                  <ArrowBackIosNewIcon />
                </Box>
              )} />
            </ListItem>
            </Grid>
            <Grid item xs={8} display="flex" alignItems="center" justifyContent="center">
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


                    { [...Array(new Date(calendarVisibleMonth.getFullYear(), calendarVisibleMonth.getMonth() + 1, 0).getDate())].map((_, index) => {
  var day = index + 1; // Calculate the day value based on the iteration index
  //console.log("Selection start: " + calendarSelection[0] + "\nSelection end: " + calendarSelection[1]);
  var listItemStyle = {
    background: (calendarSelection[0] && day >= calendarSelection[0] && calendarSelection[1] && day <= calendarSelection[1]) ? "rgba(0, 0, 255, 0.25)" : "none"
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
                  </Grid>

                  <Grid item xs={2}>
                  <ListItem button className={classes.arrow} onClick={() => { changeVisibleMonth(1) }}>
              <ListItemText primary={(
                <Box display="flex" alignItems="center" justifyContent="center">
                  <ArrowForwardIosIcon />
                </Box>
                
              )} />
            </ListItem>

            
            </Grid>
            {isMobile && (
            <Grid item xs={12}>
            <ListItem button className={classes.arrow} onClick={() => { setManualSelection(true) }}>
              <ListItemText primary={(
            <Box display="flex" alignItems="center" justifyContent="center">Pokaż widok listy</Box>
              )} />
            </ListItem>

            </Grid>
            )}
            </Grid>
                </div>
                </Grid>

                
                </Grid>
</React.Fragment>



      </div>
    )}
    

    
    </React.Fragment>

  )
              }