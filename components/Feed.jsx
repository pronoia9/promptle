'use client';

import { useState, useEffect } from 'react';
import { PromptCardList } from '.';

const Feed = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  const filterPrompts = () => {};

  const handleSearchChange = (e) => {};

  const handleTagClick = () => {};

  // Fetch posts
  useEffect(() => {
    (async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json();
      setAllPosts(data);
    })();
  }, []);

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          type='text'
          placeholder='Search for a tag or a username'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>

      <PromptCardList data={searchText ? searchedResults : allPosts} handleTagClick={handleTagClick} />
    </section>
  );
};
export default Feed;
