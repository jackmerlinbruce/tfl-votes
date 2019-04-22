const express = require('express');
const app = express();
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send('hello world')
})

const PORT = process.env.PORT || 5555;
app.listen(PORT, function() {
    console.log(`Listening on localhost:${PORT}`)
})