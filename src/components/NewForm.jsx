import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateForm, submitForm, resetForm } from "../redux/formSlice";

const NewForm = () => {
    const dispatch = useDispatch();
    const formData = useSelector((state) => state.form);

    const handleSubmit = () => {
        dispatch(submitForm());
        dispatch(resetForm());
    };

    const handleChange = (e) => {
        dispatch(updateForm({ name: e.target.name, value: e.target.value }));
    };

    return (
        <form className="flex flex-col" onSubmit={handleSubmit}>
            <div>
                <label>
                    Name:{" "}
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter Name..."
                        value={formData.name}
                        onChange={handleChange}
                    />
                </label>
            </div>
            <div>
                <label>
                    Email:{" "}
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter an Email..."
                        value={formData.email}
                        onChange={handleChange}
                    />
                </label>
            </div>
            <button className="place-self-start" type="submit">
                Submit
            </button>
        </form>
    );
};

export default NewForm;
