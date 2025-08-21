import React, { useState } from 'react';
import { Search , X} from 'lucide-react';

interface SearchFilterProps {
  onFilterChange: (filters: { keyword: string;sortBy:string, sortOrder: string }) => void;
  values:string[];
}

const SearchFilter: React.FC<SearchFilterProps> = ({ onFilterChange ,values}) => {
  const [keyword, setKeyword] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [sortBy,setSortBy] = useState('');
  const [error, setError] = useState('');
  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newKeyword = e.target.value.trim();
    if (newKeyword.length > 20) {
      setError("Search query too long.");
    } else if (!/^[a-zA-Z0-9\s@.]*$/.test(newKeyword)) {
      setError("Only letters, numbers, spaces, @, and . are allowed.");
    } else {
      setError("");
    }
    setKeyword(newKeyword);
    onFilterChange({ keyword: newKeyword,sortBy, sortOrder});
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSortOrder = e.target.value;
    setSortOrder(newSortOrder);
    onFilterChange({ keyword, sortBy,sortOrder: newSortOrder }); 
  };
  const handleSortbyChange =(e:React.ChangeEvent<HTMLSelectElement>) =>{
     const newSortBy = e.target.value;
     setSortBy(newSortBy);
     onFilterChange({keyword,sortBy: newSortBy,sortOrder})
  }
  const clearSearch = () =>{
     setKeyword('');
  }
  return (
   <div className="flex flex-col sm:flex-row sm:justify-between items-stretch sm:items-center gap-4 my-6 p-6 bg-gradient-to-r from-white via-gray-50 to-white shadow-md rounded-2xl border border-gray-200">
     <div className="relative w-full sm:w-80">
        <input
          type="text"
          placeholder="Search by name..."
          value={keyword}
          onChange={handleKeywordChange}
          className="w-full pl-10 pr-10 py-2 text-gray-700 bg-white border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        />
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          <Search className="w-5 h-5" />
        </span>
        {error && <p className="text-red-800 text-xs mt-1">{error}</p>}
        {keyword && (
          <span
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
            onClick={clearSearch}
          >
            <X size={16} className="text-gray-500 hover:text-gray-700" />
          </span>
        )}
      </div>
      <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
        <div className="w-full sm:w-60">
          <select
            value={sortBy}
            onChange={handleSortbyChange}
            className="w-full text-sm px-3 py-2 bg-white text-gray-700 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          >
            <option value="">-- Sort By --</option>
            {values &&
              values.map((val) => (
                <option key={val} value={val}>
                  {val}
                </option>
              ))}
          </select>
        </div>
        <div className="w-full sm:w-60">
          <select
            value={sortOrder}
            onChange={handleSortChange}
            className="w-full text-sm px-3 py-2 bg-white text-gray-700 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          >
            <option value="">-- Sort Order --</option>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>
    </div>
 );
};

export default SearchFilter;
