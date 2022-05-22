const path = require('path')
const fs = require('fs')
const {stdin, stdout} = process
const stylesPath = path.join(__dirname, 'styles')
const bundleArr = []
fs.readdir(stylesPath, {withFileTypes: true}, (err, files) => {
    if (err) throw err
    else {
        files.forEach(file => {
            if (file.isFile() && path.extname(file.name) === '.css') {
                const currentFile = path.join(__dirname, 'styles', `${file.name}`)               
                const styleReadStream = fs.createReadStream(currentFile, 'utf-8')
                styleReadStream.on('data', style => {
                    bundleArr.push(style)
                    const styleWriteStream = fs.createWriteStream(path.join(__dirname, 'project-dist', 'bundle.css'))
                    styleWriteStream.write(bundleArr.join(' ').toString())
                })
            }
        });
    }
})