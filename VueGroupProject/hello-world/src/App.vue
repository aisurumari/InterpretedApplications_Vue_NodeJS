<template>
  <div id="app">
    <Search :jsonDatabase="moviesData"
    :lodash="lodash"/>
    <!--  <MoviesTable :jsonDatabase="moviesData"/>
    -->
    <MoviesGenre :jsonData="genresData" :jsonMovies="moviesData"/>
    <MoviesCast :jsonData="moviesData"/>
  </div>
</template>

<script>
import lodash from "lodash";
import json from './assets/movies.json'
import genreJson from './assets/genres.json'
import Search from './components/Search.vue'
import MoviesCast from "@/components/MoviesCast";
import MoviesGenre from "@/components/MoviesGenre";

export default {
  name: 'App',
  components: {
    MoviesGenre,
    MoviesCast,
    Search,
  },
  data() {
    return {
      moviesData: json,
      genresData: genreJson,
      lodash: lodash,
    };
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}

body {
  margin: 0;
  padding: 0;
}
</style>
