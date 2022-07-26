import React from 'react';
import styles from './myreview.module.scss';

const Myreview = (props) => {
    const {item} = props;
    return (
        <li className={styles.myreview}>
            <ul>
                <li><p className={styles.name}>{item.name}</p></li>
                <li><p className={styles.review}>{item.text}</p></li>
            </ul>
        </li>
    );
};

export default Myreview;