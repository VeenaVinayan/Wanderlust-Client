import React, { useState } from 'react';
import { Search , X} from 'lucide-react';
interface SearchFilterProps {
  onFilterChange: (filters: { keyword: string; sortOrder: string }) => void;
}

const SearchFilter: React.FC<SearchFilterProps> = ({ onFilterChange }) => {
  const [keyword, setKeyword] = useState('');
  const [sortOrder, setSortOrder] = useState('');

  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newKeyword = e.target.value;
    setKeyword(newKeyword);
    onFilterChange({ keyword: newKeyword, sortOrder});
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSortOrder = e.target.value;
    setSortOrder(newSortOrder);
    onFilterChange({ keyword, sortOrder: newSortOrder }); 
  };
  
  const clearSearch = () =>{
     setKeyword('');
  }
  return (
 <div className="flex flex-wrap justify-between items-center gap-4 my-6 p-6 bg-gradient-to-r from-white via-gray-50 to-white shadow-lg rounded-2xl border border-gray-200">
 <div className="relative w-full sm:w-72">
  <input
    type="text"
    placeholder="Search by name..."
    value={keyword}
    onChange={handleKeywordChange}
    className="w-full pl-10 pr-10 py-2 text-gray-700 bg-white border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
  />
  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
    <Search className="w-5 h-5" />
  </span>
 {keyword && (
    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer">
      <X size={16} onClick={clearSearch} color={'gray'} />
    </span>
  )}
</div>


  <div className=" w-full sm:w-auto">
    <select
      value={sortOrder}
      onChange={handleSortChange}
      className="w-full sm:w-48 px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
    >
      <option value="">-- Sort by --</option>
      <option value="asc">Ascending</option>
      <option value="desc">Descending</option>
    </select>
  </div>
</div>

  );
};

export default SearchFilter;
