import React ,{ useEffect , useState} from 'react';
import { FaWallet } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { getWallet } from '../../services/User/UserServices';
import {  TWalletTransaction } from '../../types/userTypes';
import { toast } from 'react-toastify';
import { PER_PAGE , WalletTransactionData} from '../../Constants/User';
import SearchFilter from '../layout/Shared/SearchFilter'; 
import  Pagination  from '../layout/Shared/Pagination';
import Table from '../common/Table';

const Wallet : React.FC = () => {
  const [ wallet , setWallet] = useState(null);
  const [ transaction, setTransaction] = useState<TWalletTransaction[]>([]);
  const [ filters, setFilters ] = useState({keyword: '',sortBy:'', sortOrder: ''});
  const [ count, setCount ] = useState(0);
  const [ currentPage, setCurrentPage ] = useState(1);
  const user = useSelector((state: RootState) => state.userData);

  const handlePage = (page : number) =>{
     setCurrentPage(page);
  }
  useEffect(() => {
  (async () => {
    try {
      const data = await getWallet(user.id,{
         page:currentPage,
         perPage: PER_PAGE,
         search: filters.keyword,
         sortBy: filters.sortBy,
         sortOrder: filters.sortOrder
      });
      console.log('Wallet data in component :: :',data);
      if(data){
       const { amount, transaction, totalCount } = data;
       console.log("Values ::" ,amount,transaction,totalCount);
        setWallet(amount);
        setTransaction(transaction);
        setCount(totalCount);
      }
     
    } catch (err) {
      toast.error(`Error is ${err}`);
    }
  })();
},[filters, currentPage,user.id]);

 return (
   wallet ? (
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
   
    <div className="bg-gradient-to-r from-gray-400 to-gray-700 text-white rounded-2xl shadow-lg p-6 mb-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FaWallet className="text-white" /> My Wallet
          </h2>
          <p className="text-sm text-white/80 mt-1 justify-end">Current Balance</p>
          <p className="text-4xl font-semibold mt-2 justify-end">{wallet}</p>
        </div>
      </div>
    </div>
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Transactions</h3>

      <SearchFilter
        onFilterChange={setFilters}
        values={['bookingId', 'createdAt']}
      />

      {transaction && transaction.length > 0 ? (
        <>
          <div className="overflow-x-auto">
            <Table<TWalletTransaction>
              data={transaction}
              columns={WalletTransactionData}
              role={'Wallet'}
            />
          </div>

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
        <p className="text-gray-500 mt-4">No transactions found.</p>
      )}
    </div>
  </div>
) : (
 <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
    <div className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-2xl shadow-lg p-6 mb-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FaWallet className="text-white" /> My Wallet
          </h2>
          <p className="text-sm text-white/80 mt-1">Current Balance</p>
          <p className="text-4xl font-semibold mt-2">0</p>
        </div>
      </div>
    </div>
  </div>
)

);
}


export default Wallet;