import React, { useState, useEffect } from "react";
import Table from "../common/Table";
import { PER_PAGE } from "../../Constants/User";
import { fetchPendingAgents } from "../../services/Admin/Dashboard";
import Pagination from "../layout/Shared/Pagination";
import { TAgentVerification } from "../../types/agentTypes";
import { AgentVerificationColumn } from "../../Constants/User";
import { useNavigate } from "react-router-dom";
import SearchFilter from "../layout/Shared/SearchFilter";

const AgentVerification: React.FC = () => {
  const [agentDataPending, setAgentData] = useState<TAgentVerification[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState<number>(0);
  const [filters, setFilters] = useState({
    keyword: "",
    sortOrder: "",
    sortData: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const id = setTimeout(() => getAgentData(currentPage), 1000);
    return () => clearTimeout(id);
  }, [currentPage, filters]);

  const handlePage = async (page: number) => {
    setCurrentPage(page);
  };
  const getAgentData = async (page: number) => {
    const response = await fetchPendingAgents({
      search: filters.keyword,
      sortBy: "name",
      sortOrder: filters.sortOrder,
      page: page,
      perPage: PER_PAGE,
    });
    const { data, totalCount } = response;
    setAgentData(data);
    setCount(totalCount);
  };

  const verifyAgent = (id: string) => {
    const agent = agentDataPending.find((agent) => agent._id === id);
    navigate("/admin/adminDashboard/agentCard", { state: agent });
  };
  return (
    <div>
      {agentDataPending.length > 0 ? (
        <>
          <div>
            <SearchFilter
              onFilterChange={({ keyword, sortOrder }) =>
                setFilters((prev) => ({
                  ...prev,
                  keyword,
                  sortOrder,
                }))
              }
              values={["name", "email", "createdAt"]}
            />
          </div>
          <Table
            data={agentDataPending}
            columns={AgentVerificationColumn}
            role={"Agent Verification"}
            renderActions={(agent) => (
              <>
                <button
                  className="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95"
                  onClick={() => verifyAgent(agent._id)}
                >
                  Verify
                </button>
              </>
            )}
          />
          <Pagination
            perPage={PER_PAGE}
            length={count || 1}
            handlePage={handlePage}
            currentPage={currentPage}
          />
        </>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[300px] bg-gray-100 border border-gray-300 rounded-lg shadow-md p-6">
          <div className="flex items-center justify-center w-20 h-20 bg-red-100 rounded-full">
            <svg
              className="w-12 h-12 text-red-500"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v2m0 4h.01M21 12A9 9 0 1 1 3 12a9 9 0 0 1 18 0z"
              ></path>
            </svg>
          </div>
          <h2 className="mt-4 text-2xl font-semibold text-gray-800">
            No Agents Available
          </h2>
          <p className="mt-2 text-gray-600 text-center">
            Currently, there are no agents available for verification. <br />
            Please check back later!
          </p>
        </div>
      )}
    </div>
  );
};

export default AgentVerification;
