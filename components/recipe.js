import styles from './recipe.module.css'
import Image from 'next/image'

export default function Recipe({ recipe }) {
    return (
        <div className={styles.recipe}>
            <h2 className={styles.name}>Recipe name</h2>
            <p className={styles.description}>Description</p>
            <p className={styles.time}>Time</p>
        </div>
    )
}