import {Route, Routes, BrowserRouter} from 'react-router-dom'
import Registration from './components/Registration/Registration';
import SignIn from './components/Authorization/SignIn';
import GoogleCallback from './components/Authorization/GoogleCalback';
import Authorization from './components/Authorization/Authorization';

import './App.css';

function App() {
    return(
      <div>
        <BrowserRouter>
            <Routes>
              <Route path='/' element={<Authorization/>} index />
              <Route path='/register' element={<Registration/>}/>
              <Route path="/auth" element={<SignIn />}/>
              <Route path="/auth/google" element={<GoogleCallback />}/>
            </Routes>
        </BrowserRouter>
    </div>
    )
}

export default App;
