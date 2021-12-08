const { gql } = require('apollo-server-express');

module.exports = gql`
  extend type Query {
    movies(page: Int, type: String, searchQuery: String): MoviesData
    movie(id: Int): Movie
  }
  type MoviesData {
    page: Int
    results: [Movie]
    total_pages: Int
    total_results: Int
  }
  type Movie {
    id: Int
    title: String
    overview: String
    homepage: String
    budget: Int
    video: Boolean
    genres: [MovieGenre]
    adult: Boolean
    backdrop_path: String
    poster_path: String
    original_language: String
    original_title: String
    popularity: Float
    release_date: String
    vote_average: Float
    vote_count: Int
    status: String
  }
  type MovieGenre {
    id: Int
    name: String
  }
`;
