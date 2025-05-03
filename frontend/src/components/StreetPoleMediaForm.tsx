"use client";

import React, { useState } from "react";
import { useWorkspaceContext } from "@/context/WorkspaceContext";
interface StaticMediaFormProps {
    currentWorkspaceId?: number; // Optional current workspace ID
    currentWorkspaceName?: string; // Optional current workspace name
  }
 
const StreetPoleMediaForm: React.FC<StaticMediaFormProps> = ({
    currentWorkspaceId,
    currentWorkspaceName,
  }) => {
const { workspaces, loading, error: workspaceError } = useWorkspaceContext();
  const [showAddRoutePopup, setShowAddRoutePopup] = useState(false);

  // Street Pole Media State
  const [location, setLocation] = useState("");
  const [closestLandmark, setClosestLandmark] = useState("");
  const [availability, setAvailability] = useState("");
  const [workspaceId, setWorkspaceId] = useState<number | null>(
      currentWorkspaceId || null
    );

  // Route State
  const [routes, setRoutes] = useState<any[]>([]);
  const [routeSideRoute, setRouteSideRoute] = useState("");
  const [routeDescription, setRouteDescription] = useState("");
  const [routeNumberOfStreetPoles, setRouteNumberOfStreetPoles] = useState(0);
  const [routePricePerStreetPole, setRoutePricePerStreetPole] = useState(0);
  const [routeImages, setRouteImages] = useState("");

   // Error State
   const [error, setError] = useState<string | null>(null);

  // Handle adding a new route
  const handleAddRouteClick = () => {
    setShowAddRoutePopup(true);
  };

  const handleRouteSubmit = () => {
    const newRoute = {
      sideRoute: routeSideRoute,
      description: routeDescription,
      numberOfStreetPoles: routeNumberOfStreetPoles,
      pricePerStreetPole: routePricePerStreetPole,
      images: routeImages.split(","), // Assuming images are comma-separated
    };

    setRoutes([...routes, newRoute]);
    setShowAddRoutePopup(false);

    // Reset route fields
    setRouteSideRoute("");
    setRouteDescription("");
    setRouteNumberOfStreetPoles(0);
    setRoutePricePerStreetPole(0);
    setRouteImages("");
  };

  // Handle submitting the street pole media form
  const handleSubmit = async () => {
    const streetPoleMediaData = {
      location,
      closestLandmark,
      availability,
      workspaceId,
      routes, // Include all added routes
    };

    try {
        const response = await fetch("http://localhost:5000/street-pole-media", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(streetPoleMediaData),
        });
  
        if (response.ok) {
          console.log("Street pole media item created successfully");
          // Reset the form fields
          setLocation("");
          setClosestLandmark("");
          setAvailability("");
          setWorkspaceId(currentWorkspaceId || null); // Reset to current workspace if provided
          setRoutes([]);
          setError(null); // Clear any previous errors
        } else {
          setError("Failed to create street pole media item. Please try again.");
        }
      } catch (error) {
        setError("Error creating street pole media item. Please check your connection.");
      }
  };

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2">Street Pole Media Form</h3>

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

      {/* Street Pole Media Form Fields */}
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

      {/* Street Pole Media Form Fields */}

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

      {/* Add Route Button */}
      <button
        className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded mt-2"
        onClick={handleAddRouteClick}
      >
        Add Route
      </button>

      {/* Submit Button */}
      <button
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2"
        onClick={handleSubmit}
      >
        Create Street Pole Media
      </button>

      {/* Add Route Popup */}
      {showAddRoutePopup && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-8 rounded">
            <h4 className="text-md font-semibold mb-2">Add Route</h4>

            {/* Route Form Fields */}
            <div className="mb-4">
              <label htmlFor="routeSideRoute" className="block text-gray-700 text-sm font-bold mb-2">
                Side Route:
              </label>
              <input
                type="text"
                id="routeSideRoute"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={routeSideRoute}
                onChange={(e) => setRouteSideRoute(e.target.value)}
                placeholder="Side Route"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="routeDescription" className="block text-gray-700 text-sm font-bold mb-2">
                Description:
              </label>
              <input
                type="text"
                id="routeDescription"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={routeDescription}
                onChange={(e) => setRouteDescription(e.target.value)}
                placeholder="Description"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="routeNumberOfStreetPoles" className="block text-gray-700 text-sm font-bold mb-2">
                Number of Street Poles:
              </label>
              <input
                type="number"
                id="routeNumberOfStreetPoles"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={routeNumberOfStreetPoles}
                onChange={(e) => setRouteNumberOfStreetPoles(Number(e.target.value))}
                placeholder="Number of Street Poles"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="routePricePerStreetPole" className="block text-gray-700 text-sm font-bold mb-2">
                Price Per Street Pole:
              </label>
              <input
                type="number"
                id="routePricePerStreetPole"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={routePricePerStreetPole}
                onChange={(e) => setRoutePricePerStreetPole(Number(e.target.value))}
                placeholder="Price Per Street Pole"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="routeImages" className="block text-gray-700 text-sm font-bold mb-2">
                Images (comma-separated URLs):
              </label>
              <input
                type="text"
                id="routeImages"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={routeImages}
                onChange={(e) => setRouteImages(e.target.value)}
                placeholder="Image URLs"
              />
            </div>

            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2"
              onClick={handleRouteSubmit}
            >
              Submit Route
            </button>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2 ml-2"
              onClick={() => setShowAddRoutePopup(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StreetPoleMediaForm;