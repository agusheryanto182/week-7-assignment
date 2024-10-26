const fs = require("node:fs")
const path = require("node:path");


const helper = {}

helper.convertFileSize = (bytes) => {
    if (bytes === 0) {
        return "n/a";
    }
    if (bytes > 1048576) {
        return (bytes / 1048576).toFixed(2) + "mb";
    }
    if (bytes > 1024) {
        return (bytes / 1024).toFixed(2) + "kb";
    }
    return bytes + "bytes";
}

helper.checkFileType = (ext) => {
    if (ext === "jpg" || ext === "png" || ext === "jpeg") {
        return "gambar"
    } else if (ext === "txt" || ext === 'md') {
        return "text"
    }
}
helper.showListOfFolders = (dirPath) => {
    return new Promise((resolve, reject) => {
        fs.readdir(dirPath, (err, files) => {
            if (err) {
                console.error("Error reading directory:", err);
                return reject(err);
            }

            // Filter the list of folders
            const folders = files.filter(file => {
                try {
                    const fileStat = fs.lstatSync(path.join(dirPath, file));
                    return fileStat.isDirectory() && !file.startsWith('.');
                } catch (e) {
                    console.error("Error reading file stats:", e);
                    return false;
                }
            });

            resolve(folders);
        });
    });
};


module.exports = helper