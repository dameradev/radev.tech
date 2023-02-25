import React, { useContext, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import useSWR from 'swr';

// UTILS
import { UserContext } from '../pages/_app';
import { supabaseClient } from '../lib/hooks/useSupabase';
import { fetcher } from '../lib/fetcher';
import { AVATARS } from '../lib/data';

const Comments = ({ slug }) => {
  const commentsRef = useRef<HTMLDivElement>();
  const router = useRouter();
  const userData = useContext(UserContext);
  const { data } = useSWR<{ comments: { text: string; name: string }[] }>(
    `/api/comments/${slug}`,
    fetcher
  );

  async function signInWithGoogle() {
    const { user, error } = await supabaseClient.auth.signIn(
      {
        provider: 'google',
      },
      {
        redirectTo: `https://radev.tech${router.asPath}`,
      }
    );
    console.log(user);
    console.log(error);
  }

  const comments = data?.comments;
  const [message, setMessage] = useState('');
  const [comment, setComment] = useState('');
  const [name, setName] = useState(
    userData?.name?.split(' ')[0] || 'Please sign in'
  );

  useEffect(() => {
    if (userData?.name) {
      setName(userData?.name?.split(' ')[0]);
    }
  }, [userData]);


  useEffect(() => {
    if (router.asPath.split('#access_token=')[1]?.split('&')?.[0]) {
      window.scrollTo(
        commentsRef?.current.offsetTop,
        commentsRef?.current.offsetTop - 100
      );
    }
  });


  return (
    <>
      {!userData?.email && (
        <div className='mt-10 flex flex-col items-center italic'>
          To comment please authenticate
          <button
            className='flex items-center gap-2 bg-accent-9 text-accent-0 pl-2 pr-6 my-6'
            onClick={() => signInWithGoogle()}
          >
            <Image src={'/google.png'} alt='google' width={50} height={50} />
            Sign in with Google
          </button>
        </div>
      )}
      <div>
        {message && (
          <p className='text-green-600 text-2xl text-center'>{message}</p>
        )}
        <div className='mt-4'>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              fetch(`/api/comments/${slug}`, {
                method: 'POST',
                body: JSON.stringify({
                  name,
                  comment,
                }),
              });
              setName('');
              setComment('');
              setMessage('Thanks for your comment!');
            }}
          >
            <div className='flex flex-col'>
              <label htmlFor='name' className='text-lg'>
                Name
              </label>
              <input
                disabled
                type='text'
                name='name'
                id='name'
                className='text-black border border-gray-300 rounded-lg p-2 mt-2'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div ref={commentsRef} className='flex flex-col mt-4'>
              <label htmlFor='comment' className='text-lg'>
                Comment
              </label>
              <textarea
                disabled={!userData?.name}
                name='comment'
                id='comment'
                className='text-black border border-gray-300 rounded-lg p-2 mt-2'
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>
            <button
              disabled={!userData?.name}
              type='submit'
              className='bg-slate-700 text-white rounded-lg p-2 mt-4'
            >
              Submit
            </button>
          </form>
        </div>
        {/* list of comments */}
        {comments?.length && (
          <p className='text-2xl text-center mt-10'>Comments</p>
        )}
        <ul className='list-none'>
          {comments?.map((comment, index) => (
            <li
              key={index}
              className='bg-slate-700 p-6 rounded-lg shadow-lg my-4 flex items-start'
            >
              <div className='w-10 h-10 flex-shrink-0 rounded-full overflow-hidden'>
                <img src={AVATARS[Math.floor(Math.random() * 12)]} />
              </div>
              <div className='ml-4'>
                <p className='text-lg font-extrabold'>{comment.name}</p>
                <p className='text-gray-700 mt-2'>{comment.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Comments;
