import { Link, useParams } from "react-router-dom"
import {useEffect } from "react"

const EditedPost = ({
  posts, handlerEdit, editedTitle,setEditedTitle,editedBody,setEditedBody
}) => {

  const {id}=useParams();
  const post= posts.find(post=>(post.id).toString()===id);

  useEffect(()=>{
    if(post){
      setEditedTitle(post.title);
      setEditedBody(post.body)
    }
  },[post,setEditedTitle,setEditedBody])


  return (
      <main className="NewPost">

      {editedTitle &&
       <>
      <h2>Edited post</h2>
      <form className="newPostForm" onSubmit={(e)=>e.preventDefault()}>
        
      <label htmlFor="editedTitle">Title:</label>
      <input 
        id="editedTitle"
        type="text"
        required
        value={editedTitle}
        onChange={(e)=>setEditedTitle(e.target.value)}
      />

      <label htmlFor="editedBody">Post</label>
      <textarea
        id="editedBody" 
        required
        value={editedBody}
        onChange={(e)=>setEditedBody(e.target.value)}
        cols="30" 
        rows="10"/>
      <button onClick={()=>handlerEdit(post.id)}>Submit</button>
      </form>
</>
}

{!editedTitle && 
      <>
      <h2>Post Not Found</h2>
      <p>Well That's Dispointing.</p>
      <p>
        <Link to='/'>vist Our HomePage</Link>
      </p>
      </>
      }
</main>
  )
}

export default EditedPost
