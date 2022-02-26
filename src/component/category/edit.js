import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import { useFormik } from "formik";
const CategoryEdit = () => {
    const params = useParams();
    const history = useHistory();
    const [category, setCategory] = useState({
        name: "",
        id: "",
        status: true
    });
    const { id, name, status } = category;
    const initialValues = {
        name,
        id,
        status
    }


    const formik = useFormik({
        initialValues,
        enableReinitialize: true,
        onSubmit: async (values) => {
            console.log(values)
            let id = params.id;
            let res = await axios.put(`http://localhost:3001/categories/${id}`, values);
            if (res.status === 200)
                history.push("/category");
        }
    });

    useEffect(() => {
        const getCategory = async () => {
            let id = params.id;
            let res = await axios.get(`http://localhost:3001/categories/${id}`);
            setCategory(res.data);
        }
        getCategory();
    }, [params.id]);

    return (
        <div>
            <h1>Edit CATEGORY</h1>
            <form onSubmit={formik.handleSubmit}>
                <div className="form-group">
                    <input type="hidden" value={formik.values.id} name="id" id="id" readOnly />
                </div>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" value={formik.values.name} name="name" id="name" placeholder="NAME" onChange={formik.handleChange} />
                </div>
                <button type="submit" className="btn btn-success">Submit</button>
            </form>
        </div>
    );
}

export default CategoryEdit;