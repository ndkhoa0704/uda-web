const express = require('express');
const Logger = require('./src/utils/logger');
require('dotenv').config({ path: __dirname + '/.env' });
const app = express();
const router = require('./src/api');
const { User } = require('./src/models/user');
const { Article } = require('./src/models/article');

const port = process.env.PORT || 3000;

app.use(express.static("public", { extensions: ['html'] }));
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb", extended: true }));

app.use('/v1', router);

app.listen(port, async () => {
    Logger.info(`server start at ${port}`);
    await Promise.all([
        User.sync(),
        Article.sync()
    ]);
    Logger.info('Database synced');
});