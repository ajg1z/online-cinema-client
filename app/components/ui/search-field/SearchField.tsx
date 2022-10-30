import { ChangeEvent, FC } from 'react';

import MaterialIcon from '../material-icon/MaterialIcon';

import styles from './SearchField.module.scss';

interface ISearchFieldProps {
  value: string;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const SearchField: FC<ISearchFieldProps> = ({ handleChange, value }) => {
  return (
    <div className={styles.container}>
      <MaterialIcon name='MdSearch' />
      <input placeholder='Search' value={value} onChange={handleChange} />
    </div>
  );
};

export default SearchField;
