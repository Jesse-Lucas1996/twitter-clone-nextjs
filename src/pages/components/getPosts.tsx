import { useEffect, useState } from 'react';
import styles from '@/styles/Home.module.css';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
const PostList = () => {
  dayjs.extend(relativeTime)
  const [posts, setPosts] = useState<any[]>([]); // Specify the type as any[]
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/getPosts');
        const data = await response.json();
        if (Array.isArray(data)) {
          setPosts(data);
        } else {
          setError('');
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setError('Error fetching posts');
        setLoading(false);
      }
    };

    fetchPosts();
    const pollInterval = setInterval(fetchPosts, 2000);

    // Clean up the interval when the component is unmounted
    return () => clearInterval(pollInterval);
  }, []);

  return (
    <div className={`${styles.postList} mt-4`}>
      {loading ? (
        <div className={styles.loading}>
          <p className={styles.loadingText}>Loading posts...</p>
        </div>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        posts.map((post: any) => (
          <div key={post._id} className={styles.getPosts}>
            <div className={styles.postHeader}>
              <p className={styles.userName}>{post.userName}</p>
            </div>
            <p className={styles.postContent}>{post.content}</p>
            <p className={styles.postTime}>{dayjs(post.time).fromNow()}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default PostList;
