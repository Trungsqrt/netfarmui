import styles from './highlightItem.module.css';

function HighLightItem({title, content, date}) {
  return (
    <div className={`${styles.highlightItem_component}`}>
      <div className={`${styles.title}`}>
        <h4>{title.toUpperCase()}</h4>
      </div>
      <div className={`${styles.content}`}>
        <p>{content}</p>
      </div>
      <div className={`${styles.date}`}>
        <p>{date}</p>
      </div>
    </div>
  )
}

export default HighLightItem;