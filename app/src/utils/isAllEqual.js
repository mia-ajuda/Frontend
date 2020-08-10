const isAllEqual = (value) => {
    for (let i = 1; i < value.length; i++) {
        if (value[i] != value[i - 1]) return false;
    }
    return true;
};

export default isAllEqual;
