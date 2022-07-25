import React from 'react';
import styles from './myreview.module.scss';

const Myreview = () => {
    return (
        <li className={styles.myreview}>
            <ul>
                <li><p className={styles.name}>좋아요한가게이름</p></li>
                <li><p className={styles.review}>내후기내용</p></li>
            </ul>
        </li>
    );
};

export default Myreview;