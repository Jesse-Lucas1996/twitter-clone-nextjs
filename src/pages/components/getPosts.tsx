import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import Image from 'next/image';

const PostList = () => {
  dayjs.extend(customParseFormat);
  dayjs.extend(relativeTime);
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
    <div className='py-2'>
      {loading ? (
        <div
          className='inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]'
          role='status'>
          <span
            className='!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]'
          >Loading...</span
          >
        </div>
      ) : error ? (
        <p className='text-red-600'>{error}</p>
      ) : (
        posts.map((post: any) => (
          <div key={post._id} className='bg-white shadow-md rounded-lg  p-4 mb-4 w-[800px]'>
            <div className='flex items-center mb-2'>
              <div className='flex-shrink-0'>
                <Image className='w-10 h-10 rounded-full' src={post.picture} width={50} height={50} alt='' />
              </div>
              <div className='ml-2'>
                <div className='flex items-center'>
                  <p className='text-black font-calibri font-bold'>{post.userName}</p>
                </div>
                <p className='text-gray-500'>{dayjs(post.time, 'DD/MM/YYYY HH:mm:ss').fromNow()}</p>
              </div>
            </div>
            <p className='text-black px-2 font-calibri'>{post.content}</p>
          </div>

        ))
      )}
    </div>
  );
};  

export default PostList;
