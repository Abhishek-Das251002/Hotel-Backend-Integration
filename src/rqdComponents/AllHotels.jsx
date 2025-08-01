import { useState } from "react"
import useFetch from "../useFetch"

const AllHotelsNames = () => {
    const {data, loading, error} = useFetch("http://localhost:3000/hotels")
    const [successMsg, setSuccessMsg] = useState("")
    const handleDeleteBtn = async (hotelId) => {
        try{
            const response = await fetch(`http://localhost:3000/hotels/${hotelId}`,
            {
                method: "DELETE",
            }
        )
        if(!response.ok){
            throw "failed to delete hotel."
        }

        const data = response.json()

        if(data){
            setSuccessMsg("Hotel deleted successfully.")
            window.location.reload()
        }
        }catch(error){
            console.log(error)
        }
        
    }
    return (
        <div>
            <h2>All Hotels</h2>
            {loading && <p>Loading...</p>}
            {data?.error && <p>{data?.error}</p>}
        <ul>
            {data?.map(hotel => (
                <>
                <li>{hotel.name} <button onClick={() => handleDeleteBtn(hotel._id)}>Delete</button></li>
                <br />
                </>
            ))}
        </ul>
        {successMsg}
        </div>
    )
}

export default AllHotelsNames