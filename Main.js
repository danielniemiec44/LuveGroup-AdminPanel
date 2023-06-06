import logo from './logo.svg';
import './App.css';
import { Typography, Paper, Box, TextField, Button, Grid, Switch, ToggleButton, ToggleButtonGroup, FormControl, FilledInput, FormHelperText, OutlinedInput, AppBar } from '@mui/material';
import React, { useEffect, useState } from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import scanCard from './scan_card.png'
import { useRef } from 'react';
import ResponsiveAppBar from './ResponsiveAppBar';
import ScanCard from './ScanCard';
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import LeakTable from './LeakTable';
import LeakInfo from './LeakInfo';
import SelectDialog from './SelectDialog';
import LeakCard from './LeakCard';
import NoSpacingGrid from './NoSpacingGrid';
import SquareButton from './SquareButton';


export default function Main(props) {
  
  const [userIdInputField, setUserIdInputField] = useState();
  const [loginTime, setLoginTime] = useState(0);
  const [formattedTime, setFormattedTime] = useState('00:00');
  const [responsiblePerson, setResponsiblePerson] = useState([]);
  const [isSelected, setIsSelected] = useState(false);
  const [isApplied, setIsApplied] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [orderPlace, setOrderPlace] = React.useState('P2');
  const [orderNumber, setOrderNumber] = React.useState(0);
  const [selectDialogOpen, setSelectDialogOpen] = React.useState(false);


  


  const [leaks, setLeaks] = useState([
    
    // ...
  ]);

  const handleRemoveLeak = (id) => {
    setLeaks(leaks.filter((leak) => leak.id !== id));
  };

  const setSelectedLeaks = (leaks) => {
    setLeaks(JSON.parse(leaks))
    console.log("Loaded leaks selection: " + leaks)
  };
  
  

  const selectDialogHandleClose = (selectedLeak) => {
    setSelectDialogOpen(false);
    if(selectedLeak != null) {
    console.log("Closed with leak: " + selectedLeak);

    // Create a new leak object
  const newLeak = {
    id: selectedLeak, // Assuming the selected leak has an 'id' property
    quantity: 1, // Assuming the selected leak has a 'quantity' property
  };

  // Add the new leak to the existing leaks array
  setLeaks([...leaks, newLeak]);
}
  };






  const getUnixTime = () => {
    return Math.floor(Date.now() / 1000);
  };

  function saveChanges() {
    var endTime = 0;
      var on = -1;
        if(orderPlace != "P1") {
          on = orderNumber
        }

        if(isApplied) {
          endTime = getUnixTime();
          var body = JSON.stringify({
            "token": props.userId,
            "endTime": endTime
          });
        } else {
          var body = JSON.stringify({
            "token": props.userId,
            "leak": JSON.stringify(leaks),
            "startTime": getUnixTime(),
            "responsiblePerson": responsiblePerson,
            "selectionTime": loginTime,
            "orderNumber": on

          });
        }
        

        fetch('http://10.2.2.132:5001/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: body
      })
      .then(response => response.json())
      .then(data => {
        if(data['result'] == "success") {
          if(!isApplied) {
            setIsApplied(true);
            setLoginTime(Math.floor(Date.now() / 1000))
            console.log("Successfully saved data: " + data);
          } else {
            setIsComplete(true);
          }
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  


  function formatUnixTime(unixTime) {
    // Compute hours, minutes, and seconds from the elapsed Unix time
    const hours = Math.floor(unixTime / 3600);
    const minutes = Math.floor((unixTime % 3600) / 60);
    const seconds = unixTime % 60;
  
    // Convert hours, minutes, and seconds to strings and pad them with zeros if needed
    const hoursStr = String(hours).padStart(2, '0');
    const minutesStr = String(minutes).padStart(2, '0');
    const secondsStr = String(seconds).padStart(2, '0');
  
    // Combine hours, minutes, and seconds into the desired format
    let formattedTime = `${minutesStr}:${secondsStr}`;
  
    // Conditionally display hours only when they are non-zero
    if (hours !== 0) {
      formattedTime = `${hoursStr}:${formattedTime}`;
    }
  
    return formattedTime;
  }


  useEffect(() => {
    if (props.userId != null && !isComplete) {
      const interval = setInterval(() => {
        var time = formatUnixTime(getUnixTime() - loginTime);
        setFormattedTime(time);
      }, 1000); // Update every second
  
      return () => clearInterval(interval);
    }
  }, [props.userId, loginTime, isComplete]); // Add isComplete as a dependency
  


  useEffect(() => {
    if (leaks.length != 0 && responsiblePerson.length !== 0 && (orderNumber.length == 8 || orderPlace == "P1")) {
      setIsSelected(true);
    } else {
      setIsSelected(false);
    }
  }, [responsiblePerson, orderPlace, orderNumber, leaks]);


  const handleChange = (event) => {
    setResponsiblePerson(event.target.value);
  };
  

  const handleRefresh = () => {
    window.location.reload();
  };


  const changeOrderPlace = (
    event: React.MouseEvent<HTMLElement>,
    newPlace: string,
  ) => {
    if (newPlace !== null) {
      setOrderPlace(newPlace);
      console.log(newPlace)
    }
  };


  const handleOrderNumberChange = (event) => {
    setOrderNumber(event.target.value)
  };

  const handleQuantityChange = (id, newQuantity) => {
    setLeaks((prevState) => {
      const updatedLeak = { ...prevState.find(leak => leak.id === id), quantity: newQuantity };
      const updatedLeaks = prevState.map(leak => leak.id === id ? updatedLeak : leak);
      return updatedLeaks;
    });
  };


  return (
    
      <Box display="flex" flexDirection="column" justifyContent='center' alignItems='center' sx={{ py: '25px' }}>
      
      <SelectDialog open={selectDialogOpen} handleClose={(selectedLeak) => { selectDialogHandleClose(selectedLeak) } } leaks={leaks} />
    { props.userId != null ? (
        <div>
          {isComplete ? (
            <div>
              <Grid container sx={{textAlign: 'center'}}>
                <Grid item xs={12}>
                <Typography variant="h4">
            Pomyślnie ukończono naprawę!
            </Typography>
            </Grid>
            <Grid item xs={12}>
            <Typography variant="h6">
            Czas naprawy: { formattedTime }
            </Typography>
                </Grid>
              <Grid item xs={12} sx={{ py: 5 }}>
                <Button variant="contained" onClick={handleRefresh}>Powrót do ekranu głównego</Button>
              </Grid>
              </Grid>
            
            </div>
          ) : (
            <div>
              <Paper elevation={3} sx={{ textAlign: 'center', px: '50px', py: '20px' }}>
              <Typography variant="h4">
                Wskaż nieszczelności i osobę odpowiedzialną!
              </Typography>
            <Box sx={{ display: 'flex', p: 2 }}>
                <ToggleButtonGroup
                color="secondary"
                value={orderPlace}
                exclusive
                onChange={changeOrderPlace}
                aria-label="Platform"
                disabled={isApplied}
                
              >
                  <ToggleButton value="P1" sx={{width: '5rem'}}>P1</ToggleButton>
                  <ToggleButton value="P2" sx={{width: '5rem'}}>P2</ToggleButton>
              </ToggleButtonGroup>

              <TextField id="outlined-basic" label="Numer zamówienia produkcyjnego" variant="outlined" sx={{marginLeft: '1rem'}} fullWidth disabled={orderPlace === "P1" || isApplied} onChange={handleOrderNumberChange} value={orderNumber} />
              </Box>
              <FormControl fullWidth variant="outlined">
      <InputLabel id="my-select-label">Osoba odpowiedzialna</InputLabel>
      <Select
        labelId="my-select-label"
        multiple
        value={responsiblePerson}
        onChange={handleChange}
        renderValue={(selected) => selected.join(', ')}
        disabled={isApplied}
      >

        <MenuItem value="option1">Option 1</MenuItem>
        <MenuItem value="option2">Option 2</MenuItem>
        <MenuItem value="option3">Option 3</MenuItem>
      </Select>
    </FormControl>
            </Paper>




            <Paper 
            elevation={3}
            sx={{
              textAlign: 'center',
              px: '50px',
              py: '20px',
              my: '20px',
              width: '80vw',  // Set width to 80% of viewport width
            }}
            >
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
  <NoSpacingGrid container spacing={3}>
  {Array(leaks.length)
    .fill(null)
    .map((_, index) => (
      <Grid
        key={index}
        item
        xs={12}
        sm={12}
        md={6}
        lg={4}
        xl={3}
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        {leaks[index] ? (
          <LeakCard
            id={leaks[index].id}
            quantity={leaks[index].quantity}
            onRemove={handleRemoveLeak}
            onQuantityChange={ (q) => { leaks[index].quantity = q } }
            changesDisabled={isApplied}
          />
        ) : (
          <Box sx={{ width: '100%', height: '100%' }} />
        )}
      </Grid>
    ))}
    {!isApplied ? (

<Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
  <Button sx={{ width: "100%", display: 'flex', justifyContent: 'center', alignItems: 'center' }} onClick={ () => { setSelectDialogOpen(true) } }>
      <Paper
        sx={{
          width: 400,
          height: 555,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          transition: 'box-shadow 0.3s',
          '&:hover': {
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)', // Apply box-shadow on hover
          },
          cursor: 'pointer', // Set cursor to indicate it's clickable
        }}
      >
        <SquareButton size="150" fontSize="50">+</SquareButton>
      </Paper>
    </Button>
  </Grid>

    ) : null}
  
</NoSpacingGrid>
  </Box>
</Paper>
          
            </div>
          )}
          
            

        {isComplete ? (
          null
        ) : (
          <Paper
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        textAlign: 'center',
      }}
    >
      <Grid container>
      <Grid item xs={4}>
      <Box display="flex" flexDirection="column" justifyContent='center' alignItems='center' sx={{ height: '100%' }}>
      <Typography variant="h5">
        {isApplied ? (
          <div style={{color: 'red'}}>Czas naprawy: { formattedTime }</div>
        ) : (
          <div>Czas wyboru: { formattedTime }</div>
                  )}
            
            </Typography>
            </Box>
</Grid>
          <Grid item xs={8}>
          {isApplied ? (
            <Button
  variant="contained"
  color="success"
  fullWidth
  sx={{ m: 2, fontSize: "26px" }}
  onClick={saveChanges}
>
  Naprawiono!
</Button>
          ) : (
            <Button
  variant="contained"
  fullWidth
  sx={{ fontSize: "26px" }}
  disabled={!isSelected}
  onClick={saveChanges}
>Rozpocznij naprawę</Button>
          )}
      
</Grid>
</Grid>

    </Paper>
        )}
        

        </div>
      ) : (
        <Paper elevation={3} sx={{ textAlign: 'center', px: '50px', py: '50px' }}>
        <Grid container direction={'column'} spacing={2}>
          <ScanCard setUserId={props.setUserId} setName={props.setName} setSurname={props.setSurname} setLoginTime={setLoginTime} setIsSelected={setIsSelected} setIsApplied={setIsApplied} setSelectedLeaks={setSelectedLeaks} setResponsiblePerson={setResponsiblePerson} setOrderNumber={setOrderNumber} showLoadingScreen={props.showLoadingScreen} hideLoadingScreen={props.hideLoadingScreen} loading={props.loading} notify={(action, text) => { props.notify(action, text) }} />
        </Grid>
        </Paper>
      )}
    
    
    </Box>
  );
  
}
