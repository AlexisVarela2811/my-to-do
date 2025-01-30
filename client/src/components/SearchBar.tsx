import React, { useState } from 'react';

interface SearchBarProps {
    filterTasks: (searchTerm: string) => void; // Define the type for filterTasks
}

export const SearchBar: React.FC<SearchBarProps> = ({ filterTasks }) => {
    const [searchTerm, setSearchTerm] = useState<string>(''); // Explicitly define the type for searchTerm

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => { // Define the type for the event
        e.preventDefault();
        filterTasks(searchTerm);
        setSearchTerm('');
    };

    return (
        <form onSubmit={handleSearch} className="mb-6">
            <div className="flex items-center space-x-2">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Buscar tareas"
                    className="flex-1 p-2 border rounded"
                    required
                />
                <button
                    type="submit"
                    className="px-4 py-2 bg-purple-500 text-white rounded"
                >
                    Buscar
                </button>
            </div>
        </form>
    );
};