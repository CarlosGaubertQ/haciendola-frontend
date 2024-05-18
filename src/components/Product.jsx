import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Toaster, toast } from "react-hot-toast";
import Barcode from 'react-jsbarcode';
import { useNavigate } from 'react-router-dom';

function Product({ userLogin, setUserLogin }) {
    const [products, setProducts] = useState([]);
    const [form, setForm] = useState({
        handle: '',
        title: '',
        description: '',
        sku: '',
        grams: '',
        stock: '',
        price: '',
        compare_price: '',
        barcode: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:3000/product');

            setProducts(response.data);


        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        form.sku = parseInt(form.sku)
        form.grams = parseInt(form.grams)
        form.stock = parseInt(form.stock)
        form.price = parseFloat(form.price)
        form.compare_price = parseFloat(form.compare_price)
        form.barcode = parseInt(form.barcode)

        let data = {
            "Handle": form.handle,
            "Title": form.title,
            "Description": form.description,
            "SKU": form.sku,
            "Grams": form.grams,
            "Stock": form.stock,
            "Price": form.price,
            "Compare_Price": form.compare_price,
            "Barcode": form.barcode
        }

        try {
            await axios.post('http://localhost:3000/product', data);
            fetchProducts();
            setForm({
                handle: '',
                title: '',
                description: '',
                sku: '',
                grams: '',
                stock: '',
                price: '',
                compare_price: '',
                barcode: ''
            });
            toast.success("Producto creado correctamente")
        } catch (error) {
            console.error('Error creating product:', error);
        }
    };

    const handleUpdate = async (id) => {
        try {

            form.sku = parseInt(form.sku)
            form.grams = parseInt(form.grams)
            form.stock = parseInt(form.stock)
            form.price = parseFloat(form.price)
            form.compare_price = parseFloat(form.compare_price)
            form.barcode = parseInt(form.barcode)

            let data = {
                "Handle": form.handle,
                "Title": form.title,
                "Description": form.description,
                "SKU": form.sku,
                "Grams": form.grams,
                "Stock": form.stock,
                "Price": form.price,
                "Compare_Price": form.compare_price,
                "Barcode": form.barcode
            }
            await axios.put(`http://localhost:3000/product/${id}`, data);
            fetchProducts();
            toast.success("Producto actualizado correctamente")
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    const handleDelete = async (handle) => {
        try {
            console.log(handle)
            await axios.delete(`http://localhost:3000/product/${handle}`);
            fetchProducts();
            toast.success("Producto eliminado correctamente")
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const logout = () => {
        setUserLogin(true)
        navigate('/');
    }

    return (
        <div className="container mx-auto p-4">
            <button onClick={() => logout()} className="fixed top-0 right-0 m-4 bg-red-500 text-white py-2 px-4 rounded">
                Cerrar Sesión
            </button>
            <Toaster />
            <h1 className="text-3xl font-bold mb-6">Productos</h1>
            <form className="mb-6 p-4 bg-white shadow rounded" onSubmit={handleSubmit}>
                <h2 className="text-2xl font-semibold mb-4">Agregar nuevo Producto</h2>
                {Object.keys(form).map((key) => (
                    <div className="mb-4" key={key}>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={key}>{key}</label>
                        <input
                            type="text"
                            id={key}
                            name={key}
                            value={form[key]}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                ))}
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Agregar Producto</button>
            </form>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="py-2 px-4 border-b">Handle</th>
                            <th className="py-2 px-4 border-b">Title</th>
                            <th className="py-2 px-4 border-b">Description</th>
                            <th className="py-2 px-4 border-b">SKU</th>
                            <th className="py-2 px-4 border-b">Grams</th>
                            <th className="py-2 px-4 border-b">Stock</th>
                            <th className="py-2 px-4 border-b">Price</th>
                            <th className="py-2 px-4 border-b">Compare Price</th>
                            <th className="py-2 px-4 border-b">Barcode</th>
                            <th className="py-2 px-4 border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length > 0 ? (
                            products.map((product) => (
                                <tr key={product.Handle} className="hover:bg-gray-100">
                                    <td className="py-2 px-4 border-b">{product.Handle}</td>
                                    <td className="py-2 px-4 border-b">{product.Title}</td>
                                    <td className="py-2 px-4 border-b" dangerouslySetInnerHTML={{ __html: product.Description }}></td>
                                    <td className="py-2 px-4 border-b">{product.SKU}</td>
                                    <td className="py-2 px-4 border-b">{product.Grams}</td>
                                    <td className="py-2 px-4 border-b">{product.Stock}</td>
                                    <td className="py-2 px-4 border-b">{product.Price}</td>
                                    <td className="py-2 px-4 border-b">{product.Compare_Price}</td>
                                    <td className="py-2 px-4 border-b"><Barcode className='w-40' value={product.Barcode} options={{ format: 'code128' }} renderer="svg" /></td>
                                    <td className="py-2 px-4 border-b">
                                        <div className="flex flex-col space-y-2">
                                            <button
                                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full"
                                                onClick={() => handleUpdate(product.Handle)}
                                            >
                                                Actualizar
                                            </button>
                                            <button
                                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full"
                                                onClick={() => handleDelete(product.Handle)}
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="10" className="py-4 px-4 text-center text-gray-500">No products available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Product