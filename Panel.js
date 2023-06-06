import { Typography, Paper, Box, TextField, Grid, Button, FormControl, OutlinedInput, FormHelperText, InputAdornment } from "@mui/material";
import React from "react";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useRef, useEffect, useState } from 'react';
import EnhancedTable from "./EnhancedTable";


export default function Panel(props) {
  const passwordRef = useRef(null);
  const [signedIn, setSignedIn] = React.useState(false);
  const [rows, setRows] = React.useState([]);
  const [password, setPassword] = React.useState("");
  const [dateStart, setDateStart] = React.useState(null);
  const [dateEnd, setDateEnd] = React.useState(null);
  const [selectedMonth, setSelectedMonth] = React.useState(new Date(new Date(Date.now()).getFullYear(), new Date(Date.now()).getMonth(), 2).toISOString().split('T')[0]);
  const [dateLabel, setDateLabel] = React.useState("Nie można wczytać daty!");


  function setDateRange(dateStart, dateEnd) {
    setDateStart(dateStart);
    setDateEnd(dateEnd);
  }


  function handleMonthChange(forward) {
    var monthsToAdd = 0;
    if(forward != undefined) {
      if(forward) {
        monthsToAdd = 1;
      } else {
        monthsToAdd = -1;
      }
  }

    var oldDate = new Date(Date.parse(selectedMonth));
    oldDate.setMonth(oldDate.getMonth() + monthsToAdd);
    var startDate = new Date(oldDate.getFullYear(), oldDate.getMonth(), 2)
    var endDate = new Date(oldDate.getFullYear(), oldDate.getMonth() + 1, 1)
    setDateStart(startDate);
    setDateEnd(endDate)
    //var options = { year: 'numeric', month: 'long', day: 'numeric' };
    setSelectedMonth(oldDate.toISOString().split('T')[0]);
    setDateLabel(startDate.toISOString().split('T')[0] + " - " + endDate.toISOString().split('T')[0]);
    login(null, startDate, endDate);
  }

  function login(event, sD, eD) {
    if(event != null) {
      event.preventDefault();
    }

    var sDC = dateStart;
    if(sD != null) {
      sDC = sD
    }

    var eDC = dateEnd;
    if(eD != null) {
      eDC = eD
    }
    

      if(password != "") {
        console.log("Attempt to login...")

        props.showLoadingScreen();

        fetch('http://10.2.2.132:5001/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'token': 'admin',
            "password": password,
            "dateStart": sDC,
            "dateEnd": eDC,
          })
        })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          if(data['result'] == "success") {
            setSignedIn(true);
            props.setUserId("0000");
            props.setName("Admin")
            setRows(data['fixes']);
            
          }
        })
        .catch(error => {
          console.error(error);
          props.notify("error", "contact")
        })
        .finally(error => {
          props.hideLoadingScreen();
        });
      }
}

function handlePasswordChange() {
  setPassword(passwordRef.current.value)
}

useEffect(() => {
  handleMonthChange(undefined);
}, []);

return (
    <Box display="flex" flexDirection="column" justifyContent='center' alignItems='center'>
      {signedIn ? (
        <Grid container spacing={0} direction={'column'} width="100%">
          <Grid item xs={12}>
        
    <Paper elevation={3} sx={{ textAlign: 'center', px: '50px', py: '25px', my: 5, width: '80%' }}>
    <Grid container spacing={0} direction={'column'} width="100%">
        <Grid item xs={12}>
          <EnhancedTable rows={rows} dateStart={dateStart} dateEnd={dateEnd} dateLabel={dateLabel} handleMonthChange={handleMonthChange} />
        </Grid>
      </Grid>
    </Paper>
    </Grid>
    <Grid item xs={12}>
    <Paper elevation={3} sx={{ textAlign: 'center', px: '50px', py: '25px', my: 5, width: '80%' }}>
      <Typography variant="h6">Zarządzanie osobami odpowiedzialnymi</Typography>
    </Paper>
    </Grid>
    </Grid>
      ) : (
        <Paper elevation={3} sx={{ textAlign: 'center', px: '50px', py: '25px' }}>
      <Grid container spacing={0} direction={'column'} style={{ width: '500px' }}>

            <form onSubmit={login}>
          <Grid item xs={12}>
        <Typography variant="h6" sx={{py: 2 }}>Zaloguj się do panelu administracyjnego</Typography>
        </Grid>
        <Grid item xs={12}>
        <TextField id="outlined-basic" label="Hasło administracyjne" variant="outlined" type="password" inputRef={passwordRef} onChange={handlePasswordChange} style={{ width: '100%' }} />
        </Grid>
        <Grid item xs={12}>
        <Button type="submit" variant="contained" sx={{ my: 2, height: '40px' }}>Dalej<pre>  </pre><ArrowForwardIosIcon /></Button>
        </Grid>
        </form>

        
        
        </Grid>
      </Paper>
      )}
      </Box>
)
}