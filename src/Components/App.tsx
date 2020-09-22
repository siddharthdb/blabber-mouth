import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './Home';
import { About } from '../Pages/About';
import { NavBar } from './NavBar';
import { ContactUs } from '../Pages/ContactUs';
import ArticleList from './ArticleList';
import { ArticlePage } from '../Pages/ArticlePage';

class App extends React.Component<{}, {}> {
    render() {
        return(
            <div className="App">
                <NavBar></NavBar>
                <h1>My Blabber Mouth</h1>
                <Switch>
                    <Route path="/" component={Home} exact></Route>
                    <Route path="/about" component={About}></Route>       
                    <Route path="/articles" component={ArticleList}></Route>
                    <Route path="/articlepage/:name" component={ArticlePage}></Route>
                    <Route path="/contactus" component={ContactUs}></Route>       
                </Switch>
            </div>
        )
    }
}

export default App;