import { getSliderBody } from '../../utils/getSliderBody';

const faqOptions = [
    {
        id: 1,
        title: 'Como criar um pedido oferta ou campanha?',
        description:
            'Não sabe como criar um pedido oferta ou campanha? Clique aqui para entender melhor como fazer.',
        pages: [
            getSliderBody(
                1,
                'Entrar na página de pedidos e ofertas',
                'Clique no ícone "Menu" para abrir a navegação e selecione a aba "Meus Pedidos e Ofertas.',
            ),
            getSliderBody(
                2,
                'Entrar na aba de meus pedidos ou minhas ofertas',
                'Se você quer criar um pedido, deve entrar na aba de meu pedidos, caso queria uma oferta, na aba de ofertas.',
            ),
            getSliderBody(
                3,
                'Clicar no botão de criação e preencher os dados',
                'Por fim, basta você clicar no botão Criar Oferta / pedido e preencher todos os dados requisitados.',
            ),
        ],
    },
    {
        id: 2,
        title: 'Como interagir com um pedido, oferta ou campanha?',
        description:
            'Está com dúvidas em como interagir com um pedido oferta ou campanha? Clique aqui para entender melhor como fazer.',
        pages: [
            getSliderBody(
                1,
                'Entrar na página Mapa',
                'Clique no ícone "Menu" para abrir a navegação e selecione a aba "Mapa"',
            ),
            getSliderBody(
                2,
                'Procurar pedido, oferta ou camapanha',
                'No mapa aparecerão alguns marcadores indicando pedidos, campanhas e ofertas, além de uma lista inferior com esses pedidos.',
            ),
            getSliderBody(
                3,
                'Clicar no pedido, oferta ou campanha',
                'Clique no marcador ou na lista inferior para abrir a página do pedido, oferta ou campanha.',
            ),
        ],
    },
    {
        id: 3,
        title: 'Contatos Importantes',
        description:
            'Não sabe como criar um pedido oferta ou campanha? Clique aqui para entender melhor como fazer.',
        emergencyModal: true,
    },
];

export default faqOptions;
