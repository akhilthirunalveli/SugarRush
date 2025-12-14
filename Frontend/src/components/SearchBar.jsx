import { useState } from 'react';
import { Search, Filter, Tag, IndianRupee } from 'lucide-react';

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
        <div className="bg-white/80 backdrop-blur-xl p-2 rounded-2xl border border-slate-200 mb-8 flex flex-col md:flex-row gap-2 shadow-sm max-w-5xl mx-auto">
            {/* Search Input */}
            <div className="flex-1 relative group">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors">
                    <Search size={20} />
                </div>
                <input
                    placeholder="Search for sweets..."
                    value={filters.name}
                    onChange={(e) => setFilters({ ...filters, name: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-transparent hover:bg-slate-50 focus:bg-white rounded-xl outline-none text-sm font-medium transition-colors placeholder:text-slate-400"
                />
            </div>

            <div className="h-px md:h-auto md:w-px bg-slate-100 mx-1"></div>

            {/* Category Input */}
            <div className="flex-1 relative group md:max-w-[200px]">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors">
                    <Tag size={18} />
                </div>
                <input
                    placeholder="Category"
                    value={filters.category}
                    onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-transparent hover:bg-slate-50 focus:bg-white rounded-xl outline-none text-sm font-medium transition-colors placeholder:text-slate-400"
                />
            </div>

            <div className="h-px md:h-auto md:w-px bg-slate-100 mx-1"></div>

            {/* Price Range */}
            <div className="flex items-center gap-2 md:max-w-[200px]">
                <div className="relative flex-1 group">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-xs font-bold">₹</span>
                    <input
                        type="number"
                        placeholder="Min"
                        value={filters.minPrice}
                        onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                        className="w-full pl-7 pr-2 py-3 bg-transparent hover:bg-slate-50 focus:bg-white rounded-xl outline-none text-sm font-medium transition-colors placeholder:text-slate-400"
                    />
                </div>
                <span className="text-slate-300">-</span>
                <div className="relative flex-1 group">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-xs font-bold">₹</span>
                    <input
                        type="number"
                        placeholder="Max"
                        value={filters.maxPrice}
                        onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                        className="w-full pl-7 pr-2 py-3 bg-transparent hover:bg-slate-50 focus:bg-white rounded-xl outline-none text-sm font-medium transition-colors placeholder:text-slate-400"
                    />
                </div>
            </div>

            <button
                onClick={handleSearch}
                className="bg-black cursor-pointer text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-primary hover:text-black hover:shadow-lg hover: transition-all flex items-center justify-center gap-2 md:w-auto w-full"
            >
                Search
            </button>
        </div>
    );
}

export default SearchBar;
