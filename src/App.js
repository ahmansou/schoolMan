
import "bootstrap/dist/css/bootstrap.min.css"; 
// import CreateUser from './components/pages1/CreateUser/CreateUser';
// import Students from './components/pages1/Students/Students';
// import Navbar from './components/Navbar/Navbar';
// import { BrowserRouter as Router, Route } from 'react-router-dom';
// import Parents from "./components/pages1/Parents/Parents";
// import Signin1 from './components/pages1/Signin/Signin';
// import Signin from './components/pages/Signin/Signin';
// import Profile from './components/pages1/Profile/Profile';
// import Staffs from './components/pages1/Staff/Staff';


import React, { Component } from 'react';
import Layout from './components/Layout/Layout';

class App extends Component{
  // state = {
  //   username: undefined
  // }

  // componentDidMount() {
  //   let token = JSON.parse(localStorage.getItem('authToken'));
  //   if (token)
  //     this.setState({username: token.token.username});
  // }

  render () {
    // console.log("logged user:", this.state.username)
    return (
      <Layout />
      // <Router>
      //   <Navbar username={this.state.username}/>
      //   <div className="container" >
      //     <Route path="/users1" exact component={CreateUser} />
      //     <Route path="/1" exact component={Students} />
      //     <Route path="/parents1" exact component={Parents} />
      //     <Route path="/sign-in1" exact component={Signin1} />
      //     <Route path="/sign-in" exact component={Signin} />
      //     <Route path="/profile1" exact component={Profile}  />
      //     <Route path="/staffs1" exact component={Staffs} />
      //   </div>
      // </Router>
    );
  }
}

export default App;
