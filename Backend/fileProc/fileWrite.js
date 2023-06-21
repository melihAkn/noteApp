const fs = require('fs');
const path = require('path');

let filePath = './log/log.txt';
// get file 
const writeLogFile =(text) =>{
  //if file exists
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        const updatedContent = text + '\n' + data;
        // updated content write file
        fs.writeFile(filePath, updatedContent, 'utf8', (err) => {
          if (err) {
            // file write error
            console.error(err);
            return;
          }
          console.log('file updated.');
        });
      });
}

module.exports = writeLogFile;