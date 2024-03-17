// script src="os"
const os = require('os')
const checkDiskSpace = require('check-disk-space').default;

console.log('Total memory: ' + os.totalmem() / 1024 / 1024 / 1024, 'GB');
console.log('Total memory: ' + os.freemem() / 1024 / 1024 / 1024, 'GB');

console.log('CPUs: ', os.cpus().length, ' cores');
os.cpus().forEach((cpu, index) => {
    console.log(`CPU #${index + 1}:`, cpu.model);
});

(async () => {
    // Disk space information for drives C and D (for Windows)
    const drives = ['C:/']; // For Windows, you might use 'C:/' or 'D:/', for Unix-like '/'

    for (const drive of drives) {
        const diskSpace = await checkDiskSpace(drive);
        console.log(`${drive} Free Space:`, diskSpace.free / 1024 / 1024 / 1024, 'GB');
        console.log(`${drive} Total Space:`, diskSpace.size / 1024 / 1024 / 1024, 'GB');
    }
})()

// OS information
console.log('OS Platform:', os.platform());
console.log('OS Release:', os.release()); // only windows
console.log('OS Type:', os.type()); // only windows

// Other cool stuff
console.log('System Uptime:', os.uptime() / 60 / 60, 'hours');
console.log('Home Directory:', os.homedir());
console.log('Temporary Directory:', os.tmpdir());

