import React from 'react';

const Footer : React.FC = () => {
    return (
      <footer className="bg-gray-400 text-white text-center p-4 sticky">
        <p>&copy; {new Date().getFullYear()} Wanderlust. All Rights Reserved.</p>
      </footer>
    );
  };

  export default Footer;