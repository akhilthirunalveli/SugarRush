import { useState } from 'react';

function SearchBar({ onSearch }) {
    const [filters, setFilters] = useState({
        name: '',
        category: '',
        minPrice: '',
        maxPrice: '',
    });

    const handleSearch = () => {
        onSearch(filters);
    };

    return (
        <div style={{ marginBottom: 20 }}>
            <h3>Search Sweets</h3>

            <input
                placeholder="Name"
                value={filters.name}
                onChange={(e) =>
                    setFilters({ ...filters, name: e.target.value })
                }
            />

            <input
                placeholder="Category"
                value={filters.category}
                onChange={(e) =>
                    setFilters({ ...filters, category: e.target.value })
                }
            />

            <input
                type="number"
                placeholder="Min Price"
                value={filters.minPrice}
                onChange={(e) =>
                    setFilters({ ...filters, minPrice: e.target.value })
                }
            />

            <input
                type="number"
                placeholder="Max Price"
                value={filters.maxPrice}
                onChange={(e) =>
                    setFilters({ ...filters, maxPrice: e.target.value })
                }
            />

            <button onClick={handleSearch}>Search</button>
        </div>
    );
}

export default SearchBar;
