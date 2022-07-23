import React from 'react';
import styles from './ranking.module.scss';

const Ranking = () => {
    return (
        <li className={styles.ranking}>
            <ul>
                <li><p className={styles.name}>가게이름</p></li>
                <li><p className={styles.address}>대구광역시 중구 어쩌구저쩌구</p></li>
                <li><p className={styles.desc}>맛있는 고기를 파는곳 입니다.</p></li>
            </ul>
            <div className={styles.like}>
                <span>👍</span>
                <p>100</p>
            </div>
        </li>
    );
};

export default Ranking;