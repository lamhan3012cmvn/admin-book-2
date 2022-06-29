import React from 'react'
import './style.css'
interface ModalProps {
  showed: boolean;
  setShowed: (value: boolean) => void;

  children: React.ReactElement
}

const Modal = (props: ModalProps) => {
  const { children, showed, setShowed } = props
  return (
    <div className={`w-screen h-[0] fixed top-[0] left-[0] z-[1999] modal ${showed ? 'active' : ''}`}>
      <div className="relative w-full h-full flex justify-center items-center">
        <div className="absolute top-[0] left-[0] bottom-[0] right-[0] modal-overlay" onClick={() => setShowed(false)}></div>
        {children}
      </div>
    </div>
  )
}

export default Modal
