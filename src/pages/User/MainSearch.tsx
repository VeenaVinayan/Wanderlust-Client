import React, { useEffect, useState } from "react";
import { Search, X, SlidersHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getCategories, advanceSearch } from "../../services/User/UserServices";
import { TPackageDataValue} from "../../types/packageTypes";
import { TCategoryValue } from "../../types/userTypes";
import { toast } from "react-toastify";
import Header from "../../components/layout/Shared/Header";
import Pagination from "../../components/layout/Shared/Pagination";
import { PER_PAGE } from '../../Constants/User';

const SearchPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState<number>(0);
  const [packages, setPackages] = useState<TPackageDataValue[]>([]);
  const [categories, setCategories] = useState<TCategoryValue[]>([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [filters, setFilters] = useState({ budget: '', categories: [] as string[] });
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  useEffect(() => { getCategory(); }, []);

  useEffect(() => {
    const id = setTimeout(() => getPackages(), 500);
    return () => clearTimeout(id);
  }, [filters, currentPage, searchKeyword, sortOrder]);

  const handlePage = (page: number) => setCurrentPage(page);

  const getPackages = async () => {
    try {
      const params = new URLSearchParams();
      if (filters.budget) params.append("price", filters.budget);
      if (filters.categories.length > 0) params.append("category", filters.categories.join(','));
      if (searchKeyword) params.append("keyword", searchKeyword);
      if (sortOrder) params.append("sort", sortOrder);
      params.append("page", currentPage.toString());
      params.append("perPage", PER_PAGE.toString());
      const queryString = params.toString();
      const { packages, totalPackages } = await advanceSearch(queryString);
      setPackages(packages);
      setCount(totalPackages);
    } catch (err) {
      toast.error(`Error in fetching packages: ${err}`);
    }
  };

  const getCategory = async () => {
    try {
      const data : TCategoryValue[] = await getCategories();
      setCategories(data);
    } catch (err) {
      toast.error(`Error in fetching categories: ${err}`);
    }
  };

  const handleClear = () => setFilters({ budget: "", categories: [] });

  const handlePackage = (pkg: TPackageDataValue) => navigate("/user/packageDetails", { state: pkg });

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
    <div className="m-4 p-2 shadow-sm">
     <button
        className="md:hidden fixed top-20 left-4 z-50 bg-white p-2 rounded-full shadow-md"
        onClick={toggleSidebar}
      >
        <SlidersHorizontal className="w-5 h-5 text-gray-700" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 z-40 md:hidden" onClick={closeSidebar} />
      )}

      <div className="flex flex-col md:flex-row m-4">
        <aside
          className={`fixed md:static top-16 z-50 md:z-auto left-0 h-[calc(100vh-64px)] md:h-auto w-72 bg-white border-r border-gray-200 shadow-md overflow-y-auto transform transition-transform duration-300 md:translate-x-0 ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="p-6 relative">
            <button className="absolute top-4 right-4 md:hidden" onClick={closeSidebar}>
              <X className="w-5 h-5 text-gray-600" />
          </button>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Filters</h2>
            <div className="mb-4">
              <label className="block mb-2 font-semibold text-gray-700">Budget</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
                value={filters.budget}
                onChange={(e) => setFilters({ ...filters, budget: e.target.value })}
              >
                <option value="">Select Budget</option>
                <option value="1000-2000">1000 - 2000</option>
                <option value="2000-3000">2000 - 3000</option>
                <option value="3000-5000">3000 - 5000</option>
                <option value="5000-10000">5000 - 10000</option>
                <option value="10000-50000">10000 - 50000</option>
                <option value="50000+">Above 50000</option>
              </select>
            </div>
            <div>
              <label className="block mb-2 font-semibold text-gray-700">Category</label>
              <div className="space-y-2">
                {categories.map((category) => (
                  <label key={category._id} className="flex items-center gap-3 hover:bg-pink-50 p-2 rounded-md transition">
                    <input
                      type="checkbox"
                      value={category._id}
                      checked={filters.categories.includes(category._id)}
                      onChange={(e) => {
                        const value = e.target.value;
                        const checked = e.target.checked;
                        setFilters((prev) => ({
                          ...prev,
                          categories: checked ? [...prev.categories, value] : prev.categories.filter((id) => id !== value),
                        }));
                      }}
                      className="w-5 h-5 text-pink-500 focus:ring-pink-400"
                    />
                    <span className="text-sm">{category.name}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <button
                onClick={handleClear}
                className="mt-4 w-full py-2 rounded-md bg-gray-200 text-gray-700 font-medium shadow hover:bg-gray-400 hover:text-white transition"
              >
                Clear All
              </button>
            </div>
          </div>
        </aside>

        <main className="flex-1 p-4 md:ml-55 mt-16 md:mt-0 overflow-hidden">
          <div className="bg-white p-4 rounded-xl shadow-md flex flex-col lg:flex-row gap-4 items-center justify-between mb-6">
            <div className="relative w-full lg:w-2/3">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search packages..."
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:outline-none shadow-sm"
              />
              {searchKeyword && (
                <button
                  onClick={() => setSearchKeyword('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X size={14} />
                </button>
              )}
            </div>
            <button
              onClick={() => {
                setCurrentPage(1);
                getPackages();
              }}
              className="w-full lg:w-auto px-6 py-3 bg-gradient-to-r from-purple-700 via-pink-600 to-red-500 text-white font-semibold rounded-lg hover:brightness-110 transition shadow-md"
            >
              Search
            </button>
            <select
              className="w-full lg:w-auto px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="">Sort By</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="A-Z">A-Z</option>
              <option value="Z-A">Z-A</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.length > 0 ? (
              packages.map((pkg) => (
                <div
                  key={pkg.id}
                  onClick={() => handlePackage(pkg)}
                  className="cursor-pointer bg-white shadow-lg rounded-xl overflow-hidden transition duration-300 hover:scale-105 hover:shadow-2xl"
                >
                  <img src={pkg.images[0] as string} alt={pkg.name} className="w-full h-48 object-cover" />
                  <div className="p-4 text-center">
                    <h3 className="text-lg font-bold text-gray-800">{pkg.name}</h3>
                    <p className="text-md font-medium text-gray-600 mt-1">
                      {pkg.day} Days {pkg.night} Nights
                    </p>
                    <p className="text-xl font-bold text-pink-600 mt-2">₹{pkg.price}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg shadow-md text-center">
                <p className="font-semibold">No packages found !!!</p>
              </div>
            )}
          </div>

          {packages.length > 0 && (
            <div className="flex justify-center mt-10">
              <Pagination
                perPage={PER_PAGE}
                length={count || 1}
                handlePage={handlePage}
                currentPage={currentPage}
              />
            </div>
          )}
        </main>
      </div>
    </div>
  </div>
  );
};

export default SearchPage;
