"use client";
import React, { useState } from "react";
import type { StreetPoleMedia } from "@/models/streetpole";

type StreetPoleMediaTableProps = {
  data: StreetPoleMedia[];
};

const StreetPoleMediaTable: React.FC<StreetPoleMediaTableProps> = ({ data }) => {
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  return (
    <div className="overflow-x-auto border-rounded-lg shadow-md padding-4">
      <table className="min-w-full borderborder-collapse border-gray-200 ">
        <thead>
          
          <tr className="bg-gray-300">
            <th className="text-left border-gray-300 px-4 py-2">ID</th>
            <th className="text-left border-gray-300 px-4 py-2">Location</th>
            <th className="text-left border-gray-300 px-4 py-2">Availability</th>
            <th className="text-left border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <React.Fragment key={item.id}>
              <tr>
                <td className=" text-blue-500 border-gray-300 px-4 py-2 ">{item.id}</td>
                <td className=" border-gray-300 px-4 py-2">{item.location}</td>
                <td>
                <div  className={`flex flex-row items-center rounded-full ${
                    item.availability === "Available"
                      ? "bg-red-300 "
                      : "bg-green-300 "
                  }`}>
                  <div className={`h-4 w-4 rounded-full m-1 ${
                    item.availability === "Available"
                      ? "bg-red-700 "
                      : "bg-green-700 "
                  }`}>  </div>
                  <div className={`p-1 border-gray-300 rounded-lg ${
                    item.availability === "Available"
                      ? " text-red-700"
                      : " text-green-700"
                  }`}
                >{item.availability}</div>
                  
                  </div>
                </td>
                <td className=" border-gray-300 px-4 py-2">
                  <button
                    className="text-blue-500 text-lg font-bold text-center"
                    onClick={() =>
                      setExpandedRow(expandedRow === item.id ? null : item.id)
                    }
                  >
                    {expandedRow === item.id ? "x" : "..."}
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