const express = require("express");

const app = express();

app.use(express.urlencoded({ extended: true }));

let eventos = [
  {
    id: 1,
    nome: "Semana da Tecnologia",
    local: "Auditório Central",
    data: "2026-08-20"
  }
];

let proximoId = 2;

app.get("/", (req, res) => {

  let html = `
  <!DOCTYPE html>
  <html>
  <head>
      <title>EventHub</title>
  </head>
  <body>

      <h1>Gerenciamento de Eventos</h1>

      <h2>Novo Evento</h2>

      <form action="/adicionar" method="POST">

          <input
            type="text"
            name="nome"
            placeholder="Nome do Evento"
            required>

          <br><br>

          <input
            type="text"
            name="local"
            placeholder="Local"
            required>

          <br><br>

          <input
            type="date"
            name="data"
            required>

          <br><br>

          <button type="submit">
            Cadastrar Evento
          </button>

      </form>

      <hr>

      <h2>Eventos Cadastrados</h2>

      <table border="1">

          <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Local</th>
              <th>Data</th>
              <th>Ações</th>
          </tr>
  `;

  eventos.forEach(evento => {

    html += `
      <tr>

        <td>${evento.id}</td>
        <td>${evento.nome}</td>
        <td>${evento.local}</td>
        <td>${evento.data}</td>

        <td>
          <a href="/deletar/${evento.id}">
            Excluir
          </a>
        </td>

      </tr>
    `;

  });

  html += `
      </table>

  </body>
  </html>
  `;

  res.send(html);

});

app.post("/adicionar", (req, res) => {

  eventos.push({
    id: proximoId++,
    nome: req.body.nome,
    local: req.body.local,
    data: req.body.data
  });

  res.redirect("/");

});

app.get("/deletar/:id", (req, res) => {

  const id = Number(req.params.id);

  eventos = eventos.filter(
    evento => evento.id !== id
  );

  res.redirect("/");

});

app.listen(3000, "0.0.0.0", () => {
  console.log("Sistema de Eventos iniciado");
});