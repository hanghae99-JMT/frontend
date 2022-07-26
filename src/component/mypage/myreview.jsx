import React from 'react';
import styles from './myreview.module.scss';

const Myreview = (props) => {
    return (
        <li className={styles.myreview}>
            <ul>
                <li><p className={styles.name}>{props.name}</p></li>
                <li><p className={styles.review}>{props.text}</p></li>
            </ul>
        </li>
    );
};

export default Myreview;