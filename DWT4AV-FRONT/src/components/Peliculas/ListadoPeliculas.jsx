import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ListadoPeliculas = ({ listado }) => {
  // Estado para el término de búsqueda y la página actual
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 9; // Número de películas por página

  // Filtrar las películas según el término de búsqueda
  const filteredPeliculas = listado.filter(pelicula =>
    pelicula.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pelicula.year.toString().includes(searchTerm) ||
    pelicula.genre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calcular el índice de las películas a mostrar en la página actual
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = filteredPeliculas.slice(indexOfFirstMovie, indexOfLastMovie);

  // Función para cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Número total de páginas
  const totalPages = Math.ceil(filteredPeliculas.length / moviesPerPage);

  return (
    <div className="container my-5">
      {/* Buscador */}
      <div className="mb-4">
        <h2>Listado de Películas</h2>
      </div>

      <div className='text-end my-3'>
        <Link to="/peliculas/nuevapelicula" className="btn btn-primary">Crear Película</Link>
      </div>

      <div className="row g-3">
        <div className='col-md-12'>
          <label htmlFor="search" className="form-label">Buscar Película</label>
          <input
            type="text"
            className="form-control"
            placeholder="Buscar Película, por nombre, año o género"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Actualiza el término de búsqueda
          />
        </div>

        {/* Si hay películas que coinciden con el filtro */}
        {currentMovies.length > 0 ? (
          currentMovies.map((pelicula) => (
            <div key={pelicula._id} className="col-md-4 col-sm-6 col-12">
              <div className="card h-100 d-flex flex-column">
                <img
                  src={pelicula.img_link || 'https://pixabay.com/get/gd0f6ca1ff4af24a5d19bde553f1b5a3908fac6878754ab111ef018908f5da88025cf6ae9e73566882c523a40ce3e22a78d40674e742a577a520b72f93d8ccc43_1280.jpg'}
                  className="card-img-top"
                  alt={pelicula.name}
                  style={{ height: '300px', objectFit: 'cover', width: '100%' }}
                />
                <div className="card-body d-flex flex-column">
                  <p className="card-title fs-4 text-primary"><strong>{pelicula.name}</strong></p>
                  <p className="card-text"><strong>Año:</strong> {pelicula.year}</p>
                  <p className="card-text"><strong>Duración:</strong> {pelicula.duration}</p>
                  <p className="card-text"><strong>Género:</strong> {pelicula.genre}</p>
                  <p className="card-text"><strong>Certificado:</strong> {pelicula.certificate}</p>

                  <div className="my-3">
                    <p className="fs-6"><strong>Director</strong></p>
                    <p className="card-text">{pelicula.director_name}</p>
                  </div>

                  <div className="my-3">
                    <p className="fs-6"><strong>Escritores</strong></p>
                    <p className="card-text">{pelicula.writter_name}</p>
                  </div>

                  <div className="my-3">
                    <p className="fs-6"><strong>Elenco</strong></p>
                    <p className="card-text">{pelicula.cast_name}</p>
                  </div>

                  <div className="my-3">
                    <p className="fs-6"><strong>Clasificación IMDb</strong></p>
                    <p className="card-text">⭐ {pelicula.imdb_rating}({pelicula.imbd_votes} votos)</p>
                  </div>

                  <div className="mt-auto d-flex">
                    <Link to={"pelicula/" + pelicula._id} className="btn btn-primary w-50 me-2">Ver</Link>
                    <Link
                      to={"editar/" + pelicula._id}
                      className="btn btn-info w-50"
                    >
                      Editar
                    </Link>
                    <Link to={"eliminar/" + pelicula._id} className="btn btn-danger w-50 ms-2 btnEliminar">X</Link>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No se encontraron películas que coincidan con la búsqueda.</p>
        )}
      </div>

      {/* Paginación */}
      <div className="d-flex justify-content-center mt-4">
        <nav>
          <ul className="pagination">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => paginate(currentPage - 1)}>&laquo; Anterior</button>
            </li>
            {[...Array(totalPages)].map((_, index) => (
              <li key={index + 1} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                <button className="page-link" onClick={() => paginate(index + 1)}>{index + 1}</button>
              </li>
            ))}
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => paginate(currentPage + 1)}>Siguiente &raquo;</button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default ListadoPeliculas;
