import styles from './recipe.module.css';
import Image from 'next/image'

export default function Recipe({ recipe }) {
    return (
        <div className={styles.recipe}>
            <h2 className={styles.name}>{recipe.name}</h2>
            <p className={styles.description}>{recipe.description}</p>
            <Image src={recipe.image.url} alt={recipe.name} width="100px" height="100px" />
            <p className={styles.time}>{recipe.time}</p>
        </div>
    )
}