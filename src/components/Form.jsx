import { useContext } from "react";
import { FormContext } from "../context/FormContext";
import { ThemeContext } from "../context/ThemeContext";

const Form = () => {
    const { submitForm, handleChange, formData } = useContext(FormContext);
    const { theme } = useContext(ThemeContext)

    return (
        <form
            className={theme ? 'bg-black' : 'bg-white'}
            onSubmit={(e) => {
                e.preventDefault();
                submitForm();
            }}
        >
            <div >
                <label>name:</label>
                <input
                    type="text"
                    name="name"
                    placeholder="Enter a name.."
                    value={formData.name}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Email:</label>
                <input
                    type="email"
                    name="email"
                    placeholder="Enter email..."
                    value={formData.email}
                    onChange={handleChange}
                />
            </div>
            <br />
            <button type="submit" className="place-self-start">
                Submit
            </button>
        </form>
    );
};

export default Form;
