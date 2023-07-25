'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Form from '@components/Form';

const CreatePrompt = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [submitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState({ prompt: '', tag: '' });

  const createPrompt = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/prompt/new', {
        method: 'POST',
        body: JSON.stringify({ prompt: post.prompt, userId: session?.user.id, tag: post.tag }),
      });
      response.ok && router.push('/');
    } catch (error) {
      console.error('Error creating a prompt:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return <Form type='Create' post={post} setPost={setPost} submitting={submitting} cancelPath='/' handleSubmit={createPrompt} />;
};
export default CreatePrompt;
