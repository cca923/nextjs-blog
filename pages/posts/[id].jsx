import Head from 'next/head'

import Date from '../../components/Date'
import Layout from '../../components/Layout'

import { getAllPostIds, getPostData } from '../../lib/posts'

import utilStyles from '../../styles/utils.module.css'

export async function getStaticPaths() {
  const paths = getAllPostIds()
  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id)
  return { props: { postData } }
}

export default function PostPage({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>

      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  )
}

// Quick Review: You want to add blog post categories as a new dynamic route pages/categories/[id].js.
// What is the correct way to implement this?

// Ans.
// Use `getStaticProps` to fetch a specific post given an ID,
// and `getStaticPaths` to fetch all possible blog posts.
