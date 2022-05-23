const path = require('path');
const fs = require('fs');
const {stdout} = process;
const secretFolderPath = path.join(__dirname, 'secret-folder');
fs.readdir(secretFolderPath, {withFileTypes: true}, (err, files) => {
  if (err) {
    throw err;
  }
  else {
    files.forEach(file => {
      if (file.isFile()){
        const fileName = file.name.split('.')[0];
        const fileExt = path.extname(file.name).split('.')[1];
        const filePath = path.join(__dirname, 'secret-folder', `${file.name}`);
        fs.stat(filePath, (err, file) => {
          if (err) {
            throw err;
          }
          else {
            const fileSize = file.size / 1000;
            stdout.write(`${fileName} - ${fileExt} - ${fileSize}KB\n`);
          }
        }); 
      }
    });
  }
});