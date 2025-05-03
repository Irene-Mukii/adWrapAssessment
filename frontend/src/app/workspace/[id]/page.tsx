"use client";

import React, { useState } from "react";
import StreetPoleMediaTable from "@/components/StreetPoleMediaTable";
import StaticMediaTable from "@/components/StaticMediaTable";

type WorkspaceDetailsProps = {
  workspace: {
    id: number;
    name: string;
    email: string;
    address: string;
    location: string;
  };
  streetPoleMedia: any[];
  staticMedia: any[];
};

const WorkspaceDetails: React.FC<WorkspaceDetailsProps> = ({
  workspace,
  streetPoleMedia,
  staticMedia,
}) => {
  const [view, setView] = useState<"streetPole" | "staticMedia">("streetPole");

  return (
    <div className="p-4">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">{workspace.name}</h1>
        <p>Email: {workspace.email}</p>
        <p>Address: {workspace.address}</p>
        <p>Location: {workspace.location}</p>
      </div>
      <div className="mb-4">
        <button
          className={`px-4 py-2 mr-2 ${
            view === "streetPole" ? "bg-blue-500 text-white" : "bg-gray-300"
          }`}
          onClick={() => setView("streetPole")}
        >
          View Street Pole Media
        </button>
        <button
          className={`px-4 py-2 ${
            view === "staticMedia" ? "bg-blue-500 text-white" : "bg-gray-300"
          }`}
          onClick={() => setView("staticMedia")}
        >
          View Static Media
        </button>
      </div>
      {view === "streetPole" ? (
        <StreetPoleMediaTable data={streetPoleMedia} />
      ) : (
        <StaticMediaTable data={staticMedia} />
      )}
    </div>
  );
};

export default WorkspaceDetails;