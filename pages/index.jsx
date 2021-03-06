/* eslint-disable jsx-a11y/anchor-is-valid */
import Head from 'next/head'
import Link from 'next/link'

import Date from '../components/Date'
import Layout, { siteTitle } from '../components/Layout'

import { getSortedPostsData } from '../lib/posts'

import utilStyles from '../styles/utils.module.css'

const cities = ['Taipei', 'Taichung', 'Kaohsiung', 'Hualien']

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()

  return {
    props: {
      allPostsData,
    },
  }
}

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <section className={utilStyles.headingMd}>
        <p>Nice to meet you!</p>
        <p>
          (This is a sample website - I built this blog site on
          <a href="https://nextjs.org/learn">this Next.js tutorial</a>
          .)
        </p>
      </section>

      <section className={utilStyles.headingMd}>
        <h2 className={utilStyles.headingLg}>City Weather (SSR, dynamic route)</h2>
        <ul className={utilStyles.list}>
          {cities.map((city) => (
            <li className={utilStyles.listItem} key={city}>
              <Link href={`/weather/${city}`}>
                <a>{city}</a>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className={utilStyles.headingMd}>
        <h2 className={utilStyles.headingLg}>Movies (SSG, CSR)</h2>
        <Link href="/movies">
          <a>Click me to search movies!</a>
        </Link>
      </section>

      <section className={utilStyles.headingMd}>
        <h2 className={utilStyles.headingLg}>Data Fetching</h2>
        <Link href="/passengers">
          <a>Click me to check passenger data</a>
        </Link>
      </section>

      <section className={utilStyles.headingMd}>
        <h2 className={utilStyles.headingLg}>Socket.IO</h2>
        <Link href="/socket-chat">
          <a>Click me to Socket.IO chat room</a>
        </Link>
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog (SSG, dynamic route)</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}
