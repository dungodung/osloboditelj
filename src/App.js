import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Main from './Main';
import Approve from './Approve';

const App = () => (
	<main>
		<Switch>
			<Route exact path='/' component={Main}/>
			<Route path='/a/:hash' component={Approve}/>
		</Switch>
	</main>
)

export default App;

