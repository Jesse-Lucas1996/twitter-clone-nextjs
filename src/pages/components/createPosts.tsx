import React, { useState } from 'react';
import { useSession } from 'next-auth/react';

const CreatePostPage = () => {
  const { status } = useSession();
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  const handleContentChange = (e: any) => {
    setContent(e.target.value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/createPost', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
      });
      if(content.length === 0) return setError('Please enter some content');
      if (response.ok) {
        setContent('');
      } else {
        setError('Something went wrong :(');
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 shadow-md rounded-lg py-4">
      <form onSubmit={handleSubmit}>
        <div className="flex items-center space-x-4">
          <input
            className="flex-grow text-black px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            type="text"
            value={content}
            onChange={handleContentChange}
            placeholder="Enter your post content"
          />
          <button className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg" type="submit">
            Create Post
          </button>
        </div>
        <p>{error}</p>
      </form>
    </div>
  );
};

export default CreatePostPage;
