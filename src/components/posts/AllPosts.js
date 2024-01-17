import { useEffect, useState } from "react";
import { getAllPosts } from "../../services/postService";
import "./Posts.css";
import { PostFilterBar } from "./PostFilterBar";

export const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTopic, setSearchTopic] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    getAllPosts().then((postArray) => {
      setPosts(postArray);
    });
  }, []);

  useEffect(() => {
    const foundPosts = posts.filter((post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPosts(foundPosts);
  }, [posts, searchTerm]);

  useEffect(() => {
    if (searchTopic) {
      const foundPosts = posts.filter(
        (post) => post.topicId === parseInt(searchTopic)
      );
      setFilteredPosts(foundPosts);
    } 
  }, [posts, searchTopic]);

  useEffect(() => {
    if(searchTopic === "0") {
        setFilteredPosts(posts)
    }
  }, [searchTopic, posts])

  return (
    <div className="posts">
      <h2>All Posts</h2>
      <PostFilterBar posts={posts} setSearchTerm={setSearchTerm} setSearchTopic={setSearchTopic}/>

      {filteredPosts.map((postObj) => {
        return (
          <div className="post" key={postObj.id}>
            <div>
              <div className="post-title">{postObj.title}</div>

              <div className="post-topic">Topic: {postObj.topic.name}</div>

              <div className="post-likes">
                Number of likes: <i className="fa-solid fa-thumbs-up"></i>{" "}
                {postObj.likes.length}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
