import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-12 px-4 shadow-lg">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Entihad Abrar</h1>
        <p className="text-xl md:text-2xl font-light text-blue-100 mb-6">
          Marketing Management Graduate | Sales and Marketing Expert
        </p>
        <div className="flex justify-center space-x-6">
          <a 
            href="https://www.instagram.com/entihad_abrar?igsh=ajJiMXRoNG05bGI=" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-white hover:text-blue-200 transition-colors bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-instagram"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            <span>Instagram</span>
          </a>
          <a 
            href="https://t.me/inuyuni" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-white hover:text-blue-200 transition-colors bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-send"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
            <span>Telegram</span>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;