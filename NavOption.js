import React, { useContext, useEffect, useRef, useState } from 'react';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Box } from '@mui/system';
import plFlag from "./Flags/pl.jpg";
import enFlag from "./Flags/en.jpg";
import ruFlag from "./Flags/ru.jpg";
import { PropaneSharp, RecentActorsOutlined } from '@mui/icons-material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { FixedSizeList } from 'react-window';
import { MyContext } from './App';

export const navStyles = makeStyles((theme) => ({
  navList: {
    position: 'absolute',
    background: 'white',
    width: 300,
    zIndex: 1,
    top: 60,
    left: 0,
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    boxShadow: '0px 0px 5px 0px rgb(0, 0, 0, 0.5)',
    color: "black",
    padding: 0,
    margin: 0
  },
  navListLeft: {
    position: 'absolute',
    background: 'white',
    width: 300,
    zIndex: 1,
    top: 115,
    right: 0,
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0px 0px 5px 0px rgb(0, 0, 0, 0.5)',
    color: "black",
  },
  listItem: {
    width: 150,
    display: 'flex',
    boxSizing: 'border-box',
    height: 60,
    paddingLeft: 20,
    paddingRight: 20,
    margin: 0,
    //background: "rgba(0, 60, 122, 1)",
    //color: "white",
  },
  listItemNoWidth: {
    //width: 150,
    display: 'flex',
    boxSizing: 'border-box',
    height: 60,
    paddingLeft: 20,
    paddingRight: 20,
    margin: 0,
    //background: "rgba(0, 60, 122, 1)",
    //color: "white",
  },
  listItemShort: {
    width: 100,
    display: 'flex',
    boxSizing: 'border-box',
    height: 60,
    paddingLeft: 20,
    paddingRight: 20,
    margin: 0,
    //background: "rgba(0, 60, 122, 1)",
    //color: "white",
  },
}));

