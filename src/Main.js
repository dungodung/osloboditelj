import React, { Component } from 'react';
import CommonsFetcher from './CommonsFetcher';

class Main extends Component {
	render() {
		return (
			<div>
				<h1>Osloboditelj</h1>
				<p>Ovde će da stoji neki uvodni tekst</p>
				<CommonsFetcher />
			</div>
		)
	}
}

export default Main;

