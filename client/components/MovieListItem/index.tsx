import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import styles from './MovieListItem.module.css';

export type MovieListItemPropsType = {
  id: number;
  title: string;
  poster_path: string,
  vote_average: number;
  vote_count: number;
}

export default function MovieListItem(props: MovieListItemPropsType): JSX.Element {
  const { id, title, poster_path, vote_average, vote_count} = props;
  const imgLoader = ({src, width, quality}) => {
    return `https://image.tmdb.org/t/p/w500/${src}?w=${width}&q=${quality || 75}`
  }

  return (
    <Link href={`/detail/${id}`}>
      <div className={styles.container}>
        {poster_path ? (
          <Image
            loader={imgLoader}
            src={poster_path}
            width={200}
            height={300}
          />
        ) : (
          <div className={styles.imgTmp} />
        )}
        <div className={styles.title}>
          <strong>{title}</strong>
        </div>
        <div className={styles.voteAvg}>
          ⭐ &nbsp;{vote_average}
        </div>
        <div className={styles.voteCnt}>
          {vote_count} votes
        </div>
      </div>
    </Link>
  )
}
