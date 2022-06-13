const path = require('path');
const fs = require('fs');

const { storage: storageConfig } = require('../config/index');

module.exports = {
    upload: file => new Promise((resolve, reject) => {
        const filename = new Date().getTime() + '_' + file.hapi.filename;
        const data = file._data;
        const p = path.join(__dirname, '..', storageConfig.path, filename);

        fs.writeFile(p, data, error => {
            if (error) {
                reject(error);
            }

            resolve({
                filename,
                path: p,
            });
        });
    }),

    remove: filename => new Promise((resolve, reject) => {
        const p = path.join(__dirname, '..', storageConfig.path, filename);

        fs.unlink(p, (error) => {
            if (error) {
                reject(error);
            }

            resolve({
                path: p,
            });
        });
    }),
};
