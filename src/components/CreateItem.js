import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import office_image from '../assets/Office_Setup.jpg';

const CreateItem = () => {
    const formInitialDetails = {
        itemName: '',
        link: '',
        resourceName: '',
        description: ''
    }

    const [formDetails, setFormDetails] = useState(formInitialDetails);

    const onFormUpdate = (category, value) => {
        setFormDetails({ ...formDetails, [category]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formDetails.itemName === "" || formDetails.link === "" || formDetails.resourceName === "" || formDetails.description === "") {
            toast.error("Form field cannot be empty!", {
                position: toast.POSITION.BOTTOM_CENTER
            });
        } else {
            if (formDetails.itemName.length < 3) {
                toast.error("Title should have minimum 3 characters", {
                    position: toast.POSITION.BOTTOM_CENTER
                });
            } else if (formDetails.link.length < 10) {
                toast.error("Invalid URL", {
                    position: toast.POSITION.BOTTOM_CENTER
                });
            } else if (formDetails.resourceName.length < 5) {
                toast.error("Resource name should have minimum 5 characters", {
                    position: toast.POSITION.BOTTOM_CENTER
                });
            } else if (formDetails.description.length < 6) {
                toast.error("Description is too short", {
                    position: toast.POSITION.BOTTOM_CENTER
                });
            }
            else {
                axios.post('https://media-content.ccbp.in/website/react-assignment/add_resource.json',formDetails)
                    .then((res) => {
                        console.log(res);
                    })
                    .catch((err)=> {
                        console.log(err);
                    }) 
                    //giving CORS error
                toast.success("Item created Successfully", {
                    position: toast.POSITION.BOTTOM_CENTER
                });
                e.target.reset();
            }
        }
    }

    return (<>
        <div className='row sm-12'>
            <div className="col sm-12 registration-form">
                <form onSubmit={handleSubmit}>
                    <div className="text-center mb-2">
                        <h3>Create Item</h3>
                    </div>
                    <div className="form-group">
                        <label className='m-1'>ITEM NAME</label>
                        <input type="text" className="form-control item" id="itemName" placeholder="Item Name"
                            onChange={(e) => {

                                onFormUpdate('itemName', e.target.value)
                            }}
                        />
                    </div>
                    <div className="form-group">
                        <label className='m-1'>LINK</label>
                        <input type="text" className="form-control item" id="link" placeholder="Link"
                            onChange={(e) => {

                                onFormUpdate('link', e.target.value)
                            }}
                        />
                    </div>
                    <div className="form-group">
                        <label className='m-1'>RESOURCE NAME</label>
                        <input type="text" className="form-control item" id="resourceName" placeholder="Resource Name"
                            onChange={(e) => {

                                onFormUpdate('resourceName', e.target.value)
                            }}
                        />

                    </div>
                    <div className="form-group">
                        <label className='m-1'>DESCRIPTION</label>
                        <input type="text-area" className="form-control desc-item" id="description" placeholder="Description"
                            onChange={(e) => {

                                onFormUpdate('description', e.target.value)
                            }}
                        />
                    </div>
                    <ToastContainer />
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary create-account">Create</button>
                    </div>
                </form>
            </div>
            <div className="col grid-child sideImage m-2 d-flex justify-content-end mx-auto d-none d-md-block">
                <img src={ office_image } alt="Office_Setup" style={{ height: "700px", width: "100%", marginTop: "30px" }} />
            </div>
        </div>
    </>)
}

export default CreateItem;