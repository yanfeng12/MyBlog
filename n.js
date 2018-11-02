const express = require('express')();
const mongoose = require('mongoose');
const multer = require('multer');
const server = express();


server.listen(4000);
server.use('/',express.static('/'))