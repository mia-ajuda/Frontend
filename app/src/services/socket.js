import socketio from 'socket.io-client';
import ENV from '../config/envVariables';

const socket = socketio(ENV.socketUrl, {
    autoConnect: false,
});

function subscribeToNewHelps(subscribeFunction) {
    socket.off('new-help');
    socket.on('new-help', subscribeFunction);
}

function subscribeToDeleteHelp(subscribeFunction) {
    socket.off('delete-help');
    socket.on('delete-help', subscribeFunction);
}

function subscribeToDeleteHelpOffer(subscribeFunction) {
    socket.off('delete-help-offer');
    socket.on('delete-help-offer', subscribeFunction);
}

function connect(userPosition, userId) {
    socket.io.opts.query = {
        userPosition,
        userId,
    };
    socket.connect();
}

function changeCategories(categories) {
    socket.emit('change-categories', categories);
}

function disconnect() {
    if (socket.connected) {
        socket.disconnect();
    }
}

export {
    connect,
    disconnect,
    subscribeToNewHelps,
    subscribeToDeleteHelp,
    subscribeToDeleteHelpOffer,
    changeCategories,
};
