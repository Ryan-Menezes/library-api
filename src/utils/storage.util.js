const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const md5 = require('md5');

const { storage: storageConfig } = require('../config/index');

module.exports = {
    upload: file => new Promise((resolve, reject) => {
        crypto.randomBytes(5, (error, buffer) => {
            if (error) {
                return reject(error);
            }

            const filename = md5(buffer.toString('hex') + new Date().getTime() + file.hapi.filename) + path.extname(file.hapi.filename);

            const data = file._data;
            const p = path.join(__dirname, '..', storageConfig.path, filename);

            fs.writeFile(p, data, error => {
                if (error) {
                    return reject(error);
                }

                resolve({
                    filename,
                    path: p,
                });
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
