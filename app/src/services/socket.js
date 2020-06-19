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

function connect(currentRegion, userId) {
    socket.io.opts.query = {
        currentRegion,
        userId,
    };
    socket.connect();
}

function changeLocations(locations) {
    socket.emit('change-locations', locations);
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
    changeLocations,
    changeCategories,
};
