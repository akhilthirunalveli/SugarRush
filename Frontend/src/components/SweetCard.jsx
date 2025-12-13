import { useState } from 'react';
import api from '../api/axios';
import { useAuth } from '../auth/AuthContext';

function SweetCard({ sweet, onAction }) {
    const { user } = useAuth();
    const [quantity, setQuantity] = useState(1);
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({
        name: sweet.name,
        category: sweet.category,
        price: sweet.price,
        quantity: sweet.quantity,
    });

    const handlePurchase = async () => {
        try {
            await api.post(`/sweets/${sweet._id}/purchase`, {
                quantity: Number(quantity),
            });
            onAction();
        } catch (error) {
            console.error('Purchase failed', error);
            alert('Purchase failed');
        }
    };

    const handleRestock = async () => {
        try {
            await api.post(`/sweets/${sweet._id}/restock`, {
                quantity: Number(quantity),
            });
            onAction();
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
            <div>
                <input
                    value={editData.name}
                    onChange={(e) =>
                        setEditData({ ...editData, name: e.target.value })
                    }
                    placeholder="Name"
                />
                <input
                    value={editData.category}
                    onChange={(e) =>
                        setEditData({ ...editData, category: e.target.value })
                    }
                    placeholder="Category"
                />
                <input
                    type="number"
                    value={editData.price}
                    onChange={(e) =>
                        setEditData({ ...editData, price: e.target.value })
                    }
                    placeholder="Price"
                />
                <input
                    type="number"
                    value={editData.quantity}
                    onChange={(e) =>
                        setEditData({ ...editData, quantity: e.target.value })
                    }
                    placeholder="Quantity"
                />
                <button onClick={handleUpdate}>Save</button>
                <button onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
        );
    }

    return (
        <div>
            <h4>{sweet.name}</h4>
            <p>Category: {sweet.category}</p>
            <p>Price: ₹{sweet.price}</p>
            <p>Stock: {sweet.quantity}</p>

            <input
                type="number"
                value={quantity}
                min="1"
                onChange={(e) => setQuantity(e.target.value)}
            />

            <button
                onClick={handlePurchase}
                disabled={sweet.quantity === 0}
            >
                {sweet.quantity === 0 ? 'Out of Stock' : 'Purchase'}
            </button>

            {user?.role === 'admin' && (
                <div>
                    <p>Admin Actions:</p>
                    <button onClick={() => setIsEditing(true)}>Edit</button>
                    <button onClick={handleRestock}>Restock</button>
                    <button onClick={handleDelete}>Delete</button>
                </div>
            )}
        </div>
    );
}

export default SweetCard;
