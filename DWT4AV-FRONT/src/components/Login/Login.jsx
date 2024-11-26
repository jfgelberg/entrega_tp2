import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'


const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [alert, setAlert] = useState({ message: '', type: '' }) // Estado para la alerta
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch("http://localhost:2025/api/usuarios/login", {
                method: "POST",
                body: JSON.stringify({ email, password }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const data = await response.json()

            if (response.ok) {
                setAlert({ message: "Inicio de sesión exitoso", type: "success" })
                // Guarda el token y el email en localStorage
                localStorage.setItem('token', data.token)
                localStorage.setItem('email', email)
                // Redirecciona a la página de inicio
                navigate('/')
            } else {
                setAlert({ message: data.message || "Credenciales incorrectas", type: "danger" })
            }
        } catch (error) {
            setAlert({ message: "Error al conectar con el servidor", type: "danger" })
        }
    }

    const handleCloseAlert = () => {
        setAlert({ message: '', type: '' }) // Resetea la alerta
    }

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <form
                onSubmit={handleSubmit}
                className="p-4 shadow-lg rounded"
                style={{ width: '350px', backgroundColor: '#f9f9f9' }}
            >
                <h3 className="text-center mb-4 text-primary">Iniciar Sesión</h3>

                {/* Mostrar alerta si existe */}
                {alert.message && (
                    <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
                        {alert.message}
                        <button type="button" className="btn-close" onClick={handleCloseAlert} aria-label="Close"></button>
                    </div>
                )}

                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Correo Electrónico</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Ingresa tu correo"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Contraseña</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Ingresa tu contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100">Iniciar Sesión</button>
                <div className="text-center mt-3">
                    <Link to="/register" className="text-decoration-none text-secondary">Si no tienes usuario, ¡Regístrate!</Link>
                </div>
            </form>
        </div>
    )
}

export default Login
