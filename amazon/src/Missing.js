import { Link } from "react-router-dom"

const Missing = () => {
  return (
    <main className="Miising">
      <h1>Page Not Found</h1>
      <p>Well that's dispointing!</p>
      <p>
        <Link to="/">Vist Our HomePage</Link>
      </p>
    </main>
  )
}

export default Missing