const fs = require('fs');
const url = require('url');

function getContentType(urls) {
    if (urls.endsWith('css')) {
        return 'text/css';
    } else if (urls.endsWith('html')) {
        return 'text/html';
    } else if (urls.endsWith('png')) {
        return 'text/png';
    } else if (urls.endsWith('js')) {
        return 'text/js';
    } else if (urls.endsWith('json')) {
        return 'text/json';
    } else if (urls.endsWith('ico')){
        return 'text/ico';
    }
}


module.exports = (req, res) => {
    const pathName = url.parse(req.url).pathname;
    const type = getContentType(pathName);

    if (pathName.startsWith('/content') && req.method === 'GET') {
        fs.readFile(`./${pathName}`, { encoding: 'utf8' }, (err, data) => {
            if (err) {
                console.log(err);
                res.writeHead(400, {
                    'Context-Type': 'text/plain',
                });
                res.write('Error was found');
                res.end();
                return;
            }

            res.writeHead(
                200,
                { 'Context-Type': type }
            );


            res.write(data);
            res.end();

        })
    } else {
        return true;
    }
}