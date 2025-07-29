import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constant";

function Form(route, method) {
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const [loading, setloading] = useState(false);
    const navigate = useNavigate();

    const name = method === "login" ? "Login" : "Register";

    const handleSubmit = async (e) => {
        setloading(true);
        e.preventDefault();

        try {
            const res = await api.post(route, {username, password});
            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access_token);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh_token);
                navigate("/");
            }
            else{
                navigate("/login");
            }
        }
        catch (error) {
            alert(error)
        }finally {
            setloading(false);
        }
    }

    return <form onSubmit={handleSubmit} className="form-container">
        <h1>{name}</h1>
        <input className="form-input" type="text" placeholder="Username" value={username} onChange={(e) => setusername(e.target.value)} required />
        <input className="form-input" type="password" placeholder="Password" value={password} onChange={(e) => setpassword(e.target.value)} required />
        <button className="form-button" type="submit" disabled={loading}>{loading ? "Loading..." : name}</button>

    </form>
}