import About from './About';
import Header from './Header';
import Nav from './Nav';
import Home from './Home';
import Missing from './Missing';
import NewPost from './NewPost';
import PostPage from './PostPage';
import Footer from './Footer';
import './App.css';
import api from './api/post'
import EditedPost from './EditedPost';

import { Routes, Route, useNavigate} from 'react-router-dom';
import { useState, useEffect} from 'react';
import {format} from 'date-fns'




function App() {

  const [posts, setPosts] = useState([])
  const [search, setSearch]=useState('');
  const [searchResult, setSearchResult]=useState([]);
  const [postTitle, setPostTitle]=useState('');
  const [postBody, setPostBody]=useState('');

  const[editedTitle, setEditedTitle]=useState('');
  const[editedBody, setEditedBody]=useState('');
  let navigate= useNavigate();
 

  useEffect(()=>{
   const fetchPosts=async ()=>{

    try {
      const response= await api.get('/posts')
      setPosts(response.data)
    } catch (error) {
      if(error.response){

        //not in range of 200 response range
          console.log(error.response.data); 
          console.log(error.response.satus);
          console.log(error.response.header);

      }else{
        console.log(`Error:${error.message}`);
      }
    }
   };
   fetchPosts();
  },[]);



useEffect(()=>{
const filtredResult= posts.filter(post=>
  ((post.body).toLowerCase()).includes(search.toLocaleLowerCase())
  ||
  ((post.title).toLowerCase()).includes(search.toLocaleLowerCase()));

  setSearchResult(filtredResult.reverse())
},[posts,search])


 
  const handleSubmit= async (e)=>{
   e.preventDefault();
   const id= posts.length ? posts[posts.length-1].id +1 : 1;
   const datetime = format(new Date(), 'MMM dd, yyyy pp')
   const newPost={id, title:postTitle, datetime, body:postBody }

try {
  const response = await api.post('/posts', newPost)
  const allPosts=[...posts, response.data];
  setPosts(allPosts)
  setPostTitle('')
  setPostBody('')
  
 navigate(-1)  //navigate("/") u can use this
} catch (error) {
  console.log(`Error:${error.message}`);
}
 };



 const handlerEdit= async(id)=>{
   const datetime= format(new Date(), 'MMMM dd, yyyy pp');
   const updatedPost={id, title:editedTitle, datetime, body:editedBody}
  
   try {
    const response= await api.put(`/posts/${id}`, updatedPost)
    setPosts(posts.map(post=>post.id===id ? {...response.data}: post));
    setEditedTitle('');
    setEditedBody('');
    navigate(-1)
   } catch (error) {
    console.log(`Error:${error.message}`);
   }
 };



 const handleDelete= async(id)=>{
  try {
    await api.delete(`posts/${id}`)
    const postList= posts.filter((post)=>post.id !==id)
    setPosts(postList)
    navigate(-1)    //don'nt use navigate.push('/')
  } catch (error) {
    console.log(`Error:${error.message}`); 
  }
 
};


  return (
    <div className="App">
 <Header title="React.Js Blog"/>
 <Nav  search={search} setSearch={setSearch}/>

 <Routes>
  <Route path="/" element={
  <Home posts={searchResult}
  />
  }/>
  <Route path='/post' element={
  <NewPost
    postTitle={postTitle}
    setPostTitle={setPostTitle}
    postBody={postBody}
    setPostBody={setPostBody}
    handleSubmit={handleSubmit}
  />}/>

<Route path='/edit/:id' element={
  <EditedPost
    posts={posts}
    editedTitle={editedTitle}
    setEditedTitle={setEditedTitle}
    editedBody={editedBody}
    setEditedBody={setEditedBody}
    handlerEdit={handlerEdit}
  />}/>


  <Route path='/post/:id' element={
      <PostPage
      posts={posts}
      handleDelete={handleDelete}
  />}/>

  <Route path='/about' element={<About/>}/>
  <Route path='*' element ={<Missing/>}/>
 </Routes>
 <Footer/>
    </div>
  );
}

export default App;
