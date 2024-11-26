import { MongoClient, ObjectId } from 'mongodb';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { crearToken } from './token.service.js';

const client = new MongoClient("mongodb+srv://admin:lnWXPCjynkBL7gAa@dw4tav-hibridas-cluster.whoab.mongodb.net/")
const db = client.db("PRODUCTORA")

const usuarios = db.collection("usuarios")

export async function createUser(usuario) {
    await client.connect()

    const existe = await usuarios.findOne({ email: usuario.email }) //buscar si el email ya existe

    if (existe) {
        throw new Error("El email ya se encuentra registrado")
    }

    const nuevoUsuario = {...usuario, passwordConfirm: undefined} //hago una copia del objeto para no modificar el original y saco el passwordConfirm
    
    nuevoUsuario.password = await bcrypt.hash( usuario.password, 10) 
    
    await usuarios.insertOne(nuevoUsuario)

    //return nuevoUsuario
    return {...nuevoUsuario, password: undefined} //devuelvo el usuario sin la contraseña y la edad
}



// Función para loguear un usuario ----------------------------------------------
export async function login(usuario) {
   await client.connect()

    const existe = await usuarios.findOne({ email: usuario.email })

    if (!existe) {
        throw new Error("Usuario o contraseña incorrecta")
    }

    const coincide = await bcrypt.compare(usuario.password, existe.password)

    if (!coincide) {
        throw new Error("Usuario o contraseña incorrecta")
    }

    const token = await crearToken(existe)

    return { ...existe, token: token, password: undefined, passwordConfirm: undefined }
}

