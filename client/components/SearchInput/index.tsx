import React from 'react';
import styles from './SearchInput.module.css';

export type SearchInputPropsType = {
  onChange: (e) => void,
};

export default function SearchInput(props: SearchInputPropsType): JSX.Element {
  const { onChange } = props;
  const [value, setValue] = React.useState('')
  const handleChange = (e) => {
    setValue(e.target.value);
    onChange(e);
  }
  return (
    <div className={styles.container}>
      <input
        placeholder="Search movies..."
        value={value}
        onChange={handleChange}
        className={styles.searchInput}
      />
    </div>
  )
}
