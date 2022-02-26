import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import categoryServices from '../../services/category.services';
// import categoryServices from '../../services/category.services';

const Category = () => {
    const [categories, setCategory] = useState([]);
    const [totalPage, setTotalPage] = useState(0);
    const [page, setPage] = useState(0);
    const [searchKey, setSearchKey] = useState("");
    const from = page * 5;

    const displayCategories = categories.slice(from, from + 5);

    const remove = async (id) => {
        let res = await axios.delete(`http://localhost:3001/categories/${id}`);
        if (res.status === 200) {
            getCategory();
        }
    }

    const getCategory = async () => {
        let data = await categoryServices.getCategories();
        setCategory(data);
        setTotalPage(Math.ceil(data.length / 5));
    }

    const handlePageClick = ({ selected }) => {
        setPage(selected)
    }

    const search = async (val) => {
        setSearchKey(val);
        let res = await axios.get(`http://localhost:3001/categories?_sort=id&_order=desc&name_like=${val}`);
        let data = res.data;
        setTotalPage(Math.ceil(data.length / 5));
        setCategory(data);
    }

    useEffect(() => {
        getCategory();
    }, []);

    return (
        <div>
            <NavLink to="/category/add" className="btn btn-success">ADD</NavLink>
            <input type="text" className="form-control" value={searchKey} onChange={e => search(e.target.value)} />
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>STATUS</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {displayCategories.map(c => {
                        return (
                            <tr key={c.id}>
                                <td>{c.id}</td>
                                <td>{c.name}</td>
                                <td>{c.status ? "Public" : "Private"}</td>
                                <td className="text-right">
                                    <NavLink to={{ pathname: `/category/${c.id}/edit` }} className="btn btn-primary">UPDATE</NavLink>
                                    <button onClick={() => remove(c.id)} className="btn btn-danger">DELETE</button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <ReactPaginate
                breakLabel="..."
                nextLabel=">"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                marginPagesDisplayed={2}
                pageCount={totalPage}
                previousLabel="<"
                renderOnZeroPageCount={null}
                containerClassName="pagination justify-content-end"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                activeClassName="active"
            />
        </div >
    );
}

export default Category;