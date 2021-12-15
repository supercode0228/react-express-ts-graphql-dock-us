import React, {useState, useEffect} from 'react';
import { debounce } from 'lodash';
import { useQuery } from '@apollo/client';

import withApollo from '../lib/withApollo';
import { MOVIES_QUERY } from '../graphql/queries';
import MovieListItem from '../components/MovieListItem';
import SearchInput from '../components/SearchInput';
import { MovieType } from '../types';
import styles from '../styles/Home.module.css';

function Home(): JSX.Element {
  const [page, setPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [movies, setMovies] = useState<Array<MovieType>>([]);

  const { data, loading } = useQuery(MOVIES_QUERY, {variables: {page, type: 'popular', searchQuery}});

  const onLoadMore = () => {
    setPage(page + 1);
  };

  const handleSearch = debounce( (e) => {
    setSearchQuery(e.target.value);
    setPage(1);
    setMovies([]);
  }, 1000);

  useEffect(() => {
    if (data) {
      setMovies([
        ...movies,
        ...data.movies.results
      ]);
    }
  }, [data]);

  return (
    <div className={styles.container}>
      <h1 className="text-center">Popular Movie List</h1>
      <SearchInput onChange={handleSearch} />
      <main className={styles.main}>
        {!loading && movies.length === 0 && data.movies.total_pages === 0 && (
          <h2>Not Found Movies</h2>
        )}
        <div className={styles.movieList}>
          {movies.map(movie => {
            const { id, poster_path, title, vote_average, vote_count} = movie;
            return (
              <MovieListItem
                key={id}
                id={id}
                title={title}
                poster_path={poster_path}
                vote_average={vote_average}
                vote_count={vote_count}
              />
            )
          })}  
        </div>
      </main>

      <footer className={styles.footer}>
        {loading ? (
          <div>Loading...</div>
        ) : (
          page < data.movies.total_pages && (
            <button
              className={styles.btnLoadMore} 
              onClick={onLoadMore}
            >
              Load more
            </button>
          )
        )}
      </footer>
    </div>
  )
};

export default withApollo(Home);
