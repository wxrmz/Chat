# Chat

Простой чат на Node.js с использованием WebSocket для обмена сообщениями в реальном времени. Проект использует:
- Express.js для REST API
- Socket.IO для WebSocket соединений
- Sequelize ORM для работы с базой данных
- PostgreSQL в качестве базы данных
- bcrypt для хеширования паролей
- cookie-parser для работы с куками

## Безопасность

- Аутентификация через куки (httpOnly)
- Хеширование паролей с помощью bcrypt
- Защита WebSocket соединений через проверку куки

## Переменные окружения

Создайте файл `.env` в корне проекта со следующими переменными:

```env
# База данных
DB_USERNAME=postgres      # Имя пользователя базы данных
DB_PASSWORD=123          # Пароль базы данных
DB_DATABASE=chat         # Название базы данных
DB_HOST=127.0.0.1       # Хост базы данных

# Сервер
PORT=3000               # Порт на котором запустится сервер (по умолчанию 3000)
```

## Установка и запуск

1. Установите зависимости:
```bash
npm install
```

2. Создайте базу данных:
```bash
npx sequelize-cli db:create
npx sequelize-cli db:migrate
```

3. Запуск в режиме разработки (с автоперезагрузкой):
```bash
npm run dev
```

4. Запуск в production режиме:
```bash
npm start
```

## Структура проекта

- `config/` - конфиг Sequelize 
- `controllers/`
  - `auth/` - контроллеры аутентификации (login, register)
  - `socket/` - обработчики WebSocket событий
- `constants/` - константы проекта
- `migrations/` - Миграции Sequelize (User, Message)
- `models/` - Модели Sequelize (User, Message)
- `routes/` - Маршруты Express и WebSocket
- `public/` - Статические файлы (HTML, JS, CSS)