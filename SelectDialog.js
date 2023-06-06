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
  Box
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export default function SelectDialog(props) {
  const [selectedLeak, setSelectedLeak] = useState(null);
    





  useEffect(() => {
    if (props.open) {
      setSelectedLeak(null); // Reset selectedLeak to null when the dialog is opened
    }
  }, [props.open]);

      

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
            height: '90vh', // Set a height for the Dialog, e.g., 90% of the viewport height
          },
        }}
      >
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={() => { props.handleClose(null) }} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" component="div">
              Wybierz nieszczelność
            </Typography>
          </Toolbar>
        </AppBar>
        <Box sx={{ overflowY: 'auto', flexGrow: 1, p: 2 }}>
          <DialogContent>
            <LeakTable selectedLeak={selectedLeak} setSelectedLeak={setSelectedLeak} leaks={props.leaks} />
          </DialogContent>
        </Box>
        <DialogActions>
          <Button size="large" onClick={ () => { props.handleClose(selectedLeak) } } color="primary" disabled={ selectedLeak == null }>
            Zatwierdź
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}