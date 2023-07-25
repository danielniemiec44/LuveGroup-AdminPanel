import React from 'react';
import { Typography, Paper, Box, TextField, Grid, Button, FormControl, OutlinedInput, FormHelperText, InputAdornment, Divider, Toolbar, ListItem, ListItemText, List, Drawer, TableContainer, Table, TableHead, TableRow, TableCell, Tab, TableBody } from "@mui/material";
import { makeStyles, styled } from '@mui/styles';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useRef, useEffect, useState } from 'react';
import NoSpacingGrid from "./NoSpacingGrid";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ExpandingRow from "./ExpandingRow.js";
import Nav from './Nav';
import { useParams } from 'react-router-dom';
import { tableCellClasses } from '@mui/material/TableCell';
import { ThemeProvider, createTheme } from '@mui/material/styles';


import { textAlign } from '@mui/system';
import { columnOrder, headers } from './App';
import EditModal from './EditModal';
import Papa from 'papaparse';

/*
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: 'rgba(255, 255, 255, 1)',
    color: 'rgb(0, 0, 0)',
    fontWeight: "bold",
    boxShadow: "0px 0px 3px 1px rgb(0, 0, 0, 0.5)",
    textAlign: "center"
    
  },
  [`&.${tableCellClasses.body}`]: {
    backgroundColor: 'rgb(100, 100, 100, 0.85)',
    color: "white",
    fontWeight: "bolder",
    fonSize: "30px",
    boxShadow: "0px 0px 3px 1px rgb(0, 0, 0, 0.5)",
    textAlign: "center"
  },
  [`&.${tableCellClasses.body}:hover`]: {
    backgroundColor: 'rgb(100, 100, 100, 1)',
  },
  
    const StyledTableRow = styled(TableRow)(({ theme }) => ({
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  
}));
*/


const useStyles = makeStyles((theme) => ({
  head: {
    backgroundColor: 'rgba(255, 255, 255, 1)',
    color: 'rgb(0, 0, 0)',
    fontWeight: 'bold',
    boxShadow: '0px 0px 3px 1px rgba(0, 0, 0, 0.5)',
    textAlign: 'center',
    padding: "5px",
    
  },
  body: {
    backgroundColor: 'rgb(100, 100, 100, 0.85)',
    color: 'white',
    fontWeight: 'bolder',
    fontSize: '15px',
    boxShadow: '0px 0px 3px 1px rgba(0, 0, 0, 0.5)',
    textAlign: 'center',
    padding: "5px",
    '&:hover': {
      backgroundColor: 'rgb(100, 100, 100, 1)',
    },
  },
  lastChild: {
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  },
  customTableContainer: {
    width: "100%",
    height: "100%",
    //overflowX: "auto",
  }
}));

