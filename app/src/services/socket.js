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

function connect(locations, currentRegion) {
    // console.log(locations)
    // console.log('-----------------')
    // console.log(currentRegion)
    socket.io.opts.query = {
        locations,
        currentRegion
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