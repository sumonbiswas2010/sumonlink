import React from 'react'

const UserProfile = (props) => {
    const data = props.data

    return(
        <div key={data.id}>
            <br></br>
            <p>ID: {data.id}</p>
            <p>Full Name: {data.first_name} {data.last_name}</p>
            <p>Email: {data.email}</p>
            <p>Phone: {data.phone}</p>
            <p>Gender: {data.gender}</p>
            <p>Birthday: {data.birthday}</p>
            <p>Address: {data.address}</p>   
            <p>Country: {data.country}</p>    
            
               
        </div>
    )

}

export default UserProfile