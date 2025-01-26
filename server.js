require('dotenv').config();

const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const path = require('path');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth');
const setupSocketEvents = require('./routes/sockets');
const { User } = require('./models');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/auth', authRoutes);

setupSocketEvents(io);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/chat', async (req, res) => {
    const userId = req.cookies.auth;
    if (!userId) {
        return res.redirect('/');
    }
    
    try {
        const user = await User.findByPk(userId);
        if (!user) {
            return res.redirect('/');
        }
        res.sendFile(path.join(__dirname, 'public', 'chat.html'));
    } catch (error) {
        res.redirect('/');
    }
});

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
