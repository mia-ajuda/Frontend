import axios from 'axios';

class AdressService {
    constructor() {}

    async getCEPInfo(cep) {
        const cepInfo = await axios.get(
            `https://viacep.com.br/ws/${cep}/json/`,
        );
        return cepInfo;
    }
}

const adressService = new AdressService();
Object.freeze(adressService);
export default adressService;
