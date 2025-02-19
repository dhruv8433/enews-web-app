import React from 'react';
import { TypeInput } from '../types/input.types'

const MyInput: React.FC<TypeInput> = ({ type, placeholder, name, onChange, className, value, onKeyDown }) => {

    return (
        <input
            type={type}
            placeholder={placeholder}
            name={name}
            value={value}
            onChange={onChange}
            onKeyDown={onKeyDown}
            className={`border p-2 rounded ${className}`} />
    )
}

export default MyInput