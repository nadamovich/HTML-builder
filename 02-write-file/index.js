const path = require('path');
const fs = require('fs');
const {stdin, stdout} = process;
const textPath = path.join(__dirname, 'text.txt');
const textWriteStream = fs.createWriteStream(textPath);
stdout.write('Hi!\n');
stdin.on('data', data => {
  if(data.toString().trim() !== 'exit') {
    textWriteStream.write(data.toString());
  }
  else if(data.toString().trim() === 'exit') {
    stdout.write('Good bye!\n');
    process.exit();
  }
});
process.on('SIGINT', ()=> {
  stdout.write('Good bye!\n');
  process.exit();
});
