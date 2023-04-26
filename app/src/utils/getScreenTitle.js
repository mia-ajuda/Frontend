export const getScreenTtile = (screenName) => {
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
        editNameField: 'Editar Nome',
        editCEPField: 'Editar Endereço',
        editPhoneField: 'Editar Telefone',
        searchUsers: 'Buscar Usuários',
        address: 'Endereço',
        photo: 'Foto',
    };
    return screenTitles[screenName] || 'Detalhes';
};
