import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Login from '../pages/Login';
import Main from '../pages/Main';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Login/>}/>
        <Route exact path='/main'element={<Main/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
