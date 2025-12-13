import { useEffect, useState } from 'react';
import api from '../api/axios';
import { useAuth } from '../auth/AuthContext';
import SweetCard from '../components/SweetCard';

function Sweets() {
    const { logout } = useAuth();

    const [sweets, setSweets] = useState([]);
    const [newSweet, setNewSweet] = useState({
        name: '',
        category: '',
        price: '',
        quantity: '',
    });

    const fetchSweets = async () => {
        try {
            const res = await api.get('/sweets');
            setSweets(res.data);
        } catch (err) {
            console.error('Failed to fetch sweets');
        }
    };

    useEffect(() => {
        fetchSweets();
    }, []);

    const handleAddSweet = async () => {
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

            fetchSweets();
        } catch (err) {
            alert('Only admin can add sweets');
        }
    };

    return (
        <div style={{ padding: 20 }}>
            <h2>Sweet Shop</h2>

            <button onClick={logout}>Logout</button>

            <hr />

            {/* Add Sweet Section */}
            <h3>Add Sweet (Admin)</h3>

            <input
                placeholder="Name"
                value={newSweet.name}
                onChange={(e) =>
                    setNewSweet({ ...newSweet, name: e.target.value })
                }
            />

            <input
                placeholder="Category"
                value={newSweet.category}
                onChange={(e) =>
                    setNewSweet({ ...newSweet, category: e.target.value })
                }
            />

            <input
                type="number"
                placeholder="Price"
                value={newSweet.price}
                onChange={(e) =>
                    setNewSweet({ ...newSweet, price: e.target.value })
                }
            />

            <input
                type="number"
                placeholder="Quantity"
                value={newSweet.quantity}
                onChange={(e) =>
                    setNewSweet({ ...newSweet, quantity: e.target.value })
                }
            />

            <button onClick={handleAddSweet}>Add Sweet</button>

            <hr />

            {/* Sweets List */}
            <h3>Available Sweets</h3>

            {sweets.length === 0 && <p>No sweets available</p>}

            {sweets.map((sweet) => (
                <SweetCard
                    key={sweet._id}
                    sweet={sweet}
                    onAction={fetchSweets}
                />
            ))}
        </div>
    );
}

export default Sweets;
