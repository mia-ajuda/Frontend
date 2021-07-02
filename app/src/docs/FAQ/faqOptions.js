import isOffersTurnedOff from '../../utils/isOffersTurnedOff';

const faqOptions = [
    {
        id: 1,
        description: 'Como usar o Mia-Ajuda?',
    },
    {
        id: 2,
        description: 'Recomendações sobre pedidos de ajuda',
    },
    {
        id: 3,
        description: 'Recomendações sobre ofertas de ajuda',
    },
    {
        id: 4,
        description: 'Contatos Importantes',
    },
];

if (isOffersTurnedOff()) {
    // Turn Off Feature of Offer
    faqOptions.splice(2, 1);
}

export default faqOptions;
