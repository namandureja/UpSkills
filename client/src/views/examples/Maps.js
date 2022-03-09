import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  UncontrolledTooltip,
  Button,
  Form,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  Tooltip,
} from 'reactstrap';
import Header from 'components/Headers/Header.js';
import React, { useEffect } from 'react';
import './style/login.css';

const Maps = () => {

  const [industries, setIndustries] = React.useState([]);

  const openUrl = (url) => {
    window.open(url, '_blank');
  };

  let response = [];

  useEffect(async()=>{
    let req1 = await fetch('/api/dash/skill');
    let {skills}= await req1.json();
    console.log(skills)
   let req = await fetch('http://127.0.0.1:5000/show',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }, body: JSON.stringify({
        "list":skills
      })
    })
    let {industries} = await req.json();
   console.log(industries)
    response=industries;
    initiate();
  },[]);



  const initiate = ()=>{
    let array=[];
    response.forEach(x=>{
      let elem =      
      <tr>
      <th scope="row">
        <Media className="align-items-center">
          <Media>
            <span className="mb-0 text-sm">{x["industry"]}</span>
          </Media>
        </Media>
      </th>
      <td className="title">{x["title"]}</td>

      <td className="text-right">
        <Button
          color="primary"
          href={x["url"]}
          onClick={(e) => {
            e.preventDefault();
            openUrl(x["url"]);
          }}
          size="sm" >
          Enroll
        </Button>
      </td>
    </tr>;
  array.push(elem);
    })
    setIndustries(array);
  }



  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--100" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0 card-header">
                <h3 className="mb-0">Relevanat Industries</h3>
              </CardHeader>

              <Table
                className="align-items-center table-flush our-table"
                responsive
              >
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Industry</th>
                    <th scope="col">Course</th>
                    {/* <th scope="col">Type</th>
                      <th scope="col">Level</th> */}
                    {/* <th scope="col">Location</th> */}
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                      {
                        industries
                      }
                </tbody>
              </Table>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Maps;
