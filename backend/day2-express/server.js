let express = require('express');

let app = express();

console.log('Hello World');

let port = 3000
app.listen(port, () => {
    console.log(`server is running on port ${port}`)
});