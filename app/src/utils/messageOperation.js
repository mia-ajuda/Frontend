class MessageOperation {
    offer(isMessage, callBackRemoveOffer) {
        if (isMessage) {
            callBackRemoveOffer();
            return 'Sua candidatura foi enviada com sucesso e estará no aguardo para ser aceita';
        }
        return 'participateHelpOffer';
    }

    help(isMessage, callBackRemoveHelp) {
        if (isMessage) {
            callBackRemoveHelp();
            return 'Oferta enviada com sucesso e estará no aguardo para ser aceita';
        }
        return 'offerHelp';
    }
}

const messageOperation = new MessageOperation();
export default messageOperation;
