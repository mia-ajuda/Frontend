const passwordValidator = (password) => {
    if (password == '' || password.length < 8) {
        return false;
    }
    return true;
};

export default passwordValidator;
