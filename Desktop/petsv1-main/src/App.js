import logo from './logo.svg';
import './App.css';
import Dashboard from './pages/js/dashboard';
import SettingsConfig from './pages/js/anam/settingsConfig';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PetManagementDashboard from './pages/js/pet_managment';
import Navbar from './pages/js/navbar';
import MessagingPanel from './pages/js/anam/messaging';
import EventScheduling from './pages/js/anam/eventScheduling';
import AdoptionApplications from './pages/js/anam/adoptionApplications';
import Footer from './pages/js/footer';
import SignUp from './pages/js/signup';
import Login from './pages/js/login';
import UserListWithChat from './pages/js/anam/chat';
function App() {

  return (
    <div className="App">
       <Router>

        
        
      <Routes>
                  <Route path="/" element={<Dashboard />} />                

           {<Route path="/navbar" ele
           ment={<Navbar />} />
            
          }
          
           {<Route path="/Footer" element={<Navbar />} />
            
          }
             
          

   {<Route path="/settingsConfig" element={<SettingsConfig />} />
            
          }

 {<Route path="/signup" element={<SignUp />} />
            
          }
           {<Route path="/login" element={<Login />} />
            
          }

 {<Route path="/pet_managment" element={<PetManagementDashboard />} />
            
          }
          {<Route path="/messaging" element={<MessagingPanel />} />
            
          }
             {<Route path="/adoptionApplications" element={<AdoptionApplications />} />
            
          }

 {<Route path="/eventScheduling" element={<EventScheduling />} />
            
          }

 {<Route path="/settingConfig" element={<SettingsConfig />} />
            
          }
                </Routes>
    </Router>
    </div>
  );
}

export default App;
