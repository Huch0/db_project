import React, { useState } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import './css/NewDraft.css';

const NewDraft = ({}) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const submitData = async (e) => {
    e.preventDefault();
    try {
      // 여기에 데이터를 제출하는 로직을 작성해주세요.
      // 예를 들어, API 호출을 할 수 있습니다.
    } catch (err) {
      console.error(err);
    }
  };
  
  return (
      <div>
        <form onSubmit={submitData}>
          <h1>New Draft</h1>
          <input
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            type="text"
            value={title}
          />
          <textarea
            cols={50}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Content"
            rows={8}
            value={content}
          />
          <input disabled={!content || !title} type="submit" value="Create" />
          <Link className="back" href="#" onClick={() => Router.push('/feed')}>
            or Cancel
          </Link>
        </form>
      </div>
  );
}

export default NewDraft;