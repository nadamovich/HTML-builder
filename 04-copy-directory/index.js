const path = require('path');
const fs = require('fs');
const folderPath = path.join(__dirname, 'files');
const copyFolderPath = path.join(__dirname, 'files-copy');
fs.access(copyFolderPath, err => {
  if (err) {
    copyFolder();
  }  else {
    fs.readdir(copyFolderPath, {withFileTypes: true}, (err, filesCopy) => {
      if (err) throw err;
      else {
        filesCopy.forEach(fileCopy => {
          const copyFilePath = path.join(__dirname, 'files-copy', `${fileCopy.name}`);
          fs.unlink(copyFilePath, err => {
            if (err) throw err;
          });
        });
        copyFolder();
      }
    });
  }
});
fs.mkdir(copyFolderPath, {recursive: true}, (err) => {
  if (err) throw err;
});
function copyFolder () {
  fs.readdir(folderPath, {withFileTypes: true}, (err, files) => {
    if (err) throw err;
    else {
      files.forEach(file => {
        const filePath = path.join(__dirname, 'files', `${file.name}`);
        const copyFilePath = path.join(__dirname, 'files-copy', `${file.name}`);
        fs.copyFile(`${filePath}`, `${copyFilePath}`, (err) => {
          if (err) throw err;
        });
      });
    }
  });
  
}

