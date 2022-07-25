import React from 'react';
import styles from './ranking.module.scss';

const Ranking = (props) => {

    // console.log(props.item)
    return (
        <li className={styles.ranking}>
            <ul>
                <li><p className={styles.name}>{props.data.name}</p></li>
                <li><p className={styles.address}>{props.data.address}</p></li>
            </ul>
            <div className={styles.like}>
                <span>👍</span>
                <p>{props.data.like}</p>
            </div>
        </li>
    );
};

export default Ranking;