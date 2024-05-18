import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export default function Login({ userLogin, setUserLogin }) {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Lógica del login

        const url = `http://localhost:3000/user/${user}`;
        const data = {
            password: password
        };

        try {
            const response = await axios.post(url, data);
            console.log('Response:', response.data);
            setUserLogin(true)
            console.log(userLogin)
            toast.success("Usuario correcto")
            navigate('/product');
        } catch (error) {
            toast.error("Usuario correcto")
        }





    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <Toaster />
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-gray-900 text-center">Iniciar Sesión</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="user">
                            Usuario
                        </label>
                        <input
                            type="user"
                            id="user"
                            value={user}
                            onChange={(e) => setUser(e.target.value)}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Entrar
                        </button>
                        <a href="#" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
                            ¿Olvidaste tu contraseña?
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
}
