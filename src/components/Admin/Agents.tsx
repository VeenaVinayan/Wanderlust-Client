import React, { useEffect, useState } from 'react';
import Table from '../common/Table';
import { fetchData } from '../../services/Admin/Dashboard';
import { Agent } from '../../types/userTypes';
import { Ban } from 'lucide-react';
import useBlockActions from '../../hooks/CustomHooks/useBlockActions';
import { Columns } from '../../Constants/User';
import Pagination from '../layout/Shared/Pagination';
import { PER_PAGE } from '../../Constants/User';
import SearchFilter from '../layout/Shared/SearchFilter';

const Agents: React.FC = () => {
 
  const [agentData, setAgentData] = useState<Agent[]>([]);
  const [count, setCount] = useState<number>(0);
  const { handleBlock, loading } = useBlockActions();
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({ keyword: '', sortOrder: '',sortData:'' });

  useEffect(() => {
    const id = setTimeout(()=> getAgentData(currentPage), 900);
    return () => clearTimeout(id);
  },[currentPage, filters]);

  const getAgentData = async (page: number) => {
    const data = await fetchData('Agent',page, 
      {
        search: filters.keyword,
        sortBy: 'name',
        sortOrder: filters.sortOrder,
        page: page,
        perPage: PER_PAGE,
      }, 
    );

    if (data) {
      setAgentData(data.data);
      setCount(data.totalCount);
    } else {
      setAgentData([]);
    }
  };

  const handlePage = (page: number) => {
    setCurrentPage(page);
  };

  const handleBlockUser = async (userId: string, role: string) => {
    await handleBlock(userId, role, () => {
      setAgentData((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, status: !user.status } : user
        )
      );
    });
  };
return (
    <div>
      <SearchFilter
        onFilterChange={({ keyword, sortOrder }) =>
          setFilters((prev) => ({
            ...prev,
            keyword,
            sortOrder,
          }))
        }
      />
      {agentData.length > 0 ? (
        <>
          <Table<Agent>
            data={agentData}
            columns={Columns}
            role={'Agent'}
            renderActions={(agent) => (
              <>
                <button
                  onClick={() => handleBlockUser(agent._id, 'Agent')}
                  disabled={loading}
                  className="bg-red-400 text-white px-5 py-2 rounded-lg font-semibold shadow-md hover:bg-red-500 focus:ring-2 focus:ring-red-400 transition flex-row"
                >
                  <Ban color={'white'} size={10} />
                </button>
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
        </>
      ) : (
        <h2 className="text-3xl font-bold text-center text-gray-700 my-4">
          No user available
        </h2>
      )}
    </div>
  );
};

export default Agents;
