"use client";
import React, { useState } from "react";
import type { StreetPoleMedia } from "@/models/streetpole";

type StreetPoleMediaTableProps = {
  data: StreetPoleMedia[];
};

const StreetPoleMediaTable: React.FC<StreetPoleMediaTableProps> = ({ data }) => {
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Location</th>
            <th className="border border-gray-300 px-4 py-2">Availability</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <React.Fragment key={item.id}>
              <tr>
                <td className="border border-gray-300 px-4 py-2">{item.id}</td>
                <td className="border border-gray-300 px-4 py-2">{item.location}</td>
                <td className="border border-gray-300 px-4 py-2">{item.availability}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    className="text-blue-500"
                    onClick={() =>
                      setExpandedRow(expandedRow === item.id ? null : item.id)
                    }
                  >
                    {expandedRow === item.id ? "Collapse" : "Expand"}
                  </button>
                </td>
              </tr>
              {expandedRow === item.id && (
                <tr>
                  <td colSpan={4} className="border border-gray-300 px-4 py-2">
                    <h4 className="font-bold">Routes:</h4>
                    <ul>
                      {item.routes.map((route) => (
                        <li key={route.id} className="mb-2">
                          <p>Description: {route.description}</p>
                          <p>Number of Street Poles: {route.numberOfStreetPoles}</p>
                          <p>Price per Pole: ${route.pricePerStreetPole}</p>
                          <div className="flex gap-2">
                            {route.images.map((img, index) => (
                              <img
                                key={index}
                                src={img}
                                alt={`Route ${route.id}`}
                                className="w-16 h-16 object-cover border"
                              />
                            ))}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StreetPoleMediaTable;