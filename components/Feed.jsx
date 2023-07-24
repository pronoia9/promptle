'use client';

import { useState, useEffect } from 'react';
import { PromptCard, PromptCardList } from '.';

const Feed = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  const fetchPosts = () => { };

  const filterPrompts = () => { };

  const handleSearchChange = (e) => { };
  
  const handleTagClick = () => { };
  
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