const NavOption = (props) => {
  const [open, setOpen] = useState(false);
  const listRef = useRef();
  const {setExporting, currentPage, pagesCount, setCurrentPage} = useContext(MyContext)
  const [expandUp, setExpandUp] = useState(false);
  const [maxListHeight, setMaxListHeight] = useState(350)
  const [maxListHeightUp, setMaxListHeightUp] = useState(350)
  const [itemWidth, setItemWidth] = useState(0)

  const switchOpen = (index) => {
    if (index != null) {
      const newDate = new Date(props.date);

      if (props.variant === "day") {
        newDate.setDate(index);
      }
  
      if (props.variant === "month") {
        newDate.setMonth(index);
      }
  
      if (props.variant === "year") {
        newDate.setFullYear(index);
      }

      if (props.variant === "hour") {
        newDate.setHours(index);
      }

      if (props.variant === "minutes") {
        newDate.setMinutes(index);
      }

      if (props.variant === "seconds") {
        newDate.setSeconds(index);
      }

      



      if(props.context) {
        if(props.context === "from") {
          newDate.setHours(0);
          newDate.setMinutes(0);
          newDate.setSeconds(0);
        }
        if(props.context === "to") {
          newDate.setHours(23);
          newDate.setMinutes(59);
          newDate.setSeconds(59);
        }
      }



      if (props.variant === "pagination") {
        console.log("Switched to: " + index)
        window.scrollTo({top: 0, behavior: 'smooth'});
        setCurrentPage(index)
        return;
      }

      

      props.setDate(newDate);
      console.log("Switched to: " + newDate);
      return;
    }
    

    if(props.variant === "back") {
      window.history.back();
    }
  
    if (props.variant == "refresh") {
      props.refresh();
    }

    if(props.variant == "openHeliumSelector") {
      props.setSelectorOpen(props.appName);
    }

    if(props.variant == "previousPage") {
      var newValue = currentPage - 1;
      if(newValue >= 0) {
        console.log("Clicked page switch: " + newValue)
        setCurrentPage(newValue)
      }
    }

    if(props.variant == "nextPage") {
      var newValue = currentPage + 1;
      if(newValue < pagesCount.current) {
        console.log("Clicked page switch: " + newValue)
        setCurrentPage(newValue)
      }
    }

    if(props.variant == "add") {
      props.setEditModalState(-1);
    }

    if(props.variant == "export") {
      setExporting(true);
    }


    if(index == null && (props.variant == "pagination" || props.context == "from" || props.context == "to" || props.variant === "day" || props.variant === "month" || props.variant === "year" || props.variant === "hour" || props.variant === "minutes" || props.variant === "seconds")) {
      setOpen(true);
    }
    
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (listRef.current && !listRef.current.contains(event.target)) {
        setOpen(false);
        
      } else {
        
      }
    };

    


    window.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, [listRef, props.date]);

  const classes = navStyles();



  useEffect(() => {
    const viewportHeight = window.innerHeight;
    const buttonRect = listRef.current.getBoundingClientRect() || 0;
    const topOffset = buttonRect.top + buttonRect.height;
    const maxHeight = viewportHeight - topOffset - 10; // Adjust as needed
    //setMaxListHeight(maxHeight);
    //setMaxListHeightUp(300);



    if(maxHeight < 200) {
      setExpandUp(true)
    } else {
      setExpandUp(false)
    }
  }, [window.innerHeight,])




  // Define your navigation items as an array with unique IDs
  const navigationItems = [
    { id: 'orderId', label: 'Po numerze zamówienia' },
    { id: 'orderIndex', label: 'Po indeksie' },
    { id: 'leaksCount', label: 'Po ilości nieszczelności' },
    { id: 'loginTime', label: 'Po czasie logowania' },
    { id: 'startTime', label: 'Po czasie rozpoczęcia naprawy' },
    { id: 'endTime', label: 'Po czasie zakończenia naprawy' },
  ];

  const languages = [
    { id: 'pl', label: 'Polski', flag: plFlag },
    { id: 'en', label: 'English', flag: enFlag },
    { id: 'ru', label: 'Русский', flag: ruFlag },
  ];

  
  var daysInMonth = 31;
  if(props.date != null) {
    const d = new Date(props.date);
    daysInMonth = (new Date(d.getFullYear(), d.getMonth() + 1, 0)).getDate();
  }
    const dayLabels = Array.from(Array(daysInMonth), (_, index) => index + 1).map((day) => ({
      id: `day-${day}`,
      label: day,
    }));
  

  const monthLabels = Array.from(Array(12), (_, index) => {
    const date = new Date(2000, index, 1);
    return date.toLocaleString(props.selectedLanguage, { month: 'long' });
  });

  const monthNavigationItems = monthLabels.map((label, index) => ({
    id: `month-${index + 1}`,
    label: label,
  }));

  const currentYear = new Date().getFullYear();
  const range = currentYear - 2000 + 1; // add 1 because we want to include the current year in our range

  const yearNavigationItems = Array.from(Array(range), (_, index) => 2000 + index).map((year) => ({
    id: `year-${year}`,
    label: new Date(year, 0).toLocaleString(props.selectedLanguage, { year: 'numeric' }),
  }));


  const hourNavigationItems = Array.from(Array(24), (_, index) => index).map((hour) => ({
    id: `hour-${hour}`,
    label: hour,
  }));

  const minuteNavigationItems = Array.from(Array(60), (_, index) => index).map((minute) => ({
    id: `minute-${minute}`,
    label: minute,
  }));

  const secondsNavigationItems = Array.from(Array(60), (_, index) => index).map((second) => ({
    id: `second-${second}`,
    label: second,
  }));

  var c = 1;

