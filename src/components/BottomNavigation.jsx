import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import CallIcon from "@mui/icons-material/Call";
import PersonIcon from "@mui/icons-material/Person";
import DialpadIcon from "@mui/icons-material/Dialpad";
import SettingsIcon from "@mui/icons-material/Settings";
import Activity from "./Activity";

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);

  return (
    <div>
      <Box sx={{ width: "100%", position: "fixed", bottom: 0 }}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction label="Activity" icon={<CallIcon />} />
          <BottomNavigationAction label="Profile" icon={<PersonIcon />} />
          <BottomNavigationAction label="Dial" icon={<DialpadIcon />} />
          <BottomNavigationAction label="Settings" icon={<SettingsIcon />} />
        </BottomNavigation>
      </Box>
      {value === 0 && <Activity />}
      {value === 1 && <h1>Profile</h1>}
      {value === 2 && <h1>Dial</h1>}
      {value === 3 && <h1>Settings</h1>}
    </div>
  );
}
