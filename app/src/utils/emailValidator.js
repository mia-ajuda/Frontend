const validationEmail = (email) => {
    const expression = /^([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)@(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})$/;

    return expression.test(String(email).toLowerCase());
};

export default validationEmail;
