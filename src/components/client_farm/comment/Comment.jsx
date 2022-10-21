import React from 'react';
import styles from './Comment.module.css';
function Comment() {
    return (
        <div>
            <section className={styles.commentSection}>
                <section className={styles.commentContainer}>
                    <section className={styles.left}>
                        <h1 className={styles.header}>Bình luận</h1>
                        <section className={styles.currentComment}>
                            <section className={styles.commentItem}>
                                <section className={styles.text}>
                                    <p>
                                        <strong>Anh A: </strong> Tình hình bão lũ thật phức tạp!!!
                                    </p>
                                </section>
                                <section className={styles.icon}>
                                    <span>&times;</span>
                                </section>
                            </section>
                            <section className={styles.commentItem}>
                                <section className={styles.text}>
                                    <p>
                                        <strong>Anh B: </strong> Mong bà con yên ổn mùa bão lũ!!!
                                    </p>
                                </section>
                                <section className={styles.icon}>
                                    <span>&times;</span>
                                </section>
                            </section>
                        </section>
                    </section>
                    <section className={styles.right}>
                        <h1 className={styles.header}>Viết bình luận</h1>
                        <section className={styles.currentComment}>
                            <section className={styles.writeComment}>
                                <input className={styles.inputComment} placeholder="Viết bình luận..."></input>
                                <button className={styles.buttonSubmit}>Gửi bình luận</button>
                            </section>
                        </section>
                    </section>
                </section>
            </section>
        </div>
    );
}

export default Comment;
