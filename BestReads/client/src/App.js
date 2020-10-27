import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { UserProfileProvider } from "./providers/UserProfileProvider";
import ApplicationViews from "./components/ApplicationViews";
import Header from "./components/Header";
import './App.css';
import { BookSearchProvider } from './providers/BookSearchProvider';

function App() {
  return (
   <Router>
     <UserProfileProvider>
       <BookSearchProvider>
       <Header />
       <ApplicationViews />
       </BookSearchProvider>
     </UserProfileProvider>
   </Router>
  );
}

export default App;
