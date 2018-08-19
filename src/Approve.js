import React, { Component } from 'react';
import axios from 'axios';
import CommonsFile from './CommonsFile';

const apiURL = 'http://localhost:3001/api/';

class Approve extends Component {
	constructor(props) {
		super(props);
		this.state = { hash : props.match.params.hash, images : [], noHash : false };
	}

	componentDidMount() {
		var hash = this.state.hash;
		axios.get(apiURL + 'request/' + hash).then((res) => {
			var images = res.data.images;
			var noHash = false;
			if (images === undefined) {
				images = [];
				noHash = true;
			}
			this.setState({ hash : hash, images : images, noHash : noHash });
		}).catch(err => {
			console.error(err);
		});
	}

	render() {
		var images = [];
		for (var i = 0; i < this.state.images.length; i += 1) {
			images.push(<CommonsFile url={this.state.images[i]} key={i} />);
		}

		var prikaz = '';

		if (this.state.noHash) {
			prikaz = <NijePronadjen />;
		} else {
			prikaz = <ApprovePrikaz images={images} />;
		}

		return (
			<div>
				{prikaz}
			</div>
		)
	}
}

const NijePronadjen = () => <div>Nije pronađen zahtev!</div>;

class ApprovePrikaz extends Component {
	render() {
		return (
			<div>
				<h1>Osloboditelj</h1>
				<p>Neki drugi uvodni tekst</p>
				{this.props.images}
			</div>
		)
	}
}

export default Approve;

