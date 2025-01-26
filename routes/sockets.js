const SOCKET_EVENTS = require('../constants/socketEvents');
const getHistory = require('../controllers/socket/getHistory');
const sendMessage = require('../controllers/socket/sendMessage');
const { User } = require('../models');
const cookie = require('cookie');

const setupSocketEvents = (io) => {
    io.use(async (socket, next) => {
        try {
            const cookies = cookie.parse(socket.handshake.headers.cookie || '');
            const userId = cookies.auth;
            
            if (!userId) {
                return next(new Error('Authentication required'));
            }
 
            const user = await User.findByPk(userId);
            if (!user) {
                return next(new Error('Invalid authentication'));
            }

            socket.user = user;
            next();
        } catch (error) {
            next(new Error('Authentication failed'));
        }
    });

    io.on(SOCKET_EVENTS.CONNECTION, (socket) => {
        socket.on(SOCKET_EVENTS.GET_HISTORY, () => getHistory(socket));
        socket.on(SOCKET_EVENTS.SEND_MESSAGE, (data) => sendMessage(socket, data));
    });
};

module.exports = setupSocketEvents;
