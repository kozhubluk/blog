import './styles/index.scss';
import { Route, Routes} from "react-router-dom";
import PostsList from "./components/PostsList/PostsList";
import Post from "./components/Post/Post";
import Header from "./components/Header/Header";

function App() {
  return (
    <div className="app">
        <Header/>
        <div className='container'>
            <Routes>
                <Route path='/' element={<PostsList/>}/>
                <Route path='/post/:id' element={<Post/>}/>
            </Routes>
        </div>
    </div>
  );
}

export default App;
