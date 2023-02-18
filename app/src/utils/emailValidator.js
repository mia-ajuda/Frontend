const validationEmail = (email) => {
    const expression = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/;

    return expression.test(String(email).toLowerCase());
};

export default validationEmail;
