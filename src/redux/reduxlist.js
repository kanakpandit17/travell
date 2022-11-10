import React from 'react'
import { useSelector } from 'react-redux'

export const reduxlist = () => {
  const posts = useSelector(state => state.main)

  const renderedPosts = posts.map(post => (
    <article className="post-excerpt" key={all_select.id}>
    
      <p className="post-content">{all_select.Option_answer.substring(0, 100)}</p>
    </article>
  ))

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {renderedPosts}
    </section>
  )
}