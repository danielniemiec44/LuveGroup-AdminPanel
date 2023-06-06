import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Typography, Paper, Box, TextField, Button, Grid, Switch, ToggleButton, ToggleButtonGroup, FormControl, FilledInput, FormHelperText, OutlinedInput, AppBar } from '@mui/material';
import SquareButton from './SquareButton';
import { styled } from '@mui/system';


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
import NoArrowsTextField from './NoArrowsSquareTextField';
import NoArrowsSquareTextField from './NoArrowsSquareTextField';
import { useEffect } from 'react';

const leakData = {
  900: {
    image: Leak900,
    title: "Leak 900",
    description: `NIESZCZELNOŚĆ NA SPOINIE NÓŻKI KOLEKTORA, ZAWORU BĄDŹ MONOBLOKA`,
  },
  901: {
    image: Leak901,
    title: "Leak 901",
    description: `ROZERWANE KOLANKO, PRZEGRZANE`,
  },
  902: {
    image: Leak902,
    title: "Leak 902",
    description: `NIESZCZELNOŚĆ NA RURCE W MIEJSCU ZACISKANIA POD RURKĘ O MNIEJSZEJ ŚREDNICY NIŻ OBIEGOWA`,
  },
  904: {
    image: Leak904,
    title: "Leak 904",
    description: `NIESZCZELNOŚĆ NA SPOINIE KOLANKA`,
  },
  905: {
    image: Leak905,
    title: "Leak 905",
    description: `PRZEPALONE KOLANKO`,
  },
  950: {
    image: Leak950,
    title: "Leak 950",
    description: `NIESZCZELNOŚĆ NA ZAMKNIĘCIU KOLEKTORA LUB NA SPOINACH POMIĘDZY NÓŻKAMI I KORPUSEM LUB MIĘDZY RURKĄ WYJŚCIOWĄ I KORPUSEM`,
  },
  951: {
    image: Leak951,
    title: "Leak 951",
    description: `NIESZCZELNOŚĆ NA SPOINACH POMIĘDZY ZAWORKIEM I RURKĄ MIEDZIANĄ`,
  },
  952: {
    image: Leak952,
    title: "Leak 952",
    description: `NIESZCZELNOŚĆ NA SPOINACH POMIĘDZY DYFUZOREM I KAPILARĄ`,
  },
  955: {
    image: Leak955,
    title: "Leak 955",
    description: `NIESZCZELNOŚĆ NA SPOINACH POMIĘDZY RURKĄ KAPILARNĄ I RURKĄ`,
  },
  958: {
    image: Leak958,
    title: "Leak 958",
    description: `NIESZCZELNOŚCI NA POŁĄCZENIU RUREK DO RUREK / RUREK DO  ŚRUBUNKÓW`,
  },
  960: {
    image: Leak960,
    title: "Leak 960",
    description: `NIESZCZELNOŚĆ NA ŁĄCZENIU RURKI Z PIASTRINĄ`,
  },
};

function LeakCard({ id, quantity, onRemove, onQuantityChange, changesDisabled }) {
  const [localQuantity, setLocalQuantity] = useState(quantity);
  const leak = leakData[id] || { image: '', title: 'Unknown' };

  const handleQuantityChange = (event) => {
    const newQuantity = event.target.value;
    setLocalQuantity(newQuantity);
    //onQuantityChange(id, newQuantity);
  };

  const changeQuantity = (addition) => {
    let q = localQuantity;
    if(addition) {
      q++;
    } else {
      q--;
    }
    if(q > 0) {
      setLocalQuantity(q)
    }


    
  }

  useEffect(() => {
    onQuantityChange(localQuantity)
  }, [localQuantity]);

  return (
    <Card sx={{ width: 400, margin: 'auto', display: 'flex', flexDirection: 'column' }}>
      <CardMedia component="img" height="200" image={leak.image} alt={leak.title} />
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <Typography gutterBottom variant="h6" component="div" sx={{ height: 200, overflow: 'hidden', display: 'flex', alignItems: 'center', margin: 'auto' }}>
          {leak.description}
        </Typography>
        <Box display="flex" alignItems="center" justifyContent="center">

        {changesDisabled ? null : (

          <SquareButton children="-" onClick={ () => { changeQuantity(false) } } />

          )}


          <NoArrowsSquareTextField
        size={60} // You can adjust the size here
        variant="outlined"
        sx={{ mx: 1 }}
        value={localQuantity}
        onChange={handleQuantityChange}
        disabled={changesDisabled}
        
      />
      
            
          {changesDisabled ? null : (
            <SquareButton children="+" onClick={ () => { changeQuantity(true) } } />
          )}
          
        </Box>

        {changesDisabled ? null : (

        <Button
          variant="outlined"
          color="error"
          onClick={() => onRemove(id)}
          sx={{ marginTop: 2 }}
        >
          Usuń
        </Button>

)}

      </CardContent>
    </Card>
  );
}


export default LeakCard;