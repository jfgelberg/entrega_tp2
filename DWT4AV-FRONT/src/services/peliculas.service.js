import { call } from "./api.service"

export async function getPeliculas() {
    return call({ uri: "peliculas" })
}

export async function getPelicula(id) {
    return call({ uri: `peliculas/${id}` })
}

export async function agregarPelicula(pelicula){
    return call (  { uri: "peliculas", method: "POST", body: pelicula } )
}
  
export const obtenerPeliculas = async () => {
        
    const response = await fetch('http://localhost:2025/peliculas');
    return await response.json();
};


export const modificarPelicula = async (id_ingresado, peliculaActualizada) => {
    await db.collection("movies").replaceOne({ _id: ObjectId.createFromHexString(id_ingresado)}, peliculaActualizada)
    return peliculaActualizada
}

export const actualizarPelicula = async (id, peliculaActualizada) => {
    const peliculaNueva = await db.collection("movies").updateOne({_id: ObjectId.createFromHexString(id)}, { $set: peliculaActualizada })
    return peliculaNueva
}