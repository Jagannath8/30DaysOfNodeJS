const fs = require('fs')
async function writeToFile(filePath, content) {
    fs.writeFile(filePath, content, 'utf8', (err) => {
      if(err) 
        console.log(`Error writing file:", ${err}`)
      else 
        console.log(`Data written to:\n${filePath}`)
    })
}

writeToFile('test-files/output1.txt', 'Sample content.');
writeToFile('test-files/nonexistent-folder/output.txt', 'Content in a non-existent folder.');