export type MovieType = {
  id: number,
  title: string,
  overview: string,
  homepage: string,
  budget: number,
  video: boolean,
  genres: [MovieGenreType]
  adult: boolean
  backdrop_path: string,
  poster_path: string,
  original_language: string,
  original_title: string,
  popularity: number
  release_date: string,
  vote_average: number
  vote_count: number,
  status: string,
};

type MovieGenreType = {
  id: number,
  name: string,
}
