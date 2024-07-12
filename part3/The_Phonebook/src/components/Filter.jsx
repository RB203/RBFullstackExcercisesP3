const Filter = ({filter,functionChange}) => {
    return (
        <>
            filter shown with<input value = {filter} onChange = {functionChange}></input>
        </>
    )
}

export default Filter