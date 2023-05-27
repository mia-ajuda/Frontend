export const getScreenTtile = (screenName, hasTitle = true) => {
    if (!hasTitle) return '';
    const screenTitles = {
        notificationsDrawer: 'Notificações',
        notifications: 'Notificações',
        homeDrawer: 'Mapa',
        activitiesDrawer: 'Atividades',
        profileDrawer: 'Perfil',
        helpDrawer: 'Ajuda',
        findUserDrawer: 'Procurar Usuários',
        home: 'Mapa',
        activities: 'Atividades',
        createHelpRequest: 'Criar Pedido',
        createHelpOffer: 'Criar Oferta',
        createCampaign: 'Criar Campanha',
        profile: 'Perfil',
        searchUsers: 'Buscar Usuários',
        address: 'Endereço',
        photo: 'Foto',
    };
    return screenTitles[screenName] || 'Detalhes';
};
