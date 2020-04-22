import socketio from 'socket.io-client'
import ENV from "../config/envVariables";

const socket = socketio(ENV.socketUrl, {
    autoConnect: false
})

function subscribeToNewHelps(subscribeFunction) {
    socket.on('new-help', subscribeFunction)
}

function subscribeToDeleteHelp(subscribeFunction) {
    socket.on('delete-help', subscribeFunction)
}

function connect(locations, currentRegion, categories) {
    socket.io.opts.query = {
        locations,
        currentRegion,
        categories
    }
    socket.connect()
}

function disconnect() {
    if(socket.connected) {
        socket.disconnect()
    }
}

export {
    connect,
    disconnect,
    subscribeToNewHelps,
    subscribeToDeleteHelp
}