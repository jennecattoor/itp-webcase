import styles from './recipe.module.css';
import Link from 'next/link';
import Image from 'next/image'

export default function Recipe({ recipe }) {
    return (
        <Link href={`/detail/${encodeURIComponent(recipe.slug)}`}>
            <div className={styles.recipe}>
                <h2 className={styles.name}>{recipe.name}</h2>
                <p className={styles.description}>{recipe.description}</p>
                <Image src={recipe.image.url} alt={recipe.name} width="100px" height="100px" />
            </div>
        </Link>
    )
}