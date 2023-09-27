import { useState } from "react"
import NavbarComponent from "./NavbarComponent"
import axios from "axios"
import Swal from "sweetalert2"
import { getUser } from "../services/authorize"
import { getToken } from "../services/authorize"

const FormComponent = () => {
    //input
    const [state, setState] = useState({
        title: "",
        content: "",
        author: getUser()
    })

    const { title, content, author } = state

    //กำหนดค่าให้กับ state
    const inputValue = name => event => {
        //แสดงค่าในช่องกรอกข้อมูล
        setState({ ...state, [name]: event.target.value })
    }

    const submitForm = (e) => {
        e.preventDefault();
        console.log("API URL", process.env.REACT_APP_API)
        axios.post(`http://localhost:5500/api/create`, { title, content, author }, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        }).then(response => {
            Swal.fire(
                'Notification',
                'Save Successfully',
                'success'
            )
            //เคลียร์ช่อง input
            setState({ ...state, title: "", content: "", author: "" })
        }).catch(err => {
            Swal.fire('Notification', err.response.data.error, 'error')
        })
    }

    return (
        <div className="container p-5">
            <NavbarComponent></NavbarComponent>
            <br></br>
            <h1 style={{ textAlign: "center" }}>CREATE YOUR NEW DIARY</h1>
            <form onSubmit={submitForm}>
                <div className="form-group">
                    <label>Title</label>
                    <input type="text" className="form-control" value={title} onChange={inputValue("title")} />
                </div>
                <br />
                <div className="form-group">
                    <label>Details</label>
                    <textarea type="text" className="form-control" value={content} onChange={inputValue("content")} />
                </div>
                <br />
                <div className="form-group">
                    <label>Author</label>
                    <input type="text" className="form-control" value={author} onChange={inputValue("author")} />
                </div><br></br>
                <div className="form-group text-center">
                    <input type="submit" value="SAVE DIARY" className="btn btn-primary"></input>
                </div>

            </form>

        </div>
    )
}

export default FormComponent