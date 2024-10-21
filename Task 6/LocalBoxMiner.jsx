import React, { useState } from 'react'

export default function LocalBoxMiner() {
    const [state, setState] = useState({
        name: "",
        email: ""
    })

    const [edit, setEdit] = useState(false)
    const [Index, setIndex] = useState(null)

    const [data, setData] = useState(() => {
        const saveData = JSON.parse(localStorage.getItem("data"))
        return saveData || []
    })

    function SubmitForm(e) {
        e.preventDefault()

        if (edit) {

            const updateData = data.map((item, i) => i === Index ? state : item)
            setData(updateData)
            localStorage.setItem("data", JSON.stringify(updateData))
            setEdit(false)
            setIndex(null)

        } else {

            setData((prevData) => {
                const updateData = [...prevData, state];
                localStorage.setItem("data", JSON.stringify(updateData));
                return updateData;
            })

        }

        setState({ name: "", email: "" })
    }

    function editBtn(index) {
        setState(data[index])
        setEdit(true)
        setIndex(index)
    }

    function deleteBtn(index) {
        const deleteData = data.filter((item, i) => i !== index)
        setData(deleteData)
        localStorage.setItem("data", JSON.stringify(deleteData))
    }
    return (
        <div>
            <br />
            <h1>Local Storage Todo List</h1>
            <br />
            <form onSubmit={SubmitForm}>

                <label>Name : </label>&nbsp;&nbsp;
                <input type="text" value={state.name} placeholder='Enter Your Name'
                    onChange={(e) => setState({ ...state, name: e.target.value })} />
                <br /><br />

                <label>E-mail : </label>&nbsp;&nbsp;
                <input type="text" value={state.email} placeholder='Enter Your E-mail'
                    onChange={(e) => setState({ ...state, email: e.target.value })} />
                <br /><br />

                <input style={{ background: "black", color: "white", border: "none" }} type="submit" value={edit ? "Update" : "Add Task"} /> <br />
                <br />
            </form>

            <ul style={{ listStyle: "none" }}>
                {
                    data.map((el, i) => (
                        <li key={i}>
                            {el.name} <br /> {el.email} <br />
                            <button onClick={() => editBtn(i)} style={{ background: "black", color: "white", border: "none" }}>Edit</button>&nbsp;&nbsp;
                            <button onClick={() => deleteBtn(i)} style={{ background: "black", color: "white", border: "none" }}>Delete</button> <br /><br />
                        </li>
                    ))
                }
            </ul>

        </div>
    )
}
