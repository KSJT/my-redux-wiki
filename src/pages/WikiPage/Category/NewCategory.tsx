import styles from "./NewCategory.module.scss";

const NewCategory = () => {
  return (
    <>
      <div className={styles.category}>
        <ul className={styles.article}></ul>
      </div>
    </>
  );
};

export default NewCategory;
