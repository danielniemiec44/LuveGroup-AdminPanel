import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, useParams } from 'react-router-dom'
import { Box, Container, alpha } from "@mui/system";
import ResponsiveAppBar from "./ResponsiveAppBar";
import { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import LoadingOverlay from './LoadingOverlay';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import Overlay from "./Overlay";
import { Button, Grid, Paper, Stack, TextField, Typography, useMediaQuery } from "@mui/material";
import PanelV2 from "./PanelV2";
import { createContext, useContext } from 'react';
import SignIn from "./SignIn";
import NavOption from "./NavOption";
import { ArrowBackIos } from "@mui/icons-material";
import { MyContext } from "./App";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import SquareButton from "./SquareButton";
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import { useTheme } from "@mui/material/styles";

export default function ToolBar(props) {
    const { currentPage, pagesCount, setCurrentPage } = useContext(MyContext)
    const theme = useTheme()
    const [pageTextFieldCorrect, setPageTextFieldCorrect] = useState(false)
    const [pageTextFieldValue, setPageTextFieldValue] = useState(null)



    const handlePageTextFieldValueChange = (event) => {
      //const value = parseInt(event.target.value, 10); 
      const value = event.target.value
      console.log("Page textfield got: " + value);
      setPageTextFieldValue(value);
    }
    
    useEffect(() => {
      // This code will run whenever pagesCount changes
      if (pageTextFieldValue < 1 || pageTextFieldValue > pagesCount.current) {
          setPageTextFieldCorrect(false);
      } else {
          setPageTextFieldCorrect(true);
      }
    }, [pagesCount.current, pageTextFieldValue]); // This array means the effect depends on these two variables

    return (
        <Paper sx={{ position: "fixed", display: "flex", alignItems: "center", justifyContent: "center", bottom: {
          xs: 0, lg: 50
        }, right: {
          xs: 0, lg: 50
        }, width: {
          xs: "100%", lg: "auto"
        }, display: "flex", background: {
          xs: theme.palette.background.paper, // No alpha for small screens
          lg: alpha(theme.palette.background.paper, 0.8)  // Alpha for large screens and up
        },
        '&:hover': {
          background: theme.palette.background.paper // No alpha on hover
        } }}>
        <NavOption variant="previousPage" label={(<ArrowBackIos />)} autoWidth  />
        <NavOption variant="pagination" label={`Strona: ${currentPage + 1}/${pagesCount.current}`} count={pagesCount.current}  />
        <NavOption variant="nextPage" label={(<ArrowForwardIosIcon />)} autoWidth />

        <Box sx={{ display: "flex", alignItems: 'center', justifyContent: 'center', ml: 1, mr: 1, flex: 0, justifyContent: 'flex-end' }}>
                  <form style={{ display: "flex", justifyContent: 'center', alignItems: "center" }} onSubmit={(event) => {
                    //props.setSearchValue(searchTags);
                      event.preventDefault();
                      
                      if(pageTextFieldCorrect) {
                        setCurrentPage(pageTextFieldValue - 1)
                        //setCurrentPage(pageTextFieldValue - 1);
                      }
                      
                      
                    }}>
                      
                        <TextField
                    type="number"
                    variant="outlined"
                    sx={{ marginRight: 2 }}

                    value={pageTextFieldValue}

                    onChange={handlePageTextFieldValueChange}
                    placeholder='NR str...'
                    style={{width: 80, textAlign: "center"}}
                    
                  />
                  
                  

                  <SquareButton type="submit" id="pageChangeButton" disabled={!pageTextFieldCorrect} size="50" variant='contained'>
                    { /*props.isSearching ? (
                      <CircularProgress size={20} color="inherit" disableShrink />
                    ) : (
                      <SearchIcon fontSize='large' />
                    ) */}
                    <AutoStoriesIcon fontSize='large' />
                  
                  
                  </SquareButton>
                  </form>
                </Box>
        </Paper>
    )
}