
import "bootstrap/dist/css/bootstrap.min.css";
import CreateUser from './components/pages/CreateUser/CreateUser';
import Students from './components/pages/Students/Students';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Parents from "./components/pages/Parents/Parents";

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="container" >
        <Route path="/users" exact component={CreateUser} />
        <Route path="/" exact component={Students} />
        <Route path="/parents" exact component={Parents} />
      </div>
    </Router>
  );
}

export default App;
