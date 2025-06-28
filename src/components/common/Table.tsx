import React, { useEffect, useState } from "react";

export interface Column<T> {
  key: keyof T; 
  label: string;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
}
interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  role?: string;
  renderActions?: (row: T) => React.ReactNode; 
}
const GenericTable = <T extends { _id: string }>({
  data,
  columns,
  role,
  renderActions,
}: TableProps<T>) => {
  const [items, setItems] = useState<T[]>([]);

  useEffect(() => {
    setItems(data);
  }, [data]);

  return (
    <div className="overflow-x-auto m-10">
      {role && <h2 className="text-2xl font-bold mb-4 text-gray-800">{role}</h2>}
      <table className="w-full border-collapse bg-white shadow-lg rounded-lg overflow-hidden table-auto">
        <thead className="bg-gray-700 text-white">
          <tr>
            {columns.map((col) => (
              <th key={col.key as string} className="px-6 py-3 text-left">
                {col.label}
              </th>
            ))}
            {renderActions && <th className="px-6 py-3 text-left">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr
              key={item._id}
              className={`border-b ${index % 2 === 0 ? "bg-gray-100" : "bg-white"} hover:bg-gray-200 transition`}
            >
              {columns.map((col) => (
                <td key={col.key as string} className="px-6 py-4 text-left text-gray-600">
                  {col.render ? col.render(item[col.key], item) : (item[col.key] as React.ReactNode)}
                </td>
              ))}
              {renderActions && (
                <td className="px-6 py-4 text-left">{renderActions(item)}</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GenericTable;

