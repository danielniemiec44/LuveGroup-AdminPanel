import React, { useCallback, useContext } from 'react';
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
import { MyContext, columnOrder, headers } from './App';
import EditModal from './EditModal';
import Papa from 'papaparse';
import { DensityLarge } from '@mui/icons-material';

import BlockIcon from '@mui/icons-material/Block';
import ReplyDialog from './ReplyDialog';

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

export const denyAccess = (message) => {
  alert("Error: " + message);
  window.location.href = "/";
}

export default function PanelV2(props) {
  const { appName } = useParams()
  const prevSelectorOpenRef = useRef();

  const [readyForRender, setReadyForRender] = useState(false);

    const passwordRef = useRef(null);
    
    
    const { rows, setRows, isSignedInByLink, userId, searchTags, setSearchTags, editModalState, setEditModalState } = props;

    if(!sessionStorage.getItem("userId")) {
      window.location.href = "/";
    }

    

    const [password, setPassword] = React.useState("");

    const { dateStart, setDateStart, dateEnd, setDateEnd, refreshData, setRefreshData, setRowsPerPage } = props;
    
 

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

    const {exporting, setExporting, setExportedCount, currentPage, pagesCount, setCurrentPage} = useContext(MyContext)

    const chunks = useRef([]);

    const tempRow = useRef("");


    useEffect(() => {
  console.log("Page switch detected")
  if(appName == "HeliumTest") {
    if(props.token != null) {
    fetchHelium(null)
    }
  }
  if(appName == "Leaks") {
    if(props.token != null) {
    fetchLeaks(null)
    }
  }
  if(appName == "WoodApp") {
    if(props.token != null) {
    fetchWoodApp(null)
    }
  }

}, [currentPage])

    
    

    


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
      //setRefreshData(false);
    }
  } else if(appName == "HeliumTest") {
    props.setSelectorOpen(appName);
    //fetchHelium();
    listHeliumMachines();

    if(refreshData == true) {
      console.log("Refreshing data...")
      //login();
      //fetchHelium();
      setRefreshData(false);
    }
  } else if(appName == "Cars") {
    props.setSelectorOpen(appName);
    //fetchHelium();
    listCars();

    if(refreshData == true) {
      console.log("Refreshing data...")
      //login();
      //fetchHelium();
      setRefreshData(false);
    }
  }






















  

  function listHeliumMachines() {
    props.showLoadingScreen();
    fetch("/api/helium_list_machines?token=" + props.token, {
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


  function listCars() {
    props.showLoadingScreen();
    fetch("/api/cars_list?token=" + props.token, {
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
            console.log("Available cars:" + data)
            //props.setAvailableHeliumMachines(data.machines);
            props.setAvailableCars(data["cars"]);
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




    
  }, [refreshData, props.token, editModalState])




  // Define a function to perform the parsing of a single machine
const parseMachineData = (machineIndex, machineIteration, props) => { //OLD
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









/*
const getPromises = () => {
  var promises = [];
  props.selectedHeliumMachinesId.forEach((machineIndex) => {
    for (var i = 0; i < props.availableHeliumMachines[machineIndex]["files_count"]; i++) {
      promises.push(parseMachineData(machineIndex, i, props));
    }
  });
  return promises;
}
*/



function fetchHelium(event) {
  if (event != null) {
      event.preventDefault();
  }

      props.showLoadingScreen();
      /*
      setRows([]);
      props.setFilteredRows([]);
      tempHeliumHeaders.current = [];
      tempRows.current = [];
*/
  

  
/*
Promise.all(getPromises())
.then(() => {
setRows(tempRows.current);
props.setHeliumHeaders(tempHeliumHeaders.current);
console.log("All machines parsed!");
console.log("First row: " + tempRows.current[0]);
tempHeliumHeaders.current = [];
})
.catch((error) => {
console.error("Error occurred while parsing machines:", error);
props.notify("error", "contact")
})
.finally(() => {
props.hideLoadingScreen();
});
*/



chunks.current = []; // For accumulating the CSV data

fetch("/api/fetch_helium", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: getHeliumFetchBody()
})
.then(response => {
    if (exporting) {
      readStream(response);
      
    } else {
        return response.json();
    }
})
.then(dataOrStream => {
    if (!exporting) { // JSON processing
        if (dataOrStream.result === "success") {
            setRows(dataOrStream.helium);
            pagesCount.current = dataOrStream.pagesCount
        } else if (dataOrStream.result === "error") {
            denyAccess(dataOrStream.message);
        }
        props.hideLoadingScreen();
    }
})
.catch(error => {
    console.error(error);
    props.hideLoadingScreen();
})
.finally(() => {
    
    
});




/*
fetch("/api/fetch_helium", {
  method: "POST",
  headers: {
      "Content-Type": "application/json"
  },
  body: getHeliumFetchBody()
}).then(response => {
  const reader = response.body.getReader();

  return reader.read().then(function processText({ done, value }) {
      if (done) {
          console.log("All data received");
          return;
      }

      const decodedData = new TextDecoder("utf-8").decode(value);
      const data = JSON.parse(decodedData);

      console.log(data.message);

      if (data.file_ready) {
          window.location.href = "/download_exported?token=" + props.token;
          return;
      }

      return reader.read().then(processText); // Continue processing the stream
  });
});
*/


}




function readStream(response) {
  const reader = response.body.getReader();
      return new ReadableStream({
          start(controller) {
              function push() {
                  reader.read().then(({ done, value }) => {
                    if (done) {
                        controller.close();
                        // Convert accumulated chunks to a blob
                        const blob = new Blob(chunks.current, { type: 'text/csv' });

                        // Create a new object URL
                        const url = window.URL.createObjectURL(blob);

                        // Create a link element
                        const link = document.createElement('a');
                        link.href = url;
                        link.setAttribute('download', 'export.csv'); // Name of downloaded file
                        
                        // Append the link to the body (required for Firefox)
                        document.body.appendChild(link);

                        // Simulate a click on the link to start the download
                        link.click();

                        // Clean up: Remove the link and revoke the object URL
                        document.body.removeChild(link);
                        window.URL.revokeObjectURL(url);

                        setExporting(false);
                        props.hideLoadingScreen();
                        //break;
                    }
                    
                    
                    var string = new TextDecoder("utf-8").decode(value);

                    if(tempRow.current != null) {
                      string = tempRow.current + string;
                    }
                    
                    tempRow.current = getLastNonDelimitedElement(string, "\n");
                    var splittedNewLines = string.split("\n");
                    if(tempRow.current != null) {
                      //get lines without last element
                      splittedNewLines = splittedNewLines.slice(0, splittedNewLines.length - 1);
                    }

                    
                    
                    var splittedRow = "";

                    splittedNewLines.forEach(element => {
                      if(element != null || element != "" || element != undefined) {
                      splittedRow = element.split("@@DATA_SEPARATOR@@")
                      if(splittedRow[1] != null || splittedRow[1] != "" || splittedRow[1] != undefined) {
                        chunks.current.push(splittedRow[1]);
                    }
                  }
                    })

                    setExportedCount(splittedRow[0]);
                  controller.enqueue(value);
                  push();
                });
              }
              push();
          }
        });
}


function getLastNonDelimitedElement(str, delimiter) {
  // Check if the string ends with the delimiter
  if (str.endsWith(delimiter)) {
    return null;  // or return an empty string ('') if you prefer
  }
  
  let parts = str.split(delimiter);
  return parts[parts.length - 1];
}



function fetchLeaks(event) {
  if (event != null) {
      event.preventDefault();
  }

      props.showLoadingScreen();
      console.log("Attempt to login...");


      fetch("/api/fetch_leaks", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: getLeaksFetchBody()
      }).then(response => {
        if (exporting) {
            readStream(response); // Placeholder for streaming function similar to readStream
        } else {
            return response.json();
        }
    })
    .then(dataOrStream => {
        if (!exporting) {
            if (dataOrStream.result === "success") {
                setRows(dataOrStream.leaks);
                pagesCount.current = dataOrStream.pagesCount
            } else if (dataOrStream.result === "error") {
                denyAccess(dataOrStream.message);
            }
            props.hideLoadingScreen();
        }
    })
        .catch(error => {
          console.error(error);
          props.hideLoadingScreen();
          }).finally(() => {
          props.hideLoadingScreen();
    });
}


function fetchCars(event) {
  if (event != null) {
      event.preventDefault();
  }

      props.showLoadingScreen();
      console.log("Attempt to login...");


      fetch("/api/fetch_cars", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: getLeaksFetchBody()
      }).then(response => {
        if (exporting) {
            readStream(response); // Placeholder for streaming function similar to readStream
        } else {
            return response.json();
        }
    })
    .then(dataOrStream => {
        if (!exporting) {
            if (dataOrStream.result === "success") {
                setRows(dataOrStream.cars);
                pagesCount.current = dataOrStream.pagesCount
            } else if (dataOrStream.result === "error") {
                denyAccess(dataOrStream.message);
            }
            props.hideLoadingScreen();
        }
    })
        .catch(error => {
          console.error(error);
          props.hideLoadingScreen();
          }).finally(() => {
          props.hideLoadingScreen();
    });
}


function fetchWoodApp(event) {
  if (editModalState == null) {
      if (event != null) {
          event.preventDefault();
      }

      props.showLoadingScreen();

      fetch("/api/fetch_woodapp", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: getWoodAppFetchBody()
      })
      .then(response => {
          if (exporting) {
              readStream(response); // Placeholder for streaming function similar to readStream
          } else {
              return response.json();
          }
      })
      .then(dataOrStream => {
          if (!exporting) {
              if (dataOrStream.result === "success") {
                  setRows(dataOrStream.orders);
                  pagesCount.current = dataOrStream.pagesCount
              } else if (dataOrStream.result === "error") {
                  denyAccess(dataOrStream.message);
              }
              props.hideLoadingScreen();
          }
      })
      .catch(error => {
          console.error(error);
          props.hideLoadingScreen();
      });
  }
}






function getHeliumFetchBody() {
  console.log("Getting body...")

  var dS = new Date(dateStart)
  var dSOffset = dS.getTimezoneOffset() * 60000;
  var dS = new Date(dS.getTime() - dSOffset);
  var dS = dS.toISOString();

  var dE = new Date(dateEnd)
  var dEOffset = dE.getTimezoneOffset() * 60000;
  var dE = new Date(dE.getTime() - dEOffset);
  var dE = dE.toISOString();


var selectedMachines = [];

for (let i = 0; i < props.selectedHeliumMachinesId.length; i++) {
  selectedMachines.push(props.availableHeliumMachines[props.selectedHeliumMachinesId[i]]);
}

return JSON.stringify({
  'token': props.token,
  'dateStart': dS,
  'dateEnd': dE,
  'selectedMachines': selectedMachines,
  'search': searchTags,
  'page': currentPage,
  'export': exporting
})
}


function getLeaksFetchBody() {
  console.log("Getting body...")

  var dS = new Date(dateStart)
  var dSOffset = dS.getTimezoneOffset() * 60000;
  var dS = new Date(dS.getTime() - dSOffset);
  var dS = dS.toISOString();

  var dE = new Date(dateEnd)
  var dEOffset = dE.getTimezoneOffset() * 60000;
  var dE = new Date(dE.getTime() - dEOffset);
  var dE = dE.toISOString();

return JSON.stringify({
  'token': props.token,
  'dateStart': dS,
  'dateEnd': dE,
  //'selectedMachines': selectedMachines,
  'search': searchTags,
  'page': currentPage,
  "export": exporting
})
}


function getWoodAppFetchBody() {
  console.log("Getting body...")

  var dS = new Date(dateStart)
  var dSOffset = dS.getTimezoneOffset() * 60000;
  var dS = new Date(dS.getTime() - dSOffset);
  var dS = dS.toISOString();

  var dE = new Date(dateEnd)
  var dEOffset = dE.getTimezoneOffset() * 60000;
  var dE = new Date(dE.getTime() - dEOffset);
  var dE = dE.toISOString();



return JSON.stringify({
  'token': props.token,
  'dateStart': dS,
  'dateEnd': dE,
  'search': searchTags,
  'page': currentPage,
  'export': exporting
})
}

  



  useEffect(() => {
    //TODO: Sprawdzić czy działa
    if(appName != "HeliumTest" && appName != "Cars") {
      console.log("Search tags: ", searchTags)
      props.showLoadingScreen();
      props.setIsSearching(true);
      
    }
    
    
  }, [searchTags])


  useEffect(() => {
    if(props.token != null) {
    if(appName == "HeliumTest") {
      
      props.showLoadingScreen();

      if(props.selectedHeliumMachinesId.length != 0) {
        console.log("Refreshing with search tags: ", searchTags)
        fetchHelium(null);
      }

      //props.setIsSearching(true);
      setCurrentPage(0)
    }
    if(appName == "Leaks") {
        props.showLoadingScreen();
        fetchLeaks(null);
        setCurrentPage(0)
      }
      if(appName == "WoodApp") {
        props.showLoadingScreen();
        fetchWoodApp(null);
        setCurrentPage(0)
      }
      if(appName == "Cars") {
        //fetchCars(null);
        setCurrentPage(0)
      }
    }
  }, [searchTags, exporting])


  useEffect(() => {
    const prevSelectorOpen = prevSelectorOpenRef.current;
    if(appName == "HeliumTest") {
      if (prevSelectorOpen && !props.selectorOpen) {
        fetchHelium(null);
       }
    }
    prevSelectorOpenRef.current = props.selectorOpen;
  }, [props.selectorOpen])


  useEffect(() => {
    console.log("Promises changed to: " + promises.current)
  }, [promises.current])


  function handlePasswordChange() {
    setPassword(passwordRef.current.value)
  }



  
    


  
      

    return (
      
        <Box>
          
{appName == "Leaks" ? (

    <React.Fragment>

    <Grid container sx={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: 5 }}>

    {props.rows?.map((fix, index) => (
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
    { currentPage < pagesCount.current - 1 && (
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
              {props.rows?.map((order, index) => (
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
            

            { columnOrder[appName].map(columnId => {
                  return <TableCell key={columnId} className={`${classes.head} ${tableCellClasses.head}`}>{extractedHeaders[columnId]}</TableCell>;
                })}

            
            {/* If you want an additional column for actions, you can include it here */}
            {/* <TableCell className={`${classes.head} ${tableCellClasses.head}`}>Actions</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
  {/*props.rows?.map((helium, index) => {
    const resultValue = helium[9];

    return (
      <TableRow key={index} style={{ background: (resultValue === "Good" || resultValue.includes("BUONO")) ? "rgba(0,128,0,0.9)" : (resultValue === "Reject" || resultValue.includes("ANOMALIA")) ? "rgba(255,0,0,0.9)" : "rgba(0, 0, 0, 0.5)" }}>
        { columnOrder[appName].map(columnId => {
          var display = [helium[columnId]?.toLocaleString()]
          if(columnId == 0) {
            display[0] = display[0].split("\\")[1]
            if(helium[columnId].includes("2023")) {
              display[1] = "2023"
            } else {
              display[1] = "OLD"
            }
          }
          return <TableCell key={columnId} className={`${classes.body} ${tableCellClasses.body}`}>{ display.join("_") }</TableCell>;
        })}

      </TableRow>
    );
  })*/}
</TableBody>
      </Table>
    </TableContainer>
  </Box>
</React.Fragment>
  ) : null

)}

                
    <EditModal notify={(action, text) => { props.notify(action, text) }} showLoadingScreen={props.showLoadingScreen} hideLoadingScreen={props.hideLoadingScreen} rows={props.rows} appName={appName} token={props.token} editModalState={editModalState} setEditModalState={setEditModalState} />
    {/*TODO:
      <ReplyDialog open={props.isPriceChangeWindowOpened} />
    */}
    </Box>
    )

}