import React from 'react';

const Input = ({ value, onChange, label, placeholder, type = "text" }) => {
    return (
        <div className="mb-4">
            {label && (
                <label className="block text-sm font-medium text-slate-700 mb-1">
                    {label}
                </label>
            )}
            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-sm"
            />
        </div>
    );
};

export default Input;
