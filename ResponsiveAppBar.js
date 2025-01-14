import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import logo from "./logo.jpg"
import { Drawer, Grid, List, ListItem, ListItemText, Paper, Stack, useMediaQuery } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { createContext, useContext } from 'react';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import FadeMenu from './FadeMenu';
import NavOption from './NavOption';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useRef } from 'react';
import zIndex from '@mui/material/styles/zIndex';
import TranslateIcon from '@mui/icons-material/Translate';
import { navStyles } from './NavOption';
import Nav from './Nav';
import { useParams } from 'react-router-dom';
import { MyContext, headers } from './App';

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function ResponsiveAppBar(props) {
  const classes = navStyles();
  const { appName } = useParams()

  const { dateStart, setDateStart, dateEnd, setDateEnd, refreshData, setRefreshData, timeStart, timeEnd } = props;

  const { currentPage, pagesCount } = useContext(MyContext)

  const isLargeScreen = useMediaQuery('(min-width: 960px)');
  const [prevScrollPos, setPrevScrollPos] = React.useState(0);
  const appBarRef = React.useRef();
  const [appBarVisible, setAppBarVisible] = React.useState(true);

  const { rows, setRows, searchTags, setSearchTags } = props;

  /*
  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = document.scrollY;
      //const visible = (prevScrollPos >= currentScrollPos + 50 || prevScrollPos <= currentScrollPos - 50);
      const visible = prevScrollPos >= currentScrollPos;

      setPrevScrollPos(currentScrollPos);
      setAppBarVisible(visible);
    };

    document.addEventListener('scrollend', handleScroll);

    

    return () => document.removeEventListener('scrollend', handleScroll);
  }, [prevScrollPos]);
*/


const handleScroll = (el) => {
  var positioner = document.getElementById("recordsPositioner");
  console.log("Position: scrollY: " + el.scrollY + "px, scorllTop: " + el.scrollTop + "px");
  if (el.scrollY == 0 || el.scrollTop == 0) {
    // User has scrolled to the top of the page
    console.log('User scrolled to the top!');
    setAppBarVisible(true);
    if(positioner != null) { 
      positioner.style.top = "170px";
    };
    // You can perform any desired action here
  } else {
    setAppBarVisible(false);
    if(positioner != null) {
      positioner.style.top = "70px";
    };
  }
};

  React.useEffect(() => {
    if(appBarVisible) {
      appBarRef.current.style.top = 0;
    } else {
      appBarRef.current.style.top = "-70px";
    }
  }, [appBarVisible])
  

  

  React.useEffect(() => {
    // Attach event listener when the component mounts
    handleScroll(window)

    window.addEventListener('scroll', () => { handleScroll(window) } );

    return () => {
      window.removeEventListener('scroll', () => { handleScroll(window) });
    };
    
  }, [window.location.href]);


  React.useEffect(() => {
    // Attach event listener when the component mounts
    var el = document.getElementById("recordsContainer");
    if(el != null) {
      handleScroll(el)
      el.addEventListener('scroll', () => { handleScroll(el) } );
      console.log("Assigned scroll listener to container")
    } else {
      console.log("Can't assign scroll listener to container")
    }

    return () => {
      if(el != null) {
        el.removeEventListener('scroll', () => { handleScroll(el) });
      }
  };


    
  }, [window.location.href]);

  

  /*
    setInterval(() => {
      var el = document.getElementById("recordsContainer");
    if(el == null) {
      console.log("Element is null")
    } else {
      var scrollTop = el.scrollTop;
      //console.log("scrollY: " + scrollTop);
      if (scrollTop <= 25) {
        // User has scrolled to the top of the page
        console.log('User scrolled to the top!');
        setAppBarVisible(true);
        // You can perform any desired action here
      } else {
        console.log("Checked scroll state");
        setAppBarVisible(false);}
    }
  }, 1000);
  */
    

  return (
    <React.Fragment>
      <AppBar sx={{ background: "white", padding: 0, margin: 0, color: "white", height: 70, width: "100vw", overflow: "visible", transition: 'top 0.4s ease-in-out' }} ref={appBarRef}>

            <Toolbar disableGutters sx={{ display: 'flex', alignItems: 'stretch', justifyContent: 'space-between', padding: 0, margin: 0 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', margin: 0, background: "rgba(0, 60, 122, 1)", flexGrow: 1 }}>
            <img onClick={() => {window.location.href = "/"}} src={logo} style={{ height: "100%" }} />
            <Typography sx={{ margin: 0, marginLeft: "20px", fontSize: "clamp(1.6vh, 2vh, 2.5vh)", whiteSpace: "nowrap", overflow: "hidden" }}>
              Panel Sest LU-VE – { appName ? appName : "Wybierz aplikację" }
            </Typography>
            
          </Box>

        { isLargeScreen && (
          <React.Fragment>
          <Box display="flex" alignItems="center" justifyContent="center" sx={{ background: "rgba(179, 29, 35, 1)" }} style={{ minWidth: 300 }}>
            {props.userId == null ? (
              <Typography variant="h6">
                { props.getSelectedLanguageString("notSignedIn") }
              </Typography>
            ) : (
              <Grid container style={{ height: "100%" }}>
                <Grid item xs={12} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Typography style={{ flex: 1, textAlign: 'center', color: "white" }} variant='h6'>{props.name} {props.surname} ({props.userId})</Typography>
                </Grid>
                <Grid item xs={12} onClick={() => {
                  sessionStorage.removeItem('token');
                  sessionStorage.removeItem('name');
                  sessionStorage.removeItem('surname');
                  sessionStorage.removeItem('userId');
                  sessionStorage.removeItem('isSignedInByLink');
                  if(sessionStorage.getItem('cardNumber') != null){
                    sessionStorage.removeItem('cardNumber');
                  }

                  window.location.href = "/";
                  }}>
              <List sx={{ alignItems: 'center', justifyContent: 'flex-end', color: "black", width: "100%", height: "100%" }} disablePadding>
              <ListItem button className={classes.listItemNoWidth} style={{ padding: 0, margin: 0 }} >
        <ListItemText primary={(

<Typography style={{ flex: 1, textAlign: 'center', color: "white" }} variant='body1'>{ props.getSelectedLanguageString("signOut") }</Typography>

        )} />
        </ListItem>
                </List>
                </Grid>
                </Grid>
            )}
          </Box>
        
          
{/*

<Box display="flex" alignItems="center" padding={0} margin={0}>
            <List sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: 0, margin: 0, color: "black" }}>
              <ListItem component="div" style={{ padding: 0, margin: 0 }}>
                <NavOption
                  variant="translate"
                  setSelectedLanguage={props.setSelectedLanguage}
                  label={
                    <Grid container>
                      <Grid item xs={12}>
                        <TranslateIcon fontSize="medium" />
                      </Grid>
                      <Grid item xs={12}>
                        <Typography>{props.selectedLanguage.toUpperCase()}</Typography>
                      </Grid>
                    </Grid>
                  }
                />
              </ListItem>
            </List>
          </Box>


        */}
          
          </React.Fragment>
          )}
        </Toolbar>
        
        
          {props.showNav == true && (
            <div style={{ position: "absolute", background: "red", width: "100%", overflow: "visible", marginTop: 70, textAlign: "center" }}>
            <Nav editModalState={props.editModalState} setEditModalState={props.setEditModalState} selectedHeliumMachinesId={props.selectedHeliumMachinesId} availableHeliumMachines={props.selectedHeliumMachinesId} appName={appName} selectorOpen={props.selectorOpen} setSelectorOpen={props.setSelectorOpen} headers={headers[appName]} isSearching={props.isSearching} setIsSearching={props.setIsSearching} searchTags={searchTags} setSearchTags={setSearchTags} rows={rows} setRows={setRows} dateStart={dateStart} setDateStart={setDateStart} dateEnd={dateEnd} setDateEnd={setDateEnd} selectedLanguage={props.selectedLanguage} refreshData={refreshData} setRefreshData={setRefreshData} />
          </div>
          )}
          
          
      </AppBar>
      
      
    </React.Fragment>
  );
}

export default ResponsiveAppBar;
