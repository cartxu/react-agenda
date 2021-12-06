import React, { useState } from "react";
import { app } from "../firestoreconfig";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

export const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [msgError, setMsgError] = useState("");

    const registrarUsuario = (e) => {
        e.preventDefault();
        const auth = getAuth(app);
        createUserWithEmailAndPassword(auth, email, pass)
            .then((userCredential) => {
                navigate("/");
            })
            .catch((error) => {
                const errorCode = error.code;
                if (errorCode === "auth/invalid-email") {
                    setMsgError("El email introducido es incorrecto.");
                }
                if (errorCode === "auth/weak-password") {
                    setMsgError(
                        "La contraseña es demasiado débil, debe tener más de 6 carácteres."
                    );
                }
                if (errorCode === "auth/email-already-in-use") {
                    setMsgError("El usuario introducido ya existe.");
                }
                if (errorCode === "auth/internal-error") {
                    setMsgError("Por favor, rellena todos los campos.");
                }
            });
    };

    const loginUsario = (e) => {
        e.preventDefault();
        const auth = getAuth(app);
        signInWithEmailAndPassword(auth, email, pass)
            .then((r) => {
                navigate("/agenda");
            })
            .catch((err) => {
                const errorCode = err.code;
                if (errorCode === "auth/wrong-password") {
                    setMsgError("La contraseña introducida no es correcta.");
                }
                if (errorCode === "auth/user-not-found") {
                    setMsgError("Usuario no encontrado.");
                }
            });
    };

    return (
        <div className="row mt-5 justify-content-center">
            <div className="col-10 col-md-8 col-lg-6">
                <form
                    onSubmit={registrarUsuario}
                    className="form-group m-3 text-center"
                >
                    <input
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                        className="form-control m-2"
                        type="email"
                        placeholder="Introduce tu Email"
                    />
                    <input
                        onChange={(e) => {
                            setPass(e.target.value);
                        }}
                        className="form-control m-2"
                        type="password"
                        placeholder="Introduce tu Contraseña"
                    />
                    <input
                        type="submit"
                        className="btn btn-dark m-2 btn-block"
                        value="Registrar Usuario"
                    />{" "}
                    <button
                        onClick={loginUsario}
                        className="btn btn-success btn-block"
                    >
                        Iniciar Sesión
                    </button>
                </form>

                {msgError ? (
                    <div className="alert alert-danger">{msgError}</div>
                ) : (
                    <span></span>
                )}
            </div>
        </div>
    );
};
