const { exec } = require('child_process');

function executeCommand(command) {
    exec(command, (error, stdout, stderr) => {
        if (error || stderr) {
            console.error(`Error executing command: ${error.message || stderr}`);
            return;
        }
        console.log("Command Output:");
        console.error(stdout);
    });
}

executeCommand('dir'); // Using 'dir' command for Windows
executeCommand('echo "Hello, Node.js!"');