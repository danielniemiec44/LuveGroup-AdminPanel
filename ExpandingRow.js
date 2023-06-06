import { Typography, Grid, Button, Divider, Chip, List, ListItem, ListItemIcon, ListItemText, Paper } from "@mui/material";
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




export default function ExpandingRow(props) {
    const [expanded, setExpanded] = useState(false);
    const [renderItems, setRenderItems] = useState();
    const [quantity, setQuantity] = useState(0);

    const expand = () => {
        if(expanded) {
            setExpanded(false);
        } else {
            setExpanded(true);
        }
    }


    useEffect(() => {

        console.log("Leaks: " + props.leakId)

        try {

        const leakData = JSON.parse(props.leakId);
        var q = 0;
        setRenderItems(
            leakData.map((item) => {
              const { id, quantity } = item;
              q += parseInt(quantity);
        return (
          <div style={{ boxShadow: "0px 0px 5px 1px rgb(0, 0, 0, 0.5)", padding: 20, margin: 20 }}>
            <Grid container spacing={5}>
              <Grid item lg={3} xs={12} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <img
                  src={getLeakImage(id)}
                  alt={getLeakDescription(id)}
                  style={{ maxWidth: '100%' }}
                />
              </Grid>
              <Grid item lg={7} xs={12} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Typography variant="h6">
                  {id} - {getLeakDescription(id)}
                </Typography>
              </Grid>
              <Grid item lg={2} xs={12} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", width: 80, height: 80, background: "white", color: "black", borderRadius: 20, textAlign: "center", boxShadow: "0px 0px 5px 0px black" }}>
                  <Typography variant="h5">{quantity}</Typography>
                </div>
              </Grid>
            </Grid>
          </div>
        );
      }));

      setQuantity(q);

    } catch (error) {
        props.notify("error", "contact")
        console.error("Error parsing leak data:", error);
      }

      

    }, [props.leakId]);

      


    function getResponsiblePersons() {
        const optionsString = props.responsiblePerson;
        const trimmedString = optionsString.slice(1, -1);
        const optionsArray = trimmedString.split(",");
      
        return optionsArray.map(option => (
          <Grid item>
            <div style={{ textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", width: 50, height: 50, background: "white", color: "black", borderRadius: 5, textAlign: "center", boxShadow: "0px 0px 5px 0px black" }}>
              <Typography variant="h6">{option}</Typography>
            </div>
          </Grid>
        ));
      }



    return (
        <div style={{ boxShadow: "0px 0px 5px 1px rgb(0, 0, 0, 0.5)", padding: 20, margin: 20 }}>
            <Grid container spacing={3}>
                <Grid item xs={1} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Typography variant="h4">{props.fixId}</Typography>
                    
                </Grid>

                <Grid item md={3} xs={11} style={{ display: "flex", alignItems: "center" }}>
                    <Grid container>
                    <Grid item xs={12}>
                    <Typography variant="h6">Numer zamówienia: {props.orderId == "-1" ? (<React.Fragment>Brak</React.Fragment>) : props.orderId}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        ID Pracownika: {props.employeeId}
                    </Typography>
                    </Grid>
                    </Grid>
                </Grid>
                <Grid item md={2} xs={12} style={{ display: "flex", alignItems: "center" }}>
                    <div style={{ background: "green", color: "white", borderRadius: "10px", textAlign: "center", boxShadow: "0px 0px 5px 0px #1976d2", display: "inline-block", padding: 5, width: "100%" }}>
                        <Typography variant="h6">Nieszczelności: {quantity}</Typography>
                    </div>
                </Grid>
                <Grid item md={2} xs={4} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Button><EditIcon /> Edytuj</Button>
                </Grid>
                <Grid item md={2} xs={4} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Button><DeleteIcon /> Usuń</Button>
                </Grid>
                <Grid item md={2} xs={4} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {expanded ? (
                        <Button onClick={expand}><ArrowDropUpIcon /> Zwiń</Button>
                    ) : (
                        <Button onClick={expand}><ArrowDropDownIcon /> Rozwiń</Button>
                    )}
                    
                </Grid>
                {expanded ? (
                    <React.Fragment>
<Grid item xs={12} style={{  }}>
<Divider>
<Chip label="Szczegóły naprawy" />
</Divider>
</Grid>
<Grid item md={6} xs={12} style={{  }}>
<div style={{ boxShadow: "0px 0px 5px 1px rgb(0, 0, 0, 0.5)", padding: 20, margin: 20 }}>
    <Grid container>
        <Grid item xs={6}>
        <Typography variant="h6">Czas logowania:</Typography>
        </Grid>
        <Grid item xs={6}>
        <Typography variant="h6">{props.loginTime}</Typography>
        </Grid>
        <Grid item xs={6}>
        <Typography variant="h6">Czas rozpoczęcia naprawy:</Typography>
        </Grid>
        <Grid item xs={6}>
        <Typography variant="h6">{props.startTime}</Typography>
        </Grid>
        <Grid item xs={6}>
        <Typography variant="h6">Czas zakończenia naprawy:</Typography>
        </Grid>
        <Grid item xs={6}>
        <Typography variant="h6">23-05-2023 08:59:10</Typography>
        </Grid>
    </Grid>
</div>

<NoSpacingGrid container spacing={2} style={{ marginLeft: 5 }}>

{getResponsiblePersons(props.responsiblePerson)}

</NoSpacingGrid>

</Grid>
<Grid item md={6} xs={12} style={{  }}>
<div style={{ maxHeight: '600px', overflow: 'auto' }}>

    {renderItems}

    </div>
            
</Grid>
</React.Fragment>

                ) : null}
                
            </Grid>
        </div>
    );
}
