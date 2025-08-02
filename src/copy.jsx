      {/* <aside className="w-full md:w-64 p-6 bg-white border-r border-gray-200 fixed top-16 left-0 h-[calc(100vh-64px)] overflow-y-auto shadow-md">
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
                <label
                  key={category._id}
                  className="flex items-center gap-3 hover:bg-pink-50 p-2 rounded-md transition"
                >
                  <input
                        key={category._id}
                        type="checkbox"
                        defaultChecked={false}
                        value={category._id}
                        checked={filters.categories.includes(category._id)}
                        onChange={(e) => {
                          const checked = e.target.checked;
                          const value = e.target.value;
                          setFilters((prev) => ({
                            ...prev,
                            categories: checked
                              ? [...prev.categories, value]
                              : prev.categories.filter((id) => id !== value),
                          }));
                    }}
                    className="w-5 h-5 text-pink-500 focus:ring-pink-400"
                  />
                  <span className="text-sm">{category.name}</span>
                </label>
              ))}
            </div>
          </div>
          {/* <div>
             <button className="bg-gray-200 font-medium text-gray-700 shadow-sm mt-3 p-2" onClick={handleClear}>Clear All</button>
          </div> 
          {/* <div>
          <button
            onClick={handleClear}
            className="mt-3 px-5 py-2 rounded-full bg-white text-gray-700 font-medium shadow-md hover:bg-gray-500 hover:text-white transition duration-300 ease-in-out"
          >
            Clear All
          </button>
        </div>
       </aside>  */}