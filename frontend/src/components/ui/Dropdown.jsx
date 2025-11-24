import React, { useState, useRef, useEffect } from 'react';
import { classNames } from '../../lib/utils';

const Dropdown = ({ 
  trigger, 
  children, 
  position = 'left',
  className = '' 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const positionClasses = {
    left: 'left-0',
    right: 'right-0'
  };

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      {/* Trigger */}
      <div onClick={() => setIsOpen(!isOpen)}>
        {trigger}
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className={classNames(
            'absolute mt-2 w-48 rounded-lg shadow-lg bg-white dark:bg-gray-800',
            'border border-gray-200 dark:border-gray-700 py-1 z-50',
            positionClasses[position],
            className
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default Dropdown;