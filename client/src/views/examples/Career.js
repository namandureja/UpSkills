
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
// core components
import Header from 'components/Headers/Header.js';
import React from 'react';
import './style/login.css';

const Career = () => {


  const [jobs, setJobs] = React.useState([]);
  const [emptyText, setEmptyText] = React.useState('Enter skills in profile tab');
  const [query, setQuery] = React.useState('');
  const [found, setFound] = React.useState(false);
  const openUrl = (url) => {
    window.open(url, '_blank');
  };

  

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
                <h3 className="mb-0">Jobs Available</h3>
                <div className="search-wrap">
                  <i
                    className="fas fa-search"
                    onClick={(e) => searchJob(e)}
                    style={{
                      cursor: 'pointer',
                    }}
                  />

                  <input
                    type="text"
                    placeholder="Search.."
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                </div>
              </CardHeader>

              <Table
                className="align-items-center table-flush our-table"
                responsive
              >
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Company</th>
                    <th scope="col">Title</th>
                    {/* <th scope="col">Type</th>
                      <th scope="col">Level</th> */}
                    <th scope="col">Location</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>{jobs}</tbody>
              </Table>
              <div className="text-center empty-table">{emptyText}</div>
              {/* <CardFooter className="py-4">
                  <nav aria-label="...">
                    <Pagination
                      className="pagination justify-content-end mb-0"
                      listClassName="justify-content-end mb-0"
                    >
                      <PaginationItem className="disabled">
                        <PaginationLink
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                          tabIndex="-1"
                        >
                          <i className="fas fa-angle-left" />
                          <span className="sr-only">Previous</span>
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem className="active">
                        <PaginationLink
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          1
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          2 <span className="sr-only">(current)</span>
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          3
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          <i className="fas fa-angle-right" />
                          <span className="sr-only">Next</span>
                        </PaginationLink>
                      </PaginationItem>
                    </Pagination>
                  </nav>
                </CardFooter> */}
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Career;
