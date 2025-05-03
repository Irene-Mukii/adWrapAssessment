"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface Workspace {
  id: number;
  name: string;
}

interface WorkspaceContextType {
  workspaces: Workspace[];
  loading: boolean;
  error: string | null;
}

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(undefined);

export const WorkspaceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWorkspaces = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/workspaces");
        if (response.ok) {
          const data: Workspace[] = await response.json();
          setWorkspaces(data);
        } else {
          setError("Failed to fetch workspaces. Please try again.");
        }
      } catch (error) {
        setError("Error fetching workspaces. Please check your connection.");
      } finally {
        setLoading(false);
      }
    };

    fetchWorkspaces();
  }, []);

  return (
    <WorkspaceContext.Provider value={{ workspaces, loading, error }}>
      {children}
    </WorkspaceContext.Provider>
  );
};

export const useWorkspaceContext = (): WorkspaceContextType => {
  const context = useContext(WorkspaceContext);
  if (!context) {
    throw new Error("useWorkspaceContext must be used within a WorkspaceProvider");
  }
  return context;
};