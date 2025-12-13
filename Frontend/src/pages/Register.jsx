import { useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';

function Register() {
    const { register } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user');

    const handleSubmit = async (e) => {
        e.preventDefault();
        await register(email, password, role);
        navigate('/'); // ✅ redirect after register
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Register</h2>

            <input
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
            >
                <option value="user">User</option>
                <option value="admin">Admin</option>
            </select>

            <button type="submit">Register</button>
        </form>
    );
}

export default Register;
