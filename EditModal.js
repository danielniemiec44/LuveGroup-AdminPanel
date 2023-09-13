import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Checkbox, Divider, FormControlLabel, Grid, Table, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { columnOrder, dateTimeHeaders, disabledHeaders, editModalcolumnOrder, headers, numberHeaders, requiredFields, switches } from './App';
import { Box } from '@mui/system';
import { CheckBox } from '@mui/icons-material';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import SaveAsSharpIcon from '@mui/icons-material/SaveAsSharp';
import { denyAccess } from './PanelV2';
import { booleanHeaders } from './App';

export default function EditModal(props) {
  const { editModalState, setEditModalState} = props
  const [dialogContent, setDialogContent] = React.useState(null);

  const extractedHeaders = headers[props.appName]

  const rowData = React.useRef([]);
  const [newRowData, setNewRowData] = React.useState([]);

  React.useEffect(() => {
    if(editModalState != null) {
      if(editModalState == -1) {
        rowData.current = [];
      } else {
        rowData.current = props.rows.find(record => record[0] === editModalState);
      }
      setNewRowData([]);
    }
  }, [editModalState])

  React.useEffect(() => {
    console.log("New row data: " + newRowData);
  }, [newRowData])


  function handleChange(event, columnId, newValue) {
    if(event != null) {
      

      const updatedArray = [...newRowData]; // Create a copy of newRowData
      var current = rowData.current[columnId];
      var inputValue = event.target.value;
      if(dateTimeHeaders[props.appName].includes(columnId)) {
        inputValue = parseDate(inputValue);
        current = parseDate(rowData.current[columnId]);
        console.log("Detected date change! Current: " + current + " Input: " + inputValue);
      }

      
      if(event.target.type == "checkbox") {
        inputValue = event.target.checked;

        if (inputValue == current) {
          updatedArray[columnId] = null;
        } else {
          updatedArray[columnId] = inputValue;
        }
      } else {
        
        if(inputValue == "") {
          updatedArray[columnId] = '.';
        } else {
          if (inputValue == current) {
            updatedArray[columnId] = null;
          } else {
            updatedArray[columnId] = inputValue;
          }
        }
        if(props.appName == "WoodApp") {
          if(columnId == 6 || columnId == 3) {
            var kgcost = rowData.current[6]
            if(updatedArray[6] != null) {
              kgcost = updatedArray[6]
            }
            var weight = rowData.current[3]
            if(updatedArray[3] != null) {
              weight = updatedArray[3]
            }

            var netcost = kgcost * weight
            var grossCost = Math.round((netcost * 1.23) * 100) / 100

            document.getElementById("columnId-8").value = netcost
            updatedArray[8] = netcost

            document.getElementById("columnId-9").value = grossCost
            updatedArray[9] = grossCost
          }
        }
      
    }

    
    
      setNewRowData(updatedArray);
      console.log("Updated array: " + updatedArray);
      console.log("Row data: " + rowData.current);
    }
  }


  function parseDate(date) {
    if(date == null) {
      return null;
    }
    const parsedDate = new Date(date);
    if (isNaN(parsedDate)) {
      return date; // Return the original input if it's not a valid date
    }
    const year = parsedDate.getFullYear();
    const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
    const day = String(parsedDate.getDate()).padStart(2, '0');
    const hours = String(parsedDate.getHours()).padStart(2, '0');
    const minutes = String(parsedDate.getMinutes()).padStart(2, '0');
    const seconds = String(parsedDate.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  }



  function saveChanges(deleteRow) {
    var jsonBody = JSON.stringify({
      'token': props.token,
      'recordId': editModalState,
      'newData': newRowData,
  })

    if(deleteRow) {
      if(!window.confirm('Uwaga! Czy na pewno chcesz usunąć ten wpis?')){
        return;
      } else {
          jsonBody = JSON.stringify({
            'token': props.token,
            'recordId': editModalState,
            'deleteRow': true
        })
    }
      } else {
        if(editModalState === -1) {
          for(var i = 0; i < newRowData.length; i++) {
            if(i in booleanHeaders[props.appName]) {
              if(newRowData[i] == null) {
                newRowData[i] = booleanHeaders[props.appName][i];
            }
          }
          jsonBody = JSON.stringify({
            'token': props.token,
            'recordId': "new",
            'data': newRowData
        })
        }
      }
    }

    console.log("Saving changes...")
    props.showLoadingScreen();

    fetch("/api/update_woodapp", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: jsonBody
  }).then(response => {
      response.json().then(data => {
          //console.log(data);
          if (data.result === "success") {
            setEditModalState(null);
            props.notify("success", "Udało się zapisać zmiany!")
            
          } else if((data.result === "error")) {
            props.notify("error", data.message)
          }
      }).catch(error => {
        console.error(error);
      props.notify("error", "contact")
      })
  }).catch(error => {
      console.error(error);
      props.notify("error", "contact")
  }).finally(() => {
    props.hideLoadingScreen();
});

    
    
    
  }
  

  return (
    <div>
      <Dialog
        open={editModalState != null}
        onClose={() => { setEditModalState(null) }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="lg"
      >
        <form onSubmit={(event) => { event.preventDefault(); saveChanges() }}>
        <DialogTitle id="alert-dialog-title" textAlign={"center"} fontSize={"1.5rem"}>
           { editModalState != null && rowData && rowData.current && (editModalState != -1 ? <div>Edytuj rekord ({rowData.current[0] }):</div> : <div>Dodaj rekord:</div>)}
        </DialogTitle>
        <Divider />
        







        <DialogContent>
          { props.appName == "WoodApp" && (
            <DialogContentText id="alert-dialog-description">
            <Grid container style={{ width: "100%", color: "black" }}>
                { editModalcolumnOrder[props.appName].map(columnId => {
                    if(columnId != 0) {
                  return (
                    <React.Fragment>
                        <Grid item xs={12} md={6} sx={{ display: "flex", alignItems: "center" }}>
                            <Grid container spacing={0} sx={{ borderRadius: 2, padding: 1, boxShadow: "0px 0px 8px 1px rgba(0, 0, 0, 0.5)", background: "rgba(200, 255, 255, 0.95)", borderRadius: 1, margin: 1 }}>
                  <Grid item xs={12} md={4} key={columnId} sx={{ display: "flex", alignItems: "center" }}>
                    <Typography variant="h6">{ extractedHeaders[columnId] }:</Typography>
                  </Grid>
                  <Grid item md={6} xs={10}>
                    {dateTimeHeaders[props.appName].includes(columnId) ? (
                        <TextField
                        type="datetime-local"
                        fullWidth
                        InputLabelProps={{
                          shrink: true,
                        }}
                        defaultValue={rowData.current?.[columnId] && parseDate(rowData.current[columnId])}
                        

                        onChange={(event) => handleChange(event, columnId)}
                      />
                    ) : (
                        editModalState != null && (
                          (columnId in booleanHeaders[props.appName]) ? (
                              <Checkbox
                              color="primary"
                              defaultChecked={rowData.current[columnId]}
                              checked={newRowData[columnId]}
                              onChange={(event) => handleChange(event, columnId)}
                            />
                            ) : (
                              rowData.current && switches[props.appName][columnId] ? (
                                <ToggleButtonGroup
                                  color="secondary"
                                  value={newRowData[columnId] || rowData.current[columnId]?.toLocaleString()}
                                  onChange={(event) => handleChange(event, columnId)}
                                  exclusive
                                  aria-label="Platform"
                                  size="medium"
                                >
                                  {switches[props.appName][columnId].map((option) => (
                                    <ToggleButton key={option} value={option}>
                                      {option}
                                    </ToggleButton>
                                  ))}
                                </ToggleButtonGroup>
                              ) : (
                                <TextField
                                  fullWidth
                                  type={numberHeaders[props.appName].includes(columnId) ? "number" : "text"}
                                  disabled={disabledHeaders[props.appName].includes(columnId)}
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                  inputProps={{
                                    maxLength: 10,
                                    step: "0.01"
                                  }}
                                  defaultValue={rowData.current && rowData.current[columnId]}
                                  onChange={(event) => handleChange(event, columnId)}
                                  id={"columnId-" + columnId}
                                />
                              )
                                
                            )

                            
                        )
                            
                        
                    )   }
                    
                  </Grid>
                  
                    <Grid item xs={2} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {(((rowData.current == null ||rowData.current[columnId] == null) && (newRowData == null || newRowData[columnId] == null)) || (newRowData[columnId] != null && newRowData[columnId] == '.')) && !(columnId in booleanHeaders[props.appName]) && requiredFields[props.appName].includes(columnId) && (
                      <ErrorOutlineIcon fontSize='large' sx={{ color: "red" }} />
                    )}

                    { newRowData[columnId] != null && (
                        <SaveAsSharpIcon fontSize='large' sx={{ color: "red" }} />
                    )}

                    
                    </Grid>
                 
                  
                  </Grid>
                  </Grid>
                  </React.Fragment>
                  )
                                    }
                })}
            </Grid>
          </DialogContentText>
          ) }
          
        </DialogContent>









        <DialogActions style={{ justifyContent: "space-between" }}>
        {(editModalState != null && editModalState != -1) ? (<Button onClick={ () => { saveChanges(true) }} size='medium' color='error' variant='outlined'>Trwale usuń rekord</Button>) : <div></div>}
         
        <DialogActions>
          <Button onClick={ () => { setEditModalState(null) }} size='large' variant='outlined'>Anuluj</Button>
          <Button type='submit' size='large' variant='contained'>Zapisz zmiany</Button>
          </DialogActions>
        </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}