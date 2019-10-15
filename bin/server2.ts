import * as http from 'http';
const app = require('../src/app').default;
const PORT = 8080;


http.createServer(app).listen(PORT, () => {
    console.log('Server listening on port ' + PORT);
});