import React, { useState, useEffect } from "react";
import "../../styles/index.css";
import logo from "/src/assets/logo.png";
import "./Cursos.css";
import axios from "axios";
import useAuth from "src/useAuth";

const TablaCursos = () => {
  const [courses, setCourses] = useState([]);
  const { user } = useAuth();
  const userId = user ? user.id : null;

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.post("http://localhost:8000/api/user/courses", {
          user_id: userId, // Enviamos el user_id a la API
        });

        if (response.status === 200) {
          setCourses(response.data.courses); // Almacenamos los cursos en el estado
        } else {
          console.error("Error al obtener los cursos");
        }
      } catch (error) {
        console.error("Error al obtener los cursos:", error);
      }
    };

    fetchCourses();
  }, [userId]);


  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Lista de Cursos</h2>
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Nombre del Curso</th>
              <th>Instructor</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {courses.length > 0 ? (
              courses.map((course) => (
                <tr key={course.id}>
                  <td>{course.id}</td>
                  <td>{course.name}</td>
                  <td>{course.instructor_name}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleViewCourse(course.id)}
                    >
                      Ver Curso
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">
                  No hay cursos disponibles
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TablaCursos;
