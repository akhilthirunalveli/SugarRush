import { useEffect, useState } from 'react';
import api from '../api/axios';
import { useAuth } from '../auth/AuthContext';
import SweetCard from '../components/SweetCard';
import SearchBar from '../components/SearchBar';
import Modal from '../components/Modal';
import Input from '../components/Input';
import { useNavigate } from 'react-router-dom';
import { Plus, ShoppingBag } from 'lucide-react';


function Sweets() {
    const { user } = useAuth();
    const navigate = useNavigate();

    // eslint-disable-next-line
    const [sweets, setSweets] = useState([]);
    const [openAddModal, setOpenAddModal] = useState(false);
    const [openLoginModal, setOpenLoginModal] = useState(false);
    const [newSweet, setNewSweet] = useState({
        name: '',
        category: '',
        price: '',
        quantity: '',
    });

    const triggerLogin = () => {
        setOpenLoginModal(true);
    };

    const fetchSweets = async () => {
        try {
            const res = await api.get('/sweets');
            setSweets(res.data);
        } catch (err) {
            console.error('Failed to fetch sweets');
        }
    };
    const handleSearch = async (filters) => {
        try {
            const res = await api.get('/sweets/search', {
                params: filters,
            });
            setSweets(res.data);
        } catch (err) {
            console.error('Search failed');
        }
    };


    useEffect(() => {
        fetchSweets();
    }, []);

    const handleAddSweet = async (e) => {
        e.preventDefault();
        try {
            await api.post('/sweets', {
                name: newSweet.name,
                category: newSweet.category,
                price: Number(newSweet.price),
                quantity: Number(newSweet.quantity),
            });

            setNewSweet({
                name: '',
                category: '',
                price: '',
                quantity: '',
            });
            setOpenAddModal(false);
            fetchSweets();
        } catch (err) {
            alert('Only admin can add sweets');
        }
    };

    return (
        <div className="pb-20">
            {/* Hero Section */}
            <div className="bg-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8 mb-8">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                    <div>
                        <h1 className="text-4xl font-bold tracking-tight mb-2">
                            Welcome to <span className="text-primary">SugarRush</span>
                        </h1>
                        <p className="text-slate-400 text-lg max-w-xl">
                            Indulge in our premium collection of handcrafted sweets.
                            From traditional favorites to modern delights.
                        </p>
                    </div>
                    {user?.role === 'admin' && (
                        <button
                            onClick={() => setOpenAddModal(true)}
                            className="bg-primary text-slate-900 px-6 py-3 rounded-full font-bold hover:bg-white transition-all flex items-center gap-2 cursor-pointer"
                        >
                            <Plus size={20} /> Add New Product
                        </button>
                    )}
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <SearchBar onSearch={handleSearch} />

                {sweets.length === 0 ? (
                    <div className="text-center py-24 text-slate-400 bg-slate-50 rounded-2xl border border-slate-100 border-dashed">
                        <span className="text-4xl block mb-2">🍪</span>
                        <p className="text-lg font-medium">No sweets found.</p>
                        <p className="text-sm">Try adjusting your search filters.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {sweets.map((sweet) => (
                            <SweetCard
                                key={sweet._id}
                                sweet={sweet}
                                onAction={fetchSweets}
                                triggerLogin={triggerLogin}
                            />
                        ))}
                    </div>
                )}
            </div>

            <Modal isOpen={openAddModal} onClose={() => setOpenAddModal(false)} title="Add New Sweet">
                <form onSubmit={handleAddSweet} className="p-4 flex flex-col gap-4">
                    <Input
                        label="Name"
                        value={newSweet.name}
                        onChange={(e) =>
                            setNewSweet({ ...newSweet, name: e.target.value })
                        }
                        placeholder="e.g. Gulab Jamun"
                    />
                    <Input
                        label="Category"
                        value={newSweet.category}
                        onChange={(e) =>
                            setNewSweet({ ...newSweet, category: e.target.value })
                        }
                        placeholder="e.g. Syrup"
                    />
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <Input
                                type="number"
                                label="Price"
                                value={newSweet.price}
                                onChange={(e) =>
                                    setNewSweet({ ...newSweet, price: e.target.value })
                                }
                                placeholder="0"
                            />
                        </div>
                        <div className="flex-1">
                            <Input
                                type="number"
                                label="Quantity"
                                value={newSweet.quantity}
                                onChange={(e) =>
                                    setNewSweet({ ...newSweet, quantity: e.target.value })
                                }
                                placeholder="0"
                            />
                        </div>
                    </div>
                    <button type="submit" className="btn-primary mt-2">Add Sweet</button>
                </form>
            </Modal>

            <Modal isOpen={openLoginModal} onClose={() => setOpenLoginModal(false)} hideHeader>
                <div className="flex flex-col items-center pt-4 pb-2 px-4">
                    <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center mt-6 mb-6">
                        <ShoppingBag className="text-white w-8 h-8" />
                    </div>

                    <h2 className="text-2xl font-bold text-slate-900 mb-2">Member Access</h2>
                    <p className="text-slate-500 text-sm text-center mb-8 px-4">
                        Please log in to add items to your cart and complete your purchase.
                    </p>

                    <div className="w-full flex flex-col gap-3">
                        <button
                            onClick={() => navigate('/login')}
                            className="btn-primary w-full h-11 shadow-lg shadow-black/5 flex items-center justify-center gap-2"
                        >
                            Log In to Continue
                        </button>
                        <button
                            onClick={() => setOpenLoginModal(false)}
                            className="w-full h-11 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
                        >
                            Cancel
                        </button>
                    </div>

                    <p className="mt-6 text-xs text-slate-400">
                        Don't have an account? <span onClick={() => navigate('/register')} className="text-slate-900 font-bold cursor-pointer hover:underline">Sign up</span>
                    </p>
                </div>
            </Modal>
        </div>
    );
}

export default Sweets;
