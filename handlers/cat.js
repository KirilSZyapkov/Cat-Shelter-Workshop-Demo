const url = require('url');
const fs = require('fs');
const path = require('path');
const qs = require('querystring');
const formidable = require('formidable');
const breeds = require('../data/breeds');
const cats = require('../data/cats');

module.exports = (req, res) => {
    const pathName = url.parse(req.url).pathname;

    if (pathName === '/cats/add-cat' && req.method === 'GET') {
        let filePath = path.normalize(path.join(__dirname, '../views/addCat.html'));
        const file = fs.createReadStream(filePath);
        let temp = breeds.map((x) => `<option value="${x.breed}">${x.breed}</option>`);
        file.on('data', (data) => {
            let mod = data.toString().replace('{{breed}}', temp);
            res.write(mod);
        });

        file.on('end', () => {
            res.end();
        });

        file.on('error', (err) => {
            console.log(err);
        });
    } else if (pathName === '/cats/add-breed' && req.method === 'GET') {
        let filePath = path.normalize(path.join(__dirname, '../views/addBreed.html'));
        let file = fs.createReadStream(filePath);


        file.on('data', (data) => {

            res.write(data);
        });

        file.on('end', () => {
            res.end();
        });

        file.on('error', (err) => {
            console.log(err);
        })
    } else if (pathName === '/cats/cat-shelter' && req.method === 'GET') {
        let filePath = path.normalize(path.join(__dirname, '../views/catShelter.html'));
        let file = fs.createReadStream(filePath);

        file.on('data', (data) => {
            res.write(data);
        });

        file.on('end', () => {
            res.end();
        });

        file.on('error', (err) => {
            console.log(err);
        });
    } else if (pathName === '/cats/edit-cat' && req.method === 'GET') {
        let filePath = path.normalize(path.join(__dirname, '../views/editCat.html'));
        let file = fs.createReadStream(filePath);

        let temp = breeds.map((x) => `<option value="${x.breed}">${x.breed}</option>`);

        file.on('data', (data) => {
            let mod = data.toString().replace('{{breed}}', temp);
            res.write(mod);
        });

        file.on('end', () => {
            res.end();
        });

        file.on('error', (err) => {
            console.log(err);
        });
    } else if (pathName === '/cats/add-breed' && req.method === 'POST') {
        const form = new formidable.IncomingForm();
        form.parse(req, (err, fields) => {
            const itm = breeds.find(x => x.breed === fields.breed);

            if (itm === undefined || itm.breed !== fields.breed) {
                breeds.push(fields);
                let filePath = path.normalize(path.join(__dirname, '../data/breeds.json'));
                fs.writeFile(filePath, JSON.stringify(breeds), (err) => {
                    if (err) {
                        return console.log(err);
                    }
                });
                res.writeHead(301, {
                    'Location': '/'
                });

                res.end();
            } else {
                res.write('Breed exist');
                res.end();
            }
        })

    } else if (pathName === '/cats/add-cat' && req.method === 'POST') {
        const form = new formidable.IncomingForm();
        form.parse(req, (err, fields) => {
            const itm = cats.find(x => x.name === fields.name);
            if (itm === undefined || itm.name !== fields.name) {
                let item = fields;
                item['id'] = 12;

                cats.push(item);
                let filePath = path.normalize(path.join(__dirname, '../data/cats.json'));
                fs.writeFile(filePath, JSON.stringify(cats), (err) => {
                    if (err) {
                        return console.log(err);
                    };
                    res.writeHead(301, {
                        'Location': '/'
                    });
                    res.end();
                })
            } else {
                res.writeHead(301, {
                    'Location': '/'
                });
                res.end();
            }
        })

    } else {
        return true
    }
}