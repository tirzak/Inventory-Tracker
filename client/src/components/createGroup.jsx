import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
const CreateGroup = (props) => {

    const [groupName, setGroupName] = useState({
        groupName: '',
    });
    const uuid = props.uuid || 0
    let nav = useNavigate();
    useEffect(()=>{
        let groupName = props.groupName || ''
        let groupNameC = { ...groupName }
        groupNameC.groupName = groupName
        setGroupName(groupNameC);
      
    },[])
    let handleChange = (e) => {
        e.preventDefault()
        if(uuid!=0){
            let am = JSON.stringify(groupName)


        fetch(`api/v1/group/${uuid}`, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: am

        }).then((result) => {
            if (result.ok) {
                nav("/")

            }
            else {
                result.json().then(
                    (errorObj)=>{
                        let alertObj=errorObj.errors.map(elem=>{
                           return elem.msg
                        })
   
                        alert(alertObj)
                    }
                )


            }

        },
            (error) => {
                alert(error)
            });

        }
        
        else{

        
        let am = JSON.stringify(groupName)


        fetch(`api/v1/group`, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: am

        }).then((result) => {
            if (result.ok) {
                nav("/")

            }
            else {
                result.json().then(
                    (errorObj)=>{
                        console.log(errorObj)
                        let alertObj=errorObj.errors.map(elem=>{
                           return elem.msg
                        })
   
                        alert(alertObj)
                    }
                )

            }

        },
            (error) => {
                alert("Something Went Wrong")
            });

        }

    }

    let handleInputChange = (e) => {
        e.preventDefault()
        let groupName = e.target.value
        let groupNameC = { ...groupName }
        groupNameC.groupName = groupName
        setGroupName(groupNameC);


    }

    return (
        <>
            <div>
                <ol>

                    <li>Only English alphabets and  - _ allowed in the Collection Name field. <br></br>Must be at least 2 characters and end with an alphanumeric characters</li>

                </ol>
            </div>
            <form onSubmit={e => handleChange(e)}>

                <div>
                    <label>
                    Collection Name:
                    </label>
                    <input name="prodName" id="prodName" type="text" maxLength="45" value={groupName.groupName || ''} onChange={handleInputChange} required />
                    <br />
                    <br />
                    <div>
                     <button name="submit" type="submit">{props.buttonName || "Add"}</button>

             
                    </div>
                </div>
            </form>


        </>
    )


}

export default CreateGroup;