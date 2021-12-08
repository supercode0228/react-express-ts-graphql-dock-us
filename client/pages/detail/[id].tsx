import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';

import withApollo from '../../lib/withApollo';
import { MOVIE_DETAIL_QUERY } from '../../graphql/queries';
import styles from '../../styles/Detail.module.css';

function MovieDetail(): JSX.Element {
  const router = useRouter();
  const id = router.query.id;
  if (id) {
    const variables = {id: parseInt(id.toString())}
    const { data, loading, error } = useQuery(MOVIE_DETAIL_QUERY, {variables});

    if (loading) {
      return <div className={styles.container}>loading...</div>;
    } else {
      const {budget, genres, homepage, title, overview, poster_path, release_date} = data.movie;
      const imgLoader = ({src, width, quality}) => {
        return `https://image.tmdb.org/t/p/w500/${src}?w=${width}&q=${quality || 75}`
      }
      return (
        <div className={styles.container}>
          <div className={styles.header}>
            <Image
              loader={imgLoader}
              src={poster_path}
              width={300}
              height={450}
            />
            <div className={styles.basicInfo}>
              <div className={styles.title}>
                <strong>Title: </strong>
                {title}
              </div>
              <div>
                <strong>Genres: </strong>
                {genres.map(genre => (
                  <span>{genre.name},&nbsp;</span>
                ))}
              </div>
              <div>
                <strong>Release Date: </strong>
                {release_date}
              </div>
              {budget > 0 && (
                <div>
                  <strong>Budget: </strong>
                  ${budget}
                </div>
              )}
              {homepage && (
                <div className={styles.videoLink}>
                  <Link href={homepage}>
                    <a target="_blank" rel="noreferrer">Go to Video</a>
                  </Link>
                </div>
              )}
              <div className={styles.videoLink}>
                <Link href="/">
                  Go to Home
                </Link>
              </div>
            </div>
          </div>
          <div className={styles.overview}>
            {overview}
          </div>
        </div>
      )
    }
  } else return <div/>;
}

export default withApollo(MovieDetail);
