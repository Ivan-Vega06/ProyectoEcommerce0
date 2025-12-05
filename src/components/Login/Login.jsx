import { useState } from "react";
import {useAuthContext} from "../../context/AuthContext/useAuthContext"
import { Navigate ,useNavigate } from "react-router-dom";

export const Login = () => {
    const [userForm, setUserForm] = useState({ name: "", password: ""});
    const { user, login } = useAuthContext();

    const navigate = useNavigate()

        if(user){
            return <Navigate to="/admin/alta-productos" />
        };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setUserForm({ ...userForm, [name]: value })
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        const succes = login(userForm.name, userForm.password);

        if(succes) {
            navigate("/admin/alta-productos")
        } else {
            alert("Credenciales Incorrectas")
            setUserForm({ name: "", password: "" })
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <h2>Iniciar Sesion</h2>
            <div>
                <label>Usuario:</label>
                <input 
                    type="text"
                    name="name"
                    value={userForm.name}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Contraseña:</label>
                <input 
                type="password"
                name="password"
                value={userForm.password}
                onChange={handleChange}
                />
            </div>
            <button type="submit">Iniciar Sesion</button>
        </form>
    )


}