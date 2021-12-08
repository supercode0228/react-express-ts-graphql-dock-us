import gql from "graphql-tag";

export const MOVIES_QUERY = gql`
  query movies($page: Int, $type: String, $searchQuery: String) {
    movies(page: $page, type: $type, searchQuery: $searchQuery) {
      page
      results {
        id
        title
        overview
        video
        adult
        backdrop_path
        poster_path
        original_language
        original_title
        popularity
        release_date
        vote_average
        vote_count
      }
      total_pages
      total_results
    }
  }
`;

export const MOVIE_DETAIL_QUERY = gql`
  query movie($id: Int) {
    movie(id: $id) {
      title
      budget
      genres {
        id
        name
      }
      status
      release_date
      overview
      homepage
      poster_path
    }
  }
`;
