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
  Col,
  CardBody,
} from 'reactstrap';
// core components
import Header from 'components/Headers/Header.js';
import React, { useEffect } from 'react';
import './style/login.css';
import { initRoketo } from "../roketo";



window.Buffer = window.Buffer || require("buffer").Buffer;
const nearAPI = require("near-api-js");
const { keyStores } = nearAPI;
const keyStore = new keyStores.BrowserLocalStorageKeyStore();
const { connect, WalletConnection } = nearAPI;
const config = {
  networkId: "testnet",
  keyStore: keyStore,
  nodeUrl: "https://rpc.testnet.near.org",
  walletUrl: "https://wallet.testnet.near.org",
  helperUrl: "https://helper.testnet.near.org",
  explorerUrl: "https://explorer.testnet.near.org",
};
let wallet;




const connectToWallet = async () => {
  const near = await connect(config);
  wallet = new WalletConnection(near);
  if (!wallet.isSignedIn()) {
    await wallet.requestSignIn(
      "ndureja2.testnet", // contract requesting access
      "UpSkills", // optional
      "http://localhost:3000/admin/donate", // optional
      "http://localhost:3000/admin/donate" // optional
    );
  }
}



const Icons = () => {
  const [auth, setAuth] = React.useState(false);
  const [reciever,setRec] = React.useState('');
  const [amt,setAmt] = React.useState('');
  const [createBool,setCreateBool] = React.useState(false);
  const [days,setDays] = React.useState('');
  const [error,setError] = React.useState('');
  const [hrs,setHrs] = React.useState('');
  const [min,setMin] = React.useState('');
  const [status,setStatus] = React.useState('');
  const logOut = async () => {
    const near = await connect(config);
    wallet = new WalletConnection(near);
    if (wallet.isSignedIn()) {
      wallet.signOut();
      setAuth(false)
      console.log("done");
    }
  }
  let roketo;
  const authCheck = async () => {
    const near = await connect(config);
    const wallet = new WalletConnection(near);
    if (wallet.isSignedIn()) {
      setAuth(true)
       roketo = await initRoketo({
        walletConnection: wallet,
      });
      const account = await roketo.api.getCurrentAccount();
      console.log(account)
   
    }
  }

  const createPayment = async()=>{
    setError('');
    let day = days.length?days:0;
    let hour = hrs.length?hrs:0;
    let minutes = min.length?min:0;
    let totalTime=(day*24*60*60)+(hour*60*60)+(minutes*60);
    let speed = (amt/totalTime);
    if(reciever.length==0){
      setError("Reciever can't be null")
      return;
    }
    if(amt<=0){
      setError("Invalid Amount")
      return;
    }
    if(totalTime<=0){
      setError("Invalid Period")
      return;
    }
    setStatus("Connecting...")
    setCreateBool(true)
    const near = await connect(config);
    const wallet = new WalletConnection(near);
    setStatus("Connected")

    if (wallet.isSignedIn()) {

        roketo = await initRoketo({
          walletConnection: wallet,
        });
        let speed1 = speed*1e15;
        setStatus("Creating Stream...")

       let url = await roketo.api.createStream({
        receiverId: reciever,
        speed: Math.round(speed1).toString(),
        description: "donation",
        deposit: "2000000000000000000000000",
        token: "NEAR",
      });
      setStatus("Stream created!")
      setAmt('')
      setRec('')
      setDays('')
      setHrs('')
      setMin('')
      setCreateBool(false)
      
      console.log(url)
    }
  }

  useEffect(() => {
    authCheck();
  }, []);


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
                <h3 className="mb-0">Donate using Near Wallet with <a href='https://roke.to' target='_blank'> Roke.to</a> </h3>
              </CardHeader>
              <CardBody style={{
                backgroundColor: "#f7fafc"
              }}>
              <Col className='text-center justify-content-center align-items-center'>
              { auth? <Col lg="12">
                <Row className='justify-content-center'>
                  <Col lg="6" className='text-left'>
                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="input-receiver"
                      >
                        Receiver:
                      </label>
                      <Input
                        className="form-control-alternative"
                        id="input-receiver"
                        placeholder="reciever.testnet"
                        type="text"
                        required
                       value={reciever}
                       onChange={(e) => setRec(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row className='justify-content-center'>
                  
                  <Col lg="6" className='text-left'>
                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="input-amount"
                      >
                        Stream Deposit Amount:
                      </label>
                      <Input
                        className="form-control-alternative"
                        id="input-amount"
                        placeholder="100 NEAR"
                        type="number"
                        required
                      value={amt}
                      onChange={(e) => setAmt(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row  className='text-left justify-content-center '>
                  <Col lg="6">
                <label
                        className="form-control-label"
                        htmlFor="input-amount"
                      >
                        Period:
                      </label>
                      </Col>
                </Row>
            
                <Row className='justify-content-center'>    
                <Col lg="2" className='text-left'>
                    <FormGroup>
                      <Input
                        className="form-control-alternative"
                        id="input-days"
                        placeholder="Days"
                        type="number"
                        required
                       value={days}
                      onChange={(e) => setDays(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                  <Col lg="2" className='text-left'>
                    <FormGroup>
             
                      <Input
                        className="form-control-alternative"
                        id="input-hour"
                        placeholder="Hours"
                        type="number"
                        required
                       value={hrs}
                       onChange={(e) => setHrs(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                  <Col lg="2" className='text-left'>
                    <FormGroup>
                  
                      <Input
                        className="form-control-alternative"
                        id="input-min"
                        placeholder="Minutes"
                        type="number"
                        required
                       value={min}
                       onChange={(e) => setMin(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row className='justify-content-center'>
                <Col lg="6" className='text-left'>
                <Row style={
                 { margin:"15px 0",
                  
                }
                }>
                <Button color="primary" disabled={createBool} style={{
                    width: "fit-content",
                  }} onClick={createPayment} >
                   Create Stream
                  </Button>
                  <Button color='primary' style={{
                    backgroundColor:"rgb(173, 181, 189)",
                    border:"none",
                    width: "fit-content",
                  }} onClick={logOut} >
                    Disconnect Wallet
                  </Button>
                  </Row>
                  </Col>
                </Row>
                </Col>:<></>}
                {auth ?
                  <></>
                  : <Button color="primary" style={{
                    width: "fit-content",
                    margin: "20px"
                  }} onClick={connectToWallet} >
                    Connect to Wallet
                  </Button>}
                  <p>
                    {
                      status
                    }
                  </p>
                  <p style={{
                    color:"red"
                  }}>
                    {
                      error
                    }
                  </p>
              </Col>
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Icons;
