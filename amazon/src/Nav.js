import { Link } from "react-router-dom"

const Nav = ({search,setSearch}) => {
  return (
    <nav className="Nav">
      <form className="searchForm" action="" onSubmit={(e)=>e.preventDefault()}>
        <label htmlFor="search">Search Post</label>
        <input 
        id="search"
        type="text" 
        placeholder="Search post"
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
        />
      </form>
<ul>
<li><Link to="/">Home</Link></li>
<li><Link to="/post">Post</Link></li>
<li><Link to="/about">About</Link></li>
</ul>
    </nav>
  )
}

export default Nav