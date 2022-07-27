import React, {useEffect, useState} from 'react';
import styles from './ranking.module.scss';
import Detail from '../detail/Detail';

const Ranking = (props) => {
    // const [openDetail, setOpenDetail] = useState(false)
    // const handleClose = (value) => {
    //     console.log("##");
    //     setOpenDetail(false);
    // };

    // useEffect(() => {
    //     console.log(openDetail);
    // }, [openDetail])
    const {handleClick} = props
    return (
        <li className={styles.ranking} onClick={handleClick}>
            <ul>
                <li><p className={styles.name}>{props.data.name}</p></li>
                <li><p className={styles.address}>{props.data.address}</p></li>
            </ul>
            <div className={styles.like}>
                <span>👍</span>
                <p>{props.data.like}</p>
            </div>
            {/* <Detail open={openDetail} onClose={handleClose} restaurantProp={props.data} key={props.data.rid}/> */}
        </li>
    );
};

export default Ranking;