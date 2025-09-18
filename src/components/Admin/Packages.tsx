import React, { useEffect, useState } from "react";
import Table from "../../components/common/Table";
import { TPackageAllData } from "../../types/packageTypes";
import { blockPackage } from "../../services/Admin/Dashboard";
import { toast } from "react-toastify";
import useSweetAlert from "../../hooks/CustomHooks/SweetAlert";
import { useNavigate } from "react-router-dom";
import Pagination from "../../components/layout/Shared/Pagination";
import { getPackages } from "../../services/Admin/Dashboard";
import { PER_PAGE } from "../../Constants/User";
import SearchFilter from "../layout/Shared/SearchFilter";
import { ViewIcon, Ban } from "lucide-react";
import { PackageColumnData } from "../../Constants/User";

const Packages: React.FC = () => {
  const [count, setCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [packages, setPackages] = useState<TPackageAllData[]>([]);
  const [filters, setFilters] = useState({
    keyword: "",
    sortBy: "",
    sortOrder: "",
  });
  const { showConfirm } = useSweetAlert();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async (page: number) => {
      const { packages, totalCount } = await getPackages({
        page,
        perPage: PER_PAGE,
        search: filters.keyword,
        sortBy: filters.sortBy,
        sortOrder: filters.sortOrder,
      });
      setPackages(packages);
      setCount(totalCount);
    };
    const id = setTimeout(() => fetchData(currentPage));

    return () => clearTimeout(id);
  }, [currentPage, filters]);

  const handlePage = async (page: number) => {
    setCurrentPage(page);
  };
  const handleDelete = async (id: string) => {
    try {
      const response = await blockPackage(id);
      if (response) toast.success("Successfully Block Package !!");
      else toast.error("Error occured delete Package !!");
    } catch (err) {
      console.error("Error :;", err);
    }
  };
  const handleView = (travelPackage: TPackageAllData) => {
    navigate("/admin/adminDashboard/viewPackage", { state: travelPackage });
  };
  return (
    <div className="bg-white p-5 shadow-lg rounded-xl min-h-[300px] flex flex-col">
      <SearchFilter
        onFilterChange={setFilters}
        values={["name", "price", "createdAt", "status"]}
      />
      <div className="overflow-x-auto">
        <Table<TPackageAllData>
          data={packages}
          columns={PackageColumnData}
          role={"Packages"}
          renderActions={(value) => (
            <>
              {value.isVerified ? (
                <>
                  <button
                    onClick={() => handleView(value)}
                    className="m-3 px-5 py-2 rounded-lg font-semibold shadow-md hover:bg-gray-400 focus:ring-2 focus:ring-gray-600-400 transition flex-row"
                  >
                    <ViewIcon color={"gray"} size={16} />
                  </button>
                  <button
                    onClick={() =>
                      showConfirm(
                        "Are you sure? ",
                        "You won't be able to revert this !",
                        () => handleDelete(value._id)
                      )
                    }
                    className="m-3 px-5 py-2 rounded-lg font-semibold shadow-md hover:bg-gray-500 focus:ring-2 transition flex-row"
                  >
                    <Ban color={"gray"} size={16} />
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => handleView(value)}
                    className="m-3 px-5 py-2 rounded-lg font-semibold shadow-md hover:bg-gray-500 focus:ring-2 focus:ring-gray-400 transition flex-row"
                  >
                    <ViewIcon color={"gray"} size={12} />
                  </button>
                </>
              )}
            </>
          )}
        />
        <div className="flex justify-center mt-6">
          <Pagination
            perPage={PER_PAGE}
            length={count || 1}
            handlePage={handlePage}
            currentPage={currentPage}
          />
        </div>
      </div>
    </div>
  );
};
export default Packages;
