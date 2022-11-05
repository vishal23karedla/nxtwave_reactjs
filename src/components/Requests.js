import React from 'react'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import SwitchTabs from './SwitchTabs';

const Requests = () => {

  const [requests, setRequests] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);

  useEffect(() => {
    axios.get('https://media-content.ccbp.in/website/react-assignment/resources.json')
      .then(response => {
        let result = (response.data).filter(current => { return current.tag === "request" });
        setRequests(result)
        setFilteredResults(result)
      }).catch((err) => {
        console.log(err.message);
      })
  }, []);

  const searchItems = (searchValue) => {
    setSearchInput(searchValue)
    if (searchInput !== "") {
      const filteredData = requests.filter((item) => {
        return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
      })
      setFilteredResults(filteredData)
    }
    else {
      setFilteredResults(requests)
    }
  }

  return (<>
    <SwitchTabs />
    <div className="form-group m-5 search-inp">
      <input type="text" className="form-control item" id="search" placeholder="Search..."
        onChange={(e) => {
          searchItems(e.target.value);
        }}
      /></div>
    <div className='container'>
      <div className='row'>
        {filteredResults.map(element => (<>
          <div className='col col-sm-6 col-md-6 col-lg-4'>
            <div id="divLogin" className="m-3 bgImage panel-body-appointment1 d-flex justify-content-center">
              <div className="m-2" style={{ width: "25rem", height: "15 rem" }} >

                <Link to={`/resource/${element.id}`} className='text-decoration-none text-dark'>
                  <Card style={{ width: '100%', height: '15rem' }}>
                    {/* <Card.Header>Header</Card.Header> */}
                    <Card.Body style={{ border: "#d7dfe9" }}>
                      <Card.Title>
                        <img src={element.icon_url} className="mr-5 mx-auto card-img-sm text-right" alt="Request icon" />
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        {element.title}
                      </Card.Title>
                      <Card.Text className='mt-4'>
                        <a target="_blank" href="{element.link}" className='text-decoration-none'>{element.link}</a>
                      </Card.Text>
                      <Card.Text className='mt-1'>
                        {element.description}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Link>

              </div>
            </div>
          </div>
        </>))}
      </div>
    </div>
  </>)
}


//
// const Requests = () => {

//     const [resources, setResources] = useState([]);

//     useEffect(() => {
//         axios.get('https://media-content.ccbp.in/website/react-assignment/resources.json')
//             .then(result => {
//                 //console.log(result.data)
//                 let res = (result.data).filter(current => { return current.tag === "request" });
//                 console.log(res);
//                 setResources(res)
//             }).catch((err) => {
//                 console.log(err.message);
//             })
//     }, []);

//     return (<>
//         <SwitchTabs />
//         <div>
//             <div className='container m-5'>
//                 <div className='m-3 row'>
//                     {resources.map(app => (<>
//                         <div className='col-sm-6 col-md-4 '>
//                             <div id="divLogin" className="mt-3 bgImage panel-body-appointment1">
//                                 <div className="m-2">
//                                     <Card border="secondary" style={{ width: '25rem' }}>
//                                         {/* <Card.Header>Header</Card.Header> */}
//                                         <Card.Body>
//                                             <Card.Title>
//                                                 <img src={app.icon_url} className="mr-5 mx-auto card-img-sm text-right" alt="..." />
//                                                 &nbsp;&nbsp;&nbsp;&nbsp;
//                                                 {app.title}
//                                             </Card.Title>
//                                             <Card.Text className='mt-4'>
//                                                 <a href="{app.link}" className='text-decoration-none'>{app.link}</a>
//                                             </Card.Text>
//                                             <Card.Text className='mt-1'>
//                                                 {app.description}
//                                             </Card.Text>
//                                         </Card.Body>
//                                     </Card>
//                                 </div>
//                             </div>
//                         </div>
//                     </>))}
//                 </div>
//             </div>
//         </div>
//     </>)
// }

export default Requests