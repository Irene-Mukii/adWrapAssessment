"use client";

import React, { useState } from "react";
import StreetPoleMediaTable from "@/components/StreetPoleMediaTable";
import StaticMediaTable from "@/components/StaticMediaTable";
//import { mock } from "node:test";

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

const mockStaticMedia =[
  {
    "id": 1,
    "type": "static",
    "workspace": 1,
    "format": "standard",
    "location": "Iyana Oworo, Lagos",
    "numberOfFaces": 2,
    "closestLandmark": "Third Mainland Bridge",
    "availability": "Available",
    "staticMediaFaces": [
      {
        "id": 101,
        "mediaItem": 1,
        "description": "Facing traffic towards Island",
        "availability": "Available",
        "images": ["https://example.com/billboard-1a.jpg"],
        "rent": 50000
      },
      {
        "id": 102,
        "mediaItem": 1,
        "description": "Facing Mainland",
        "availability": "Booked",
        "images": ["https://example.com/billboard-1b.jpg"],
        "rent": 45000
      }
    ]
  },
  {
    "id": 2,
    "type": "static",
    "workspace": 2,
    "format": "unipole",
    "location": "Wuse Zone 4, Abuja",
    "numberOfFaces": 1,
    "closestLandmark": "Sheraton Hotel",
    "availability": "Available",
    "staticMediaFaces": [
      {
        "id": 103,
        "mediaItem": 2,
        "description": "Facing Wuse Market",
        "availability": "Available",
        "images": ["https://example.com/billboard-2a.jpg"],
        "rent": 60000
      }
    ]
  }
]

const mockStreetPoleMedia = [
  {
    id: 1,
    type: "streetpole",
    workspace: 2,
    location: "Aminu Kano Crescent, Abuja",
    closestLandmark: "Wuse Market",
    numberOfStreetPoles: 3,
    sideRoute: ["North", "South"],
    availability: "Available",
    routes: [
      {
        id: 201,
        sideRoute: "North",
        description: "Towards Berger Junction",
        numberOfStreetPoles: 2,
        pricePerStreetPole: 25000,
        images: ["https://example.com/streetpole-1a.jpg"],
        mediaItem: 1,
      },
    ],
  },
]
const mockWorkspace = {
  "id": 1,
  "name": "Ogilvy Outdoor",
  "email": "info@ogilvyoutdoor.com",
  "address": "12 Herbert Macaulay Way, Yaba",
  "location": "Lagos Mainland"
}

const WorkspaceDetails: React.FC<WorkspaceDetailsProps> = ({
  workspace=mockWorkspace,
  streetPoleMedia=mockStreetPoleMedia,
  staticMedia=mockStaticMedia,
}) => {
  const [view, setView] = useState<"streetPole" | "staticMedia">("streetPole");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="mb-4 bg-gray-50 rounded-lg shadow-md p-4 w-[70%]">
      <div className="mb-4 bg-white rounded-lg shadow-md p-4 w-full">
        <h1 className="text-2xl font-bold mb-2">{workspace.name}</h1>
        <p className="text-gray-500"> {workspace.email}</p>
        <p className="text-gray-500">{workspace.address}</p>
        <p className="text-gray-500"> {workspace.location}</p>
      </div>
      <div className="mb-4  bg-white rounded-lg shadow-md p-4 w-full">
        <h2 className="text-xl font-semibold mb-4">Media Items</h2>
        <button
          className={`px-4 py-2 mr-2 ${
            view === "streetPole" ? "text-blue-500 border-b-4" : ""
          }`}
          onClick={() => setView("streetPole")}
        >
          Street poles
        </button>
        <button
          className={`px-4 py-2 ${
            view === "staticMedia" ? "text-blue-500 border-b-4" : ""
          }`}
          onClick={() => setView("staticMedia")}
        >
          Static media
        </button>
      </div>
      {view === "streetPole" ? (
        <StreetPoleMediaTable data={streetPoleMedia} />
      ) : (
        <StaticMediaTable data={staticMedia} />
      )}
      </div>
     
    </div>
  );
};

export default WorkspaceDetails;