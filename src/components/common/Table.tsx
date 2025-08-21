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
   <div className="px-4 md:px-10 mt-6">
   { role && (
     <h2 className="text-xl md:text-2xl font-bold mb-4 text-gray-800">
        {role}
     </h2>
    )}
   <div className="min-w-full inline-block align-middle">
    <div className="overflow-hidden border border-gray-200 shadow-md rounded-lg">
      <table className="min-w-full divide-y divide-gray-200 table-auto overflow-x-auto sm:overflow-x-visible">
        <thead className="bg-gray-700 text-white">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key as string}
                className="px-4 py-3 text-left text-sm md:text-base font-semibold tracking-wider"
              >
                {col.label}
              </th>
            ))}
            {renderActions && (
              <th className="px-4 py-3 text-left text-sm md:text-base font-semibold tracking-wider">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {items.map((item, index) => (
            <tr
              key={item._id}
              className={`${
                index % 2 === 0 ? "bg-gray-100" : "bg-white"
              } hover:bg-gray-200 transition`}
            >
              {columns.map((col) => (
                <td
                  key={col.key as string}
                  className="px-4 py-4 text-sm md:text-base text-gray-700 whitespace-nowrap"
                >
                  {col.render
                    ? col.render(item[col.key], item)
                    : (item[col.key] as React.ReactNode)}
                </td>
              ))}
              {renderActions && (
                <td className="px-4 py-4 text-sm md:text-base whitespace-nowrap">
                  {renderActions(item)}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
 </div>
);
};

export default GenericTable;

