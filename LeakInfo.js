import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  Box,
  Typography,
} from "@mui/material";
import { useEffect, useState } from 'react';

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
// Import more images as needed

const getLeakImage = (id) => {
  switch (id) {
    case 900:
      return Leak900;
    case 901:
      return Leak901;
    case 902:
      return Leak902;
    case 904:
      return Leak904;
    case 905:
        return Leak905;
    case 950:
        return Leak950;
    case 951:
        return Leak951;
    case 952:
        return Leak952;
    case 955:
        return Leak955;
    case 958:
        return Leak958;
    case 960:
        return Leak960;
    // Add more cases for more images
    default:
      return null;
  }
};

const leakData = [
    {
      companyName: "SALDATURA",
      leaks: [
        {
          id: 900,
          description: `NIESZCZELNOŚĆ NA SPOINIE 
          NÓŻKI KOLEKTORA, ZAWORU BĄDŹ MONOBLOKA 
          `,
        },
        {
          id: 901,
          description: `ROZERWANE KOLANKO, PRZEGRZANE 
          `,
        },
        {
          id: 902,
          description: `NIESZCZELNOŚĆ NA RURCE  
          W MIEJSCU ZACISKANIA POD 
          RURKĘ O MNIEJSZEJ 
          ŚREDNICY NIŻ OBIEGOWA 
          `,
        },
        {
            id: 904,
            description: `NIESZCZELNOŚĆ NA SPOINIE KOLANKA  
            `,
          },
          {
            id: 905,
            description: `PRZEPALONE KOLANKO   
            `,
          },
      ],
    },
    {
      companyName: "RACCORDERIA ",
      leaks: [
        {
          id: 950,
          description: `NIESZCZELNOŚĆ NA 
          ZAMKNIĘCIU KOLEKTORA LUB 
          NA SPOINACH POMIĘDZY  
          NÓŻKAMI I KORPUSEM LUB 
          MIĘDZY RURKĄ WYJŚCIOWĄ I KORPUSEM 
          `,
        },
        {
            id: 951,
            description: `NIESZCZELNOŚĆ NA 
            SPOINACH POMIĘDZY 
            ZAWORKIEM I RURKĄ MIEDZIANĄ 
            `,
          },
          {
            id: 952,
            description: `NIESZCZELNOŚĆ NA 
            SPOINACH POMIĘDZY 
            DYFUZOREM I KAPILARĄ             
            `,
          },
          {
            id: 955,
            description: `NIESZCZELNOŚĆ NA 
            SPOINACH POMIĘDZY 
            RURKĄ KAPILARNĄ I RURKĄ              
            `,
          },
          {
            id: 958,
            description: `NIESZCZELNOŚCI NA 
            POŁĄCZENIU RUREK DO 
            RUREK / RUREK DO  ŚRUBUNKÓW                        
            `,
          },
      ],
    },
    {
        companyName: "RACCORDERIA LUB SALDATURA",
        leaks: [
          {
            id: 960,
            description: `NIESZCZELNOŚĆ NA ŁĄCZENIU  RURKI Z PIASTRINĄ
            `,
          },

        ],
      },
    // ... more categories
  ];

  const getDescriptionById = (id) => {
    for (const category of leakData) {
      for (const leak of category.leaks) {
        if (leak.id === id) {
          return leak.description;
        }
      }
    }
    return ""; // Return an empty string or a default description if the id is not found
  };

  const getCompanyById = (id) => {
    for (const category of leakData) {
      for (const leak of category.leaks) {
        if (leak.id === id) {
          return category.companyName;
        }
      }
    }
    return ""; // Return an empty string or a default company name if the id is not found
  };



  export default function LeakInfo(props) {
    const description = getDescriptionById(props.id);
    const company = getCompanyById(props.id);

    return (
        <Box display="flex" flexDirection="column" justifyContent='center' alignItems='center'>
            <Paper elevation={3} sx={{ textAlign: 'center', px: '50px', py: '20px', width: '1000px', my: '20px' }}>
            <Typography variant="h4">
              Próba naprawy - {company}
            </Typography>
          </Paper>
            <Paper elevation={3} sx={{ textAlign: 'center', px: '50px', py: '20px' }}>
        <Grid container>
            <Grid item xs={12}>
                <img src={getLeakImage(props.id)} alt={description} width="800" />
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h6">
                {props.id} - {description}
                </Typography>
            </Grid>
        </Grid>
        </Paper>
        </Box>
    );
  }