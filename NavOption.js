import React, { useEffect, useRef, useState } from 'react';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useStyles } from './ResponsiveAppBar';
import { Box } from '@mui/system';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const useStyles2 = makeStyles((theme) => ({
  navList: {
    position: 'absolute',
    background: 'white',
    width: 300,
    zIndex: 1,
    top: 49,
    left: 0,
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  nav: {
    width: "100%"
  }
}));

function NavOption() {
  const [sortOpen, setSortOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const sortListRef = useRef();
  const filterListRef = useRef();

  const switchSortOpen = () => {
    setSortOpen(!sortOpen);
  };

  const switchFilterOpen = () => {
    setFilterOpen(!filterOpen);
  };




  useEffect(() => {
    const handleClickOutside = (event) => {
      handleClickSortOutside(event);
      handleClickFilterOutside(event);
    };
  
    window.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);
  
  const handleClickSortOutside = (event) => {
    if (sortListRef.current && event && !sortListRef.current.contains(event.target)) {
      setSortOpen(false);
    }
  };
  
  const handleClickFilterOutside = (event) => {
    if (filterListRef.current && event && !filterListRef.current.contains(event.target)) {
      setFilterOpen(false);
    }
  };



  

  const classes = useStyles();
  const classes2 = useStyles2();

  // Define your navigation items as an array with unique IDs
  const navigationItems = [
    { id: "orderId", label: "Po numerze zamówienia" },
    { id: "orderIndex", label: "Po indeksie" },
    { id: "leaksCount", label: "Po ilości nieszczelności" },
    { id: "loginTime", label: "Po czasie logowania" },
    { id: "startTime", label: "Po czasie rozpoczęcia naprawy" },
    { id: "endTime", label: "Po czasie zakończenia naprawy" }

  ];

  return (
    <React.Fragment>
      <ListItem button component="div" onClick={switchSortOpen} className={classes.listItem} ref={sortListRef}>
        <Box display="flex" alignItems="center" justifyContent="center" width="100%">
          <Typography style={{ flex: 1, textAlign: 'center' }}>Sortuj</Typography>
          <ArrowDropDownIcon />
        </Box>

        {sortOpen && (
          <div className={classes2.navList} style={{ boxShadow: "0px 0px 5px 0px rgb(0, 0, 0, 0.5)" }}>
            <nav aria-label="nav" className={classes2.nav}>
              <List>
                {/* Generate list items dynamically */}
                {navigationItems.map((item) => (
                  <ListItem button component="div" onClick={switchSortOpen} key={item.id}>
                    <Typography style={{ flex: 1, textAlign: 'center' }}>{item.label}</Typography>
                  </ListItem>
                ))}
              </List>
            </nav>
          </div>
        )}
      </ListItem>



      <ListItem button component="div" onClick={switchFilterOpen} className={classes.listItem} ref={filterListRef}>
        <Box display="flex" alignItems="center" justifyContent="center" width="100%">
          <Typography style={{ flex: 1, textAlign: 'center' }}>Filtruj</Typography>
          <ArrowDropDownIcon />
        </Box>

        {filterOpen && (
          <div className={classes2.navList} style={{ boxShadow: "0px 0px 5px 0px rgb(0, 0, 0, 0.5)" }}>
            <nav aria-label="nav" className={classes2.nav}>
              <List>
                {/* Generate list items dynamically */}
                {navigationItems.map((item) => (
                  <ListItem button component="div" onClick={switchFilterOpen} key={item.id}>
                    <Typography style={{ flex: 1, textAlign: 'center' }}>{item.label}</Typography>
                  </ListItem>
                ))}
              </List>
            </nav>
          </div>
        )}
      </ListItem>
    </React.Fragment>
  );
}

export default NavOption;
