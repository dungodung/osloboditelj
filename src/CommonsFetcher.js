import React, { Component } from 'react';
import axios from 'axios';
import CommonsFile from './CommonsFile';

const apiURL = 'http://localhost:3001/api/';

class CommonsFetcher extends Component {
	constructor(props) {
		super(props);
		this.state = { currentFile : '', commonsFiles : [], hash : '' };
		this.handleCheck = this.handleCheck.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.successfulLoad = this.successfulLoad.bind(this);
	}

	handleInputChange(e) {
		this.setState({ currentFile: e.target.value });
	}

	successfulLoad() {
		var newCommonsFiles = this.state.commonsFiles.concat(this.state.currentFile.trim());
		this.setState({ commonsFiles : newCommonsFiles, currentFile : '' });
	}

	handleCheck(e) {
		e.preventDefault();
		let imageSrc = this.state.currentFile.trim();
		var img = new Image();
		img.onload = this.successfulLoad;
		img.onerror = function() {
			alert("NOT cool");
		};
		img.src = imageSrc;
	}

	handleSubmit(e) {
		e.preventDefault();
		axios.post(apiURL + 'request', {images : this.state.commonsFiles}).then((res) => {
			this.setState({ hash : res.data.hash });
		}).catch(err => {
			console.error(err);
		});
	}

	render() {
		const images = [];

		for (var i = 0; i < this.state.commonsFiles.length; i += 1) {
			images.push(<CommonsFile url={this.state.commonsFiles[i]} key={i} />);
		}

		var hash = '';
		if (this.state.hash !== '') {
			hash = <Hash hash={this.state.hash} />
		}

		return (
			<div>
				<form onSubmit={ this.handleCheck }>
					<input type='text' value={this.state.currentFile} onChange={ this.handleInputChange } />
					<input type='submit' value='Proveri' />
				</form>
				<div className='commonsFiles'>
					{images}
				</div>
				<form onSubmit={ this.handleSubmit }>
					<input type='submit' value='Generiši' />
				</form>
				{hash}
			</div>
		)
	}
}


const Hash = props => <div>Poslati mejl na <b>http://localhost:3000/a/{props.hash}</b></div>;

export default CommonsFetcher;

