import * as React from 'react';
import TextField from '@mui/material/TextField';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useRef} from "react";
import { useEffect, useState } from 'react';
import LeakTable from './LeakTable';
import {
  Button,
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  DialogContent,
  DialogActions,
  Box,
  Grid,
  ToggleButtonGroup,
  ToggleButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CustomToggle from './CustomToggle';
import { useParams } from 'react-router-dom';

export default function SelectDialog(props) {
  const [appName, setAppName] = useState(useParams().appName)
  
  if(props.open == null) {
    props.setOpen(appName)
   }


   function handleCarChange(id) {
    props.setSelectedCar(id)
    props.setOpen("")
   }

  return (
    <div>
      
      <Dialog
        open={(props.open === "Cars" || props.open === "HeliumTest") ? true : false}
        onClose={() => { props.handleClose(null) }}
        fullWidth
        maxWidth="md"
        PaperProps={{
          sx: {
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            height: 500, // Set a height for the Dialog, e.g., 90% of the viewport height
          },
        }}
      >
        <AppBar position="static">
          <Toolbar style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Typography variant="h6" component="div">
              { appName == "HeliumTest" && props.getSelectedLanguageString("chooseHeliumMachines") }
              { appName == "Cars" && "Wybierz pojazd" }
            </Typography>

            <IconButton edge="end" color="inherit" onClick={() => { props.handleClose(null) }} aria-label="close">
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Box sx={{ overflowY: 'auto', flexGrow: 1, p: 2 }}>
          <DialogContent>
          <Grid container spacing={1} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            { appName == "HeliumTest" && props.availableHeliumMachines?.map((name, index) => {
              return (
                  <Grid item>
                    <CustomToggle index={index} selectedHeliumMachinesId={props.selectedHeliumMachinesId} setSelectedHeliumMachinesId={props.setSelectedHeliumMachinesId} label={name} appName={appName} />
                  </Grid>
              );
            })}


{ appName == "Cars" && (
  
            props.availableCars?.map((name, index) => {
              return (
                
                  <Grid item>
                    <ToggleButton size='large' onClick={() => handleCarChange(index)} selected={props.selectedCar === index}>{name[1]}<br />NR REJ. {name[0]}</ToggleButton>
                  </Grid>
  );
})
  
) }

                  
              
            
            </Grid>
          </DialogContent>
        </Box>
        <DialogActions style={{ display: "flex", justifyContent: "center" }}>
          { appName == "HeliumTest" && (
            <Button size="large" variant="contained" onClick={ () => { props.handleClose() } } color="primary" disabled={ props.selectedHeliumMachinesId.length == 0 }>
            Wyświetl wybrane maszyny
              </Button>
          )}
          
        </DialogActions>
      </Dialog>
    </div>
  );
}