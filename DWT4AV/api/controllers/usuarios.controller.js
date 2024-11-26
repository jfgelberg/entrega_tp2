import * as service from '../../services/usuarios.service.js';



export function createUser(req, res) {
    service.createUser(req.body)
        .then(usuario => res.status(201).json(usuario))
        .catch(error => res.status(400).json({ message: error.message }))
}   

export function login(req, res) {
    service.login(req.body)
        .then(usuario => res.status(200).json(usuario))
        .catch(error => res.status(401).json({ message: error.message }))
}