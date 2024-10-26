const fs = require("node:fs")
const readline = require('node:readline');
const helper = require("./helper");
const path = require("node:path");
const { validateHeaderName } = require("node:http");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const app = {}

app.makeFolder = async () => {
    try {
        let currDir = __dirname;

        const folders = await helper.showListOfFoldersOrFile(currDir, true);
        console.log("List of folders:", folders);
        console.log("");

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

                        const currFolders = helper.showFolders(currDir);
                        console.log("List of folders:", currFolders);
                        askToEnterFolder();
                    });
                } else {
                    createFolder();
                }
            });
        };

        const createFolder = () => {
            rl.question("Masukan Nama Folder yang akan Dibuat: ", (folderName) => {
                // check folder
                if (fs.existsSync(currDir + `/${folderName}`)) {
                    console.log("Folder already exists");
                    rl.close();
                    return;
                }

                // create folder
                fs.mkdir(currDir + `/${folderName}`, () => {
                    console.log("success created new folder");
                })
                rl.close()
            })
        }

        askToEnterFolder();
    } catch (err) {
        console.error("Failed to get folders:", err);
        rl.close();
        return
    }
}

app.makeFile = async () => {
    try {
        let currDir = __dirname;

        const folders = await helper.showListOfFoldersOrFile(currDir, true);
        console.log("List of folders:", folders);
        console.log("");

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

                        const currFolders = helper.showFolders(currDir);
                        console.log("List of folders:", currFolders);
                        askToEnterFolder();
                    });
                } else {
                    createFile();
                }
            });
        };

        const createFile = () => {
            const files = helper.showAllFiles(currDir)
            console.log("List of files:", files);

            rl.question("Masukan Nama File yang akan Dibuat: ", (fileName) => {
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
        let currDir = __dirname;

        const folders = await helper.showListOfFoldersOrFile(currDir, true);
        console.log("List of folders:", folders);
        console.log("");

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

                        const currFolders = helper.showFolders(currDir);
                        console.log("List of folders:", currFolders);
                        askToEnterFolder();
                    });
                } else {
                    readFolder();
                }
            });
        };

        const readFolder = () => {
            let result = []
            rl.question("Masukan Nama Folder yang akan dibaca: ", (folderName) => {
                fs.readdir(currDir + `/${folderName}`, (err, files) => {
                    if (err) throw err;
                    files.forEach(file => {
                        let stats = fs.statSync(currDir + `/${folderName}/${file}`)
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
                    rl.close()
                    return;
                })
            })
        }

        askToEnterFolder();
    } catch (err) {
        console.error("Failed to get folders:", err);
        rl.close();
        return;
    }
}

app.readFile = async () => {
    try {
        let currDir = __dirname;

        const folders = await helper.showListOfFoldersOrFile(currDir, true);
        console.log("List of folders:", folders);
        console.log("");

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

                        const currFolders = helper.showFolders(currDir);
                        console.log("List of folders:", currFolders);
                        askToEnterFolder();
                    });
                } else {
                    readFile();
                }
            });
        };

        const readFile = () => {
            const files = helper.showAllFiles(currDir)
            console.log("List of files:", files);

            rl.question("Masukan Nama File yang akan dibaca : ", (fileName) => {
                const currPath = helper.updateCurrentPath(currDir, fileName)
                // check file
                if (!fs.existsSync(currPath)) {
                    console.log("File doesn't exist");
                    rl.close();
                    return
                }

                fs.readFile(currPath, 'utf8', (err, data) => {
                    if (err) throw err;

                    console.log(fileName.split(".")[1]);
                    console.log(`Isi dari file ${fileName}`);
                    console.log(data);
                    rl.close()
                    return
                })
            })
        }

        askToEnterFolder();

    } catch (err) {
        console.error("Failed to get folders:", err);
        rl.close();
        return
    }
}


module.exports = app