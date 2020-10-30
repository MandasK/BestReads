import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { UserProfileProvider } from "./providers/UserProfileProvider";
import ApplicationViews from "./components/ApplicationViews";
import Header from "./components/Header";
import './App.css';
import { BookSearchProvider } from './providers/BookSearchProvider';
import { BookProvider } from './providers/BookProvider';
import { SubscriptionProvider } from './providers/SubscriptionProvider';
import { ReadStateContext, ReadStateProvider } from './providers/ReadStateProvider';
import { ReviewProvider } from './providers/ReviewProvider';

function App() {
  return (
    <div className="App">
   <Router>
     <UserProfileProvider>
     <SubscriptionProvider>
       <BookSearchProvider>
       <BookProvider>
         <ReadStateProvider>
           <ReviewProvider>
       <Header />
       <ApplicationViews />
       </ReviewProvider>
       </ReadStateProvider>
       </BookProvider>  
       </BookSearchProvider>
       </SubscriptionProvider>
     </UserProfileProvider>
   </Router>
   </div>
  );
}

export default App;
