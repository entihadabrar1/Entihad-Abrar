import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-800 text-slate-300 py-8 mt-12 text-center text-sm">
      <div className="container mx-auto px-4">
        <p className="mb-4">&copy; 2025 Entihad Abrar. All rights reserved.</p>
        <div className="flex justify-center space-x-6">
          <a href="https://www.instagram.com/entihad_abrar?igsh=ajJiMXRoNG05bGI=" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a>
          <span className="text-slate-600">|</span>
          <a href="https://t.me/inuyuni" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Telegram</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;