export default function PanelV2(props) {
  const [editModalState, setEditModalState] = useState(null);
  const { appName } = useParams()

    const passwordRef = useRef(null);
    
    
    const { rows, setRows, isSignedInByLink, userId } = props;

    if(!sessionStorage.getItem("userId")) {
      window.location.href = "/";
    }

    

    const [password, setPassword] = React.useState("");

    const { dateStart, setDateStart, dateEnd, setDateEnd, refreshData, setRefreshData, pagesCount, setPagesCount, currentPage, setCurrentPage, rowsPerPage, setRowsPerPage } = props;
    
 

    const classes = useStyles();
    

    
    const extractedHeaders = headers[appName]





    
    

    


/*
function setDateRange(dateStart, dateEnd) {
    setDateStart(dateStart);
    setDateEnd(dateEnd);
    props.setSelectedMonth(props.selectedMonth.toISOString().split('T')[0]);
    const newDateLabel =
      dateStart.toISOString().split('T')[0] +
      ' - ' +
      dateEnd.toISOString().split('T')[0];
    props.setDateLabel(newDateLabel); // Pass dateLabel to App component
  }
*/



  function setDateLabel(dateLabel) {
    // Define the setDateLabel function to update the state or perform any necessary logic
    console.log('Date Label:', dateLabel);
    // You can set the state here if needed
    // setStateLabel(dateLabel);

    props.setDateLabel(dateLabel);
  }
  

/*
  function handleMonthChange(forward) {
    var monthsToAdd = 0;
    if(forward != undefined) {
      if(forward) {
        monthsToAdd = 1;
      } else {
        monthsToAdd = -1;
      }
  }


    var oldDate = new Date(Date.parse(props.calendarSelectionStart));
    oldDate.setMonth(oldDate.getMonth() + monthsToAdd);
    var startDate = new Date(oldDate.getFullYear(), oldDate.getMonth(), 2)
    var endDate = new Date(oldDate.getFullYear(), oldDate.getMonth() + 1, 1)
    setDateStart(startDate);
    setDateEnd(endDate);
    //var options = { year: 'numeric', month: 'long', day: 'numeric' };
    //props.setSelectedMonth(oldDate.toISOString().split('T')[0]);
    //setDateLabel(startDate.toISOString().split('T')[0] + " - " + endDate.toISOString().split('T')[0]);
    login(null, startDate, endDate);
}
*/

  useEffect(() => {
    if(appName == "Leaks") {
      fetchLeaks();
        /*handleMonthChange();

        
    if(props.monthState != null) {
      //handleMonthChange(props.monthState);
      props.setMonthState(null);
    }
    

    }, [props.monthState])
  */

    if(refreshData == true) {
      console.log("Refreshing data...")
      //login();
      fetchLeaks();
      setRefreshData(false);
    }
  } else if(appName == "WoodApp") {
    fetchWoodApp();

    if(refreshData == true) {
      console.log("Refreshing data...")
      //login();
      fetchWoodApp();
      setRefreshData(false);
    }
  } else if(appName == "HeliumTest") {
    fetchHelium();

    if(refreshData == true) {
      console.log("Refreshing data...")
      //login();
      fetchHelium();
      setRefreshData(false);
    }
  }


  function fetchLeaks(event) {
    if (event != null) {
        event.preventDefault();
    }

        props.showLoadingScreen();
        console.log("Attempt to login...");

        var dS = new Date(dateStart)
        var dSOffset = dS.getTimezoneOffset() * 60000;
        var dS = new Date(dS.getTime() - dSOffset);
        var dS = dS.toISOString();

        var dE = new Date(dateEnd)
        var dEOffset = dE.getTimezoneOffset() * 60000;
        var dE = new Date(dE.getTime() - dEOffset);
        var dE = dE.toISOString();

        

        fetch("/fetch_leaks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                'token': props.token,
                'dateStart': dS,
                'dateEnd': dE,
            })
        }).then(response => {
            response.json().then(data => {
                //console.log(data);
                if (data.result === "success") {
                  setRows(data.leaks);
                  //console.log("Data result length: " + data.leaks.length)
                  
                  setCurrentPage(0);
                }
            })
        }).catch(error => {
            console.error(error);
            props.hideLoadingScreen();
        }).finally(() => {
          props.hideLoadingScreen();
      });
  }





  function fetchWoodApp(event) {
    if (event != null) {
        event.preventDefault();
    }

        props.showLoadingScreen();
        console.log("Attempt to login...");

        var dS = new Date(dateStart)
        var dSOffset = dS.getTimezoneOffset() * 60000;
        var dS = new Date(dS.getTime() - dSOffset);
        var dS = dS.toISOString();

        var dE = new Date(dateEnd)
        var dEOffset = dE.getTimezoneOffset() * 60000;
        var dE = new Date(dE.getTime() - dEOffset);
        var dE = dE.toISOString();

        

        fetch("/fetch_woodapp", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                'token': props.token,
                'dateStart': dS,
                'dateEnd': dE,
            })
        }).then(response => {
            response.json().then(data => {
                //console.log(data);
                if (data.result === "success") {
                  setRows(data.orders);
                  //console.log("Data result length: " + data.orders.length)
                  
                  setCurrentPage(0);
                }
            })
        }).catch(error => {
            console.error(error);
            props.hideLoadingScreen();
        }).finally(() => {
          props.hideLoadingScreen();
      });
  }











  function fetchHelium(event) {
    if (event != null) {
        event.preventDefault();
    }

        props.showLoadingScreen();
        console.log("Attempt to login...");

/*

        var dS = new Date(dateStart)
        var dSOffset = dS.getTimezoneOffset() * 60000;
        var dS = new Date(dS.getTime() - dSOffset);
        var dS = dS.toISOString();

        var dE = new Date(dateEnd)
        var dEOffset = dE.getTimezoneOffset() * 60000;
        var dE = new Date(dE.getTime() - dEOffset);
        var dE = dE.toISOString();
*/

        Papa.parse("/helium_read", {
          download: true,
          complete: function(results) {
            setRows(results.data);
            console.log("Parsing complete!");
            props.hideLoadingScreen();
          }
        });
        


/*
        fetch("http://10.2.2.238:5100/helium_read", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                'token': props.token,
            })
        }).then(response => {
            response.json().then(data => {
                console.log(data);
                if (data.result === "success") {


                  //setRows();
                  
                  setCurrentPage(0);
                }
            })
        }).catch(error => {
            console.error(error);
            props.hideLoadingScreen();
        }).finally(() => {
          props.hideLoadingScreen();
      });
      */
  }
  
  
  
  


  


  }, [refreshData])





  useEffect(() => {
    if (props.searchValue == "") {
      console.log("All rows shown!")
      props.setFilteredRows(rows);
    } else {
      //const filtered = rows.filter(element => element.includes(props.searchValue));
      //filter all rows and inside rows filter any data and also convert to lowercase and also show only unique values

      const filtered = rows.filter(row => Object.values(row).some(value => String(value).toLocaleLowerCase().includes(props.searchValue.toLocaleLowerCase())));
      
      
      
      
      //const filtered = rows.filter(row => Object.values(row).some(value => String(value).toLocaleLowerCase().includes(props.searchValue.toLocaleLowerCase())));

      props.setFilteredRows(filtered);
    }
    props.setIsSearching(false);
    
  }, [props.searchValue, rows])
  



  useEffect(() => {
    setPagesCount(Math.ceil(props.filteredRows.length / rowsPerPage));
    setCurrentPage(0);
  }, [props.filteredRows])



  function handlePasswordChange() {
    setPassword(passwordRef.current.value)
  }






      

    return (
      
        <Box>
{appName == "Leaks" ? (

    <React.Fragment>

    <Grid container sx={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: 5 }}>

    {props.filteredRows.length > 0 && props.filteredRows.slice(currentPage * rowsPerPage, (currentPage + 1) * rowsPerPage).map(fix => (
    <ExpandingRow
    fixData={fix}
    notify={(action, text) => { props.notify(action, text) }}
    token={props.token}
    isSignedInByLink={isSignedInByLink}
    cardNumber={props.cardNumber}
    setCardNumber={props.setCardNumber}
    />
    ))}

    </Grid>

    <Grid container spacing={1} direction="row" justifyContent="center" alignItems="center" sx={{padding: 5}}>
    <Grid item xs={12} md={3} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
    <Button fullWidth onClick={() => { window.scrollTo({top: 0, behavior: 'smooth'}); props.setRefreshData(true)}} size="large" variant="outlined">Odśwież i przejdź do pierwszej strony</Button>
    </Grid>
    { currentPage < pagesCount - 1 && (
    <Grid item xs={12} md={2} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
    <Button fullWidth onClick={() => { window.scrollTo({top: 0, behavior: 'smooth'}); setCurrentPage(currentPage + 1) }} size="large" variant="contained">Następna strona <ArrowForwardIosIcon /></Button>
    </Grid>
    )}
    </Grid>
    </React.Fragment>

) : (
  appName == "WoodApp" ? (
    <React.Fragment>
    

    
    <Box style={{ position: "fixed", top: "200px", left: "15px", bottom: "15px", right: "15px", transition: 'top 0.4s ease-in-out' }} id="recordsPositioner">
<TableContainer classes={{root: classes.customTableContainer}} id="recordsContainer">
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                { columnOrder[appName].map(columnId => {
                  return <TableCell key={columnId} className={`${classes.head} ${tableCellClasses.head}`}>{extractedHeaders[columnId]}</TableCell>;
                })}
                
                <TableCell className={`${classes.head} ${tableCellClasses.head}`}>Akcje</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.filteredRows.length > 0 && props.filteredRows.slice(currentPage * rowsPerPage, (currentPage + 1) * rowsPerPage).map(order => (
                <TableRow>
                  { columnOrder[appName].map(columnId => {
                    return <TableCell key={columnId} className={`${classes.body} ${tableCellClasses.body}`}>{ order[columnId]?.toLocaleString() }</TableCell>;
                  })}
                
                <TableCell className={`${classes.body} ${tableCellClasses.body}`}><Button variant="contained" onClick={() => { console.log("Showing edit modal for id: " + order[0]); setEditModalState(order[0])}}>Edytuj</Button></TableCell>
              </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        </Box>
        
        
        </React.Fragment>
  ) : appName == "HeliumTest" ? (
    <React.Fragment>
  <Box style={{ position: "fixed", top: "200px", left: "15px", bottom: "15px", right: "15px", transition: 'top 0.4s ease-in-out' }} id="recordsPositioner">
    <TableContainer classes={{root: classes.customTableContainer}} id="recordsContainer">
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            {props.filteredRows[0]?.map(columnName => (
              <TableCell key={columnName} className={`${classes.head} ${tableCellClasses.head}`}>{columnName}</TableCell>
            ))}
            {/* If you want an additional column for actions, you can include it here */}
            {/* <TableCell className={`${classes.head} ${tableCellClasses.head}`}>Actions</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.filteredRows?.slice(currentPage * rowsPerPage, (currentPage + 1) * rowsPerPage).map((helium, index) => (
            <TableRow key={index}>
              {Object.keys(helium).map(columnName => (
                <TableCell key={columnName} className={`${classes.body}`}>{helium[columnName]?.toLocaleString()}</TableCell>
              ))}
              {/* If you have an actions column, you can include it here */}
              {/* <TableCell>Actions for this row</TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </Box>
</React.Fragment>
  ) : null

)}

                
   <EditModal appName={appName} token={props.token} editModalState={editModalState} setEditModalState={setEditModalState} filteredRows={props.filteredRows} />
    </Box>
    )

}