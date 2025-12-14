import { useState } from 'react';
import api from '../api/axios';
import { useAuth } from '../auth/AuthContext';
import { useCart } from '../context/CartContext';
import { Pencil, Trash2, RotateCcw, Plus, Minus, ShoppingCart } from 'lucide-react';

function SweetCard({ sweet, onAction, triggerLogin }) {
    const { user } = useAuth();
    const { addToCart } = useCart();
    const [quantity, setQuantity] = useState(1);
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({
        name: sweet.name,
        category: sweet.category,
        price: sweet.price,
        quantity: sweet.quantity,
    });

    const handleAddToCart = () => {
        if (sweet.quantity === 0) return;

        addToCart(sweet, quantity);
        setQuantity(1);
        // Optional: Add visual feedback toast here
    };

    const handleRestock = async () => {
        try {
            await api.post(`/sweets/${sweet._id}/restock`, {
                quantity: Number(quantity),
            });
            onAction();
            setQuantity(1);
        } catch (error) {
            console.error('Restock failed', error);
        }
    };

    const handleDelete = async () => {
        if (window.confirm(`Are you sure you want to delete ${sweet.name}?`)) {
            try {
                await api.delete(`/sweets/${sweet._id}`);
                onAction();
            } catch (error) {
                console.error('Delete failed', error);
                alert('Failed to delete sweet');
            }
        }
    };

    const handleUpdate = async () => {
        try {
            await api.put(`/sweets/${sweet._id}`, {
                name: editData.name,
                category: editData.category,
                price: Number(editData.price),
                quantity: Number(editData.quantity),
            });
            setIsEditing(false);
            onAction();
        } catch (error) {
            console.error('Update failed', error);
            alert('Failed to update sweet');
        }
    };

    if (isEditing) {
        return (
            <div className="card-base p-5 flex flex-col gap-3 relative group hover:border-primary/50 transition-colors">
                <h4 className="text-sm font-semibold text-slate-900 mb-2">Edit Product</h4>
                <input
                    value={editData.name}
                    onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                    placeholder="Name"
                    className="input-field"
                />
                <input
                    value={editData.category}
                    onChange={(e) => setEditData({ ...editData, category: e.target.value })}
                    placeholder="Category"
                    className="input-field"
                />
                <div className="flex gap-3">
                    <input
                        type="number"
                        value={editData.price}
                        onChange={(e) => setEditData({ ...editData, price: e.target.value })}
                        placeholder="Price"
                        className="input-field"
                    />
                    <input
                        type="number"
                        value={editData.quantity}
                        onChange={(e) => setEditData({ ...editData, quantity: e.target.value })}
                        placeholder="Qty"
                        className="input-field"
                    />
                </div>
                <div className="flex gap-2 mt-2">
                    <button onClick={handleUpdate} className="btn-primary">Save</button>
                    <button onClick={() => setIsEditing(false)} className="px-4 py-2 border border-slate-200 rounded-lg text-sm hover:bg-slate-50 transition-colors">Cancel</button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1 transition-all duration-300 flex flex-col h-full group">
            {/* Image Area */}
            <div className="h-48 bg-gradient-to-br from-orange-50 to-pink-50 flex items-center justify-center relative overflow-hidden">
                <span className="text-6xl drop-shadow-sm filter grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500">🍬</span>

                {/* Badge */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-slate-700 shadow-sm border border-white/50">
                    {sweet.category}
                </div>
            </div>

            <div className="p-5 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-3">
                    <h4 className="font-bold text-lg text-slate-900 line-clamp-1 transition-colors" title={sweet.name}>
                        {sweet.name}
                    </h4>
                    <span className="block font-bold text-slate-900 bg-slate-50 px-2 py-1 rounded-lg text-sm">₹{sweet.price}</span>
                </div>

                <div className="mt-auto">
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-4 px-1">
                        <span className="flex items-center gap-1.5">
                            <div className={`w-2 h-2 rounded-full ${sweet.quantity > 0 ? 'bg-green-500' : 'bg-red-500'}`}></div>
                            {sweet.quantity > 0 ? `${sweet.quantity} in stock` : 'Out of Stock'}
                        </span>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden shrink-0 bg-slate-50 h-10">
                            <button
                                className="w-9 h-full flex items-center justify-center hover:bg-slate-200 text-slate-500 transition-colors cursor-pointer"
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            >
                                <Minus size={14} strokeWidth={2.5} />
                            </button>
                            <span className="w-8 text-center text-sm font-medium text-slate-700">{quantity}</span>
                            <button
                                className="w-9 h-full flex items-center justify-center hover:bg-slate-200 text-slate-500 transition-colors cursor-pointer"
                                onClick={() => setQuantity(quantity + 1)}
                            >
                                <Plus size={14} strokeWidth={2.5} />
                            </button>
                        </div>

                        <button
                            onClick={handleAddToCart}
                            disabled={sweet.quantity === 0}
                            className={`flex-1 h-10 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${sweet.quantity === 0
                                ? "bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200 cursor-pointer"
                                : "bg-black text-white hover:bg-primary hover:border-primary hover:shadow-primary/20 active:scale-95 cursor-pointer"
                                }`}
                        >
                            <ShoppingCart size={16} />
                            {sweet.quantity === 0 ? 'Sold Out' : 'Add'}
                        </button>
                    </div>

                    {user?.role === 'admin' && (
                        <div className="flex justify-end gap-1 mt-4 pt-3 border-t border-dashed border-slate-200">
                            <button onClick={() => setIsEditing(true)} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer" title="Edit">
                                <Pencil size={16} />
                            </button>
                            <button onClick={handleRestock} className="p-2 text-slate-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors cursor-pointer" title="Restock">
                                <RotateCcw size={16} />
                            </button>
                            <button onClick={handleDelete} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer" title="Delete">
                                <Trash2 size={16} />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default SweetCard;
