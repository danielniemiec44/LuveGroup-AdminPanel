import * as React from 'react';
import TextField from '@mui/material/TextField';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useRef } from 'react';
import { useEffect, useState } from 'react';
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
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export default function ReplyDialog(props) {
  const [textFieldValue, setTextFieldValue] = useState('');
  const [allowed, setAllowed] = useState(false);

  const handleTextFieldChange = (event) => {
    setTextFieldValue(event.target.value);
  };

  const handleZatwierdzClick = () => {
    // Pass the textFieldValue to the parent component
    props.handleZatwierdz(textFieldValue);
  };

  useEffect(() => {
    if(textFieldValue.length > 0) {
      setAllowed(true)
    } else {
      setAllowed(false)
    }
  }, [textFieldValue]); // Add isComplete as a dependency

  return (
    <Dialog
      open={props.open}
      //onClose={() => { props.handleClose(null) }}
      fullWidth
      PaperProps={{
        sx: {
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          maxHeight: '300', // Set a smaller height for the Dialog, e.g., 50% of the viewport height
        },
      }}
    >
      <AppBar position="static">
        <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" component="div">
          Zmień cenę drewna:
          </Typography>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => {
              props.handleClose(null);
            }}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <form onSubmit={(event) => { event.preventDefault() }}>
      <Box sx={{ overflowY: 'auto', flexGrow: 1, p: 2 }}>
        <DialogContent>
          <TextField
            label="Nowa cena drewna"
            onChange={handleTextFieldChange}
            fullWidth
            type="number"
            inputProps={{
              min: 0,
              step: 0.01
            }}
          />
        </DialogContent>
      </Box>
      <DialogActions>
        <Button size="large" color="primary" onClick={ () => { props.handleClose(textFieldValue) }  } disabled={!allowed}>
          Zatwierdź
        </Button>
      </DialogActions>
      </form>
    </Dialog>
  );
}
