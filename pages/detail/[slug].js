import { useRouter } from 'next/router'
import Link from 'next/link';


export default function Recipe() {
    const router = useRouter()
    const { slug } = router.query
    return (
        <>
            <main>
                <p>this is recipe {slug}</p>
                <Link href={`/`}>Go back to home page</Link>
            </main>
        </>
    )
}