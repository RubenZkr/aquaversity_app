import React, { useState } from "react";
import CreatePost from "../createPost/CreatePost";
import Post from "../post/Post";
import {getPosts, postMessage} from "../../../api/ServiceBus.js";

export default function Forum({ darkMode, toggleTheme }) {
    const [posts, setPosts] = useState([]);

    //on page load get all posts
    React.useEffect(() => {
        const fetchPosts = async () => {
            const response = await getPosts();
            setPosts(...posts, response);
        };
        fetchPosts();
    }, []);

    const handlePost = async (newPost) => {
        // api call
        const response =  await postMessage(newPost);
        // update state
        setPosts([...posts, response]);

    };
  
    return (
      <div>
        <CreatePost onPost={handlePost} darkMode={darkMode} />
        {posts?.map((post, index) => (
          <Post
            key={index}
            title={post.title}
            text={post.text}
            author={post.author}
            id={post.id}
            likesCount={post.likes}
            date={post.date}
            darkMode={darkMode}
          />
        ))}

      </div>
    );
  }
  