"use client";

import WorkspaceForm from "@/components/WorkspaceForm";
import { useState } from "react";
import { Workspace } from "@/models/workspace";

export default function Home() {


  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Media Management</h1>
      <WorkspaceForm />
      {/* {workspaceData && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">Workspace Details:</h2>
          <p>Name: {workspaceData.name}</p>
          <p>Email: {workspaceData.email}</p>
          <p>Address: {workspaceData.address}</p>
          <p>Location: {workspaceData.location}</p>
        </div>
      )} */}
    </div>
  );
}