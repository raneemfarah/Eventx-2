import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./Contexts/authContext";
import Login from "./Pages/login";
import Register from "./Pages/register";
import Dashboard from "./Pages/Dashboard/dashboard";
import EventDetails from "./Pages/EventDetails/eventDetails";
import BrowseEvents from "./Pages/EventBrowse/browseEvents";
import EventDetailsUser from "./Pages/EventDetailsUser/eventDetailsUser";
import EditEvent from "./Pages/EditEvent/editEvent";
import AddEvent from "./Pages/AddEvent/addEvent";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/events/:id"
          element={user ? <EventDetails /> : <Navigate to="/login" replace />}
        />
        <Route path="/eventDetailsUser/:id" element={<EventDetailsUser />} />

        <Route
          path="/editevent/:id"
          element={user && user.role === "admin" ? <EditEvent /> : <Navigate to="/login" replace />}
        />

        <Route
          path="/browse-events/*"
          element={user ? <BrowseEvents /> : <Navigate to="/login" replace />}
        />

        <Route
          path="/add-event"
          element={user && user.role === "admin" ? <AddEvent /> : <Navigate to="/login" replace />}
        />

        <Route
          path="/*"
          element={
            !user ? (
              <Navigate to="/login" replace />
            ) : user.role === "admin" ? (
              <Dashboard />
            ) : (
              <BrowseEvents />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
