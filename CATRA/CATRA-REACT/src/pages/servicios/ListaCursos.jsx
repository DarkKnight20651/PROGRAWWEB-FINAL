import axios from "axios";
import { useEffect, useState } from "react";
import useAuth from "src/useAuth";
import "../../styles/index.css";
import "./Cursos.css";
import Loader from "src/components/loader";

const TablaCursos = () => {
  const [courses, setCourses] = useState([]);
  const { user } = useAuth();
  const userId = user ? user.id : null;

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      setIsLoading(true);
      try {
        const response = await axios.post("http://localhost:8000/api/user/courses", {
          user_id: userId,
        });

        if (response.status === 200) {
          setCourses(response.data.courses); // Almacenamos los cursos en el estado
        } else {
          console.error("Error al obtener los cursos");
        }
      } catch (error) {
        console.error("Error al obtener los cursos:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, [userId]);

  function handleViewCourse(id) {
  }

  if (isLoading) {
    return <Loader />
  } else
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
