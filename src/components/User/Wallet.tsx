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
  const [ filters, setFilters ] = useState({keyword: '', sortOrder: ''});
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
         sortBy: 'transactionDate',
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
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* Wallet Balance */}
      <div className="bg-gradient-to-r from-gray-300 to-gray-600 text-white rounded-2xl shadow-lg p-6 mb-8">
        <div className="flex items-center justify-end">
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <FaWallet className="text-white" /> My Wallet
            </h2>
            <p className="text-sm text-white/80 mt-1">Current Balance</p>
            <p className="text-4xl font-semibold mt-2">{wallet}</p>
          </div>
        </div>
      </div>
   
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Transactions</h3>
        <SearchFilter onFilterChange ={setFilters} />
        {transaction && transaction.length > 0 ? (
         <>  
          <Table<TWalletTransaction>
            data={transaction}
            columns={WalletTransactionData}
            role={'Wallet'}
          />
           <div className="flex justify-center mt-6">
            <Pagination
              perPage={PER_PAGE}
              length={count || 1}
              handlePage={handlePage}
            />
           </div>
          </> 
        ) : (
          <p className="text-gray-500">No transactions found.</p>
        )}
      </div>
    </div>
   ) : (
     <div className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-2xl shadow-lg p-6 mb-8">
        <div className="flex items-center justify-end">
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <FaWallet className="text-white" /> My Wallet
            </h2>
            <p className="text-sm text-white/80 mt-1">Current Balance</p>
            <p className="text-4xl font-semibold mt-2">0</p>
          </div>
        </div>
      </div>
  )
);
}


export default Wallet;