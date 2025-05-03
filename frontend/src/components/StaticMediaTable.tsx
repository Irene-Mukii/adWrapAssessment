"use client";

import React, { useState } from "react";
import type { StaticMedia } from "@/models/staticMedia";

type StaticMediaTableProps = {
  data: StaticMedia[];
};

const StaticMediaTable: React.FC<StaticMediaTableProps> = ({ data }) => {
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Location</th>
            <th className="border border-gray-300 px-4 py-2">Format</th>
            <th className="border border-gray-300 px-4 py-2">Number of Faces</th>
            <th className="border border-gray-300 px-4 py-2">Closest Landmark</th>
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
                <td className="border border-gray-300 px-4 py-2">{item.format}</td>
                <td className="border border-gray-300 px-4 py-2">{item.numberOfFaces}</td>
                <td className="border border-gray-300 px-4 py-2">{item.closestLandmark}</td>
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
                  <td colSpan={7} className="border border-gray-300 px-4 py-2">
                    <h4 className="font-bold">Faces:</h4>
                    <ul>
                      {item.staticMediaFaces.map((face) => (
                        <li key={face.id} className="mb-4">
                          <p>
                            <strong>Description:</strong> {face.description}
                          </p>
                          <p>
                            <strong>Availability:</strong> {face.availability}
                          </p>
                          <p>
                            <strong>Rent:</strong> ${face.rent}
                          </p>
                          <div className="flex gap-2 mt-2">
                            {face.images.map((img, index) => (
                              <img
                                key={index}
                                src={img}
                                alt={`Face ${face.id}`}
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

export default StaticMediaTable;