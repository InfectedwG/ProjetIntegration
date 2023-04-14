const validateEmail = (email) => {

    return typeof email === 'string' &&
        !!email &&
        email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/);
}

// Validation du mot de passe
const validatePassword = (password) => {
    return typeof password === 'string' &&
        !!password &&
        password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/);
}


// Exportation de la validation
export const validationConnexion = (body) => {
    
    return  validateEmail(body.email) &&
            validatePassword(body.password);
}