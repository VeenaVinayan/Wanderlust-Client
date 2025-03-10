import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="bg-whict-600 text-gray-700 py-4 shadow-md">
            <div className="container mx-auto text-left text-2xl font-bold ">
                <img src="/images/logo" height="100px" width="100px" />
            </div>
        </header>
    );
};

export default Header;
