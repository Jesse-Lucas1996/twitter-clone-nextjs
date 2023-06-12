import { useEffect, useState } from 'react';
import styles from '@/styles/Home.module.css';

const POLLING_INTERVAL = 5000; // 5 seconds

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/getPosts');
        const data = await response.json();
        setPosts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setError('Error fetching posts');
        setLoading(false);
      }
    };

    fetchPosts();
    const interval = setInterval(fetchPosts, POLLING_INTERVAL);
    interval;
  }, []);

  return (
    <div className="post-list">
      {loading ? (
        <div className={styles.loading}>
          <p className={styles.loadingText}>Loading posts...</p>
        </div>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        posts.map((post: any) => (
          <div key={post._id} className={styles.getPosts}>
            <p className={styles.getPostsContent}>{post.userName}</p>
            <p className={styles.getPostsContent}>{post.content}</p>
            <p className={styles.getPostsDate}>{post.date}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default PostList;