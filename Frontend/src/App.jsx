import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Sweets from './pages/Sweets';
import Cart from './pages/Cart';
import Navbar from './components/Navbar';

function App() {
    return (
        <BrowserRouter>
            <div className="">
                <Navbar />
                <div className="pt-16">
                    <Routes>
                        <Route path="/" element={<Sweets />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/cart" element={<Cart />} />
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
