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
import { Drawer, Grid, List, ListItem, ListItemText, Paper, Stack } from '@mui/material';
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
import NoSpacingGrid from './NoSpacingGrid';
import { useNavigate } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
    appPicker: {
      width: 200,
      height: 200,
      fontSize: "clamp(5px, 5vw, 20px)"
    },
}))


export default function AppSelector(props) {

   
    const classes = useStyles();
    const navigate = useNavigate();

    return (
        
        <Box sx={{ textAlign: 'center' }} display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <div style={{ boxShadow: "0px 0px 5px 1px rgb(0, 0, 0, 0.5)", background: "rgba(255, 255, 255, 0.8)" }}>
      <Typography variant="h6" sx={{ textAlign: 'center', p: 1, color: "white", background: "darkgreen" }}>
            {props.getSelectedLanguageString("appSelectorTitle")}
        </Typography>
        
        <Grid container spacing={5} sx={{ padding: 3 }}>
            <Grid item xs={12} sm={6} md={4}>
                <Button variant="contained" color="primary" onClick={() => { navigate("/Leaks") }} className={classes.appPicker}>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                Leaks
                </Grid>
                <Grid item xs={12}>
                    <Typography>{props.getSelectedLanguageString("manageLeaks")}</Typography>
                </Grid>
                </Grid>
                </Button>
                
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <Button variant="contained" color="primary" onClick={() => { navigate("/WoodApp") }} className={classes.appPicker}>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                WoodApp
                </Grid>
                <Grid item xs={12}>
                    <Typography>Zarządzaj zakupem drewna</Typography>
                </Grid>
                </Grid>
                </Button>
                
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <Button variant="contained" color="primary" onClick={() => { navigate("/HeliumTest") }} className={classes.appPicker}>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                HeliumTest
                </Grid>
                <Grid item xs={12}>
                    <Typography>Wyświetl i wyszukaj test helowy</Typography>
                </Grid>
                </Grid>
                </Button>
                
            </Grid>
            {/*
            <Grid item xs={12} sm={6} md={4} s>
                <Button disabled variant="outlined" color="primary" onClick={() => { }} className={classes.appPicker}>
                <Grid container spacing={1}>
                        <Grid item xs={12}>
                sdc
                </Grid>
                <Grid item xs={12}>
                    <Typography>W PRZYSZŁOŚCI</Typography>
                </Grid>
                </Grid>
                </Button>
            </Grid>
    */}
            
        </Grid>
        </div>
        </Box>
    )
}