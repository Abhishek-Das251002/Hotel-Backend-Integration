import { useState } from "react"
import useFetch from "../useFetch"

const AllBooks = () => {
    const [successMsg, setSuccessMsg] = useState("")
    const {data, loading, error} = useFetch("https://book-ap-is.vercel.app/books")
    const handleDeleteBtn = async (bookId) => {
        const response = await fetch(`http://localhost:3000/books/${bookId}`,
            {
                method: "DELETE",
            }
        )
        if(!response.ok){
            throw "unable to delete book data."
        }

        const data = await response.json()

        if(data){
            setSuccessMsg("Book deleted successfully.")
            window.location.reload()
        }
    }
    return (
        <div>
        {loading && <p>Loading...</p>}
        {data?.error && <p>{data?.error}</p>}
        <h2>All Books</h2>
        <ul>
        {data?.map(book => (
            <>
            <li>{book.title} <button onClick={() => handleDeleteBtn(book._id)}>Delete</button></li>
            <br />
            </>
        ))}
        </ul>
        <p>{successMsg}</p>
        </div>
    )
}

export default AllBooks