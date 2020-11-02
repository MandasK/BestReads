import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { UserProfileProvider } from "./providers/UserProfileProvider";
import ApplicationViews from "./components/ApplicationViews";
import Header from "./components/Header";
import './App.css';
import { BookSearchProvider } from './providers/BookSearchProvider';
import { BookProvider } from './providers/BookProvider';
import { SubscriptionProvider } from './providers/SubscriptionProvider';
import { ReadStateProvider } from './providers/ReadStateProvider';
import { ReviewProvider } from './providers/ReviewProvider';

function App() {
  return (  
   <Router>
     <UserProfileProvider>
        <SubscriptionProvider>
        <ReadStateProvider>
          <ReviewProvider>
          <BookSearchProvider>
            <BookProvider>
              
                  <Header />
                  <ApplicationViews />
                     
            </BookProvider>  
          </BookSearchProvider>
          </ReviewProvider> 
          </ReadStateProvider>
              </SubscriptionProvider>
      </UserProfileProvider>
    </Router>
  );
}

export default App;
