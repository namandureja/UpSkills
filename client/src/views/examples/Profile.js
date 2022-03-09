// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
} from 'reactstrap';
// core components
import Header from 'components/Headers/Header.js';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapLocation } from '@fortawesome/free-solid-svg-icons';
import './style/login.css'

const skillsSet = ['Digital Literacy', 'Payroll Services', 'Maintenance & Repair', 'Foreign Languages', 'Environmental Engineering', 'Cardiology', 'Tax Accounting', 'Management Accounting', 'Bookkeeping', 'Television', 'Pharmaceutical Manufacturing', 'Robotics', 'Art History', 'Law', 'Personal Coaching', 'Employee Learning & Development', 'Administrative Assistance', 'Healthcare Management', 'Human Resources (HR)', 'Interior Design', 'Investor Relations', 'Corporate Communications', 'Product Development', 'Aerospace Engineering', 'Anthropology', 'Capital Markets', 'Landscape Architecture', 'Retail Packaging', 'Inside Sales', 'Physical Medicine and Rehabilitation', 'Anesthesiology', 'Computer Networking', 'Dance', 'Composites', 'Tax Law', 'Music', 'Electronics', 'Customer Service Systems', 'Wellness', 'Materials Science', 'Electronic Control Systems', 'Computer Graphics', 'Research', 'Leadership', 'Development Tools', 'Retail', 'Sales Operations', 'Genetic Engineering', 'Family Medicine', 'Digital Marketing', 'Apparel', 'Pharmaceutics', 'Software Testing', 'Cybersecurity', 'Environmental Science', 'Human Computer Interaction', 'Biomedical Engineering', 'History', 'Cooking', 'Nanotechnology', 'Construction Engineering', 'Insurance', 'System Administration', 'Oncology', 'Recreation', 'Organic Chemistry', 'Editing', 'Financial Accounting', 'Information Management', 'Product Marketing', 'Project Management', 'Visual Arts', 'Zoology', 'Food Service Operations', 'Journalism', 'Industrial Design', 'Evolutionary Biology', 'International Law', 'Event Planning', 'Game Development', 'Computer Hardware', 'Communication', 'Procurement', 'Real Estate', 'Physiology', 'Neurology', 'Veterinary Medicine', 'Artificial Intelligence (AI)', 'Drilling Engineering', 'Technical Support', 'Social Media', 'Criminal Law', 'Aircraft Management', 'Photography', 'Labor and Employment Law', 'Earth Science', 'Conceptual Art', 'Family Law', 'Telecommunications', 'Manufacturing Operations', 'Mobile Application Development', 'Graphic Design', 'Air Force', 'Translation', 'Chemical Processing', 'Printing', 'Teamwork', 'Competitive Strategies', 'Enterprise Software', 'Software Development Life Cycle (SDLC)', 'Environmental Consulting', 'Data Science', 'Video', 'Animation', 'Commercial Banking', 'Professional Sports', 'Architecture', 'Commercial Photography', 'Contract Law', 'Entrepreneurship', 'Public Health', 'Growth Strategies', 'Time Management', 'Airlines', 'General Surgery', 'Investment Banking', 'Intellectual Property', 'Data Storage Technologies', 'Sports Coaching', 'Agricultural Production', 'Instrumentation', 'Forestry', 'Customer Experience', 'Mining', 'Urban Planning', 'Scientific Computing', 'Advertising', 'Food Manufacturing', 'Oil & Gas', 'Negotiation', 'Higher Education', 'Water Engineering', 'Management Consulting', 'Writing', 'Auditing', 'Teaching', 'Radio Production', 'Web Development', 'Power Systems', 'Product Testing', 'Accounts Payable', 'Medicine', 'Linguistics', 'Literature', 'Public Policy', 'Arts & Crafts', 'Recruiting', 'Utilities', 'Business Management', 'Machining', 'Plastics', 'Property Law', 'Theatre', 'Automotive'];
const Profile = () => {
  const [emailImage, setEmailImage] = useState('');

  const [username, setUsername] = useState('');
  const [email, setemail] = useState('');
  const [fName, setfName] = useState('');
  const [imgLoad, setimgLoad] = useState(false);
  const [lName, setlName] = useState('');
  const [address, setaddress] = useState('');
  const [city, setcity] = useState('');
  const [country, setcountry] = useState('');
  const [postalCode, setpostalCode] = useState('');
  const [about, setabout] = useState('');
  const [loaded, setloaded] = useState(true);
  const [uni, setUni] = useState('');
  const [degree, setDegree] = useState('');
  const [field, setField] = useState('');
  const [skill,setSkill] = useState([]);
  const [searchRes,setSearchRes] = useState([]);
  const [skillArray,setSkillArray] = useState([]);
  const [inputSkillValue,setInputSkill]= useState("");
  let skArr=[],skArr1=[];

  const submitHandler = (e) => {
    e.preventDefault();
    fetch('/api/dash/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        username,
        about,
        fName,
        lName,
        address,
        city,
        skills: skill,
        country,
        postalCode,
        uni,
        degree,
        field,
      }),
    })
      .then((r) => {
        return r.json();
      })
      .then((res) => {
        if (res.status == 1) {
          console.log('Success!');
          alert('Success!');
        } else {
          alert('Error');
        }
      });
  };

  let datag;
  const getData = async () => {
    const res = await fetch('/api/dash');
    const { data } = await res.json();
    datag=data;
    if (data) {
      setloaded(true);
      setEmailImage(data.email);
      setemail(data.email);
      setUsername(data.username);
      setimgLoad(true);
      setfName(data.fName);
      setlName(data.lName);
      setcity(data.city);
      setcountry(data.country);
      setabout(data.about);
      setaddress(data.address);
      setpostalCode(data.postalCode);
      setUni(data.uni);  
      setSkill(data.skills)    
      skArr1 = data.skills
      console.log(skArr1)
      setField(data.field);
      setDegree(data.degree);
      initiateSkills()
    } else {
      setloaded(false);
    }
  };

  const initiateSkills = ()=>{
    let array = [];
    let skill = datag.skills;
    for(let i = 0; i<skill.length;i++)
    array.push( <div className='skill-box' style={{"marginRight":10}}>
    {skill[i]} <i className="fas fa-times" data-id={skill[i]} onClick={(e)=>{
      deleteSkill(e.target.dataset.id);
    }}></i>
  </div>);
  setSkillArray(array);
  skArr=array;
  }

  const searchSkill = (e)=>{
      let searchResult = [];
  
      let string = e.target.value;
      if(string.length==0){
            setSearchRes([]);
           return;
      }
      let found=0;
      let i,elem;
      for( i=0;i<skillsSet.length;i++){
          if(skillsSet[i].toUpperCase().includes(string.toUpperCase()))
              {
                elem=skillsSet[i];
                if(elem.slice(0,string.length).toUpperCase().includes(string.toUpperCase()))
              {found=1;
              searchResult.push(<div onClick={(e)=>{
                updateSkills(e.target.dataset.value)}} data-value={elem} style={{"padding":8,"fontSize":14,"cursor":"pointer"}}>
                {elem}
              </div>);}

              }
      }
      if(found==1)
        setSearchRes(searchResult)
      else
      setSearchRes([]);
  };

  const deleteSkill= (id)=>{
    console.log(id+"\n");
    let index = skArr.map(function(e) { return e.props.children[0]; }).indexOf(id)
    console.log(index);
    let array = skArr;
    console.log(array)
    array.splice(index,1);
    console.log(array)
    skArr1.splice(index,1);
    setSkill(skArr1);
    setSkillArray([])
    setTimeout(() => {
      setSkillArray(array)
    },0);
     
  }

  const updateSkills = (value)=>{
    let skillArray1 = skill;
    skillArray1.push(value)
    setSkill(skillArray1);
      let array  = skillArray;
      array.push( <div className='skill-box' style={{"marginRight":10}}>
      {value} <i className="fas fa-times" data-id={value} onClick={(e)=>{
        deleteSkill(e.target.dataset.id);
      }}></i>
    </div>);
    setInputSkill("")
    setSearchRes([]);
    setSkillArray(array)
  }
  
  useEffect(() => {
   getData();

  }, []);
  return (
    <>
      {!loaded ? (
        <></>
      ) : (
        <>
          <Header />
          {/* Page content */}
          <Container className="mt--100" fluid style={{ marginTop: '-4rem' }}>
            <Row>
              <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
                <Card className="card-profile shadow">
                  <Row className="justify-content-center">
                    <Col className="order-lg-2" lg="3">
                      <div className="card-profile-image">
                        <a href="#pablo" onClick={(e) => e.preventDefault()}>
                          <img
                            alt="..."
                            className={imgLoad ? 'rounded-circle profile-img' : 'rounded-circle profile-img hide'}
                            src={`https://avatars.dicebear.com/api/adventurer/${emailImage}.svg`}
                            style={{
                              height: '10rem',
                              width: '10rem',
                              objectFit: 'cover',
                              backgroundColor: '#adb5bd',
                            }}
                          />
                        </a>
                      </div>
                    </Col>
                  </Row>
                  <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4"></CardHeader>
                  <CardBody className="pt-0 pt-md-4">
                    {/* <Row>
                  <div className="col">
                    <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                      <div>
                        <span className="heading">22</span>
                        <span className="description">Friends</span>
                      </div>
                      <div>
                        <span className="heading">10</span>
                        <span className="description">Photos</span>
                      </div>
                      <div>
                        <span className="heading">89</span>
                        <span className="description">Comments</span>
                      </div>
                    </div>
                  </div>
                </Row> */}
                    <div className="text-center" style={{ marginTop: '60px' }}>
                      <h3>
                        {username}
                        {/* <span className="font-weight-light">, 27</span> */}
                      </h3>
                      <div className="h5 font-weight-300">
                        {city.length || country.length ? (
                          <FontAwesomeIcon
                            icon={faMapLocation}
                            style={{ 'margin-right': 6.5 }}
                          />
                        ) : (
                          <></>
                        )}
                        {city}
                        {country.length && city.length ? ', ' : ''}
                        {country}
                      </div>
                      <div className="h5 mt-4">
                        <i className="ni business_briefcase-24 mr-2" />
                        {degree} {field}
                      </div>
                      <div>
                        <i className="ni education_hat mr-2" />
                        {uni}
                      </div>
                      <hr className="my-4" />
                      <p>{about}</p>
                    </div>
                  </CardBody>
                </Card>
              </Col>
              <Col className="order-xl-1" xl="8">
                <Card className="bg-secondary shadow">
                  <CardHeader className="bg-white border-0">
                    <Row
                      className="align-items-center"
                      style={{
                        justifyContent: 'space-between',
                        width: '100%',
                        marginLeft: '0',
                      }}
                    >
                      <h3 className="mb-0">My account</h3>
                      <Button color="primary" type="submit" form="userinfo">
                        Save
                      </Button>
                    </Row>
                  </CardHeader>
                  <CardBody>
                    <Form id="userinfo" onSubmit={(e) => submitHandler(e)}>
                      <h6 className="heading-small text-muted mb-4">
                        User information
                      </h6>
                      <div className="pl-lg-4">
                        <Row>
                          <Col lg="6">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-username"
                              >
                                Username
                              </label>
                              <Input
                                className="form-control-alternative"
                                id="input-username"
                                placeholder="username"
                                type="text"
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                              />
                            </FormGroup>
                          </Col>
                          <Col lg="6">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-email"
                              >
                                Email address
                              </label>
                              <Input
                                className="form-control-alternative"
                                id="input-email"
                                disabled
                                placeholder="xyz@example.com"
                                type="email"
                                value={email}
                                onChange={(e) => setemail(e.target.value)}
                                required
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col lg="6">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-first-name"
                              >
                                First name
                              </label>
                              <Input
                                className="form-control-alternative"
                                id="input-first-name"
                                placeholder="First Name"
                                type="text"
                                value={fName}
                                onChange={(e) => setfName(e.target.value)}
                              />
                            </FormGroup>
                          </Col>
                          <Col lg="6">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-last-name"
                              >
                                Last name
                              </label>
                              <Input
                                className="form-control-alternative"
                                id="input-last-name"
                                placeholder="Last Name"
                                type="text"
                                value={lName}
                                onChange={(e) => setlName(e.target.value)}
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                      </div>
                      <hr className="my-4" />
                      {/* Address */}
                      <h6 className="heading-small text-muted mb-4">
                        Contact information
                      </h6>
                      <div className="pl-lg-4">
                        <Row>
                          <Col md="12">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-address"
                              >
                                Address
                              </label>
                              <Input
                                className="form-control-alternative"
                                id="input-address"
                                placeholder="Street Address"
                                type="text"
                                value={address}
                                onChange={(e) => setaddress(e.target.value)}
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col lg="4">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-city"
                              >
                                City
                              </label>
                              <Input
                                className="form-control-alternative"
                                id="input-city"
                                placeholder="City"
                                type="text"
                                value={city}
                                onChange={(e) => setcity(e.target.value)}
                              />
                            </FormGroup>
                          </Col>
                          <Col lg="4">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-country"
                              >
                                Country
                              </label>
                              <Input
                                className="form-control-alternative"
                                id="input-country"
                                placeholder="Country"
                                type="text"
                                value={country}
                                onChange={(e) => setcountry(e.target.value)}
                              />
                            </FormGroup>
                          </Col>
                          <Col lg="4">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-country"
                              >
                                Postal code
                              </label>
                              <Input
                                className="form-control-alternative"
                                id="input-postalCode-code"
                                placeholder="Postal code"
                                type="number"
                                value={postalCode}
                                onChange={(e) => setpostalCode(e.target.value)}
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                      </div>
                      <hr className="my-4" />
                      {/* Description */}
                      <h6 className="heading-small text-muted mb-4">
                        About me
                      </h6>
                      <div className="pl-lg-4">
                        <FormGroup>
                          <label>About Me</label>
                          <Input
                            className="form-control-alternative"
                            placeholder="Write a few words about yourself.."
                            rows="4"
                            type="textarea"
                            value={about}
                            onChange={(e) => setabout(e.target.value)}
                          />
                        </FormGroup>
                      </div>
                      <hr className="my-4" />
                      <h6 className="heading-small text-muted mb-4">
                        Educational Qualifications
                      </h6>
                      <div className="pl-lg-4">
                        <Row>
                          <Col md="12">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-address"
                              >
                                University / Institution
                              </label>
                              <Input
                                className="form-control-alternative"
                                id="input-uni"
                                placeholder="University"
                                type="text"
                                value={uni}
                                onChange={(e) => setUni(e.target.value)}
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col lg="6">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-degree"
                              >
                                Degree
                              </label>
                              <Input
                                className="form-control-alternative"
                                id="input-degree"
                                placeholder="Degree"
                                type="text"
                                value={degree}
                                onChange={(e) => setDegree(e.target.value)}
                              />
                            </FormGroup>
                          </Col>
                          <Col lg="6">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-field"
                              >
                                Field of Study
                              </label>
                              <Input
                                className="form-control-alternative"
                                id="input-field"
                                placeholder="Field"
                                type="text"
                                value={field}
                                onChange={(e) => setField(e.target.value)}
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                      </div>
                      <hr className="my-4" />
                      <h6 className="heading-small text-muted mb-4">
                        Skillset
                      </h6>
                      <div className="pl-lg-4">
                        <Row>
                          <Col md="12">
                            <FormGroup style={{"marginBottom":0}}>
                              <label
                                className="form-control-label"
                                htmlFor="input-skill"
                              >
                                Skills
                              </label>
                              <Input
                                className="form-control-alternative"
                                id="input-skill"
                                placeholder="Search for a skill"
                                type="text"
                                value={inputSkillValue}
                                onChange={(e) => {
                                  searchSkill(e);
                                  setInputSkill(e.target.value)
                                }}
                                autoComplete="off"
                              />
                              <div style={{"backgroundColor":"white","padding-top":6,"paddingLeft":12,"marginTop":-10}}>
                                {searchRes}
                              </div>
                            </FormGroup>
                          </Col>
                        </Row>
                        <div className='skill-boxes'>
                       
                            {skillArray}
                        </div>
                      </div>
                    </Form>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </>
      )}
    </>
  );
};

export default Profile;
