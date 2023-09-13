import { Typography, Grid, Button, Divider, Chip, List, ListItem, ListItemIcon, ListItemText, Paper, CircularProgress, TableContainer, Table, TableBody, TableRow, TableCell, TableHead, Alert } from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import EditIcon from '@mui/icons-material/Edit';
import React, { useEffect, useState } from 'react';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import DeleteIcon from '@mui/icons-material/Delete';



import Leak900 from "./Leaks/900.png";
import Leak901 from "./Leaks/901.png";
import Leak902 from "./Leaks/902.png";
import Leak904 from "./Leaks/904.png";
import Leak905 from "./Leaks/905.png";
import Leak950 from "./Leaks/950.png";
import Leak951 from "./Leaks/951.png";
import Leak952 from "./Leaks/952.png";
import Leak955 from "./Leaks/955.png";
import Leak958 from "./Leaks/958.png";
import Leak960 from "./Leaks/960.png";
import LeakTable from "./LeakTable";

import { leakData } from './LeakTable';
import { getLeakImage } from './LeakTable';
import { getLeakDescription } from './LeakTable';
import NoSpacingGrid from "./NoSpacingGrid";
import { Box } from "@mui/system";




export default function ExpandingRow(props) {
    const [expanded, setExpanded] = useState(false);
    const [renderItems, setRenderItems] = useState();
    const [quantity, setQuantity] = useState(0);
    const [actions, setActions] = useState(null);
    const [pending, setPending] = useState(false);
    const [canFix, setCanFix] = useState(false);


    


    

    const expand = () => {
        if(expanded) {
            setExpanded(false);
        } else {
            setExpanded(true);
        }
    }


    useEffect(() => {

        const leakData = JSON.parse(props.fixData[1]);
        var q = 0;
        if(Array.isArray(leakData)) {
        setRenderItems(
            leakData.map((item) => {
              const { id, quantity } = item;
              q += parseInt(quantity);
        return (
          <div style={{ boxShadow: "0px 0px 5px 1px rgb(0, 0, 0, 0.5)", padding: 20, margin: 20, background: "white" }}>
            <Grid container spacing={5}>
              <Grid item lg={3} xs={12} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <img
                  src={getLeakImage(id)}
                  alt={getLeakDescription(id)}
                  style={{ maxWidth: '100%', maxHeight: 80 }}
                />
              </Grid>
              <Grid item lg={7} xs={12} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Typography>
                  {id} - {getLeakDescription(id)}
                </Typography>
              </Grid>
              <Grid item lg={2} xs={12} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", minWidth: "50px", minHeight: "50px", background: "white", color: "black", borderRadius: 5, textAlign: "center", boxShadow: "0px 0px 5px 0px black" }}>
                  <Typography variant="h5">{quantity}</Typography>
                </div>
              </Grid>
            </Grid>
          </div>
        );
      }));
    }

      setQuantity(q);

      

      if(actions != null) {
      actions.map((action, index) => {
        if (action[4] == null) {
          setPending(true);
        }
      })
    }

    }, [props.leakId, actions]);


    useEffect(() => {
      expanded && fetchActions();
    }, [expanded]);

    useEffect(() => {
      if(expanded) {
        if(props.isSignedInByLink == "true" && actions != null && props.fixData[5] == null) {
          setCanFix(true)
          console.log("isSignedInByLink: ", props.isSignedInByLink, "actions: ", actions, "fixData[5]: ", props.fixData[5])
        } else {
          setCanFix(false)
          console.log("No permission to fix: " + props.fixData[0])
        }
      }
      
    }, [expanded, props.isSignedInByLink, actions, props.fixData[5]]);

      


    function getResponsiblePersons() {
        const optionsString = props.fixData[2];
        const trimmedString = optionsString.slice(1, -1);
        
      
        return trimmedString;
      }


      function fetchActions() {
        fetch("/api/fetch_actions2", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    'token': props.token,
                    'fixId': props.fixData[0],
                })
            }).then(response => {
                response.json().then(data => {
                    console.log(data);
                    if (data.result === "success") {
                      console.log(data);
                      setActions(data.actions);
                      return data.actions;
                    }
                })
            }).catch(error => {
                console.error(error);
            });
      }



    return (
      <Grid item xs={12} lg={8} style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ boxShadow: "0px 0px 5px 8px rgba(0, 0, 0, 0.5)", padding: 20, margin: 20, boxSizing: "border-box", width: "100%", height: "100%", background: "rgba(200, 255, 255, 0.95)", borderRadius: 10 }}>
            <Grid container spacing={5} style={{ display: "flex", alignItems: "stretch", justifyContent: "center" }}>
                <Grid item xs={3} md={2} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Typography variant="h4">{props.fixData[0]}</Typography>
                    
                </Grid>

                <Grid item xs={8} md={5} style={{ display: "flex", alignItems: "center" }}>
                    <Grid container>
                    <Grid item xs={12}>
                    <Typography variant="h6">Numer zamówienia: {props.fixData[4] == "-1" ? (<React.Fragment>Brak</React.Fragment>) : props.fixData[4]}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        ID Pracownika: {props.fixData[3] == "-1" ? (<React.Fragment>Brak</React.Fragment>) : props.fixData[3]}
                    </Typography>
                    </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={8} md={3} style={{ display: "flex", alignItems: "center" }}>
                    
                    { props.fixData[5] == null ? (
                      <div style={{ background: "red", color: "white", borderRadius: "10px", textAlign: "center", boxShadow: "0px 0px 5px 0px #1976d2", display: "inline-block", padding: 5, width: "100%" }}>
                      <Typography variant="h6">NIEZAKOŃCZONA</Typography>
                  </div>
                    ) : (
                      <div style={{ background: "green", color: "white", borderRadius: "10px", textAlign: "center", boxShadow: "0px 0px 5px 0px #1976d2", display: "inline-block", padding: 5, width: "100%" }}>
                      <Typography variant="h6">ZAKOŃCZONA</Typography>
                  </div>
                    )}
                    
                    
                </Grid>

                <Grid item xs={4} md={2} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {expanded ? (
                        <Button onClick={expand} fullWidth size="large"><ArrowDropUpIcon /> Zwiń</Button>
                    ) : (
                        <Button onClick={expand} fullWidth size="large"><ArrowDropDownIcon /> Rozwiń</Button>
                    )}
                    
                </Grid>

                {expanded ? (
                    <React.Fragment>
<Grid item xs={12}>
<Divider>
<Chip label={(<Typography>Szczegóły naprawy</Typography>)} sx={{ boxShadow: "0px 0px 5px 1px rgb(0, 0, 0, 0.5)" }} />
</Divider>
</Grid>
<Grid item md={6} xs={12}>
<div style={{ boxShadow: "0px 0px 5px 1px rgb(0, 0, 0, 0.5)", padding: 20, margin: 20, background: "white" }}>
    <Grid container spacing={1}>
        <Grid item xs={6} sx={{ display: "flex", alignItems: "center" }}>
        <Typography>Czas logowania:</Typography>
        </Grid>
        <Grid item xs={6} sx={{ display: "flex", alignItems: "center" }}>
        <Typography>{new Date(props.fixData[6]).toUTCString()}</Typography>
        </Grid>
        <Grid item xs={6} sx={{ display: "flex", alignItems: "center" }}>
        <Typography>Czas rozpoczęcia naprawy:</Typography>
        </Grid>
        <Grid item xs={6} sx={{ display: "flex", alignItems: "center" }}>
        <Typography>{new Date(props.fixData[7]).toUTCString()}</Typography>
        </Grid>
        <Grid item xs={6} sx={{ display: "flex", alignItems: "center" }}>
        <Typography>Czas zakończenia naprawy:</Typography>
        </Grid>
        <Grid item xs={6} sx={{ display: "flex", alignItems: "center" }}>
        <Typography sx={{ fontWeight: props.fixData[5] ? "normal" : "bold" }}>{props.fixData[5] ? new Date(props.fixData[5]).toUTCString() : (<div>Brak</div>)}</Typography>
        </Grid>
    </Grid>
</div>



<div style={{ boxShadow: "0px 0px 5px 1px rgb(0, 0, 0, 0.5)", padding: 20, margin: 20, display: "flex", alignItems: "center", justifyContent: "center", background: "white" }}>
  <Grid container sx={{ textAlign: "center" }}>
    <Grid item xs={12}>
<Typography>Stanowisko:</Typography>
    </Grid>
    <Grid item xs={12}>
<Typography variant="h6">{ props.fixData[8] }</Typography>
</Grid>
</Grid>
</div>



<div style={{ boxShadow: "0px 0px 5px 1px rgb(0, 0, 0, 0.5)", padding: 20, margin: 20, display: "flex", alignItems: "center", justifyContent: "center", background: "white" }}>
  <Grid container sx={{ textAlign: "center" }}>
    <Grid item xs={12}>
<Typography>Osoby odpowiedzialne:</Typography>
    </Grid>
    <Grid item xs={12}>
<Typography variant="h6">{getResponsiblePersons(props.fixData[2])}</Typography>
</Grid>
</Grid>
</div>





</Grid>
<Grid item md={8} xs={12}>
        
<Divider>
<Chip label={(<Typography>Nieszczelności ({ quantity })</Typography>)} sx={{ boxShadow: "0px 0px 5px 1px rgb(0, 0, 0, 0.5)" }} />
</Divider>

<div style={{ maxHeight: '600px', overflow: 'auto' }}>

    {renderItems}

    </div>

       
</Grid>

<Grid item xs={12} md={8}>
<Divider>
  <Chip label={(<Typography>Osoby które podjęły się tej naprawy</Typography>)} sx={{ boxShadow: "0px 0px 5px 1px rgb(0, 0, 0, 0.5)" }} />
  </Divider>
</Grid>


{ actions == null ? (
  <Grid item md={8} xs={12}>
  <TableContainer component={Paper}>
    <Table>
      <TableBody>
        <TableRow>
          <TableCell align="center" colSpan={5}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", p: 2 }}>
              <CircularProgress />
              <Typography variant="h6">Pobieranie listy...</Typography>
            </Box>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </TableContainer>
  </Grid>
) : actions == "" ? (
  <Grid item md={8} xs={12}>
  <TableContainer component={Paper}>
    <Table>
      <TableBody>
        <TableRow>
          <TableCell align="center" colSpan={5}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", p: 2 }}>
              <Typography variant="h6">Nikt jeszcze nie podjął się tej naprawy lub dane niedostępne.</Typography>
            </Box>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </TableContainer>
  </Grid>
) : (
  <Grid item md={8} xs={12}>
  <TableContainer component={Paper}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>ID Pracownika</TableCell>
          <TableCell>Imię</TableCell>
          <TableCell>Nazwisko</TableCell>
          <TableCell>Czas rozpoczęcia</TableCell>
          <TableCell>Czas zakończenia</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {actions.map((action, index) => {
          return (
            <TableRow key={index}>
              <TableCell>{action[2]}</TableCell>
              <TableCell>{action[5]}</TableCell>
              <TableCell>{action[6]}</TableCell>
              <TableCell>{new Date(action[3]).toUTCString()}</TableCell>
              <TableCell>
                {action[4] == null ? (
                  <b>W TRAKCIE NAPRAWY</b>
                ) : (
                  new Date(action[4]).toUTCString()
                )}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  </TableContainer>
  </Grid>
  
) }

<Grid item md={8} xs={12} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
    { canFix ? (
      <Button variant="contained" size="large" disabled={pending} onClick={ () => { window.location.href =  process.env.REACT_APP_FOR_LEAKS_URL + "/take_fix/" + props.cardNumber + "/" + props.fixData[0] } }>Podejmij się tej naprawy</Button>
    ) : (
      <Alert sx={{ display: "flex", alignItems: "center", justifyContent: 'center' }} severity='error'>
        <Typography variant="h6">W tym momencie nie możesz podjąć się tej naprawy</Typography>
        </Alert>
    ) }
  </Grid>

</React.Fragment>

                ) : null}
                
                
            </Grid>
        </div>
        </Grid>
    );
}
