'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { Form } from '@components';

const UpdatePrompt = () => {
  const router = useRouter(),
    searchParams = useSearchParams(); // Get the Next.js router and searchParams objects
  const promptId = searchParams.get('id'); // Extract the 'id' parameter from the URL search parameters

  const [post, setPost] = useState({ prompt: '', tag: '' });
  const [submitting, setIsSubmitting] = useState(false);

  // useEffect hook to fetch prompt details when the component mounts or 'promptId' changes
  useEffect(() => {
    // Define an asynchronous function to fetch prompt details from the API
    const getPromptDetails = async () => {
      const response = await fetch(`/api/prompt/${promptId}`);
      const data = await response.json();
      setPost({ prompt: data.prompt, tag: data.tag }); // Update the state with the fetched prompt details
    };
    if (promptId) getPromptDetails(); // If 'promptId' is available, call the 'getPromptDetails' function
  }, [promptId]);

  // Function to handle updating the prompt
  const updatePrompt = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (!promptId) return alert('Missing PromptId!'); // If 'promptId' is missing, show an alert and stop the function execution
    try {
      // Send a PATCH request to update the prompt using the 'fetch' API
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });
      if (response.ok) router.push('/'); // If the response is successful (status code 200-299), navigate to the home page
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return <Form type='Edit' post={post} setPost={setPost} submitting={submitting} handleSubmit={updatePrompt} />;
};

export default UpdatePrompt;
