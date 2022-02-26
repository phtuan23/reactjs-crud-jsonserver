import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';

const Product = () => {
    const history = useHistory();
    const [products, setProducts] = useState([]);

    const getProducts = async () => {
        let res = await axios.get(`http://localhost:3001/products`);
        setProducts(res.data);
    }

    const remove = async (id) => {
        let res = await axios.delete(`http://localhost:3001/products/${id}`);
        if (res.status === 200) {
            getProducts();
        }
    }

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <div>
            <Link to="/product/create" className="btn btn-success">ADD</Link>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>IMAGE</th>
                        <th>NAME</th>
                        <th>PRICE</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((p) => {
                        return <tr key={p.id}>
                            <td>{p.id}</td>
                            <td><img src={p.image} alt="" width="60" /></td>
                            <td>{p.name}</td>
                            <td>{p.price}</td>
                            <td className="text-right">
                                <Link to={{ pathname: `/product/${p.id}/update` }} className="btn btn-primary">UPDATE</Link>
                                <button className="btn btn-danger" onClick={() => remove(p.id)}>DELETE</button>
                            </td>
                        </tr>
                    })}
                </tbody>
            </table >
        </div>
    );
}

export default Product;