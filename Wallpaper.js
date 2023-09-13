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
import { useNavigate, useParams } from 'react-router-dom';
import palety from "./images/palety.png"
import woda from "./images/woda.png"
import hel from "./images/hel.png"
import parking from "./images/parking.jpg"


export default function Wallpaper() {
    const {appName} = useParams();

    return (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
    backgroundImage: (appName == "Leaks" &&`url(${woda})`) || (appName == "WoodApp" &&`url(${palety})`) || (appName == "HeliumTest" &&`url(${hel})`) || (appName == "Cars" &&`url(${parking})`),
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  zIndex: "-100"
  }}></div>
    )
}