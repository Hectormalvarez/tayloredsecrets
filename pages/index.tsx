import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Taylored Secrets</title>
        <meta name="description" content="One Time Taylored Secrets" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>
          Welcome to Taylored Secrets!
        </h1>
      </main>

      <footer>

      </footer>
    </div>
  )
}

export default Home
