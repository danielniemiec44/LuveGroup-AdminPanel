import React from "react";
import Main from "./Main";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import Panel from "./Panel";
import { Box } from "@mui/system";
import ResponsiveAppBar from "./ResponsiveAppBar";
import { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import LoadingOverlay from './LoadingOverlay';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import Overlay from "./Overlay";
import { Button, Grid, Paper, Typography } from "@mui/material";
import PanelV2 from "./PanelV2";
import { createContext, useContext } from 'react';

export default function App(props) {
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [userId, setUserId] = useState(null);
  const [name, setName] = useState(null);
  const [surname, setSurname] = useState(null);


  const [loading, setLoading] = useState(false);

  const [contactErrorInfo, setContactErrorInfo] = useState(false);


  const [dateStart, setDateStart] = React.useState(null);
  const [dateEnd, setDateEnd] = React.useState(null);
  const [selectedMonth, setSelectedMonth] = React.useState(new Date(new Date(Date.now()).getFullYear(), new Date(Date.now()).getMonth(), 2).toISOString().split('T')[0]);
  const [dateLabel, setDateLabel] = React.useState("Nie można wczytać daty!");


  const passwordRef = useRef(null);
  const [signedIn, setSignedIn] = React.useState(false);
  const [rows, setRows] = React.useState([]);
  const [password, setPassword] = React.useState("");

  const [monthState, setMonthState] = React.useState(0);
  
  



  const showLoadingScreen = () => {
    setLoading(true);
  };
  
  const hideLoadingScreen = () => {
    setLoading(false);
  };

  const notify = (action, text) => {
    if(action == "success") {
      toast.success(text, {
        position: toast.POSITION.BOTTOM_RIGHT
      });
    } else if(action == "info") {
      toast.info(text, {
        position: toast.POSITION.BOTTOM_RIGHT
      });
    } else if(action == "error") {
      if(text == "contact") {
        //notify("error", "Wystąpił błąd podczas przetwarzania żądania. Skontaktuj się z programistą działu IT!")
        setContactErrorInfo(true)
      } else {
        toast.error(text, {
          position: toast.POSITION.BOTTOM_RIGHT
        });
  }
    } else if(action == "warning") {
      toast.warn(text, {
        position: toast.POSITION.BOTTOM_RIGHT
      });
    }
  };





function handlePasswordChange() {
  setPassword(passwordRef.current.value)
}

useEffect(() => {

  const urlEnd = window.location.href.split('/').pop().toLocaleLowerCase();
    console.log(urlEnd)

    // This code will be executed every time the location changes
    if(urlEnd == "") {
      setShowAdminPanel(false);
    }
    if(urlEnd == "panel") {
      setShowAdminPanel(true);
    }
    if(urlEnd == "panelv2") {
      setShowAdminPanel(true);
    }
}, []);


  function handleUserIdChange(id) {
    setUserId(id);
  }






return (
  <Box component="main" sx={{ py: 15 }}>
    <LoadingOverlay loading={loading} />
      {contactErrorInfo && (
        <Overlay>
          <Paper>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 5, textAlign: 'center' }}>
            <Grid container>
              <Grid item xs={12}>
          <Typography variant="h4">                                                                                                                                                                                                                                                                                                                   
          Wystąpił błąd podczas przetwarzania żądania. Spróbuj ponownie wykonać ostatnią operację. Jeśli problem nadal będzie się pojawiał skontaktuj się z programistą działu IT!
          </Typography>
          </Grid>
          <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 2, textAlign: 'center' }}>
          <Button variant="contained" onClick={() => {setContactErrorInfo(false)}}>Zamknij</Button>
          </Box>
          </Grid>
          </Grid>
          </Box>
          
          </Paper>
        </Overlay>
        
      )}
      <ToastContainer />
  <Router>
              <Routes>
                  <Route exact path="/" element={
                  <div><Main userId={userId} setUserId={handleUserIdChange} name={name} setName={setName} surname={surname} setSurname={setSurname} showLoadingScreen={showLoadingScreen} hideLoadingScreen={hideLoadingScreen}  notify={(action, text) => { notify(action, text) }} /></div>
                  } ></Route>
                  <Route exact path="/panel" element={
                    <div><Panel setUserId={handleUserIdChange} setName={setName} showLoadingScreen={showLoadingScreen} hideLoadingScreen={hideLoadingScreen}  notify={(action, text) => { notify(action, text) }}
                    
                    
                    /></div>
                  }>
                    
                    </Route>


                    <Route exact path="/panelv2" element={
                    <PanelV2 setUserId={handleUserIdChange} setName={setName} showLoadingScreen={showLoadingScreen} hideLoadingScreen={hideLoadingScreen}  notify={(action, text) => { notify(action, text) }}
                    
                    setDateLabel={setDateLabel} monthState={monthState} setMonthState={setMonthState}

                    selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth}
                    />
                  }>
                    
                    </Route>
              </Routes>
          </Router>
          <ResponsiveAppBar showAdminPanel={showAdminPanel} userId={userId} name={name} surname={surname} dateLabel={dateLabel} monthState={monthState} setMonthState={setMonthState} selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} />
          </Box>
)
}