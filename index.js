const express = require('express');
const session = require('express-session'); 
const bodyParser = require('body-parser');

const port = 3000;
var path = require('path'); // para setar o diretorio das views
const app = express(); //definir rotas

var login = "nathalia";
var password = "123456";

//express usar a session
app.use(session({secret:'hvdfsjhvdfsjhvfhsdfvdjfdsjkh'}));

//recuperando dados formulário 
app.use(bodyParser.urlencoded({extended:true}));

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use('/public', express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, '/views'));



app.post('/',(req,res)=>{
    
    if(req.body.password == password && req.body.login == login){
        //logado com sucesso!
        req.session.login = login;

        res.render('logado',{login: login});


    }else{
        res.render('index');
    }

   
})


//pagina inicial
app.get('/',(req,res)=>{
    if(req.session.login){
        res.render('logado',{login: login});
        console.log('Usuário logado é: '+ req.session.login);
    }else{
        res.render('index');
    }
})

app.listen(port, ()=>{
    console.log('servidor rodando');
   
})