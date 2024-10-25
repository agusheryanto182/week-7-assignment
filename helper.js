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

module.exports = helper