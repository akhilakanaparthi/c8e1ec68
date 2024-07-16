import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { baseUrl } from "./constants/constants";
import { AllCalls } from "./AllCalls";
import { IncomingCalls } from "./IncomingCalls";
import { ArchivedCalls } from "./ArchivedCalls";

export default function Activity() {
  const [value, setValue] = useState("1");
  const [activities, setActivities] = useState([]);

  const fetchActivities = () => {
    fetch(`${baseUrl}/activities`)
      .then((response) => response.json())
      .then((data) => {
        setActivities(data);
      });
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const incomingCalls = activities?.filter(
    (activity) => activity.direction === "inbound"
  );
  const outgoingCalls = activities?.filter(
    (activity) => activity.direction === "outbound"
  );

  return (
    <Box sx={{ width: "100%", typography: "body1", justifyContent: "center" }}>
      <TabContext value={value}>
        <Box>
          <h1>Activity Feed</h1>
          <div style={{ justifyContent: "center", display: "flex" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab sx={{ textTransform: "none" }} label="All Calls" value="1" />
              <Tab
                sx={{ textTransform: "none" }}
                label="Incoming Calls"
                value="2"
              />
              <Tab
                sx={{ textTransform: "none" }}
                label="Outgoing Calls"
                value="3"
              />
              <Tab
                sx={{ textTransform: "none" }}
                label="Archived Calls"
                value="4"
              />
            </TabList>
          </div>
        </Box>
        <TabPanel value="1">
          {activities && (
            <AllCalls
              activities={activities}
              fetchActivities={fetchActivities}
            />
          )}
        </TabPanel>
        <TabPanel value="2">
          {incomingCalls && <IncomingCalls activities={incomingCalls} />}
        </TabPanel>
        <TabPanel value="3">
          {outgoingCalls && <IncomingCalls activities={outgoingCalls} />}
        </TabPanel>
        <TabPanel value="4">
          {activities && (
            <ArchivedCalls
              activities={activities}
              fetchActivities={fetchActivities}
            />
          )}
        </TabPanel>
      </TabContext>
    </Box>
  );
}
