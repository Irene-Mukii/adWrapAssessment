"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

type Workspace = {
  id: number;
  name: string;
  email: string;
  location: string;
};

type WorkspacesTableProps = {
  data: Workspace[];
};

const WorkspacesTable: React.FC<WorkspacesTableProps> = ({ data = []}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const router = useRouter();

  const filteredData = data.filter(
    (workspace) =>
      workspace.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      workspace.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      workspace.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleRowClick = (id: number) => {
    router.push(`/workspace/${id}`);
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search..."
          className="border rounded px-4 py-2 w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">Location</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((workspace) => (
            <tr
              key={workspace.id}
              className="cursor-pointer hover:bg-gray-100"
              onClick={() => handleRowClick(workspace.id)}
            >
              <td className="border border-gray-300 px-4 py-2">{workspace.id}</td>
              <td className="border border-gray-300 px-4 py-2">{workspace.name}</td>
              <td className="border border-gray-300 px-4 py-2">{workspace.email}</td>
              <td className="border border-gray-300 px-4 py-2">{workspace.location}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between items-center mt-4">
        <button
          className="px-4 py-2 bg-gray-300 rounded"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {Math.ceil(filteredData.length / itemsPerPage)}
        </span>
        <button
          className="px-4 py-2 bg-gray-300 rounded"
          disabled={currentPage === Math.ceil(filteredData.length / itemsPerPage)}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default WorkspacesTable;