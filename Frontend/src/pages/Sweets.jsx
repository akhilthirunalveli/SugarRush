import { useAuth } from '../auth/AuthContext';

function Sweets() {
    const { logout } = useAuth();

    return (
        <div>
            <h2>Sweets List</h2>
            <button onClick={logout}>Logout</button>
        </div>
    );
}

export default Sweets;
