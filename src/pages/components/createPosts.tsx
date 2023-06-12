import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import styles from '@/styles/Home.module.css';

const CreatePostPage = () => {
  const { data: session, status } = useSession();
  const [content, setContent] = useState('');
  const handleContentChange = (e: React.FormEvent<HTMLInputElement>) => {
    setContent(e.currentTarget.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/createPost', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
      });

      if (response.ok) {
        setContent('');
      } else {
        console.error('Failed to create post');
      }
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className={styles.title}>Totally not twitter</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            className={styles.post}
            type="text"
            value={content}
            onChange={handleContentChange}
            placeholder="Enter your post content"
          />
          <button className={styles.button} type="submit">
            Create Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePostPage;
