import './Topsection.css'

function Topsection({name,contact}){
    return(
        <div className="top-section">
            <h1>{name}</h1>
            <p>{contact.mob}  |  {contact.email}</p>
            <hr></hr>
        </div>
    )
}

export default Topsection;