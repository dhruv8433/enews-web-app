import React from 'react'
import { TypeButton } from '../types/button.types'

const MyButtons: React.FC<TypeButton> = ({ title, onClick, className, disabled }) => {
  return (
    <button 
      onClick={onClick} 
      className={`bg-blue-700 text-white ${className}`} 
      disabled={disabled}
    >
      {title}
    </button>
  )
}

export default MyButtons
