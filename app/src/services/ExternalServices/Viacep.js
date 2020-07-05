import axios from 'axios';
class Viacep {
    async getCepInformation(currentCep) {
        const url = `https://viacep.com.br/ws/${currentCep}/json/`;
        const cepInformation = await axios.get(url);
        return cepInformation.data;
    }
}

export default new Viacep();
