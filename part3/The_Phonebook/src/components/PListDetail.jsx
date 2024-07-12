const PListDetail = ({name,number,buttonFunction}) =>{
    return(
        <div>
            {name} {number} <button onClick = {buttonFunction}>delete</button>
        </div>
    )
}

export default PListDetail