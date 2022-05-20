var fs = require('fs')
require('dotenv').config()
let filmes = require('./filmes_agregados.json')
let filmes_detalhados = []
let criar_filmes = async () => {
  let requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  for (let filme of filmes) {
    console.log(filme)
    let current_movie = new Object()
    let movie_data = await fetch(`https://api.themoviedb.org/3/movie/${filme.id}?api_key=${process.env.tmdb_api_key}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        return result
      })
      .catch(error => console.log('error', error));

    let alternative_titles = await fetch(`https://api.themoviedb.org/3/movie/${filme.id}/alternative_titles?api_key=${process.env.tmdb_api_key}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        return result
      })
      .catch(error => console.log('error', error));

    let movie_credits = await fetch(`https://api.themoviedb.org/3/movie/${filme.id}/credits?api_key=${process.env.tmdb_api_key}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        return result
      })
      .catch(error => console.log('error', error));
    let providers = await fetch(`https://api.themoviedb.org/3/movie/${filme.id}/watch/providers?api_key=${process.env.tmdb_api_key}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        return result
      })
      .catch(error => console.log('error', error));
    current_movie.original_title = movie_data.original_title
    current_movie.release_date = filme.release_date
    current_movie.original_language = filme.original_language
    current_movie.imdb_id = movie_data.imdb_id
    current_movie.genres = movie_data.genres.map(genero => genero.name)
    current_movie.main_actors = movie_credits.cast.slice(0, 4).map(ator => ator.name)
    current_movie.alternative_titles = {}
    alternative_titles.titles.map(titulo => {
      current_movie.alternative_titles[titulo.iso_3166_1] = titulo.title
    })
    if (providers.results.BR && providers.results.BR.flatrate)
      current_movie.providers = providers.results.BR.flatrate.map(provider => provider.provider_name)
    filmes_detalhados.push(current_movie)
  }
  fs.writeFile('filmes_detalhados.json', JSON.stringify(filmes_detalhados), function (err) {
    if (err) throw err;
  })


}


criar_filmes()