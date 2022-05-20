require('dotenv').config()

cinemovies = new Object()
var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

for (page = 1; page <= 50; page++) {
  fetch(`https://api.themoviedb.org/3/movie/top_rated?page=${page}&api_key=${process.env.tmdb_api_key}`, requestOptions)
    .then(response => response.json())
    .then(result => {
      cinemovies[result["page"]] = result
      if (result["page"] == 50) {
        console.log(JSON.stringify(cinemovies))
      }
    })
    .catch(error => console.log('error', error));
}

console.log("?????")