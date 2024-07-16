import React, { useState } from "react";
import PhoneCallbackIcon from "@mui/icons-material/PhoneCallback";
import PhoneForwardedIcon from "@mui/icons-material/PhoneForwarded";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { formatDate } from "./utils/utils";
import ActivityDetails from "./ActivityDetails";

export const IncomingCalls = ({ activities }) => {
  const [activeCall, setActiveCall] = useState("");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: "60px",
      }}
    >
      {activities?.map((activity) => (
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
          <p style={{ color: "#877C7C" }}>{formatDate(activity.created_at)}</p>
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
      ))}
    </div>
  );
};