if(props.count != null || props.count != undefined) {
  c = parseInt(props.count);
}

  const paginationItems = Array.from(Array(c), (_, index) => index).map((index) => ({
    id: `page-${index}`,
    label: index + 1,
    index: index,
  }));


  const Row = ({ index, style }) => {
    return (
      <ListItem
        button
        onClick={() => { switchOpen(index) }}
        key={index}
        style={{ ...style, width: '100%' }}
      >
        <Typography style={{ flex: 1, textAlign: 'center' }}>{index + 1}</Typography>
      </ListItem>
    );
  };



  return (
    <React.Fragment>
      <ListItem button onClick={() => { switchOpen(null) }} ref={listRef} className={
        classes.listItem
        } style={ props.autoWidth && ({width: 'auto'})}>
        <ListItemText sx={props.variant == "translate" && ({margin: 3})} style={{display: "flex", justifyContent: "center", alignItems: "center" }} primary={
          (props.variant == "back" && (<div style={{ display: "flex", justifyContent: "center" }}><ArrowBackIcon /> Powrót</div>))
          || (
            <Box display="flex" alignItems="center" justifyContent="center" width="100%">
              <Typography style={{ flex: 1, textAlign: 'center' }}>{props.label}</Typography>
              {props.variant != "name" && props.variant != "export" && props.variant != "refresh" && props.variant != "previousPage" && props.variant != "add" && props.variant != "nextPage" && props.variant != "openHeliumSelector" && <ArrowDropDownIcon />}
            </Box>
          )
        } />
        
          
        {open && (
          <div className={props.variant == "translate" ? (classes.navListLeft) : (classes.navList) } style={{ height: expandUp ? maxListHeightUp : maxListHeight, top: expandUp ? -maxListHeightUp : 60, width: 200}}>
              <List disablePadding style={{ width: '100%', overflowY: "auto" }}>
                {props.variant == "translate" ? (
                  languages.map((item) => (
                    <ListItem button key={item.id} style={{ width: "100%" }} onClick={() => { props.setSelectedLanguage(item.id) }}>
                      <img src={item.flag} style={{ height: 40 }} /> 
                      <Typography variant='h6' style={{ flex: 1, textAlign: 'center' }}>{item.label}</Typography>
                    </ListItem>
                  ))
                ) : (
                  props.variant == "day" ? (
                   dayLabels.map((item) => (
                    <ListItem button onClick={() => { switchOpen(item.label) }} key={item.id} style={{ width: '100%' }}>
                    <Typography style={{ flex: 1, textAlign: 'center' }}>{item.label}</Typography>
                  </ListItem>
                    ))
                  ) : (
                    props.variant == "month" ? (
                      monthNavigationItems.map((item, index) => (
                        <ListItem button onClick={() => { switchOpen(index) }} key={item.id} style={{ width: '100%' }}>
                          <Typography style={{ flex: 1, textAlign: 'center' }}>{item.label}</Typography>
                        </ListItem>
                      ))
                      
                    ) : (
                      props.variant === 'year' ? (
                        yearNavigationItems.map((item) => (
                          <ListItem button onClick={() => { switchOpen(item.label) } } key={item.id} style={{ width: '100%' }}>
                            <Typography style={{ flex: 1, textAlign: 'center' }}>{item.label}</Typography>
                          </ListItem>
                        ))
                        ) : (
                          props.variant === 'hour' ? (
                            hourNavigationItems.map((item) => (
                              <ListItem button onClick={() => { switchOpen(item.label) }} key={item.id} style={{ width: '100%', }}>
                                <Typography style={{ flex: 1, textAlign: 'center' }}>{item.label}</Typography>
                              </ListItem>
                               ))
                          ) : (
                            props.variant === 'minutes' ? (
                              minuteNavigationItems.map((item) => (
                                <ListItem button onClick={() => { switchOpen(item.label) } } key={item.id} style={{ width: '100%', }}>
                                  <Typography style={{ flex: 1, textAlign: 'center' }}>{item.label}</Typography>
                                </ListItem>
                                 ))
                            ) : (
                              props.variant === 'seconds' ? (
                                secondsNavigationItems.map((item) => (
                                  <ListItem button onClick={() => { switchOpen(item.label) }} key={item.id} style={{ width: '100%', }}>
                                    <Typography style={{ flex: 1, textAlign: 'center' }}>{item.label}</Typography>
                                  </ListItem>
                                   ))
                              ) : (

                                props.variant === 'pagination' ? (
                                  <FixedSizeList
      height={expandUp ? maxListHeightUp : maxListHeight} // adjust this based on your viewport height
      width="100%"
      itemCount={props.count}
      itemSize={40} // height of each item (adjust if needed)
    >
      {Row}
    </FixedSizeList>
                                ) : (
                                  props.variant === 'sort' ? (
                                    navigationItems.map((item) => (
                                      <ListItem button onClick={switchOpen} key={item.id} style={{ width: '100%', }}>
                                        <Typography style={{ flex: 1, textAlign: 'center' }}>{item.label}</Typography>
                                      </ListItem>
                                  ))) : (
                                    <React.Fragment>
                                    </React.Fragment>
                                  )))
                                
                            ))))))}
                     
                              
                                  

                
              </List>
          </div>
        )}
      </ListItem>
    </React.Fragment>
  );
};

export default NavOption;
