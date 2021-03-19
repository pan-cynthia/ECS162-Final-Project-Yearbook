const React = require('react');
const ReactDOM = require('react-dom');
const {
  BrowserRouter,
  Switch,
  Route
} = require('react-router-dom');

/* Import Pages */
const SplashPage = require('./SplashPage');
const CreatorView = require('./CreatorView');
const Relogin = require('./Relogin');
const FinalView = require('./FinalView');
const Display = require('./Display');
const SearchResults = require('./SearchResults');

const App = () => <BrowserRouter>
	<Switch>
    <Route path="/user/creatorview">
			<CreatorView/>
		</Route>
    <Route path="/email=notUCD">
      <Relogin/>
    </Route>
    <Route path="/user/finalview">
      <FinalView/>
    </Route>
    <Route path="/display">
      <Display/>
    </Route>
    <Route path="/searchresults/">
      <SearchResults/>
    </Route>
    <Route path="/">
			<SplashPage/>
		</Route>
	</Switch>
</BrowserRouter>

ReactDOM.render(<App/>, document.getElementById('main'));