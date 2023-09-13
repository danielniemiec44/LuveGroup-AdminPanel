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
import { MyContext } from "./App";

export default function SignIn(props) {
    const [password, setPassword] = useState("");
    const [userId, setUserId] = useState("");
    const { carsPerms, setCarsPerms } = useContext(MyContext);

    


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
    
            fetch("/api/login", {
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

                      props.setLeaksPerms(data['employee']['leaks_perms']);
                      props.setWoodAppPerms(data['employee']['woodapp_perms']);
                      props.setHeliumPerms(data['employee']['helium_perms']);
                      setCarsPerms(data['employee']['cars_perms']);

                      sessionStorage.setItem('leaks_perms', data['employee']['leaks_perms']);
                      sessionStorage.setItem('woodapp_perms', data['employee']['woodapp_perms']);
                      sessionStorage.setItem('helium_perms', data['employee']['helium_perms']);
                      sessionStorage.setItem('cars_perms', data['employee']['cars_perms']);

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