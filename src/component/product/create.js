import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useFormik } from "formik";
import * as Yup from "yup";

const initialValues = {
    id: "",
    name: "",
    image: "",
    price: ""
}

const validationSchema = Yup.object().shape({
    id: Yup.string().required("Required ID"),
    name: Yup.string().required("Required Name").min(6, "to short").max(50, "to long"),
    image: Yup.string().required("Required Image"),
    price: Yup.number().required("Required Price")
});

const CreateProduct = () => {
    const history = useHistory();
    const [err, setErr] = useState("");
    const formik = useFormik({
        initialValues,
        onSubmit: async (values) => {
            let res = await axios.post(`http://localhost:3001/products`, values);
            if (res.status === 201) {
                history.push("/product")
            } else {
                setErr("Thất bại");
            }
        },
        validationSchema
    });

    return (
        <div>
            <div className="text-danger">{err}</div>
            <form onSubmit={formik.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="id">ID</label>
                    <input type="text" className="form-control" value={formik.values.id} name="id" id="id" placeholder="ID" onChange={formik.handleChange} />
                    {formik.errors.id && formik.touched.id ? (
                        <div className="text-danger">{formik.errors.id}</div>
                    ) : null}
                </div>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" value={formik.values.name} name="name" id="name" placeholder="NAME" onChange={formik.handleChange} />
                    {formik.errors.name && formik.touched.name ? (
                        <div className="text-danger">{formik.errors.name}</div>
                    ) : null}
                </div>
                <div className="form-group">
                    <label htmlFor="image">Image</label>
                    <input type="text" className="form-control" value={formik.values.image} name="image" id="image" placeholder="Image" onChange={formik.handleChange} />
                    {formik.errors.image && formik.touched.image ? (
                        <div className="text-danger">{formik.errors.image}</div>
                    ) : null}
                </div>
                <div className="form-group">
                    <label htmlFor="price">Price</label>
                    <input type="text" className="form-control" value={formik.values.price} name="price" id="price" placeholder="Price" onChange={formik.handleChange} />
                    {formik.errors.price && formik.touched.price ? (
                        <div className="text-danger">{formik.errors.price}</div>
                    ) : null}
                </div>
                <button type="submit" className="btn btn-success" >Submit</button>
            </form>
        </div>
    )
}

export default CreateProduct;