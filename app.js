const fs = require("node:fs")
const readline = require('node:readline');
const helper = require("./helper");
const path = require("node:path");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const app = {}

app.makeFolder = () => {
    rl.question("Masukan Nama Folder : ", (folderName) => {
        // check folder
        if (fs.existsSync(__dirname + `/${folderName}`)) {
            console.log("Folder already exists");
            rl.close();
            return;
        }

        // create folder
        fs.mkdir(__dirname + `/${folderName}`, () => {
            console.log("success created new folder");
        })
        rl.close()
    })
}

app.makeFile = async () => {
    try {
        const folders = await helper.showListOfFoldersOrFile(__dirname, true);
        console.log("List of folders:", folders);
        console.log("");

        let currDir = __dirname;

        const askToEnterFolder = () => {
            rl.question("Apakah ingin masuk ke folder? (y/n) ", (answer) => {
                if (answer.toLowerCase() === "y") {
                    rl.question("Masukan Nama Folder: ", (folderName) => {
                        currDir = helper.updateCurrentPath(currDir, folderName);

                        if (!fs.existsSync(currDir)) {
                            console.log("Folder doesn't exist");
                            rl.close();
                            return;
                        }

                        console.log("Direktori saat ini:", currDir);
                        askToEnterFolder();
                    });
                } else {
                    askToCreateFile();
                }
            });
        };

        const askToCreateFile = () => {
            rl.question("Masukan Nama File: ", (fileName) => {
                rl.question("Masukan Extensi File: ", (ext) => {
                    if (!fileName || !ext) {
                        console.log("Invalid input");
                        rl.close();
                        return;
                    }

                    const filePath = path.join(currDir, `${fileName}.${ext}`);

                    try {
                        fs.writeFileSync(filePath, "");
                        console.log(`Success: Created new file at ${filePath}`);
                        rl.close();
                        return;
                    } catch (err) {
                        console.error(`Error: ${err.message}`);
                        rl.close();
                        return;
                    }
                });
            });
        };

        askToEnterFolder();
    } catch (err) {
        console.error("Failed to get folders:", err);
        rl.close();
        return
    }
};

app.readFolder = async () => {
    try {
        // show the list of folders without file and hidden file
        const folders = await helper.showListOfFoldersOrFile(__dirname, true);
        console.log("list of folders : ", folders);
        console.log("")

        let result = []
        rl.question("Masukan Nama Folder yang akan dibaca: ", (folderName) => {
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

                // sort by date created
                result.sort((a, b) => a.tanggalDibuat - b.tanggalDibuat)
                console.log(result);
            })
            rl.close()
        })
    } catch (err) {
        console.error("Failed to get folders:", err);
        rl.close();
    }
}

app.readFile = async () => {
    try {
        // show the list of folders without file and hidden file
        const folders = await helper.showListOfFoldersOrFile(__dirname, false);
        console.log("list of files : ", folders);
        console.log("")

        rl.question("Apakah ingin masuk ke folder? (y/n) ", (answer) => {
            if (answer.toLowerCase() === "y") {
                rl.question("Masukan Nama Folder : ", (folderName) => {
                    if (!fs.existsSync(__dirname + `/${folderName}`)) {
                        console.log("Folder doesn't exist");
                        rl.close();
                        return
                    }

                    const files = fs.readdirSync(__dirname + `/${folderName}`);
                    console.log("")
                    console.log('List of files:');
                    files.forEach(file => {
                        console.log(file);
                    });
                    console.log("")


                    rl.question("Masukan Nama File : ", (fileName) => {
                        // check file
                        if (!fs.existsSync(__dirname + `/${folderName}/${fileName}`)) {
                            console.log("File doesn't exist");
                            rl.close();
                            return
                        }

                        fs.readFile(__dirname + `/${folderName}/${fileName}`, 'utf8', (err, data) => {
                            if (err) throw err;

                            console.log(fileName.split(".")[1]);
                            console.log(`Isi dari file ${fileName}`);
                            console.log(data);
                            rl.close()
                            return
                        })
                    })
                })
            } else {
                rl.question("Masukan Nama File : ", (fileName) => {
                    // check file
                    fs.readFile(__dirname + `/${fileName}`, 'utf8', (err, data) => {
                        if (err) throw err;
                        console.log(fileName.split(".")[1]);
                        console.log(`Isi dari file ${fileName}`);
                        console.log(data);
                        rl.close()
                        return
                    })
                })
            }
        })
    } catch (err) {
        console.error("Failed to get folders:", err);
        rl.close();
        return
    }
}


module.exports = app