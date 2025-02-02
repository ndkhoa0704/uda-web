const express = require('express');
const logger = require('./utils/logger');
require('dotenv').config({path: __dirname + '../.env'});
const app = express();

const port = process.env.PORT || 3000;

app.use(express.static("public", {extensions: ['html']}));
app.use(express.json({limit: "25mb"}));
app.use(express.urlencoded({limit: "25mb", extended: true}));


app.listen(port, () => {
    logger.info(`server start at ${port}`);
});