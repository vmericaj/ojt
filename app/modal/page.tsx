'use client'

import React, {useState} from 'react';

export default function Modal() {

  const [showModal, setShowModal] = useState(false);
 
  return (
    <div className="grid grid-rows-[20px_1fr_20px]  min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
     <div>
      <h1 className="text-sm">Today's Task</h1>
      <p className="text-xs">Lorem Ipsum Dolores Alt</p>
     </div>
     <div>
     <button
          className="bg-red-800 text-white text-xs -black flex justify-center items-center gap-2
          font-bold px-4 h-8 rounded-md shadow hover:shadow-lg outline-none focus:outline-none"
          type="button"
          onClick={() => setShowModal(true)}
        >
          Add Task 
        </button>
        
     </div>
     
     {showModal ? (
      <div className="fixed inset-0 bg-black bg-opacity-10 flex justify-center items-center z-30">
        <div className="bg-[#ffffff] p-8 rounded-lg shadow-lg max-w-md w-full flex flex-col justify-center items-center">
          
          <p className="text-xs mb-4">Add Task</p>
          <div className="mb-2 w-full"> {/* Set w-full to ensure it takes full width */}
            <label className="block text-xs font-semibold">People</label>
            <input 
              type="text" 
              placeholder="Enter your name" 
              className="mt-2 p-2 text-xs italic border border-gray-300 rounded-md w-full"
            />
          </div>
         
          <div>
          <button
            className="my-2 w-auto px-4 h-8 text-xs bg-red-800 text-white rounded-md shadow hover:shadow-lg font-semibold"
            onClick={() => setShowModal(false)}
          >
            Next
          </button>
         
        </div>

          
        </div>
      </div>
    ) : null}



    </div>
  );
}
