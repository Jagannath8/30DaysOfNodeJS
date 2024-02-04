const path = require('path');

function resolvePath(relativePath) {
    const absolutePath = path.resolve(relativePath);
    console.log("Resolved path:", absolutePath);
}

resolvePath('../project/folder/file.txt');
resolvePath('nonexistent-folder/file.txt');