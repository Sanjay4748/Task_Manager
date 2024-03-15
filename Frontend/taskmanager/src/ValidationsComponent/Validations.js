
function NumberValidation(number){
    const regex = /^[0-9]/;
    const isvalid = regex.test(number);
    return isvalid;
}

function NameValidation(name){
    const regex =  /^[a-zA-Z]+$/;
    const isvalid = regex.test(name);
    return isvalid;
}

function EmailValidation(email){
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = regex.test(email);
    return isValid;
}

function PasswordValidation(password){
    const regex = /^(?=.*[A-Z])[^\s]{10,15}$/;
    const isValid = regex.test(password);
    return isValid;
}

const Validations = {NumberValidation,NameValidation,EmailValidation,PasswordValidation};

export default Validations;
