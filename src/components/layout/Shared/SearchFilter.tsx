import React, { useState } from 'react';

interface SearchFilterProps {
  onFilterChange: (filters: { keyword: string; sortOrder: string }) => void;
}

const SearchFilter: React.FC<SearchFilterProps> = ({ onFilterChange }) => {
  const [keyword, setKeyword] = useState('');
  const [sortOrder, setSortOrder] = useState('');

  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newKeyword = e.target.value;
    setKeyword(newKeyword);
    onFilterChange({ keyword: newKeyword, sortOrder });
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSortOrder = e.target.value;
    setSortOrder(newSortOrder);
    onFilterChange({ keyword, sortOrder: newSortOrder }); 
  };

  return (
    <div className="flex justify-end items-center gap-4 my-4">
      <input
        type="text"
        placeholder="Search by name..."
        value={keyword}
        onChange={handleKeywordChange}
        className="border p-2 rounded text-gray-700"
      />
      <select
        value={sortOrder}
        onChange={handleSortChange}
        className="border p-2 rounded text-gray-700"
      >
        <option value="">-- Sort by --</option>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </div>
  );
};

export default SearchFilter;
