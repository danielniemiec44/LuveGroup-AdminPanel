import React, { useCallback, useMemo } from 'react';
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
import { DensityLarge } from '@mui/icons-material';

import BlockIcon from '@mui/icons-material/Block';

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
    paddingTop: "2px",
    paddingBottom: "2px",
    paddingLeft: "2px",
    paddingRight: "2px",
    
  },
  body: {
    color: 'white',
    fontSize: '15px',
    boxShadow: '0px 0px 3px 1px rgba(0, 0, 0, 0.5)',
    textAlign: 'center',
    paddingTop: "2px",
    paddingBottom: "2px",
    paddingLeft: "2px",
    paddingRight: "2px",
    minWidth: "125px",
    textShadow: "2px 2px 2px rgba(0, 0, 0, 1)",
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

  const [readyForRender, setReadyForRender] = useState(false);

    const passwordRef = useRef(null);

    const [heliumTableBody, setHeliumTableBody] = useState(null);
    
    
    const { rows, isSignedInByLink, userId, searchTags, setSearchTags } = props;

    if(!sessionStorage.getItem("userId")) {
      window.location.href = "/";
    }

    

    const [password, setPassword] = React.useState("");

    const { dateStart, setDateStart, dateEnd, setDateEnd, refreshData, setRefreshData, pagesCount, setPagesCount, currentPage, setCurrentPage, rowsPerPage, setRowsPerPage } = props;
    
 

    const classes = useStyles();
    

    
    const extractedHeaders = headers[appName]


    const tempRows = useRef([])

    const tempHeliumHeaders = useRef();


    const visibleRowsNames = useRef(["ODP", "OPERATOR", "RECIPE", "DESCRIPTION", "CODE", "SERIAL", "POS", "DATE-TIME", "RESULT", "PRESSURE G33H", "PRESSURE G35H", "G3 MEM(mbar l/s)", "Anomaly" ]);

    
    useEffect(() => {
      if(appName == "HeliumTest") {
        setDateStart(new Date(2000, 0, 1))
      }
    }, [])

    const promises = useRef([]);


    const generateHeliumTableBody = () => {
      setHeliumTableBody(props.filteredRows.current?.slice(currentPage * rowsPerPage, (currentPage + 1) * rowsPerPage).map((helium, index) => {
        const resultValue = helium["RESULT"];
    
        return (
          <TableRow key={index} style={{ background: resultValue === "Good" ? "rgba(0,128,0,0.9)" : resultValue === "Reject" ? "rgba(255,0,0,0.9)" : "rgba(0, 0, 0, 0.5)" }}>
            {/*Object.keys(helium).map(columnName => (
              (visibleRowsNames.current.includes(columnName) || columnName === "MachineName") && (
                <TableCell key={columnName} className={`${classes.body}`}>{helium[columnName]?.toLocaleString()}</TableCell>
              )
              ))*/}
    
    <TableCell key={index} className={`${classes.body}`}>{helium["MachineName"]?.toLocaleString() || "Brak nazwy maszyny"}</TableCell>
    
              {props.heliumHeaders?.map((heliumHeader, index) => (
                (visibleRowsNames.current.includes(heliumHeader)) && (
                  <TableCell key={index} className={`${classes.body}`}>{helium[heliumHeader]?.toLocaleString() || <BlockIcon />}</TableCell>
                )
              ))}
    
            {/* If you have an actions column, you can include it here */}
            {/* <TableCell>Actions for this row</TableCell> */}
          </TableRow>
        );
      })
      );
    };


    


    
    

    


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
    if(props.token != null) {
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
    props.setHeliumSelectorOpen(true);
    //fetchHelium();
    listHeliumMachines();

    if(refreshData == true) {
      console.log("Refreshing data...")
      //login();
      //fetchHelium();
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
                  rows.current = data.leaks;
                  //console.log("Data result length: " + data.leaks.length)
                  
                  setCurrentPage(0);
                } else if((data.result === "error")) {
                  denyAccess(data.message)
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
                  rows.current = data.orders;
                  //console.log("Data result length: " + data.orders.length)
                  
                  setCurrentPage(0);
                } else if((data.result === "error")) {
                  denyAccess(data.message)
                }
            })
        }).catch(error => {
            console.error(error);
        }).finally(() => {
          props.hideLoadingScreen();
      });
  }













  

  function listHeliumMachines() {
    props.showLoadingScreen();
    fetch("/helium_list_machines?token=" + props.token, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({
          'token': props.token,
      })
  }).then(response => {
      response.json().then(data => {
          //console.log(data);
          if (data.result === "success") {
            console.log("Available machines:" + data)
            //props.setAvailableHeliumMachines(data.machines);
            props.setAvailableHeliumMachines(data["machines"]);
          } else if((data.result === "error")) {
            denyAccess(data.message)
          }
      })
  }).catch(error => {
      console.error(error);
  }).finally(() => {
    props.hideLoadingScreen();
});
  }

  
    }
  }, [refreshData, props.token])




  // Define a function to perform the parsing of a single machine
