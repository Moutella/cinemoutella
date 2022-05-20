let filmes = require('./filmes_agregados.json')
let linguagens = new Set()

filmes_en = filmes.filter(filme => filme.original_language == 'en')
filmes_pt = filmes.filter(filme => filme.original_language == 'pt')
filmes.map(filme => linguagens.add(filme.original_language))
filmes_linguagem = {}
for (lingua of Array.from(linguagens)) {
  console.log(lingua)
  filmes_linguagem[lingua] = filmes.filter(filme => filme.original_language == lingua).length
}
console.log(filmes_en.length)
console.log(filmes_pt.length)
console.log(filmes_linguagem)