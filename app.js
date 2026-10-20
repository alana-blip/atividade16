const express = require('express')
const app = express()
const PORT = 8000
app.set('json spaces', 4);
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, ()=> {
    const msg = `Hello API running on PORT ${PORT}`
    const link = `http://localhost:${PORT}`
    const flink = `\x1b[1m${link}\x1b[0m`
    console.log(msg + '\n' + flink)
})

app.get('/v1/hi', function(req, res) {
    const out = {
        msg: "Hello, world!"
    }
    res.status(200).json(out)
})

app.get('/v1/hi/user/:name', function(req, res) {
    const out = {
        msg: "Hello, " + req.params.name.toUpperCase()
    }
    res.status(200).json(out)
})

app.post('/v1/hi', (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ error: "Name is required" });
    }

    const out = {
        msg: `Hello, ${name.toUpperCase()} from POST!`,
    };
    res.status(200).json(out);
});
// express v4 use '/*'
// express v5 use '/*splat'
app.get('/*splat', function(req, res) {
    const err = {
        error: 'Invalid endpoint'
    }
    res.json(err)
})