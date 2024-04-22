import { useState } from "react";
import api from '../api';
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/Form.css"
import LoadingIndicator from "./LoadingIndicator";


function Form({ route, method }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const name = method == "login" ? "Login" : "Register";

    // Define an asynchronous function called handleSubmit, which takes an event object (e) as a parameter
    const handleSubmit = async (e) => {
        // Set loading state to true to indicate that the form submission is in progress
        setLoading(true);
        e.preventDefault();

        try {
            const res = await api.post(route, { username, password });

            // If the method is 'login', store the access and refresh tokens in the local storage
            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/");
            } else {
                navigate("/login");
            }
        } catch (error) {
            alert(error)
        } finally {
            // Regardless of whether the try block succeeds or an error is caught,
            // set the loading state to false to indicate that the operation is complete
            setLoading(false);
        }
    }


    return <form onSubmit={handleSubmit} className="form-container">
        <h1>{name}</h1>
        <input
            className="form-input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="username"
        />

        <input
            className="form-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
        />
        {loading && <LoadingIndicator/>}
        <button className="form-button" type="submit">
            {name}
        </button>
    </form>
}

export default Form