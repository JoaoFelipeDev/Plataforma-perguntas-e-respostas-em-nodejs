const express = require('express')
const app = express()
const port = 3000

// Estou dizendo para o Express usar o EJS como View engine
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    var nome = 'Jao';
    var lang = 'Dart';
    res.render("index",{
        nome: nome,
        lang : lang,
    });
})
app.listen(port, () => console.log(`Example app listening on port port!`))