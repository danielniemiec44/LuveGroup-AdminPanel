import React, { useEffect, useState } from 'react';
import { FormControlLabel, Checkbox, ToggleButton, Typography } from '@mui/material';

const CustomToggle = (props) => {
  const [isChecked, setIsChecked] = useState(props.appName == "HeliumTest" ? props.selectedHeliumMachinesId.includes(props.index) : false);

  const handleChange = () => {
    setIsChecked((prev) => !prev);
  };

  useEffect(() => {
    console.log("AppName: " + props.appName)
    if(props.appName == "HeliumTest") {
      if (isChecked) {
        // Check if the props.index is not already present in the array
        if (!props.selectedHeliumMachinesId.includes(props.index)) {
          props.setSelectedHeliumMachinesId([...props.selectedHeliumMachinesId, props.index]);
        }
      } else {
        // Remove the props.index from the array if it exists
        props.setSelectedHeliumMachinesId(props.selectedHeliumMachinesId.filter(item => item !== props.index));
      }
    }
  }, [isChecked, props.appName]);


  return (
    <label style={{ display: "inline-flex" }}>
      <ToggleButton
        value="check"
        selected={isChecked}
        onChange={handleChange}
        sx={{
          alignItems: 'center',
          display: "flex",
          justifyContent: "space-between",
          paddingLeft: 5,
          paddingRight: 8,
          width: 250
        }}

      >
        <Checkbox
          checked={isChecked}
          onChange={handleChange}
          icon={<span>&#9634;</span>} // Empty square
          checkedIcon={<span>&#10003;</span>} // Check character
          sx={{
            fontSize: 30,
          }}
        />
        <Typography variant="h6" sx={{
            paddingLeft: 3
        }}>{ props.label || "Brak" }</Typography>
      </ToggleButton>
    </label>
  );
};

export default CustomToggle;
