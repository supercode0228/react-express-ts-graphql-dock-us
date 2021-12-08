import React from 'react';
import styles from './SearchInput.module.css';

export type SearchInputPropsType = {
  query: string,
  onChange: (e) => void,
};

export default function SearchInput(props: SearchInputPropsType): JSX.Element {
  const { query, onChange } = props;
  return (
    <div className={styles.container}>
      <input
        placeholder="Search movies..."
        value={query}
        onChange={onChange}
        className={styles.searchInput}
      />
    </div>
  )
}
