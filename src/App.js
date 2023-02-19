import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Login from "./components/pages/login/Login";
import Main from "./components/pages/main/Main";
import {Box} from "@mui/material";

function App() {
    return (
        <Box className='container'>
            <Router>
                <Routes>
                    <Route exact path='/' element={<Main/>}/>
                    <Route path='/login' element={<Login/>}/>
                </Routes>
            </Router>
        </Box>
    );
}

export default App;
