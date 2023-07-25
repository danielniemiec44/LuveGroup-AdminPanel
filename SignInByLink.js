import { useParams } from 'react-router-dom';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import logo from "./logo.jpg"
import { Drawer, Grid, List, ListItem, ListItemText, Paper, Stack, useMediaQuery } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { createContext, useContext } from 'react';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import FadeMenu from './FadeMenu';
import NavOption from './NavOption';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useRef } from 'react';
import zIndex from '@mui/material/styles/zIndex';
import TranslateIcon from '@mui/icons-material/Translate';
import { navStyles } from './NavOption';
import Nav from './Nav';

export default function SignInByLink(props) {
  const { cardNumber } = useParams();




  function login(event) {
    if (event != null) {
        event.preventDefault();
    }


        props.showLoadingScreen();
        console.log("Attempt to login...");

        fetch("/sign-in-by-link", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                'cardToken': cardNumber,
            })
        }).then(response => {
            response.json().then(data => {
                console.log(data);
                if (data.result === "success") {
                  props.setToken(data.token)
                  props.setUserId(data.employee.employee_id);
                  props.setName(data.employee.name);
                  props.setSurname(data.employee.surname);
                  props.setIsSignedInByLink("true");
                  props.setCardNumber(cardNumber);

                  sessionStorage.setItem('token', data.token);
                  sessionStorage.setItem('userId', data.employee.employee_id);
                  sessionStorage.setItem('name', data.employee.name);
                  sessionStorage.setItem('surname', data.employee.surname);
                  sessionStorage.setItem('isSignedInByLink', "true");
                  sessionStorage.setItem('cardNumber', cardNumber);


                  window.location.href = "/Leaks";
                } else {
                  props.notify("error", "contact")
                }
            })
        }).catch(error => {
            console.error(error);
            props.notify("error", "contact")
            props.hideLoadingScreen();
        }).finally(() => {
          props.hideLoadingScreen();
      });
  }   




  React.useEffect(() => {
    login();
  }, []);
    

  return (
    <Grid container sx={{ p: 5 }} spacing={5}>
      <Grid item xs={12}>
        <Button variant='contained' onClick={login}>Spróbuj ponownie się zalogować</Button>
      </Grid>
      <Grid item xs={12}>
        <Button variant='contained' onClick={() => window.history.back()}>Powrót do aplikacji Leaks</Button>
      </Grid>
    </Grid>
  );
}