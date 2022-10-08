import { useRouter } from 'next/router'
import Link from 'next/link';


export default function Recipe({ recipe }) {
    const router = useRouter()
    const { slug } = router.query
    return (
        <div>
            <main>
                <h2>{recipe.name}</h2>
                <p>{recipe.description}</p>
                <p>{recipe.time}</p>
                <p>{recipe.ingredients}</p>
                <p>{recipe.instructions}</p>
                <p>{recipe.difficulty}</p>
                <button><Link href={`/`}>Go back to home page</Link></button>
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