const path = require('path');
const fs = require('fs');
const page = path.join(__dirname, 'project-dist', 'index.html');
const style = path.join(__dirname, 'project-dist', 'style.css');
const assets = path.join(__dirname, 'project-dist', 'assets');
const components = path.join(__dirname, 'components');
const styleList = path.join(__dirname, 'styles');
const assetsSource = path.join(__dirname, 'assets');
const template = path.join(__dirname, 'template.html');
const readTemplate = fs.createReadStream(template, 'utf-8');
let pageContent = '';
let bundleArr = [];
fs.mkdir(path.join(__dirname, 'project-dist'), {recursive: true}, (err) => {
  if (err) throw err;
});
readTemplate.on('data', data => {
  pageContent = data;
  fs.readdir(components, {withFileTypes: true}, (err, htmlcontent) => {
    if (err) throw err;
    else {
      htmlcontent.forEach((file)=> {
        if (file.isFile() && path.extname(file.name) === '.html') {
          const htmlFile = path.join(__dirname, 'components', `${file.name}`);
          const readFile = fs.createReadStream(htmlFile);
          readFile.on('data', fileContent => {
            pageContent = pageContent.replace(`{{${file.name.split('.')[0]}}}`, fileContent.toString());
            const writePage = fs.createWriteStream(page);
            writePage.write(pageContent);                        
          });
        }
      });
    }
  });
});
fs.readdir(styleList, {withFileTypes: true}, (err, files) => {
  if (err) throw err;
  else {
    files.forEach(file => {
      if (file.isFile() && path.extname(file.name) === '.css') {
        const currentFile = path.join(__dirname, 'styles', `${file.name}`);               
        const styleReadStream = fs.createReadStream(currentFile, 'utf-8');
        styleReadStream.on('data', styleFiles => {
          bundleArr.push(styleFiles);
          const styleWriteStream = fs.createWriteStream(path.join(style));
          styleWriteStream.write(bundleArr.join(' ').toString());
        });
      }
    });
  }
});
fs.mkdir(assets, {recursive: true}, (err) => {
  if (err) throw err;
});
function copyAssets (assetsSource, assets) {
  fs.readdir(assetsSource, {withFileTypes: true}, (err, files) => {
    if (err) throw err;
    else {
      files.forEach(file => {
        if (file.isFile()) {
          const filePath = path.join(assetsSource, `${file.name}`);
          const copyFilePath = path.join(assets, `${file.name}`);
          fs.copyFile(`${filePath}`, `${copyFilePath}`, (err) => {
            if (err) throw err;
          });
        } else {
          const filePath = path.join(assetsSource, `${file.name}`);
          const copyFilePath = path.join(assets, `${file.name}`);
          fs.mkdir(copyFilePath, {recursive: true}, (err) => {
            if (err) throw err;
          });
          copyAssets(filePath, copyFilePath);
        }
      });
    }
  });
}
copyAssets(assetsSource, assets);

