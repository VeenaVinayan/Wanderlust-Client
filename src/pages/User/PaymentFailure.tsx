
import React from 'react';
import { XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../../components/layout/Shared/Header';

const Cancel: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-red-50 p-4">
      <Header />
      <div className='flex flex-col justify-center items-center bg-white rounded-3xl shadow-lg p-8 w-full max-w-md'>
      <XCircle className="text-red-500 w-16 h-16 mb-4" />
      <h1 className="text-2xl font-bold text-red-700 mb-2">Payment Failed or Cancelled</h1>
      <p className="text-red-600 mb-6 text-center">
        Oops! It looks like your payment didn't go through. You can try again later or contact support.
      </p>
      <Link
        to="/"
        className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200"
      >
        Back to Home
      </Link>
      </div>  
   </div>
  );
};

export default Cancel;
