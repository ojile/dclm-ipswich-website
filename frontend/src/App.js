import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import './assets/styles/global.css';
import 'font-awesome/css/font-awesome.min.css'; 

// Importing Context Providers
import { SermonProvider } from './assets/context/SermonContext';
import EventProvider from './assets/context/EventContext';
import { AuthProvider } from './assets/context/AuthContext'; 

// Importing pages and components
import Home from './pages/Home';
import About from './pages/About';
import Ministries from './pages/Ministries';
import Sermons from './pages/Sermons';
import SermonDetails from './pages/SermonDetails';
import Events from './pages/Events';
import EventDetails from './pages/EventDetails';
import LiveStream from './pages/LiveStream';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import Giving from './pages/Giving';
import VisitorInfo from './pages/VisitorInfo';
import AddSermon from './pages/AddSermon';
import AddEvent from './pages/AddEvent'; 
import Login from './components/Login';
import Signup from './components/Sign-up'; 
import ProtectedRoute from './components/ProtectedRoute'; // Import the ProtectedRoute component

// Individual ministry pages
import ChildrenMinistry from './pages/ChildrenMinistry';
import YouthMinistry from './pages/YouthMinistry';
import WomenMinistry from './pages/WomenMinistry';
import YoungAdultMinistry from './pages/YoungAdultMinistry';
import EvangelisticMinistry from './pages/EvangelisticMinistry';

const App = () => {
  return (
    <SermonProvider>
      <EventProvider>
        <AuthProvider>
          <Router>
            <div className="App">
              {/* Header Component */}
              <Header />

              {/* Main Content - Routing Setup */}
              <main>
                <Routes>
                  {/* Define the Home page */}
                  <Route path="/home" element={<Home />} />

                  {/* Login and Signup page routes */}
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} /> 

                  {/* Other routes */}
                  <Route path="/about" element={<About />} />
                  <Route path="/ministries" element={<Ministries />} />
                  <Route path="/ministries/children" element={<ChildrenMinistry />} />
                  <Route path="/ministries/youth" element={<YouthMinistry />} />
                  <Route path="/ministries/women" element={<WomenMinistry />} />
                  <Route path="/ministries/young-adult" element={<YoungAdultMinistry />} />
                  <Route path="/ministries/evangelistic" element={<EvangelisticMinistry />} />
                  <Route path="/sermons" element={<Sermons />} />
                  <Route path="/sermons/:id" element={<SermonDetails />} />
                  <Route path="/events" element={<Events />} />
                  <Route path="/events/:id" element={<EventDetails />} />
                  <Route path="/live-stream" element={<LiveStream />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/giving" element={<Giving />} />
                  <Route path="/visitor-info" element={<VisitorInfo />} />

                  {/* Protected routes for adding sermons and events */}
                  <Route path="/sermons/add" element={<ProtectedRoute element={<AddSermon />} />} /> 
                  <Route path="/events/add" element={<ProtectedRoute element={<AddEvent />} />} /> 

                  {/* Catch-all route for undefined paths */}
                  <Route path="*" element={<Navigate to="/home" />} />
                </Routes>
              </main>

              {/* Footer Component */}
              <Footer />
            </div>
          </Router>
        </AuthProvider>
      </EventProvider>
    </SermonProvider>
  );
};

export default App;
