import './assets/styles/index.scss';
import { Route, Routes} from "react-router-dom";
import Header from "./components/Header/Header";
import MainPage from "./pages/MainPage/MainPage";
import PostPage from "./pages/PostPage/PostPage";

function App() {
  return (
    <div className="app">
        <Header/>
        <div className='container'>
            <Routes>
                <Route path='/' element={<MainPage/>}/>
                <Route path='/post/:id' element={<PostPage/>}/>
            </Routes>
        </div>
    </div>
  );
}

export default App;
