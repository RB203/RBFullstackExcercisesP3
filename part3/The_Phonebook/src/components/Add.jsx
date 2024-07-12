const Add = ({submission,changeName,changeNumber,newName,newNumber}) =>{
    return (
        <>
        <h2>add a new</h2>
        <form  onSubmit ={submission}>
            <div>
            name: <input value = {newName} onChange = {changeName}/>
            </div>
            <div>number: <input value = {newNumber} onChange = {changeNumber}/></div>
            <div>
            <button type="submit">add</button>
            </div>
        </form>
        </>
    )
}

export default Add