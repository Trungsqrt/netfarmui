import React, { useState, useEffect } from 'react';
import styles from './Comment.module.css';
import axios from 'axios';
function Comment(props) {
    const [cmtContent, setCmtContent] = useState('');
    const { idArticle } = props;
    const [comment, setComment] = useState([]);
    const [newestComment, setNewestComment] = useState();
    const url = 'https://localhost:44303/api/Comment';
    const handleSubmit = () => {
        const currentComment = {
            content: cmtContent,
            userId: JSON.parse(localStorage.getItem('user')).userId,
            articleId: idArticle,
            cmDate: new Date().toISOString(),
        };
        const postHandler = async () => {
            const res = await axios.post(url, currentComment);
        };
        postHandler();
        setCmtContent('');
        alert('Đã gửi bình luận!');
        window.location.reload(false);
    };

    useEffect(() => {
        const getComments = async () => {
            //get comments api
            const res = await axios.get(url);

            const resData = res.data;
            const cmtDatas = [];
            let newArray = [];
            resData.forEach((data) => {
                if (data.articleId === Number(idArticle)) {
                    cmtDatas.push(data);
                }
            });
            //filter number of comments
            if (cmtDatas.length >= 7) {
                const arrayFilterYet = [...cmtDatas];
                const arrayFiltered = [];
                let amountOfLeftComment = 1;
                while (amountOfLeftComment <= 6) {
                    arrayFiltered.push(arrayFilterYet.at(amountOfLeftComment * -1));
                    ++amountOfLeftComment;
                }
                newArray = [...arrayFiltered];
                setComment(newArray);
            } else {
                setComment(cmtDatas);
            }
        };
        getComments();
    }, []);

    return (
        <div>
            <section className={styles.commentSection}>
                <section className={styles.commentContainer}>
                    <section className={styles.left}>
                        <h1 className={styles.header}>Bình luận</h1>
                        <section className={styles.currentComment}>
                            {comment.map((cmt, index) => (
                                <section className={styles.commentItem} key={index}>
                                    <section className={styles.text}>
                                        <p>
                                            <strong>User {cmt.userId}: </strong> {cmt.content}
                                        </p>
                                    </section>
                                    {/* <section className={styles.icon}>
                                    <span>&times;</span>
                                </section> */}
                                </section>
                            ))}
                        </section>
                    </section>
                    <section className={styles.right}>
                        <h1 className={styles.header}>Viết bình luận</h1>
                        <section className={styles.currentComment}>
                            <section className={styles.writeComment}>
                                <input
                                    className={styles.inputComment}
                                    placeholder="Viết bình luận..."
                                    value={cmtContent}
                                    onChange={(e) => setCmtContent(e.target.value)}
                                ></input>
                                <button className={styles.buttonSubmit} onClick={handleSubmit}>
                                    Gửi bình luận
                                </button>
                            </section>
                        </section>
                    </section>
                </section>
            </section>
        </div>
    );
}

export default Comment;
