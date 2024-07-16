import React, { useEffect } from "react";
import PhoneCallbackIcon from "@mui/icons-material/PhoneCallback";
import PhoneForwardedIcon from "@mui/icons-material/PhoneForwarded";
import UnarchiveIcon from "@mui/icons-material/Unarchive";
import UnarchiveOutlinedIcon from "@mui/icons-material/UnarchiveOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { baseUrl } from "./constants/constants";
import { formatDate } from "./utils/utils";
import ActivityDetails from "./ActivityDetails";
import Snackbar from "./Snackbar";
import { Tooltip } from "@mui/material";

export const ArchivedCalls = ({ activities, fetchActivities }) => {
  const [activeCall, setActiveCall] = React.useState("");
  const [archivedCalls, setArchivedCalls] = React.useState([]);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  useEffect(() => {
    setArchivedCalls(activities?.filter((activity) => activity.is_archived));
  }, [activities]);

  const handleUnarchive = (activity) => {
    fetch(`${baseUrl}/activities/${activity.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        is_archived: !activity.is_archived,
      }),
    })
      .then(() => {
        fetchActivities();
        setOpenSnackbar(true);
      })
      .catch((error) => console.log("error ", error));
  };

  const unarchiveAllCalls = () => {
    Promise.all(
      archivedCalls.map((activity) => {
        return fetch(`${baseUrl}/activities/${activity.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            is_archived: false,
          }),
        });
      })
    )
      .then(() => {
        fetchActivities();
        setOpenSnackbar(true);
      })
      .catch((error) => console.log("error ", error));
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: "60px",
      }}
    >
      {archivedCalls.length > 0 && (
        <p
          style={{
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            gap: "10px",
            border: "1px solid #D4BEBE",
            padding: "10px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
          onClick={() => unarchiveAllCalls()}
        >
          <UnarchiveOutlinedIcon />
          Unarchive all calls
        </p>
      )}
      {archivedCalls.length > 0 ? (
        archivedCalls.map((activity) => {
          return (
            activity.is_archived && (
              <div
                key={activity.id}
                style={{
                  display: "flex",
                  margin: "8px",
                  padding: "0 10px",
                  borderRadius: "20px",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  border: "1px solid #D4BEBE",
                }}
              >
                <p style={{ color: "#877C7C" }}>
                  {formatDate(activity.created_at)}
                </p>
                <div
                  style={{
                    display: "flex",
                    gap: "20px",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {activity.direction === "inbound" ? (
                    <PhoneCallbackIcon style={{ color: "green" }} />
                  ) : (
                    <PhoneForwardedIcon style={{ color: "red" }} />
                  )}
                  <h3 style={{ margin: 0 }}>{activity.id}</h3>
                  <Tooltip title="Unarchive">
                    <UnarchiveIcon
                      style={{ color: "blue", cursor: "pointer" }}
                      onClick={() => handleUnarchive(activity)}
                    />
                  </Tooltip>
                </div>
                <p
                  style={{
                    cursor: "pointer",
                    color: "purple",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                  }}
                  onClick={() =>
                    !activeCall ? setActiveCall(activity.id) : setActiveCall()
                  }
                >
                  Activity Details
                  {!activeCall ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                </p>
                {activeCall === activity.id && (
                  <ActivityDetails activity={activity} />
                )}
              </div>
            )
          );
        })
      ) : (
        <h3>No Archived Calls</h3>
      )}
      {openSnackbar && (
        <Snackbar
          open={openSnackbar}
          setOpen={setOpenSnackbar}
          message="Call(s) unarchived"
        />
      )}
    </div>
  );
};
