let filmes = require('./cinemovies.json')

let filmes_agregados = []
for (pagina in filmes) {
  filmes_agregados = filmes_agregados.concat(filmes[pagina]["results"])
}

console.log(JSON.stringify(filmes_agregados))