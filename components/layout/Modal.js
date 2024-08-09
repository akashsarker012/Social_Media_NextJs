import React from 'react';

 function Modal({ children, dropRef,background }) {
  return (
    <div className={background && "fixed inset-0 bg-[rgba(0,0,0,0.5)]  p-4 flex justify-center items-center w-full h-full "}>
      <div ref={dropRef}>
        {children}
      </div>
    </div>
  );
}
export default Modal;
