import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router';
import Table from './Table';

const ResourceDetails = () => {

    const [resourceItems, setResourceItems] = useState([]);
    const resourceId = useParams().id;

    useEffect(() => {
        console.log(resourceId)
        axios.get(`https://media-content.ccbp.in/website/react-assignment/resource/${resourceId}.json`)
            .then(result => {
                //console.log(result.data.resource_items)
                setResourceItems(result.data.resource_items);
            }).catch((err) => {
                console.log(err.message);
            })
        // eslint-disable-next-line
    }, []);

    return (<>
        <Table data={resourceItems} />
    </>)
}

export default ResourceDetails