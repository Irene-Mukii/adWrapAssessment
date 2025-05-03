"use client";

import React, { useState } from "react";
import { useWorkspaceContext } from "@/context/WorkspaceContext";

interface StaticMediaFormProps {
    currentWorkspaceId?: number; // Optional current workspace ID
    currentWorkspaceName?: string; // Optional current workspace name
  }

  const StaticMediaForm: React.FC<StaticMediaFormProps> = ({
    currentWorkspaceId,
    currentWorkspaceName,
  }) => {
  const { workspaces, loading, error: workspaceError } = useWorkspaceContext();

  // Static Media State
  const [type, setType] = useState("");
  const [format, setFormat] = useState("");
  const [location, setLocation] = useState("");
  const [numberOfFaces, setNumberOfFaces] = useState(0);
  const [closestLandmark, setClosestLandmark] = useState("");
  const [availability, setAvailability] = useState("");
  const [workspaceId, setWorkspaceId] = useState<number | null>(
    currentWorkspaceId || null
  );

  // Face State
  const [faces, setFaces] = useState<any[]>([]);
  const [showAddFacePopup, setShowAddFacePopup] = useState(false);
  const [faceDescription, setFaceDescription] = useState("");
  const [faceAvailability, setFaceAvailability] = useState("");
  const [faceImages, setFaceImages] = useState("");
  const [faceRent, setFaceRent] = useState(0);

  // Error State
  const [error, setError] = useState<string | null>(null);

  // Handle adding a new face
  const handleAddFaceClick = () => {
    setShowAddFacePopup(true);
  };

  const handleFaceSubmit = () => {
    const newFace = {
      description: faceDescription,
      availability: faceAvailability,
      images: faceImages.split(","), // Assuming images are comma-separated
      rent: faceRent,
    };

    setFaces([...faces, newFace]);
    setShowAddFacePopup(false);

    // Reset face fields
    setFaceDescription("");
    setFaceAvailability("");
    setFaceImages("");
    setFaceRent(0);
  };

  // Handle submitting the static media form
  const handleSubmit = async () => {
    const staticMediaData = {
      type,
      format,
      location,
      numberOfFaces: faces.length, // Automatically count the number of faces
      closestLandmark,
      availability,
      workspaceId,
      faces, // Include all added faces
    };

    try {
      const response = await fetch("http://localhost:3001/api/static-media", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(staticMediaData),
      });

      if (response.ok) {
        console.log("Static media item created successfully");
        // Reset the form fields
        setType("");
        setFormat("");
        setLocation("");
        setNumberOfFaces(0);
        setClosestLandmark("");
        setAvailability("");
        setWorkspaceId(currentWorkspaceId || null); // Reset to current workspace if provided
        setFaces([]);
        setError(null); // Clear any previous errors
      } else {
        setError("Failed to create static media item. Please try again.");
      }
    } catch (error) {
      setError("Error creating static media item. Please check your connection.");
    }
  };

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2">Static Media Form</h3>

      {/* Error Alert */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 relative">
          <strong className="font-bold">Error: </strong>
          <span>{error}</span>
          <button
            className="absolute top-0 right-0 px-4 py-3"
            onClick={() => setError(null)}
          >
            <svg
              className="fill-current h-6 w-6 text-red-500"
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <title>Close</title>
              <path d="M14.348 5.652a1 1 0 10-1.414-1.414L10 7.586 7.066 4.652a1 1 0 10-1.414 1.414L8.586 10l-2.934 2.934a1 1 0 101.414 1.414L10 12.414l2.934 2.934a1 1 0 001.414-1.414L11.414 10l2.934-2.934z" />
            </svg>
          </button>
        </div>
      )}

      {/* Loading State */}
      {loading && <p>Loading workspaces...</p>}

      {/* Static Media Form Fields */}
      <div className="mb-4">
        <label htmlFor="type" className="block text-gray-700 text-sm font-bold mb-2">
          Type:
        </label>
        <input
          type="text"
          id="type"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={type}
          onChange={(e) => setType(e.target.value)}
          placeholder="Type"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="format" className="block text-gray-700 text-sm font-bold mb-2">
          Format:
        </label>
        <input
          type="text"
          id="format"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={format}
          onChange={(e) => setFormat(e.target.value)}
          placeholder="Format"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="location" className="block text-gray-700 text-sm font-bold mb-2">
          Location:
        </label>
        <input
          type="text"
          id="location"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Location"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="closestLandmark" className="block text-gray-700 text-sm font-bold mb-2">
          Closest Landmark:
        </label>
        <input
          type="text"
          id="closestLandmark"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={closestLandmark}
          onChange={(e) => setClosestLandmark(e.target.value)}
          placeholder="Closest Landmark"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="availability" className="block text-gray-700 text-sm font-bold mb-2">
          Availability:
        </label>
        <input
          type="text"
          id="availability"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={availability}
          onChange={(e) => setAvailability(e.target.value)}
          placeholder="Availability"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="workspaceId" className="block text-gray-700 text-sm font-bold mb-2">
          Workspace:
        </label>
        {currentWorkspaceId && currentWorkspaceName ? (
            <input
            type="text"
            id="workspaceId"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={currentWorkspaceName}
            disabled
          />
        ): (
            <select
          id="workspaceId"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={workspaceId || ""}
          onChange={(e) => setWorkspaceId(Number(e.target.value))}
          disabled={loading || workspaceError !== null}
        >
          <option value="" disabled>
            {loading ? "Loading..." : "Select a Workspace"}
          </option>
          {workspaces.map((workspace) => (
            <option key={workspace.id} value={workspace.id}>
              {workspace.name}
            </option>
          ))}
        </select>)}
      </div>

      {/* Add Face Button */}
      <button
        className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded mt-2"
        onClick={handleAddFaceClick}
      >
        Add Face
      </button>

      {/* Submit Button */}
      <button
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2"
        onClick={handleSubmit}
      >
        Create Static Media
      </button>

      {/* Add Face Popup */}
      {showAddFacePopup && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-8 rounded">
            <h4 className="text-md font-semibold mb-2">Add Face</h4>

            {/* Face Form Fields */}
            <div className="mb-4">
              <label htmlFor="faceDescription" className="block text-gray-700 text-sm font-bold mb-2">
                Description:
              </label>
              <input
                type="text"
                id="faceDescription"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={faceDescription}
                onChange={(e) => setFaceDescription(e.target.value)}
                placeholder="Description"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="faceAvailability" className="block text-gray-700 text-sm font-bold mb-2">
                Availability:
              </label>
              <input
                type="text"
                id="faceAvailability"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={faceAvailability}
                onChange={(e) => setFaceAvailability(e.target.value)}
                placeholder="FaceAvailability"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="faceImages" className="block text-gray-700 text-sm font-bold mb-2">
                Images (comma-separated URLs):
              </label>
              <input
                type="text"
                id="faceImages"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={faceImages}
                onChange={(e) => setFaceImages(e.target.value)}
                placeholder="Image URLs"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="faceRent" className="block text-gray-700 text-sm font-bold mb-2">
                Rent:
              </label>
              <input
                type="number"
                id="faceRent"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={faceRent}
                onChange={(e) => setFaceRent(Number(e.target.value))}
                placeholder="Rent"
              />
            </div>

            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2"
              onClick={handleFaceSubmit}
            >
              Submit Face
            </button>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2 ml-2"
              onClick={() => setShowAddFacePopup(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StaticMediaForm;