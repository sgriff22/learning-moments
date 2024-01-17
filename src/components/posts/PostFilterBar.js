export const PostFilterBar = ({ posts, setSearchTerm, setSearchTopic }) => {
  return (
    <div className="filter-bar">
      <div>
        <input
          type="text"
          placeholder="Search Posts"
          className="post-search"
          name="search"
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
        />

        <select
          id="topic-search"
          onChange={(event) => {
            setSearchTopic(event.target.value);
          }}
        >
          <option value="0">Filter by topic...</option>
          {posts.map((postObj) => {
            return (
              <option value={postObj.topicId} key={postObj.topicId}>
                {postObj.topic.name}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};
