const fs = require("node:fs")
const readline = require('node:readline');
const helper = require("./helper")

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const app = {}

app.makeFolder = () => {
    rl.question("Masukan Nama Folder : ", (folderName) => {
        fs.mkdir(__dirname + `/${folderName}`, () => {
            console.log("success created new folder");

        })
        rl.close()
    })
}

app.makeFile = () => {
    rl.question("Masukan Nama File : ", (fileName) => {
        fs.writeFile(__dirname + `/${fileName}`, "", () => {
            console.log("success created new file");
        })
        rl.close()
    })
}

app.readFolder = () => {
    let result = []
    rl.question("Masukan Nama Folder : ", (folderName) => {
        fs.readdir(__dirname + `/${folderName}`, (err, files) => {
            if (err) throw err;
            files.forEach(file => {
                let stats = fs.statSync(__dirname + `/${folderName}/${file}`)
                result.push({
                    namaFile: file,
                    extensi: file.split(".")[1],
                    jenisFile: helper.checkFileType(file.split(".")[1]),
                    tanggalDibuat: new Date(stats.ctime).toISOString().split('T')[0],
                    ukuranFile: helper.convertFileSize(stats.size)
                })
            });
            console.log(result);
        })
        rl.close()
    })
}


module.exports = app