import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useRouter } from "next/navigation";
import { within } from "@testing-library/react";
import WorkspacesTable from "@/app/workspaces/page";
import StreetPoleMediaTable from "@/components/StreetPoleMediaTable";
import StaticMediaTable from "@/components/StaticMediaTable";
import type { StaticMedia } from "@/models/staticMedia";
import type { StreetPoleMedia } from "@/models/streetpole";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

const mockRouterPush = jest.fn();
(useRouter as jest.Mock).mockReturnValue({ push: mockRouterPush });

describe("WorkspacesTable", () => {
  const mockWorkspaces = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    name: `Workspace ${i + 1}`,
    email: `workspace${i + 1}@example.com`,
    location: `Location ${i + 1}`,
  }));

  test("displays workspace data and supports pagination", () => {
    render(<WorkspacesTable data={mockWorkspaces} />);

    // Verify that the first page displays the first 5 records
    mockWorkspaces.slice(0, 5).forEach((workspace) => {
      expect(screen.getByText(workspace.name)).toBeInTheDocument();
      expect(screen.getByText(workspace.email)).toBeInTheDocument();
      expect(screen.getByText(workspace.location)).toBeInTheDocument();
    });

    // Verify that the 6th record is not visible on the first page
    expect(screen.queryByText("Workspace 6")).not.toBeInTheDocument();

    // Navigate to the next page
    fireEvent.click(screen.getByText("Next"));

    // Verify that the second page displays the next 5 records
    mockWorkspaces.slice(5, 10).forEach((workspace) => {
      expect(screen.getByText(workspace.name)).toBeInTheDocument();
    });

    // Verify that the first record is no longer visible
    expect(screen.queryByText("Workspace 1")).not.toBeInTheDocument();
  });

  test("navigates to /workspace/:id when a row is clicked", () => {
    render(<WorkspacesTable data={mockWorkspaces} />);

    // Click the first workspace row
    fireEvent.click(screen.getByText("Workspace 1"));

    // Verify that the router navigates to the correct URL
    expect(mockRouterPush).toHaveBeenCalledWith("/workspace/1");
  });
});

describe("StreetPoleMediaTable", () => {
  const mockStreetPoleMedia: StreetPoleMedia[] = [
    {
      id: 1,
      type: "streetpole",
      workspace: 1,
      location: "Main Street",
      closestLandmark: "Central Park",
      availability: "Available",
      numberOfStreetPoles: 10,
      sideRoute: ["North"],
      routes: [
        {
          id: 1,
          sideRoute: "North",
          description: "Route along Main Street",
          numberOfStreetPoles: 10,
          pricePerStreetPole: 100,
          images: ["https://via.placeholder.com/150"],
          mediaItem: 1,
        },
      ],
    },
  ];

  test("expands to reveal routes", async () => {
    render(<StreetPoleMediaTable data={mockStreetPoleMedia} />);

    // Verify that the route details are not visible initially
    expect(screen.queryByText("Route along Main Street")).not.toBeInTheDocument();

    // Expand the row
    fireEvent.click(screen.getByText("Expand"));

   // Verify that the route details are now visible
  // Verify that the route details are now visible
  await waitFor(() => {
    const expandedRow = screen.getByText("Routes:").closest("td"); // Find the expanded row container
    const rowWithin = within(expandedRow!); // Scope the search to the expanded row
    expect(rowWithin.getByText("Route along Main Street")).toBeInTheDocument();
    expect(rowWithin.getByText("Number of Street Poles: 10")).toBeInTheDocument();
    expect(rowWithin.getByText("Price per Pole: $100")).toBeInTheDocument();
  });
  });
});

describe("StaticMediaTable", () => {
  const mockStaticMedia: StaticMedia[] = [
    {
      id: 1,
      type: "static",
      workspace: 1,
      location: "Downtown",
      format: "standard",
      numberOfFaces: 2,
      closestLandmark: "City Hall",
      availability: "Available",
      staticMediaFaces: [
        {
          id: 1,
          mediaItem: 1,
          description: "Front Face",
          availability: "Available",
          rent: 500,
          images: ["https://via.placeholder.com/150"],
        },
      ],
    },
  ];

  test("expands to reveal faces", async () => {
    render(<StaticMediaTable data={mockStaticMedia} />);

    // Verify that the face details are not visible initially
    expect(screen.queryByText("Front Face")).not.toBeInTheDocument();

    // Expand the row
    fireEvent.click(screen.getByText("Expand"));

    // Verify that the face details are now visible
    await waitFor(() => {
      expect(screen.getByText("Front Face")).toBeInTheDocument();
      expect(screen.getByText("Availability: Available")).toBeInTheDocument();
      expect(screen.getByText("Rent: $500")).toBeInTheDocument();
    });
  });
});