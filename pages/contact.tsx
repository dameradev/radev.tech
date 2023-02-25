import React, { useState } from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

// COMPONENTS
import Layout from '@/components/Layout';
import Container from '@/components/Container';

// UTILS
import { useForm } from '@/lib/hooks/useForm';

const Contact = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const {
    values: { name, email, message },
    updateValue,
    removeValues,
  } = useForm({ name: '', email: '', message: '' });

  return (
    <Layout preview=''>
      <Container className=''>
        <div className='sm:p-10 my-auto '>
          <section className='mx-auto max-w-screen-xl md:rounded-md md:border md:shadow-lg'>
            <div className='grid grid-cols-4  lg:grid-cols-3'>
              <div className='col-span-4 bg-gray-50 px-8 py-10  md:col-span-2 md:border-r md:px-10 md:py-12 lg:col-span-1'>
                <h2 className='mb-8 text-2xl font-black'>Contact me</h2>
                <ul>
                  <li className='mb-6'>
                    <a
                      className='flex items-center text-left'
                      href='mailto:radevdevelopment@gmail.com'
                    >
                      <svg
                        className='shrink-0 mr-6 text-2xl '
                        xmlns='http://www.w3.org/2000/svg'
                        aria-hidden='true'
                        role='img'
                        width='1em'
                        height='1em'
                        preserveAspectRatio='xMidYMid meet'
                        viewBox='0 0 24 24'
                      >
                        <path
                          fill='currentColor'
                          d='M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5l-8-5V6l8 5l8-5v2z'
                        />
                      </svg>
                      <div>
                        <p className='cursor-pointer font-serif  md:text-lg'>
                          radevdevelopment@gmail.com
                        </p>
                        <span className='block text-xs uppercase'>email</span>
                      </div>
                    </a>
                  </li>
                  <li className='my-6'>
                    <a
                      className='flex items-center text-left'
                      href='https://twitter.com/dameradev'
                      target='_blank'
                    >
                      <svg
                        className='shrink-0 mr-6 text-2xl '
                        xmlns='http://www.w3.org/2000/svg'
                        aria-hidden='true'
                        role='img'
                        width='1em'
                        height='1em'
                        preserveAspectRatio='xMidYMid meet'
                        viewBox='0 0 1024 1024'
                      >
                        <path
                          fill='currentColor'
                          d='M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448s448-200.6 448-448S759.4 64 512 64zm215.3 337.7c.3 4.7.3 9.6.3 14.4c0 146.8-111.8 315.9-316.1 315.9c-63 0-121.4-18.3-170.6-49.8c9 1 17.6 1.4 26.8 1.4c52 0 99.8-17.6 137.9-47.4c-48.8-1-89.8-33-103.8-77c17.1 2.5 32.5 2.5 50.1-2a111 111 0 0 1-88.9-109v-1.4c14.7 8.3 32 13.4 50.1 14.1a111.13 111.13 0 0 1-49.5-92.4c0-20.7 5.4-39.6 15.1-56a315.28 315.28 0 0 0 229 116.1C492 353.1 548.4 292 616.2 292c32 0 60.8 13.4 81.1 35c25.1-4.7 49.1-14.1 70.5-26.7c-8.3 25.7-25.7 47.4-48.8 61.1c22.4-2.4 44-8.6 64-17.3c-15.1 22.2-34 41.9-55.7 57.6z'
                        />
                      </svg>

                      <div>
                        <p className='cursor-pointer font-serif  md:text-lg'>
                          @dameradev
                        </p>
                        <span className='block text-xs uppercase'>twitter</span>
                      </div>
                    </a>
                  </li>
                  <li className='my-6'>
                    <a
                      className='flex items-center text-left'
                      href='https://github.com/dameradev'
                      target='_blank'
                    >
                      <FaGithub className='text-2xl mr-6' />
                      <div>
                        <p className='font-serif  md:text-lg'>@dameradev</p>
                        <span className='block text-xs uppercase'>GitHub</span>
                      </div>
                    </a>
                  </li>
                  <li className='my-6 '>
                    <a
                      className='flex items-center text-left'
                      href='https://www.linkedin.com/in/damjan-radev-628120145/'
                      target='_blank'
                    >
                      <FaLinkedin className='text-2xl mr-6' />
                      <div>
                        <p className='font-serif md:text-lg'>Damjan Radev</p>
                        <span className='block text-xs uppercase'>
                          LinkedIn
                        </span>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
              <div className='order-first col-span-4 max-w-screen-md px-8 py-10 md:order-last md:col-span-2 md:px-10 md:py-12'>
                <h2 className='mb-8 text-2xl font-black'>Get in touch</h2>
                {errorMessage && (
                  <p className='text-xl text-red-600'>{errorMessage}</p>
                )}
                {successMessage && (
                  <p className='text-xl text-green-600'>{successMessage}</p>
                )}
                <p className='mt-2 mb-4 font-sans text-sm tracking-normal'>
                  Ask your question
                </p>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (name && email && message) {
                      fetch(`api/contact`, {
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
                  <div className='md:col-gap-4 mb-5 grid md:grid-cols-2 '>
                    <input
                      className='px-4 col-span-1 w-full border-b py-3 text-sm outline-none focus:border-b-2 focus:border-secondary text-black'
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
                    placeholder='Message'
                    name='message'
                    value={message}
                    onChange={updateValue}
                  />
                  <button
                    type='submit'
                    className='group flex cursor-pointer items-center rounded-xl bg-secondary bg-none px-8 py-4 text-center font-semibold leading-tight text-white'
                  >
                    Send
                    <svg
                      className='group-hover:ml-8 ml-4 transition-all'
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
              </div>
            </div>
          </section>
        </div>
      </Container>
    </Layout>
  );
};

export default Contact;
