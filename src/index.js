require('dotenv').config();
require('./services/index');
require('./server').start();

process.on('unhandledRejection', (error) => {
    console.log(error);
    process.exit(1);
});
