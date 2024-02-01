const fs = require('fs')
async function readFileContent(filePath) {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if(err) 
        console.log(`Error reading file:", ${err}`)
      else 
        console.log(`File Content:\n${data}`)
    })
}

readFileContent('test-files/file1.txt');
readFileContent('test-files/empty-file.txt');
readFileContent('test-files/nonexistent-file.txt');