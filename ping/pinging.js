class Pinging {


	constructor() {

		this.ping = require('ping');
		this.io = require('../server');
		this.models = require('../models/index');
		this.startPinging();

	}


	async startPinging() {

		const host = '8.8.8.8';

		try {

			const res = await this.ping.promise.probe(host);
			this.io.emit('this', res);
			//console.log(res);

			setTimeout(() => this.startPinging() , 1000);
			

		} catch (error) {
			console.log(error);
		}

	}
}


module.exports = Pinging;