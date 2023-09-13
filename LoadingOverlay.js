import React, { useContext } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Grid, Paper } from "@mui/material";
import Overlay from './Overlay';
import { MyContext } from "./App";


export default function LoadingOverlay(props) {
  const context = useContext(MyContext)

  return (
    <>
      {props.loading && (
        <Overlay>
          <Paper>
          
            <Grid container>
            
              <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 5, boxSizing: "border-box" }}>
          <CircularProgress size={50} sx={{marginRight: 5}} disableShrink />
          <Typography variant="h6">
          {context.exporting && (
            <React.Fragment>Trwa eksportowanie danych: {context.exportedCount}<br /></React.Fragment>
          )}
          { props.getSelectedLanguageString("pleaseWait") }
          </Typography>
          </Box>
          </Grid>
          
          </Grid>
          </Paper>
        </Overlay>
        
      )}
    </>
  );
};