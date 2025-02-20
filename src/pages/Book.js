import { useParams } from "react-router";
export default function Book(){
    let { id } = useParams();
    console.log("Book Page ID: ", id);  // Output: Book Page ID:  10
    return (
        <div>
            <h1>Hello from Book Component</h1>
        </div>
    )
}