import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { app } from "../firestoreconfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const Menu = () => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const cerrarSesion = () => {
    const auth = getAuth(app);
    auth.signOut();
    setUsuario(null);
    navigate("/");
  };

  useEffect(() => {
    const auth = getAuth(app);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const mail = user.email;
        setUsuario(mail);
      }
    });
  }, []);
  return (
    <div>
      <nav className="navbar navbar-dark bg-dark expand-lg">
      <div className="container-fluid">
        <ul className="navbar-nav mr-auto">

          <li className="nav-item">
            {usuario ? (
              <Link className="nav-link" to="/agenda">
                Agenda
              </Link>
            ) : (
              <span></span>
            )}
          </li>
        </ul>

        {usuario ? (
          <div>
            <button
              onClick={cerrarSesion}
              className="nav-link btn btn-danger text-light"
            >
              Cerrar Sesión
            </button>
          </div>
        ) : (
          <div>
            <Link className="nav-link btn btn-info text-dark" to="/login">
              Acceder
            </Link>
          </div>
        )}
        </div>
      </nav>
    </div>
  );
};
