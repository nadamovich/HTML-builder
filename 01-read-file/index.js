const path = require('path');
const fs = require('fs');
const textPath = path.join(__dirname, 'text.txt');
const textReadStream = fs.createReadStream(textPath);
textReadStream.on('data', data => console.log(data.toString()));