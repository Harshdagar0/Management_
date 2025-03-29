import React from 'react';

const Loader = () => {
  return (
    <div className='flex justify-center '>
    <svg className="mr-3 animate-spin h-5 " viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeDasharray="31.415, 31.415">
            <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="1s" repeatCount="indefinite" />
        </circle>
    </svg></div>
  );
};

export default Loader;
