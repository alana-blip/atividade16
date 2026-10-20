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

const dicionario = {
    en: {
        helloWorld: "Hello, World!",
        helloUser: (name) => `Hello, ${name}!`,
        helloPost: (name) => `Hello, ${name} from POST`,
        errorNameRequired: "Name is Required"
    },
    pt: {
        helloWorld: "Olá, Mundo!",
        helloUser: (name) => `Olá, ${name}!`,
        helloPost: (name) => `Olá, ${name} do POST`,
        errorNameRequired: "O Nome é Obrigatório"
    },
    es: {
        helloWorld: "¡Hola, Mundo!",
        helloUser: (name) => `¡Hola, ${name}!`,
        helloPost: (name) => `¡Hola, ${name} desde POST`,
        errorNameRequired: "El Nombre es Obligatorio"
    }
}

function checkLang(req, res, next) {
    let lang = req.params.lang?.toLowerCase();

    if (lang?.startsWith('pt')) lang = 'pt';

    if (!dicionario[lang]) {
        return res.status(400).json({ 
            error: "Language not supported. Use: pt, en or es" 
        });
    }

    req.t = dicionario[lang];
    next();
}

app.get('/v2/hi/:lang', checkLang, function(req, res) {
    const out = {
        msg: req.t.helloWorld
    }
    res.status(200).json(out)
})

app.get('/v2/hi/user/:lang/:name', checkLang, function(req, res) {
    const formattedName = req.params.name.toUpperCase();
    const out = {
        msg: req.t.helloUser(formattedName)
    }
    res.status(200).json(out)
})

app.post('/v2/hi/:lang', checkLang, (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ error: req.t.errorNameRequired });
    }

    const out = {
        msg: req.t.helloPost(formattedName),
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