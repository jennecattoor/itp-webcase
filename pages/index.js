/* eslint-disable react/no-unescaped-entities */
import Head from 'next/head'
import styles from './Index.module.css'
import Recipe from '../components/recipe'

export default function Home({ recipes }) {
  return (
    <div>
      <Head>
        <title>Favourite Desserts</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.intro}>
          <h1 className={styles.title}>Jenne’s <span>favourite desserts</span></h1>
          <p className={styles.description}>When you've eaten all your vegetables 🥕, it's likely you're craving something sweet. I've got you covered! Here are the recipes for all my favourite desserts. Eating these desserts without having eaten vegetables is totally fine, I do it too.</p>
        </div>
        {recipes.map(recipe => <Recipe recipe={recipe} key={recipe.slug} />)}
      </main>
    </div>
  )
}

export async function getStaticProps() {
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
                name
                description
                image {
                  url
                }
                slug
              }
            }
          }
  				`,
      }),
    },
  )

  const recipes = await res.json()
  return {
    props: {
      recipes: recipes.data.recipeCollection.items,
    },
  }
}
