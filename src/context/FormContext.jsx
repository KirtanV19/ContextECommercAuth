import { createContext, useState } from "react";

export const FormContext = createContext();

const FormProvider = ({ children }) => {
    const [formData, setFormData] = useState({ name: "", email: "" });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const submitForm = () => {
        console.log(formData);
    };
    return (
        <FormContext.Provider value={{ submitForm, handleChange, formData }}>
            {children}
        </FormContext.Provider>
    );
};

export default FormProvider;
