import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Checkbox, Divider, FormControlLabel, Grid, Table, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { columnOrder, dateTimeHeaders, headers, switches } from './App';
import { Box } from '@mui/system';
import { CheckBox } from '@mui/icons-material';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import SaveAsSharpIcon from '@mui/icons-material/SaveAsSharp';

export default function EditModal(props) {
  const { editModalState, setEditModalState} = props
  const [dialogContent, setDialogContent] = React.useState(null);

  const extractedHeaders = headers[props.appName]

  const rowData = React.useRef([]);
  const [newRowData, setNewRowData] = React.useState([]);


  React.useEffect(() => {
    if(editModalState != null) {
        rowData.current = props.filteredRows.current.find(record => record[0] === editModalState);
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
      
      
    }

    
    
      setNewRowData(updatedArray);
      console.log("Updated array: " + updatedArray);
      console.log("Row data: " + rowData.current);
    }
  }


  function parseDate(date) {
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
        <DialogTitle id="alert-dialog-title" textAlign={"center"} fontSize={"1.5rem"}>
          Edytuj rekord ({ editModalState != null && rowData && rowData.current && rowData.current[0] }):
        </DialogTitle>
        <Divider />
        







        <DialogContent>
          { props.appName == "WoodApp" && (
            <DialogContentText id="alert-dialog-description">
            <Grid container style={{ width: "100%", color: "black" }}>
                { columnOrder[props.appName].map(columnId => {
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
                        defaultValue={rowData.current[columnId] && parseDate(rowData.current[columnId])}
                        onChange={(event) => handleChange(event, columnId)}
                      />
                    ) : (
                        editModalState != null && (
                            rowData.current && (typeof rowData.current[columnId] === 'boolean') ? (
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
                                  defaultValue={rowData.current && rowData.current[columnId]}
                                  onChange={(event) => handleChange(event, columnId)}
                                />
                              )
                                
                            )

                            
                        )
                            
                        
                    )   }
                    
                  </Grid>
                  
                    <Grid item xs={2} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {((rowData.current[columnId] == null && newRowData[columnId] == null) || newRowData[columnId] == '.') && (
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
        <Button onClick={ () => { setEditModalState(null) }} size='medium' color='error' variant='outlined'>Trwale usuń rekord</Button>
         
        <DialogActions>
          <Button onClick={ () => { setEditModalState(null) }} size='large' variant='outlined'>Anuluj</Button>
          <Button onClick={() => { setEditModalState(null) }} size='large' variant='contained'>Zapisz zmiany</Button>
          </DialogActions>
        </DialogActions>
      </Dialog>
    </div>
  );
}