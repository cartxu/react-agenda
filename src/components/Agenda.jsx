import React, { useState, useEffect } from "react";
import { store } from "../firestoreconfig";
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  deleteDoc,
  setDoc,
} from "firebase/firestore";

export const Agenda = () => {
    const [modoEdicion, setModoEdicion] = useState(false);
    const [idUsuario, setIdUsuario] = useState("");
    const [nombre, setNombre] = useState("");
    const [phone, setPhone] = useState("");
    const [usuarioList, setUsuarioList] = useState([]);
    const [error, setError] = useState("");
    const setUsuarios = async (e) => {
      e.preventDefault();
      if (!nombre.trim()) {
        setError("El campo nombre no puede estar vacío.");
      }
      if (!phone.trim()) {
        setError("El campo teléfono no puede estar vacío.");
      }
      const usuario = {
        nombre: nombre,
        telefono: phone,
      };
      try {
        const data = await addDoc(collection(store, "agenda"), usuario);
        const { docs } = await getDocs(collection(store, "agenda"));
        const nuevoArray = docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsuarioList(nuevoArray);
        alert("Usuario añadido");
      } catch (e) {
        console.log(e);
      }
      setNombre("");
      setPhone("");
    };
    const borrarUsuario = async (id) => {
      try {
        await deleteDoc(doc(store, "agenda", id));
        const { docs } = await getDocs(collection(store, "agenda"));
        const nuevoArray = docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsuarioList(nuevoArray);
        alert("Usuario borrado");
      } catch (e) {
        console.log(e);
      }
    };
    const editarUsuario = async (id) => {
      setModoEdicion(true);
      const data = doc(store, "agenda", id);
      const docToEdit = await getDoc(data);
      if (docToEdit.exists()) {
        console.log("Document data: ", docToEdit.data());
        // const [nombre, telefono] = docToEdit.data();
        setNombre(docToEdit.data().nombre);
        setPhone(docToEdit.data().telefono);
        setIdUsuario(id);
      } else {
        console.log("No encuentro al usuario :(");
      }
    };
    const guardarCambios = async (e) => {
      e.preventDefault();
      if (!nombre.trim()) {
        setError("El campo nombre no puede estar vacío.");
      }
      if (!phone.trim()) {
        setError("El campo teléfono no puede estar vacío.");
      }
      const usuarioEditado = {
        nombre: nombre,
        telefono: phone,
      };
      try {
        const data = await setDoc(doc(store,"agenda",idUsuario),usuarioEditado);
        const { docs } = await getDocs(collection(store, "agenda"));
        const nuevoArray = docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsuarioList(nuevoArray);
        alert("Usuario modificado.");
      } catch (e) {
        console.log(e);
      }
      setNombre("");
      setPhone("");
      setModoEdicion(false);
    };
    useEffect(() => {
      const getUsuarios = async () => {
        const { docs } = await getDocs(collection(store, "agenda"));
        const nuevoArray = docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsuarioList(nuevoArray);
      };
      getUsuarios();
    }, []);
  
    return (
      <div className="container">
        <div className="row m-4">
          <div className="col">
            <h2>Nuevo Contacto</h2>
            <form
              onSubmit={modoEdicion ? guardarCambios : setUsuarios}
              className="form-group mt-3"
            >
              <input
                onChange={(e) => {
                  setNombre(e.target.value);
                }}
                placeholder="Nombre"
                type="text"
                className="form-control mt-2"
                value={nombre}
              />
              <input
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
                placeholder="Número"
                type="text"
                className="form-control mt-2"
                value={phone}
              />
              {modoEdicion ? (
                <input
                  type="submit"
                  className="btn btn-dark mt-2"
                  value="Editar"
                />
              ) : (
                <input
                  type="submit"
                  className="btn btn-dark mt-2"
                  value="Registrar"
                />
              )}
            </form>
            {error ? (
              <div className="mt-5 alert alert-danger">{error}</div>
            ) : (
              <span></span>
            )}
          </div>
          <div className="col">
            <h2 className="mb-4">Tu Agenda</h2>
            <ul className="list-group"></ul>
            {usuarioList.length !== 0 ? (
              usuarioList.map((item) => (
                <li
                  className="list-group-item d-flex justify-content-between align-items-start"
                  key={item.id}
                >
                  <span>
                    {item.nombre}
                    <span className="mx-2 badge bg-warning rounded-pill shadow-sm">
                      {item.telefono}
                    </span>
                  </span>
                  <span>
                    <i
                      role="button"
                      onClick={(id) => {
                        borrarUsuario(item.id);
                      }}
                      className="mx-2 text-danger fas fa-user-minus"
                    ></i>
                    <i
                      role="button"
                      onClick={(id) => {
                        editarUsuario(item.id);
                      }}
                      className="text-secondary fas fa-user-edit"
                    ></i>
                  </span>
                </li>
              ))
            ) : (
              <span className="alert alert-info">
                No hay usuarios en tu agenda
              </span>
            )}
          </div>
        </div>
      </div>
    );
}
