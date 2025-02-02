const express = require('express');
const logger = require('./src/utils/logger');
require('dotenv').config({path: __dirname + '/.env'});
const app = express();
const router = require('./src/api');

const port = process.env.PORT || 3000;

app.use(express.static("public", {extensions: ['html']}));
app.use(express.json({limit: "25mb"}));
app.use(express.urlencoded({limit: "25mb", extended: true}));

app.use('/v1/', router);

app.listen(port, () => {
    logger.info(`server start at ${port}`);
});