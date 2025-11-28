import { Link } from 'react-router-dom';

const BlogPostCard = ({ post }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const truncateContent = (content, maxLength = 150) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  return (
    <article className="blog-card">
      <div className="blog-card-content">
        <div className="blog-card-meta">
          <span className="blog-author">By {post.author?.username || 'Anonymous'}</span>
          <span className="blog-date">{formatDate(post.createdAt)}</span>
        </div>
        <h3 className="blog-card-title">
          <Link to={`/blog/${post._id}`}>{post.title}</Link>
        </h3>
        <p className="blog-card-excerpt">{truncateContent(post.content)}</p>
        <Link to={`/blog/${post._id}`} className="blog-read-more">
          Read More
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </Link>
      </div>
    </article>
  );
};

export default BlogPostCard;