const parseMachineData = (machineIndex, machineIteration, props) => {
  const machineName = props.availableHeliumMachines[machineIndex]["name"];
 
  return new Promise((resolve, reject) => {
    Papa.parse("/helium_read?token=" + props.token + "&machine=" + machineName + "&index=" + machineIteration, {
      download: true,
      fastMode: false,
      encoding: "utf-8",
      ignoreEmptyLines: true,
      header: true,
      complete: function(results) {
        //props.setHeliumHeaders(results.meta.fields);
        console.log("Headers look like: ", results.meta.fields);
        //concat this but ignoring duplicates
        tempHeliumHeaders.current = tempHeliumHeaders.current.concat(results.meta.fields.filter(field => visibleRowsNames.current.includes(field) && !tempHeliumHeaders.current.includes(field)));
        
      

        /*
        const visibleRowsNames = ["ODP", "OPERATOR", "RECIPE", "DESCRIPTION", "CODE", "SERIAL", "POS", "DATE-TIME", "RESULT", "PRESSURE G33H", "PRESSURE G35H", "G3 MEM(mbar l/s)", "Anomaly" ];
        const head = results.data.slice(0, 1);
        
        var visibleRowsIndexes = [];
        head.map((row) => row.filter((_, index) => visibleRowsNames.includes(row[index]) ? visibleRowsIndexes.push(index) : null));

        const modifiedData = results.data.map((row) => row.filter((_, index) => visibleRowsIndexes.includes(index)));
        // Prepend the machine name to each row
        const dataWithMachineName = modifiedData.map((row, index) => {
          return index !== 0 ? [machineName, ...row] : row;
        });
        */

        //console.log("Results look like: " + results.data.toLocaleString());

        // Prepend the machine name to each row
        const dataWithMachineName = results.data.map((row, index) => {
          return { MachineName: machineName, ...row };
        });


        tempRows.current = tempRows.current.concat(dataWithMachineName);
        //tempRows.current = [visibleRowsNames, ...tempRows.current];
        console.log("Parsing file " + machineName + " complete!");

        resolve(); // Resolve the promise when parsing is complete
      },
      error: function(error) {
        reject(error); // Reject the promise if an error occurs during parsing
      }
    });
  });
};



 const denyAccess = (message) => {
  alert("Error: " + message);
  window.location.href = "/";
}




