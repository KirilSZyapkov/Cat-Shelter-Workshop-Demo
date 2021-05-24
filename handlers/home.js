const url = require('url');
const fs = require('fs');
const path = require('path');
const cats = require('../data/cats');

module.exports = (req, res) => {
    const pathName = url.parse(req.url).pathname;

    if (pathName === '/' && req.method === 'GET') {
        let filePath = path.normalize(
            path.join(__dirname, '../views/home/index.html')
        );
        let temp = cats.map((x) => `  
        <li>
        <img src=${x.image} alt="${x.name}">
        <h3></h3>
        <p><span>Breed: </span>${x.breed}</p>
        <p><span>Description: </span>${x.description}</p>
        <ul class="buttons">
            <li class="btn edit"><a href="/cats/edit-cat">Change Info</a></li>
            <li class="btn delete"><a href="">New Home</a></li>
        </ul>
        </li>`);

        fs.readFile(filePath, { encoding: 'utf8' }, (err, data) => {
            if (err) {
                console.log(err);
                return
            }
            let mod = data.toString().replace('{{cats}}', temp)
            res.write(mod);
            res.end();
        });
    } else {
        return true;
    }
}