const getBRDateFromString = (string) => {
    var date = new Date(string);
    return date.toLocaleDateString('pt-BR');
};
export default getBRDateFromString;
