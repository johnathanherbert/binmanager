"use client";

import React, { useState, useEffect, ChangeEvent } from "react";

interface AutocompleteProps {
    dataUrl: string;
    placeholder: string;
    className: string;
    id: string;
    type: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const Autocomplete: React.FC<AutocompleteProps> = ({ dataUrl, placeholder, className, id, type, value, onChange }) => {
    const [suggestions, setSuggestions] = useState<string[]>([]);

    useEffect(() => {
        // Carregar os dados de autocomplete do arquivo dataUrl
        fetch(dataUrl)
            .then(response => response.text())
            .then(data => {
                const items = data.split("\n").map(item => item.trim());
                setSuggestions(items);
            });
    }, [dataUrl]);

    return (
        <div className="relative">
            <input
                className={className}
                id={id}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                list={`${id}-list`}
            />
            <datalist id={`${id}-list`}>
                {suggestions.map((suggestion, index) => (
                    <option key={index} value={suggestion} />
                ))}
            </datalist>
        </div>
    );
};

export default Autocomplete;
