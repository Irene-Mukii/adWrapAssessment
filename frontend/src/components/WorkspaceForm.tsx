"use client";

import React, { useState } from "react";
import { Workspace } from "@/models/workspace";
import StaticMediaForm from "@/components/StaticMediaForm";
import StreetPoleMediaForm from "@/components/StreetPoleMediaForm";



const WorkspaceForm:  React.FC = () =>{
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState("");
  const [currentWorkspaceId, setCurrentWorkspaceId] = useState<number | null>(null);
  const [currentWorkspaceName, setCurrentWorkspaceName] = useState<string | null>(null);
  const [showMediaForm, setShowMediaForm] = useState(false); // Toggle to show media forms
  const [isStaticMediaForm, setIsStaticMediaForm] = useState(true); // Toggle between forms

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data: Workspace = {
      name: name,
      email: email,
      address: address,
      location: location,
    };

    try {
      const response = await fetch("http://localhost:5000/workspaces", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const savedWorkspace: Workspace = await response.json();
        setCurrentWorkspaceId(savedWorkspace.id || null);
        setCurrentWorkspaceName(savedWorkspace.name || null);
        setShowMediaForm(true); // Show media forms after saving the workspace
    
      } else {
        const errorMessage = await response.text();
        console.error("Failed to save workspace:", errorMessage);
        alert("Failed to save workspace. Please try again.");
      }
    } catch (error) {
      console.error("Error saving workspace:", error);
    }
  };

  return (
    <div className=" w-100">
      {!showMediaForm ? (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
              Business name:
            </label>
            <input
              type="text"
              id="name"
              className=" bg-gray-100 shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Workspace Name"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Email:
            </label>
            <input
              type="email"
              id="email"
              className="bg-gray-100 shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Workspace Email"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2">
              Address:
            </label>
            <input
              type="text"
              id="address"
              className="shadow appearance-none bg-gray-100 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Workspace Address"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="location" className="block text-gray-700 text-sm font-bold mb-2">
              Location:
            </label>
            <input
              type="text"
              id="location"
              className="shadow appearance-none bg-gray-100 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Workspace Location"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Save and proceed
            </button>
          </div>
        </form>
      ) : (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">
              Workspace: {currentWorkspaceName}
            </h3>
            <button
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => setIsStaticMediaForm(!isStaticMediaForm)}
            >
              {isStaticMediaForm ? "Switch to Street Pole Media" : "Switch to Static Media"}
            </button>
          </div>
          {isStaticMediaForm ? (
            <StaticMediaForm
              currentWorkspaceId={currentWorkspaceId ?? undefined}
              currentWorkspaceName={currentWorkspaceName ?? undefined}
            />
          ) : (
            <StreetPoleMediaForm
              currentWorkspaceId={currentWorkspaceId ?? undefined}
              currentWorkspaceName={currentWorkspaceName ?? undefined}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default WorkspaceForm;