const getPromises = () => {
  var promises = [];
  props.selectedHeliumMachinesId.forEach((machineIndex) => {
    for (var i = 0; i < props.availableHeliumMachines[machineIndex]["files_count"]; i++) {
      promises.push(parseMachineData(machineIndex, i, props));
    }
  });
  return promises;
}


  function fetchHelium(event) {
    if (event != null) {
        event.preventDefault();
    }

        props.showLoadingScreen();
        rows.current = [];
        props.filteredRows.current = [];
        tempHeliumHeaders.current = [];
        tempRows.current = [];

    
  
    

        
Promise.all(getPromises())
.then(() => {
  rows.current = tempRows.current;
  
  props.setHeliumHeaders(tempHeliumHeaders.current);
  console.log("All machines parsed!");
  console.log("First row: " + tempRows.current[0]);
  tempHeliumHeaders.current = [];
  tempRows.current = [];
  //generateHeliumTableBody();
})
.catch((error) => {
  console.error("Error occurred while parsing machines:", error);
  props.notify("error", "contact")
})
.finally(() => {
  props.hideLoadingScreen();
});
  
      
  }



  useEffect(() => {
    console.log("Search tags: ", searchTags)
    props.showLoadingScreen();
    props.setIsSearching(true);
    
  }, [searchTags, rows])


  useEffect(() => {
    if(!props.heliumSelectorOpen) {
      fetchHelium();
    }
  }, [props.heliumSelectorOpen])


  useEffect(() => {
    console.log("Promises changed to: " + promises.current)
  }, [promises.current])



  useEffect(() => {
    if (props.isSearching) {
      if(appName == "HeliumTest") {
        var filtered2 = [];

      if (searchTags?.length == 0) {
        console.log("All rows shown!");
        filtered2 = rows.current.slice().reverse(); // Exclude the first row using slice(1)
      } else {
        const filtered = rows.filter((row) => {
          return searchTags.some((tag) => {
            return Object.values(row).some((value) => {
              return String(value).toLowerCase().includes(tag.toLowerCase());
            });
          });
        });
        
        filtered2 = filtered.slice().reverse();
      }

      
      const filteredByDate = filtered2.filter((item) => {
        const itemDate = new Date(item["DATE-TIME"]);
        return itemDate >= dateStart && itemDate <= dateEnd;
      });

      console.log("Filtered rows: ", filteredByDate)
      props.filteredRows.current = filteredByDate;


    } else {
      //TODO: Zrobić też dla innych aplikacji
      if (searchTags?.length == 0) {
        console.log("All rows shown!");
        props.filteredRows.current = rows; // Exclude the first row using slice(1)
      } else {
        const filtered = rows.filter((row, index) => {
          return Object.values(row).some((value) =>
            String(value).toLowerCase().includes(searchTags[0].toLowerCase())
          );
        });
  
        props.filteredRows.current = filtered;
    }
  }
}

  }, [appName, props.isSearching, searchTags]);

  



  useEffect(() => {
    setPagesCount(Math.ceil(props.filteredRows.length / rowsPerPage));
    setCurrentPage(0);
      props.setIsSearching(false);
      props.hideLoadingScreen();
  }, [props.filteredRows])



  function handlePasswordChange() {
    setPassword(passwordRef.current.value)
  }




      

    return (
      
        <Box>
          
{appName == "Leaks" ? (

    <React.Fragment>

    <Grid container sx={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: 5 }}>

    {props.filteredRows.length > 0 && props.filteredRows?.slice(currentPage * rowsPerPage, (currentPage + 1) * rowsPerPage).map(fix => (
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
                
                {<TableCell className={`${classes.head} ${tableCellClasses.head}`}>Akcje</TableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {props.filteredRows.current.length > 0 && props.filteredRows.current.slice(currentPage * rowsPerPage, (currentPage + 1) * rowsPerPage).map(order => (
                <TableRow style={{ background: "rgba(0, 0, 0, 0.5)" }}>
                  { columnOrder[appName].map(columnId => {
                    return <TableCell key={columnId} className={`${classes.body} ${tableCellClasses.body}`}>{ order[columnId]?.toLocaleString() }</TableCell>;
                  })}
                
                { <TableCell className={`${classes.body} ${tableCellClasses.body}`}><Button variant="contained" onClick={() => { console.log("Showing edit modal for id: " + order[0]); setEditModalState(order[0])}}>Edytuj</Button></TableCell>}
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
            <TableCell className={`${classes.head} ${tableCellClasses.head}`}>Nazwa maszyny</TableCell>
            {
            /*props.rows[0]?.map(columnName => (
              <TableCell key={columnName} className={`${classes.head} ${tableCellClasses.head}`}>{columnName}</TableCell>
            ))*/}
            

              {props.heliumHeaders?.map((heliumHeader, index) => (
                visibleRowsNames.current.includes(heliumHeader) && (
                  <TableCell key={index} className={`${classes.head} ${tableCellClasses.head}`}>{heliumHeader}</TableCell>
                )
              ))}

            
            {/* If you want an additional column for actions, you can include it here */}
            {/* <TableCell className={`${classes.head} ${tableCellClasses.head}`}>Actions</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
  { heliumTableBody }
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