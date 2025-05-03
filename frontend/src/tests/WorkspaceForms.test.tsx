import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import WorkspaceDetails from "@/components/WorkspaceForm";
import StaticMediaForm from "@/components/StaticMediaForm";
import StreetPoleMediaForm from "@/components/StreetPoleMediaForm";
import { WorkspaceProvider } from "@/context/WorkspaceContext";

describe("Workspace Forms", () => {
  const mockOnSave = jest.fn();

  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ id: 1, name: "Test Workspace" }),
      })
    ) as jest.Mock;
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("should render WorkspaceDetails form and save workspace", async () => {
    render(
      <WorkspaceProvider>
        <WorkspaceDetails />
      </WorkspaceProvider>
    );

    // Fill out the workspace form
    fireEvent.change(screen.getByPlaceholderText("Workspace Name"), {
      target: { value: "Test Workspace" },
    });
    fireEvent.change(screen.getByPlaceholderText("Workspace Email"), {
      target: { value: "test@workspace.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Workspace Address"), {
      target: { value: "123 Test Street" },
    });
    fireEvent.change(screen.getByPlaceholderText("Workspace Location"), {
      target: { value: "Test City" },
    });

    // Submit the form
    fireEvent.click(screen.getByText("Save"));

    // Wait for the mockOnSave to be called
    await waitFor(() => expect(mockOnSave).toHaveBeenCalled());
  });

  test("should render StaticMediaForm and add a face", async () => {
    render(
      <WorkspaceProvider>
        <StaticMediaForm currentWorkspaceId={1} currentWorkspaceName="Test Workspace" />
      </WorkspaceProvider>
    );

    // Fill out the static media form
    fireEvent.change(screen.getByPlaceholderText("Type"), {
      target: { value: "Billboard" },
    });
    fireEvent.change(screen.getByPlaceholderText("Format"), {
      target: { value: "Digital" },
    });
    fireEvent.change(screen.getByPlaceholderText("Location"), {
      target: { value: "Downtown" },
    });
    fireEvent.change(screen.getByPlaceholderText("Closest Landmark"), {
      target: { value: "City Hall" },
    });
    fireEvent.change(screen.getByPlaceholderText("Availability"), {
      target: { value: "Available" },
    });

    // Add a face
    fireEvent.click(screen.getByText("Add Face"));
    fireEvent.change(screen.getByPlaceholderText("Description"), {
      target: { value: "Front Face" },
    });
    fireEvent.change(screen.getByPlaceholderText("FaceAvailability"), {
      target: { value: "Available" },
    });
    fireEvent.change(screen.getByPlaceholderText("Image URLs"), {
      target: { value: "http://example.com/image1.jpg,http://example.com/image2.jpg" },
    });
    fireEvent.change(screen.getByPlaceholderText("Rent"), {
      target: { value: "500" },
    });
    fireEvent.click(screen.getByText("Submit Face"));

    // Submit the static media form
    fireEvent.click(screen.getByText("Create Static Media"));

    // Verify that the form was submitted
    await waitFor(() => {
      expect(screen.queryByText("Error")).not.toBeInTheDocument();
    });
  });

  test("should render StreetPoleMediaForm and add a route", async () => {
    render(
      <WorkspaceProvider>
        <StreetPoleMediaForm currentWorkspaceId={1} currentWorkspaceName="Test Workspace" />
      </WorkspaceProvider>
    );

    // Fill out the street pole media form
    fireEvent.change(screen.getByPlaceholderText("Location"), {
      target: { value: "Main Street" },
    });
    fireEvent.change(screen.getByPlaceholderText("Closest Landmark"), {
      target: { value: "Central Park" },
    });
    fireEvent.change(screen.getByPlaceholderText("Availability"), {
      target: { value: "Available" },
    });

    // Add a route
    fireEvent.click(screen.getByText("Add Route"));
    fireEvent.change(screen.getByPlaceholderText("Side Route"), {
      target: { value: "North" },
    });
    fireEvent.change(screen.getByPlaceholderText("Description"), {
      target: { value: "Main Route" },
    });
    fireEvent.change(screen.getByPlaceholderText("Number of Street Poles"), {
      target: { value: "10" },
    });
    fireEvent.change(screen.getByPlaceholderText("Price Per Street Pole"), {
      target: { value: "100" },
    });
    fireEvent.change(screen.getByPlaceholderText("Image URLs"), {
      target: { value: "http://example.com/route1.jpg,http://example.com/route2.jpg" },
    });
    fireEvent.click(screen.getByText("Submit Route"));

    // Submit the street pole media form
    fireEvent.click(screen.getByText("Create Street Pole Media"));

    // Verify that the form was submitted
    await waitFor(() => {
      expect(screen.queryByText("Error")).not.toBeInTheDocument();
    });
  });
});