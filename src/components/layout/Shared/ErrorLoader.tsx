import React from "react";

const ErrorLoader : React.FC= () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
       <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin mb-4"></div>
      
       <p className="text-red-600 text-lg font-semibold animate-pulse">
        Oops! An error occurred.
      </p>
    </div>
  );
};

export default ErrorLoader;
