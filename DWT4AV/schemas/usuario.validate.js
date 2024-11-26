import yup from 'yup'

export const usuarioSchema = yup.object({
    email: yup.string()
        .email().required("El campo Email es requerido"),

    password: yup.string()
        .min(8, "La contraseña debe tener al menos 8 caracteres")
        .max(16, "La contraseña debe tener como máximo 16 caracteres")
        .matches(/[0-9]/, "La contraseña debe tener al menos un numero")
        .matches(/[A-Z]/, "La contraseña debe tener al menos una mayuscula")
        .matches(/[@$!%*?&]/, 'La contraseña debe tener al menos un carácter especial'),

    passwordConfirm: yup.string()
        .oneOf([yup.ref("password")], "Las contraseñas deben conincidir")
        .required("El campo Confirmar contraseña es requerido"),

    age: yup.number()
        .integer()
        .min(18, "Debes tener al menos 18 años"),
})

export const loginSchema = yup.object({
    email: yup.string()
        .email().required("El campo Email es requerido"),

        password: yup.string()
        .min(8, "La contraseña debe tener al menos 8 caracteres")
        .max(16, "La contraseña debe tener como máximo 16 caracteres")
        .matches(/[0-9]/, "La contraseña debe tener al menos un numero")
        .matches(/[A-Z]/, "La contraseña debe tener al menos una mayuscula")
        .matches(/[@$!%*?&]/, 'La contraseña debe tener al menos un carácter especial'),
        
})