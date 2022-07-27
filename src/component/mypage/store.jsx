import React from 'react';
import styles from './store.module.scss';

const Store = (props) => {
    const {handleClick} = props
    return (
        <li className={styles.store} onClick={handleClick}>
            <ul>
                <li><p className={styles.name}>{props.item.name}</p></li>
                <li><p className={styles.address}>{props.item.address}</p></li>
            </ul>
            <div className={styles.like}>
                <span>👍</span>
                <p>{props.item.like}</p>
            </div>
        </li>
    );
};

export default Store;