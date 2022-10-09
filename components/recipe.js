import styles from './Recipe.module.css';
import Link from 'next/link';
import Image from 'next/image'

export default function Recipe({ recipe }) {
    return (
        <Link href={`/detail/${encodeURIComponent(recipe.slug)}`}>
            <div className={styles.recipe}>
                <div className={styles.text}>
                    <h2 className={styles.name}>{recipe.name}</h2>
                    <p className={styles.description}>{recipe.description}</p>
                </div>
                <div className={styles.imageWrapper}>
                    <Image src={recipe.image.url} alt={recipe.name} className={styles.image} layout="fill" objectFit="cover" />
                </div>
            </div>
        </Link>
    )
}