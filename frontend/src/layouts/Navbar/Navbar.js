import React, { useState } from 'react';

const Navbar = ({name}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleUserIconClick = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="bg-indigo-600 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <a href="/" className="text-white text-lg font-bold">Логотип</a>
          </div>
          <div className=" items-center">
            <button onClick={handleUserIconClick} className=" text-gray-300 hover:text-white focus:outline-none">
              <div>иконка пользователя:{name}</div>
            </button>
            {menuOpen && (
              <div className="absolute top-16 right-0 border bg-white">
                <a href="#" className="block px-4 py-2">Выйти</a>
                {/* дополнительные пункты меню */}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

