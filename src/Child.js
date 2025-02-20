function Child(props){
    console.log("child", props);
    const {counter, increment}=props
    const incrementCounter=()=>{
        increment()
    }
    return (
        <div>
            <h1>Hello from Child Component counter = {counter}</h1>
            <button onClick={incrementCounter}>Increment Counter</button>
        </div>
    )
}
export default Child;