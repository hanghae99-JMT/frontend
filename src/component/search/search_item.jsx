import React from 'react';
import styles from './search_item.module.scss';

const SearchItem = (props) => {
    const {handleClick} = props
    const {data} = props
    return (
        <li className={styles.search} onClick={handleClick}>
            <ul>
                <li><p className={styles.name}>{data.name}</p></li>
                <li><p className={styles.address}>{data.address}</p></li>
            </ul>
            <div className={styles.like}>
                <span>👍</span>
                <p>{data.like}</p>
            </div>
        </li>
    );
};

export default SearchItem;