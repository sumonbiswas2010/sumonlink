import React from 'react'
import './userCard.css'

const MyServicesData =(props) =>
{
    const data = props.data.data
    let DataCard
    if(data){
    DataCard = data.map((user) =>

    <div className="cards links" key={user.id}>
        <p>Full Link: {user.full}</p>
        <p>Short Link: <a target="_blank" href={user.short}>{user.short}</a></p>
        <p>Clicked: {user.clicked}</p>
    </div>
    
    );
    }

    else
    {
        DataCard = <p>No Data Found</p>
    }
    


    return(
        <div>
            <br></br><br></br>
            <div>{DataCard}</div>
        </div>

    )
}
export default MyServicesData;