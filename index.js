const express = require('express');
const app = express();
const port = 3000;
const connection = require('./database/database');
const Pergunta = require('./database/Pergunta');
const pergunta = require('./database/Pergunta');

//Database

connection
.authenticate()
.then(
    ()=>{
        console.log("conectado o db");
    }
)
.catch((msErro)=>{
    console.log("Deu ruim "+msErro);
})

// Estou dizendo para o Express usar o EJS como View engine
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use (express.urlencoded ({ extended: true })); // substui o body-parser
app.use (express.json());


app.get('/', (req, res) => {
    Pergunta.findAll({rew: true, order:[
        ['id','DESC'] //ASC = Crescente .. DESC = decrescente
    ]}).then(perguntas =>{
        res.render("index",{
            perguntas: perguntas
        });
    });
    
});

app.get('/perguntar', (req, res)=>{
    res.render('perguntar');
});

app.get('/pergunta/:id', (req, res) => {
    var id = req.params.id;
    Pergunta.findOne({
        where : {id: id}
    }).then(pergunta =>{
        if(pergunta != undefined){
            res.render('pergunta', {
                pergunta: pergunta
            });
        }else{
            res.redirect('/')
        }
    })
})

app.post('/salvarpergunta',(req, res)=>{
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }
        

    ).then(()=>{
        res.redirect('/');
    })

});
app.listen(port, () => console.log(`Example app listening on port port!`))