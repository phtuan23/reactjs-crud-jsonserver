import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";

const initialValues = {
    name: "",
    id: "",
    status: true
}

const AddValidate = Yup.object().shape({
    id: Yup.string().required("Required ID"),
    name: Yup.string().required("Required NAME").min(3, "Too short")
});

const CategoryAdd = () => {
    const history = useHistory();
    const [err, setErr] = useState("");
    const onSubmit = async (values) => {
        let res = await axios.post(`http://localhost:3001/categories`, values);
        if (res.status === 201)
            history.push("/category")
        else
            setErr("Thất bại. Vui lòng thử lại.");
    }

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema: AddValidate
    });

    return (
        <div>
            <h1>ADD CATEGORY</h1>
            <form onSubmit={formik.handleSubmit}>
                {err ? <div>{err}</div> : null}
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
                <button type="submit" className="btn btn-success">Submit</button>
            </form>
        </div>
    );
}

export default CategoryAdd;