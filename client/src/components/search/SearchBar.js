import { useState } from 'react';

const SearchBar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch({ searchTerm, category });
    };

    return (
        <form onSubmit={handleSubmit} className="mb-6">
            <div className="flex gap-4">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search posts..."
                    className="flex-1 p-2 border rounded"
                />
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="p-2 border rounded"
                >
                    <option value="">All Categories</option>
                    <option value="general">General</option>
                    <option value="question">Question</option>
                    <option value="discussion">Discussion</option>
                </select>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                    Search
                </button>
            </div>
        </form>
    );
};

export default SearchBar;