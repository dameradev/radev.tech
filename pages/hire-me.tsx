import Container from '@/components/Container';
import Layout from '@/components/Layout';
import { useForm } from '@/lib/hooks/useForm';

import React from 'react';

const Hire = () => {
  const {
    updateValue,
    values: { name, email, message },
    removeValues,
  } = useForm({ name: '', email: '', message: '' });

  // success message state
  const [successMessage, setSuccessMessage] = React.useState('');
  // error message state
  const [errorMessage, setErrorMessage] = React.useState('');

  return (
    <Layout preview={false}>
      <Container className='max-w-6xl'>
        <div className='text-xl'>
          <h1 className='text-3xl leading-[5rem]'>
            Currently my focus is on e-commerce jamstack solutions, if you have
            a project that you think I can help with, please get in touch.
          </h1>
          <p className="mt-10 italic mb-4">
          I can support you and your team in the following areas:
          </p>
          <ul className='flex flex-col  gap-2 mb-10 font-light'>
            <li>
             1. <span className='font-bold'>Project scoping: </span> Identify and prioritize your application's
              essential features based on actual user needs.
            </li>
            <li>
             2. <span className='font-bold'>User experience design/research:</span> Collaborate with your team to
              create intuitive and user-friendly interactions.
            </li>
            <li>
             3. <span className='font-bold'>Team troubleshooting:</span> Diagnose and resolve issues that hinder your
              team's focus on feature development or delivery.
            </li>
            <li>
             4. <span className='font-bold'>Engineering:</span> Provide technical expertise on web best practices,
              including performance and accessibility, code reviews, and
              recommendations for improvement.
            </li>
          </ul>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (name && email && message) {
              fetch(`api/hire`, {
                method: 'POST',
                body: JSON.stringify({ name, email, message }),
              });
              setErrorMessage('');
              setSuccessMessage('Successfully submitted!');
              removeValues();
            } else {
              if (!message) {
                setErrorMessage(`Message is required`);
              }
              if (!email) {
                setErrorMessage(`Email is required`);
              }
              if (!name) {
                setErrorMessage(`Name is required`);
              }
              setSuccessMessage('');
            }
          }}
        >
          <div className='md:col-gap-4 mb-5 grid md:grid-cols-2 gap-2 '>
            <input
              className='px-4 col-span-1 w-full border-b py-3 text-sm outline-none focus:border-b-2 focus:border-secondary text-black '
              type='text'
              placeholder='Name'
              name='name'
              value={name}
              onChange={updateValue}
            />
            <input
              className='px-4 col-span-1 w-full border-b py-3 text-sm outline-none focus:border-b-2 focus:border-secondary text-black'
              type='email'
              placeholder='Email'
              name='email'
              value={email}
              onChange={updateValue}
            />
          </div>
          <textarea
            className='px-4 mb-10 w-full resize-y whitespace-pre-wrap border-b py-3 text-sm outline-none focus:border-b-2 focus:border-secondary text-black'
            id=''
            rows={6}
            placeholder='Tell us about your skills and experience'
            name='message'
            value={message}
            onChange={updateValue}
          />
          <button
            type='submit'
            className='group flex cursor-pointer items-center rounded-xl bg-secondary bg-none px-8 py-4 text-center font-semibold leading-tight text-white w-full'
          >
            Hire Me
            <svg
              className='group-hover:ml-[85%] ml-4 transition-all'
              xmlns='http://www.w3.org/2000/svg'
              aria-hidden='true'
              role='img'
              width='1em'
              height='1em'
              preserveAspectRatio='xMidYMid meet'
              viewBox='0 0 24 24'
            >
              <path
                fill='none'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M9.912 12H4L2.023 4.135A.662.662 0 0 1 2 3.995c-.022-.721.772-1.221 1.46-.891L22 12L3.46 20.896c-.68.327-1.464-.159-1.46-.867a.66.66 0 0 1 .033-.186L3.5 15'
              />
            </svg>
          </button>
        </form>
      </Container>
    </Layout>
  );
};

export default Hire;
