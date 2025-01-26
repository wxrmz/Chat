const { Message, User } = require('../../models');
const SOCKET_EVENTS = require('../../constants/socketEvents');

const getHistory = async (socket) => {
    try {
        const messages = await Message.findAll({
            include: [{ model: User, attributes: ['username'] }],
            order: [['createdAt', 'ASC']]
        });
        socket.emit(SOCKET_EVENTS.MESSAGE_HISTORY, messages);
    } catch (error) {
        socket.emit(SOCKET_EVENTS.ERROR, { message: 'Error fetching message history' });
    }
};

module.exports = getHistory;
