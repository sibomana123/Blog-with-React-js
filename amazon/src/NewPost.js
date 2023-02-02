
const NewPost = ({id,
  postTitle,postBody,setPostTitle, 
  setPostBody, handleSubmit}) => {
  return (
    <main className="NewPost">
      <h2>New post</h2>
<form className="newPostForm" onSubmit={handleSubmit}>
    
  <label htmlFor="postTitle">Title:</label>
  <input 
    id="postTitle"
    type="text"
    required
    value={postTitle}
    onChange={(e)=>setPostTitle(e.target.value)}
  />

  <label htmlFor="postBody">Post</label>
  <textarea
    id="postBody" 
    required
    value={postBody}
    onChange={(e)=>setPostBody(e.target.value)}
    cols="30" 
    rows="10"/>
  <button type="submit">Submit</button>
</form>
</main>
  )
}

export default NewPost