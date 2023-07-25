import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
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

export const getLeakImage = (id) => {
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

export const getLeakDescription = (id) => {
  for (const company of leakData) {
    const leak = company.leaks.find((leak) => leak.id === id);
    if (leak) {
      return leak.description;
    }
  }
  return null; // If no leak with the given ID is found
};

export const leakData = [
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

  export default function LeakTable(props) {

    const handleRowClick = (id) => {
        props.setSelectedLeak(id);
        console.log("Selected leak: " + id);
      };

      const rowStyles = (isSelected) => ({
        cursor: "pointer",
        border: isSelected ? "2px solid blue" : "none",
        
      });


    // Filter out the leaks that are already in the 'leaks' variable
 // Filter out the leaks that are already in the 'leaks' variable
 const filteredLeakData = leakData.map((company) => ({
  ...company,
  leaks: company.leaks.filter(
    (leak) => !props.leaks.some((selectedLeak) => selectedLeak.id === leak.id)
  ),
}));

return (
  <TableContainer component={Paper}>
    <Table>
      <TableBody>
        {filteredLeakData.map((company) => (
          <React.Fragment key={company.companyName}>
            {company.leaks.length > 0 && ( // Check if there are filtered leaks
              <TableRow>
                <TableCell
                  colSpan={3}
                  style={{
                    fontWeight: "bold",
                    textAlign: "center",
                    fontSize: "26px",
                  }}
                >
                  {company.companyName}
                </TableCell>
              </TableRow>
            )}
            {company.leaks.map((leak) => (
              <TableRow
                key={leak.id}
                onClick={() => handleRowClick(leak.id)}
                style={rowStyles(props.selectedLeak === leak.id)}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.border = "2px solid grey")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.border =
                    props.selectedLeak === leak.id ? "2px solid blue" : "none")
                }
              >
                <TableCell style={{ fontSize: "30px" }}>{leak.id}</TableCell>
                <TableCell style={{ fontSize: "20px" }}>
                  { props.getSelectedLanguageString("leak" + leak.id) }
                </TableCell>
                <TableCell>
                  <img
                    src={getLeakImage(leak.id)}
                    width="200"
                  />
                </TableCell>
              </TableRow>
            ))}
          </React.Fragment>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);
  }