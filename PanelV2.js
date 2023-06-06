import React from 'react';
import { Typography, Paper, Box, TextField, Grid, Button, FormControl, OutlinedInput, FormHelperText, InputAdornment, Divider, Toolbar, ListItem, ListItemText, List, Drawer } from "@mui/material";
import { makeStyles } from '@mui/styles';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useRef, useEffect, useState } from 'react';
import NoSpacingGrid from "./NoSpacingGrid";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ExpandingRow from "./ExpandingRow.js";
import Nav from './Nav';

export default function PanelV2(props) {
    const passwordRef = useRef(null);
    const [signedIn, setSignedIn] = React.useState(false);
    const [rows, setRows] = React.useState([]);
    const [password, setPassword] = React.useState("");

    const [calendarSelectionStart, setCalendarSelectionStart] = React.useState(Date.now())
    const [calendarSelectionEnd, setCalendarSelectionEnd] = React.useState(Date.now())
    
    

  function login(event, sD, eD) {
    if(event != null) {
      event.preventDefault();
    }

    var sDC = props.calendarSelectionStart;
    if(sD != null) {
      sDC = sD
    }

    var eDC = props.calendarSelectionEnd;
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
            const mappedFixes = data["fixes"].map(fix => {
              return {
                fixId: fix.fixId,
                employeeId: fix.employeeId,
                startTime: fix.startTime,
                endTime: fix.endTime,
                responsiblePerson: fix.responsiblePerson,
                orderId: fix.orderId,
                loginTime: fix.loginTime,
                leakId: fix.leakId
              };
            });
            setRows(mappedFixes);
            console.log("Mapped: " + mappedFixes)
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
    setCalendarSelectionStart(startDate);
    setCalendarSelectionEnd(endDate);
    //var options = { year: 'numeric', month: 'long', day: 'numeric' };
    //props.setSelectedMonth(oldDate.toISOString().split('T')[0]);
    //setDateLabel(startDate.toISOString().split('T')[0] + " - " + endDate.toISOString().split('T')[0]);
    login(null, startDate, endDate);
}


useEffect(() => {

    handleMonthChange();

    if(props.monthState != null) {
      handleMonthChange(props.monthState);
      props.setMonthState(null);
      
    }

//}, [props.monthState])

  }, [])

    function handlePasswordChange() {
        setPassword(passwordRef.current.value)
      }

      

    return (
      
        <Box>
          <Nav calendarSelectionStart={calendarSelectionStart} calendarSelectionEnd={calendarSelectionEnd} setCalendarSelectionStart={setCalendarSelectionStart} setCalendarSelectionEnd={setCalendarSelectionEnd} />
            {signedIn ? (
                <React.Fragment>

      {rows.map(fix => (
        <ExpandingRow
          fixId={fix.fixId}
          employeeId={fix.employeeId}
          startTime={fix.startTime}
          endTime={fix.endTime}
          orderId={fix.orderId}
          loginTime={fix.loginTime}
          responsiblePerson={fix.responsiblePerson}
          leakId={fix.leakId}
          notify={(action, text) => { props.notify(action, text) }}
          />
      ))}

            </React.Fragment>
            
            ) : (
                <Box elevation={3} sx={{ textAlign: 'center', px: '50px', py: '25px' }} display="flex" flexDirection="column" justifyContent='center' alignItems='center' >
                    <Paper sx={{ p: 5 }}>
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
      </Box>
    )}
   
    </Box>
    )

}