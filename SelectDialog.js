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
  Grid
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CustomToggle from './CustomToggle';

export default function SelectDialog(props) {


  return (
    <div>
      
      <Dialog
        open={props.open}
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
              { props.getSelectedLanguageString("chooseHeliumMachines") }
            </Typography>

            <IconButton edge="end" color="inherit" onClick={() => { props.handleClose(null) }} aria-label="close">
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Box sx={{ overflowY: 'auto', flexGrow: 1, p: 2 }}>
          <DialogContent>
          <Grid container spacing={1} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            {props.availableHeliumMachines?.map((heliumMachine, index) => {
              return (
                  <Grid item>
                    <CustomToggle index={index} selectedHeliumMachinesId={props.selectedHeliumMachinesId} setSelectedHeliumMachinesId={props.setSelectedHeliumMachinesId} label={heliumMachine.name} />
                  </Grid>
              );
            })}
            </Grid>
          </DialogContent>
        </Box>
        <DialogActions style={{ display: "flex", justifyContent: "center" }}>
          <Button size="large" variant="contained" onClick={ () => { props.handleClose() } } color="primary" disabled={ props.selectedHeliumMachinesId.length == 0 }>
          { "Pobierz wybrane pliki CSV i wyświetl" }
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}