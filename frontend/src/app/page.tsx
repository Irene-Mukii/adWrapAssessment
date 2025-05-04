"use client";

import WorkspaceForm from "@/components/WorkspaceForm";
import { useState } from "react";
import { Workspace } from "@/models/workspace";

export default function Home() {


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className=" w-[70%] flex flex-col items-left justify-left p-8 m-2 bg-white rounded-lg shadow-md">
        <div style={{ display: "flex", flexDirection: "row" }}>
        <div className="w-10 h-10 flex items-center justify-center font-bold mb-4 rounded-full bg-black text-white mr-4 p-1" >1</div>
        <h1 className="text-2xl font-bold mb-4">Workspace Details</h1>
        </div>
        <p className="mb-4 text-gray-700 text-xs">
          Provide details for your workspace in the fields below.
        </p>
        <WorkspaceForm />
        {/* {workspaceData && (
          <div className="mt-4">
            <h2 className="text-xl font-semibold mb-2">Workspace Details:</h2>
            <p>Name: {workspaceData.name}</p>rgb(28,28,40)
            <p>Email: {workspaceData.email}</p>
            <p>Address: {workspaceData.address}</p>
            <p>Location: {workspaceData.location}</p>
          </div>
        )} */}
      </div>
    </div>
    
  );
}