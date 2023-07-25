import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { Box } from "@mui/system";
import ResponsiveAppBar from "./ResponsiveAppBar";
import { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import LoadingOverlay from './LoadingOverlay';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import Overlay from "./Overlay";
import { Button, Grid, Paper, Stack, TextField, Typography } from "@mui/material";
import PanelV2 from "./PanelV2";
import { createContext, useContext } from 'react';
import { ArrowForwardIosOutlined } from "@mui/icons-material";


export default function SignIn(props) {
    const [password, setPassword] = useState("");
    const [userId, setUserId] = useState("");


    /*
    async function login(event) {
        props.showLoadingScreen();
        if (event != null) {
          event.preventDefault();
        }
      
        if (password !== "") {
          
          console.log("Attempt to login...");
      
          const response = await fetch("http://10.2.2.238:6000/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              'token': 'admin',
              "password": password,
              "dateStart": dateStart,
              "dateEnd": dateEnd,
            })
          });
      
          try {
            const data = await response.json();
            console.log(data);
            if (data.result === "success") {
              setSignedIn(true);
              props.setUserId("0000");
              props.setName("Admin");
              const mappedFixes = data.fixes.map((fix) => {
                return {
                  fixId: fix.fixId,
                  employeeId: fix.employeeId,
                  startTime: fix.startTime,
                  endTime: fix.endTime,
                  responsiblePerson: fix.responsiblePerson,
                  orderId: fix.orderId,
                  loginTime: fix.loginTime,
                  leakId: fix.leakId,
                };
              });
              setRows(mappedFixes);
              console.log("Mapped: " + mappedFixes);
            }
          } catch (error) {
            console.error(error);
          } finally {
            props.hideLoadingScreen();
          }
        }
      }
      */


      const handleUsernameChange = (event) => {
        setUserId(event.target.value);
      }

      const handlePasswordChange = (event) => {
        setPassword(event.target.value);
      }



      function login(event) {
        if (event != null) {
            event.preventDefault();
        }
    
        if (password !== "") {
            props.showLoadingScreen();
            console.log("Attempt to login...");
    
            fetch("/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    'userId': userId,
                    "password": password,
                })
            }).then(response => {
                response.json().then(data => {
                    console.log(data);
                    if (data.result === "success") {
                      props.setToken(data.token)
                      props.setUserId(userId);
                      props.setName(data.employee.name);
                      props.setSurname(data.employee.surname);
                      props.setIsSignedInByLink("false");

                      sessionStorage.setItem('token', data.token);
                      sessionStorage.setItem('userId', userId);
                      sessionStorage.setItem('name', data.employee.name);
                      sessionStorage.setItem('surname', data.employee.surname);
                      sessionStorage.setItem('isSignedInByLink', "false");
                    }
                })
            }).catch(error => {
                console.error(error);
                props.hideLoadingScreen();
            }).finally(() => {
              props.hideLoadingScreen();
          });
        }
      }    



return (
    <Box sx={{ textAlign: 'center' }} display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <Paper sx={{ p: 5, m: 5 }}>
        <form onSubmit={login}>
          <Typography variant="h6" sx={{ py: 2 }}>Zaloguj się do panelu administracyjnego</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField id="username" label={props.getSelectedLanguageString("cardId")} variant="outlined" type="text" onChange={handleUsernameChange} fullWidth />
            </Grid>
            <Grid item xs={12}>
              <TextField id="password" label={props.getSelectedLanguageString("password")} variant="outlined" type="password" onChange={handlePasswordChange} fullWidth />
            </Grid>
          </Grid>
  
          <Button type="submit" variant="contained" sx={{ my: 2, height: '40px' }}>
            Dalej<pre>  </pre><ArrowForwardIosOutlined />
          </Button>
        </form>
      </Paper>
    </Box>
  );  
  

}