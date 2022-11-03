import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button } from 'react-bootstrap';

function CreateItem() {

    const [itemTitle, setItemTitle] = useState("");
    const [itemLink, setItemLink] = useState("");
    const [resourceName, setResourceName] = useState("");
    const [description, setDescription] = useState("");

    const [formErrors, setFormErrors] = useState({
        itemTitleError: "",
        itemLinkError: "",
        resourceNameError: "",
        descriptionError: ""
    })
    const [success, setSuccess] = useState("")

    const validateInput = (e) => {
        // console.log(e.target);

        if (e.target.id === "formGridItemTitle") {
            let title = e.target.value;
            if (title.length >= 3 && title.length <= 50) {
                setFormErrors({ ...formErrors, itemTitleError: "" })
            } else {
                setFormErrors({ ...formErrors, itemTitleError: "Title should have 3 to 50 characters" });
            }
        }
        else if (e.target.id === "formGridItemLink") {
            let link = e.target.value;
            if (link.length > 10) {
                setFormErrors({ ...formErrors, itemLinkError: "" })
            } else {
                setFormErrors({ ...formErrors, itemLinkError: "Invalid URL" });
            }
        }
        else if (e.target.id === "formGridResourceName") {
            let resource = e.target.value;
            if (resource.length > 5) {
                setFormErrors({ ...formErrors, resourceNameError: "" })
            } else {
                setFormErrors({ ...formErrors, resourceNameError: "Mobile Number should have 10 digits" });
            }
        }
        else if (e.target.id === "formGridDescription") {
            let description = e.target.value;
            if (description.length > 6) {
                setFormErrors({ ...formErrors, descriptionError: "" })
            } else {
                setFormErrors({ ...formErrors, descriptionError: "Description is too short" })
            }

        }
    };

    const onSubmit = (e) => {
        // console.log(e);


    };

    return (<>
        <div class="grid-container">

            <div class="grid-child createItemForm">
                <h3 style={{ textAlign : 'center'}}>Item Details</h3>
                <Form onSubmit={onSubmit}>
                    <Form.Group controlId="formGridItemTitle">
                        <Form.Label>ITEM TITLE</Form.Label>
                        <Form.Control type="text" onChange={(e) => { setFormErrors({ ...formErrors, emptyFormError: "" }); validateInput(e); setItemTitle(e.target.value) }} />
                        <Form.Label className='text-danger'>{formErrors.emptyFormError}</Form.Label>
                        <Form.Label className='h6 text-danger'>{formErrors.itemTitleError}</Form.Label>
                    </Form.Group>

                    <Form.Group controlId="formGridItemLink">
                        <Form.Label>LINK</Form.Label>
                        <Form.Control type="url" onChange={(e) => { setFormErrors({ ...formErrors, emptyFormError: "" }); validateInput(e); setItemLink(e.target.value) }} />
                        <Form.Label className='text-danger'>{formErrors.emptyFormError}</Form.Label>
                        <Form.Label className='h6 text-danger'>{formErrors.itemLinkError}</Form.Label>
                    </Form.Group>

                    <Form.Group controlId="formGridResourceName">
                        <Form.Label>RESOURCE NAME</Form.Label>
                        <Form.Control type="text" onChange={(e) => { setFormErrors({ ...formErrors, emptyFormError: "" }); validateInput(e); setResourceName(e.target.value) }} />
                        <Form.Label className='text-danger'>{formErrors.emptyFormError}</Form.Label>
                        <Form.Label className='h6 text-danger'>{formErrors.resourceNameError}</Form.Label>
                    </Form.Group>

                    <Form.Group controlId="formGridDescription">
                        <Form.Label>DESCRIPTION</Form.Label>
                        <Form.Control as="textarea" rows={3} onChange={(e) => { setFormErrors({ ...formErrors, emptyFormError: "" }); validateInput(e); setDescription(e.target.value) }} />
                        <Form.Label className='text-danger'>{formErrors.emptyFormError}</Form.Label>
                        <Form.Label className='h6 text-danger'>{formErrors.descriptionError}</Form.Label>
                    </Form.Group>

                    <div className="d-grid gap-2 createButton" >
                        <Button variant="success" size="lg" type="submit" >
                            CREATE
                        </Button>
                    </div>
                </Form>
            </div>

            <div class="grid-child sideImage">
                <img src="/Office_Setup.jpg" alt="Filler image" style={{ height: "750px"}} />
            </div>

        </div>
    </>);
}

export default CreateItem;