import { useState } from 'react';
import api from '../api/axios';

function SweetCard({ sweet, onAction }) {
    const [quantity, setQuantity] = useState(1);

    const handlePurchase = async () => {
        await api.post(`/sweets/${sweet._id}/purchase`, {
            quantity: Number(quantity),
        });
        onAction();
    };

    const handleRestock = async () => {
        await api.post(`/sweets/${sweet._id}/restock`, {
            quantity: Number(quantity),
        });
        onAction();
    };

    return (
        <div style={{ border: '1px solid #ccc', margin: 10, padding: 10 }}>
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

            <button onClick={handlePurchase}>Purchase</button>
            <button onClick={handleRestock}>Restock</button>
        </div>
    );
}

export default SweetCard;
