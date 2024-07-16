import * as React from "react";

export default function AlertDialog({ activity }) {
  return (
    <div>
      <p>{`From: ${activity?.from}`}</p>
      <p>{`To: ${activity?.to}`}</p>
      <p>{`Via: ${activity?.via}`}</p>
      <p>{`Duration: ${activity?.duration} seconds`}</p>
    </div>
  );
}
