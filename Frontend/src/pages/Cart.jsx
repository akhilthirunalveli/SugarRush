import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Minus, Plus, Trash2, ArrowLeft, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

const Cart = () => {
    const { cartItems, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart();
    const navigate = useNavigate();

    if (cartItems.length === 0) {
        return (
            <div className="min-h-[80vh] flex flex-col items-center justify-center p-4">
                <div className="w-24 h-24 bg-slate-50 rounded-3xl flex items-center justify-center mb-6 border border-slate-100 border-dashed animate-bounce-slow">
                    <ShoppingBag className="w-10 h-10 text-slate-300" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Your cart is empty</h2>
                <p className="text-slate-500 mb-8 text-center max-w-sm">
                    Looks like you haven't added any sweets yet.
                    Explore our collection and satisfy your cravings!
                </p>
                <Link to="/" className="btn-primary w-fit mx-auto p-2 flex items-center gap-2">
                    <ArrowLeft size={18} />
                    Start Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl font-bold text-slate-900 mb-8">Shopping Cart</h1>

            <div className="flex flex-col lg:flex-row gap-12">
                {/* Cart Items List */}
                <div className="flex-1 flex flex-col gap-6">
                    {cartItems.map((item) => (
                        <div key={item._id} className="bg-white p-4 rounded-2xl border border-slate-100 flex gap-6 items-center hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-300 group">
                            {/* Product Image Placeholder */}
                            <div className="w-24 h-24 bg-gradient-to-br from-orange-50 to-pink-50 rounded-xl flex items-center justify-center shrink-0">
                                <span className="text-4xl drop-shadow-sm filter grayscale-[0.2] group-hover:grayscale-0 transition-all">🍬</span>
                            </div>

                            <div className="flex-1 py-1">
                                <div className="flex justify-between items-start mb-1">
                                    <h3 className="font-bold text-lg text-slate-900">{item.name}</h3>
                                    <span className="font-bold text-slate-900">₹{item.price * item.quantity}</span>
                                </div>
                                <p className="text-sm text-slate-500 mb-4">{item.category}</p>

                                <div className="flex justify-between items-center">
                                    {/* Quantity Controls */}
                                    <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50 h-9">
                                        <button
                                            onClick={() => updateQuantity(item._id, item.quantity - 1)}
                                            className="w-8 h-full flex items-center justify-center hover:bg-slate-200 text-slate-500 transition-colors cursor-pointer"
                                            disabled={item.quantity <= 1}
                                        >
                                            <Minus size={14} />
                                        </button>
                                        <span className="w-8 text-center text-sm font-medium text-slate-700">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                            className={`w-8 h-full flex items-center justify-center transition-colors cursor-pointer ${item.quantity >= item.stock ? 'bg-slate-100 text-slate-300 cursor-not-allowed' : 'hover:bg-slate-200 text-slate-500'}`}
                                            disabled={item.quantity >= item.stock}
                                        >
                                            <Plus size={14} />
                                        </button>
                                    </div>

                                    {/* Remove Button */}
                                    <button
                                        onClick={() => removeFromCart(item._id)}
                                        className="text-slate-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors cursor-pointer"
                                        title="Remove"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Order Summary */}
                <div className="lg:w-96 shrink-0">
                    <div className="bg-white rounded-2xl border border-slate-100 p-6 sticky top-24 shadow-sm">
                        <h2 className="text-lg font-bold text-slate-900 mb-6">Order Summary</h2>

                        <div className="space-y-4 mb-6">
                            <div className="flex justify-between text-slate-500">
                                <span>Subtotal</span>
                                <span>₹{cartTotal}</span>
                            </div>
                            <div className="flex justify-between text-slate-500">
                                <span>Taxes (Included)</span>
                                <span>₹0</span>
                            </div>
                            <div className="h-px bg-slate-100 my-4"></div>
                            <div className="flex justify-between text-lg font-bold text-slate-900">
                                <span>Total</span>
                                <span>₹{cartTotal}</span>
                            </div>
                        </div>

                        <button
                            className="btn-primary w-full py-3 mb-3 shadow-lg shadow-black/5"
                            onClick={() => alert(`Proceeding to checkout with total: ₹${cartTotal}`)}
                        >
                            Checkout
                        </button>

                        <button
                            onClick={clearCart}
                            className="w-full py-3 text-sm text-slate-400 hover:text-slate-600 font-medium transition-colors"
                        >
                            Clear Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
