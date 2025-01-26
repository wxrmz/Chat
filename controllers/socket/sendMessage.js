const { Message, User } = require('../../models');
const SOCKET_EVENTS = require('../../constants/socketEvents');

const sendMessage = async (socket, { content, userId }) => {
    try {
        if (!content || !userId) {
            return socket.emit(SOCKET_EVENTS.ERROR, { message: 'Content and userId are required' });
        }

        const user = await User.findByPk(userId);
        if (!user) {
            return socket.emit(SOCKET_EVENTS.ERROR, { message: 'User not found' });
        }

        const message = await Message.create({ content, userId });

        socket.broadcast.emit(SOCKET_EVENTS.NEW_MESSAGE, {
            content,
            User: { username: user.username },
            createdAt: message.createdAt
        });
        
        socket.emit(SOCKET_EVENTS.NEW_MESSAGE, {
            content,
            User: { username: user.username },
            createdAt: message.createdAt
        });
    } catch (error) {
        socket.emit(SOCKET_EVENTS.ERROR, { message: 'Error sending message' });
    }
};

module.exports = sendMessage;
