import styles from './Slug.module.css';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';


export default function Recipe({ recipe }) {
    console.log(recipe)
    return (
        <div>
            <Head>
                <title>{recipe.name}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <h2>{recipe.name}</h2>
                <p className={styles.description}>{recipe.description}</p>
                <div className={styles.imageWrapper}>
                    <Image src={recipe.image.url} alt={recipe.name} className={styles.image} layout="fill" objectFit="cover" />
                </div>
                <h3>Information</h3>
                <p>Cooking Time: {recipe.time}min</p>
                <p>Difficulty: {recipe.difficulty}/10</p>
                <hr className={styles.line} />
                <h3>Ingredients</h3>
                <ul>
                    {recipe.ingredients.map(ingredient => <li key={ingredient}>{ingredient}</li>)}
                </ul>
                <hr className={styles.line} />
                <h3>Instructions</h3>
                <p className={styles.instructions}>{recipe.instructions}</p>
                <button className={styles.button}><Link href={`/`}>Go back</Link></button>
            </main>
        </div>
    )
}

export async function getStaticProps(context) {
    const res = await fetch(
        `https://graphql.contentful.com/content/v1/spaces/${process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID}/?access_token=${process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN}`,
        {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                query: `
          {
              recipeCollection (where: {slug: "${context.params.slug}"}){
              items {
                name
                description
                image {
                  url
                }
                time
                ingredients
                instructions
                difficulty
                slug
              }
            }
          }
  				`,
            }),
        },
    )

    const recipe = await res.json()
    return {
        props: {
            recipe: recipe.data.recipeCollection.items[0],
        },
    }
}

export const getStaticPaths = async () => {
    const res = await fetch(
        `https://graphql.contentful.com/content/v1/spaces/${process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID}/?access_token=${process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN}`,
        {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                query: `
                {
                    recipeCollection {
                    items {
                        slug
                    }
                    }
                }
  				`,
            }),
        },
    )

    const recipes = await res.json();
    const slugs = recipes.data.recipeCollection.items.map(recipe => recipe.slug)
    const paths = slugs.map(slug => ({ params: { slug: slug.toString() } }))

    return {
        paths,
        fallback: false
    }

}