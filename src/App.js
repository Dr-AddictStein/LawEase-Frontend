import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Join from "./pages/Join";
import Login from "./pages/Login";
import FindLaywer from "./pages/Find-laywer";
import SearchResult from "./pages/Search-result";
import Appointments from "./pages/Appointments";
import Availability from "./pages/Availability";
import Profile from "./pages/Profile";
import Book from "./pages/Book";
import { useAuthContext } from "./hooks/useAuthContext";

function App() {
  const { user } = useAuthContext();
  return (
    <BrowserRouter>
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/join" element={user?<Home/>:<Join />} />
        <Route path="/login" element={user?<Home/>:<Login />} />
        <Route path="/find-lawyer" element={<FindLaywer />} />
        <Route path="/search-result/:category" element={<SearchResult />} />
        <Route path="/appointments/:lawyer_id" element={user?<Appointments />:<Home/>} />
        <Route path="/availablity/:lawyer_id" element={user?<Availability />:<Home/>} />
        <Route path="/profile/:lawyer_id" element={user? <Profile />:<Home/>} />
        <Route path="/book-appointment/:lawyer_id" element={<Book />} />
 
      </Routes>
    
    </BrowserRouter>
  );
}

export default App;
