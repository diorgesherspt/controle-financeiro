const express = require("express")
const app = express()
const mysql= require("mysql")
const cors= require ("cors")

const db = mysql.createPool({
    host:"localhost",
    user:"user",
    password: "user",
    database: "movimentacoes"
})

app.use(cors())
app.use(express.json())

app.post("/register", (req,res)=>{
    const {descricao} = req.body
    const {categoria} = req.body
    let {valor} = req.body
    const {anoMesDia} = req.body
    const {escolha} = req.body
    const {dia} = req.body
    const {mes} = req.body
    const {ano} = req.body
    const {anoMes} = req.body

    valor = parseFloat(valor);



    
    let SQL ="insert into tabelamovimentacoes (descricao, categoria, valor, ano, mes, dia, anoMes, anoMesDia,tipo) values (?,?,?,?,?,?,?,?,?)"
    db.query(SQL,[descricao,categoria,valor,ano,mes,dia,anoMes,anoMesDia,escolha],(err,result)=>{
        console.log(err)
    })

})

app.get("/getTabela",(req,res)=>{
    let SQL= "select * from tabelamovimentacoes"
    db.query(SQL,(err, result)=>{
        if(err) console.log(err)
        else res.send(result)
    })
})

app.get("/getLancamento",(req,res) => {
    let SQL ="SELECT COUNT(*) AS total_registros FROM tabelamovimentacoes"
    db.query(SQL,(err,result)=>{
        if(err) console.log(err)
        else res.send(result)
    })
})

app.get("/getReceita",(req,res) => {
    let SQL ="SELECT SUM(valor) AS total FROM tabelamovimentacoes where tipo='Receita'"
    db.query(SQL,(err,result)=>{
        if(err) console.log(err)
        else res.send(result)
    })
})

app.get("/getDespesa",(req,res) => {
    let SQL ="SELECT SUM(valor) AS total FROM tabelamovimentacoes where tipo='Despesa'"
    db.query(SQL,(err,result)=>{
        if(err) console.log(err)
        else res.send(result)
    })
})


app.put("/edit", (req,res) =>{
    const {id} = req.body
    const {descricao} = req.body
    const {categoria} = req.body
    let {valor} = req.body
    valor = parseFloat(valor);

    let SQL = "update tabelamovimentacoes set descricao=?, categoria=?, valor= ? where id=?"
    db.query(SQL,[descricao, categoria ,valor , id],(err,result)=>{
        if (err) console.log(err)
        else res.send(result)
    })
}) 

app.delete("/delete/:id", (req,res)=>{
    const {id} = req.params
    let SQL = "delete from tabelamovimentacoes where id = ?"
    db.query(SQL, [id], (err, result) => {
        if (err) console.log(err)
        else res.send(result)
    })
})

app.listen(3001, ()=> {
    console.log("rodando servidor")
})