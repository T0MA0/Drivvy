import React from 'react';

interface InputGroupProps {
    label: string;
    id: string;
    name: string;
    type?: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    containerClass?: string; // Hogy megkapja a stílust kívülről
}

export const InputGroup = ({ 
    label, id, name, type = "text", placeholder, value, onChange, containerClass 
}: InputGroupProps) => {
    return (
        <div className={containerClass}>
            <label htmlFor={id}>{label}</label>
            <input 
                type={type} 
                id={id} 
                name={name}
                value={value}
                placeholder={placeholder} 
                onChange={onChange}
                required
            />
        </div>
    );
};