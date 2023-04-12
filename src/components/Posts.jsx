import { React } from "react";
import { HeartFill } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

function Posts({ posts, renderProfileImages }) {
  return (
    <>
      {posts
        .slice(0)
        .reverse()
        .map((post) => (
          <Link key={post.id} to={`/Article/post-id/${post.id}`}>
            <article id={post.id} className="post-card">
              {posts.length >= 1 ? (
                <div className="left-side">
                  <div>
                    <div className="author-and-time">
                      <div className="image-container">
                        {renderProfileImages(post.post_author.user_image)}
                      </div>

                      <div>
                        <h4>{post.post_author.username}</h4>
                        <p>
                          {post.post_created_date
                            .substring(0, 16)
                            .replace(/T/, ", ")}
                        </p>
                      </div>
                    </div>

                    <h1>{post.post_title}</h1>
                    <p
                      className="text"
                      dangerouslySetInnerHTML={{ __html: post.post_text }}
                    ></p>
                  </div>

                  <div className="social">
                    <p>{post.post_views} Views</p>

                    <p title={`${post.post_likes.length} have liked this post`}>
                      {post.post_likes.length}
                      <HeartFill style={{ padding: "0px 5px" }} />
                    </p>
                  </div>
                </div>
              ) : (
                <h1>No posts found...</h1>
              )}

              <div className="right-side">
                <img
                  src={
                    post.post_image &&
                    (post.post_image.startsWith("https://efimerida.herokuapp.com")
                      ? post.post_image
                      : `https://efimerida.herokuapp.com${post.post_image}`)
                  }
                  alt=""
                />
              </div>
            </article>
          </Link>
        ))}
    </>
  );
}

export default Posts;
