const Notification = ({text,type}) => {
    const error = {color: "red"}
    if (text === null)
        return(
            null
        )
    else{
        if (type) error.color = "green"
        return(
            <div className="notification" style = {error}>
                {text}
            </div>             
        )
    }
}

export default Notification