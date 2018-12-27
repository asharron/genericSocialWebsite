const express = require('express');
const app = express();
const port = 8000;

app.use(express.static('../frontend/build'));

app.listen(port, () => {
    console.log("Server is up and running on 8000");
});


