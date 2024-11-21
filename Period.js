const axios = require('axios');
const path = require('path');
const fs = require('fs');
const fsp = fs.promises;
const jsonfile = require('jsonfile');
const Sensors = require('./Sensors');

const HOUR = 60 * 60 * 1000;
const DAY = 24 * HOUR;

let token;

async function getPeroidValue(sensor, date, startHour, endHour) {
	if (!token) {
		let content = await fsp.readFile("secret_ha");
		if (content[content.length - 1] === 10) { // line break
			content = content.slice(0, content.length - 1);
		}
		token = content.toString();
	}

	const startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), startHour);
	const tempDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), endHour);
	const endDate = new Date(tempDate.getTime() + HOUR);

	const startAmount = await getPointData(sensor, startDate);
	const endAmount = await getPointData(sensor, endDate);

	console.log(`${startAmount} on ${startDate.toString()}, ${endAmount} on ${endDate.toString()}`);

	return endAmount - startAmount;
}

async function getPointData(sensor, date) {
	if (!token) {
		let content = await fsp.readFile("secret_ha");
		if (content[content.length - 1] === 10) { // line break
			content = content.slice(0, content.length - 1);
		}
		token = content.toString();
	}

	const dateString = date.toISOString();
	const endDate = new Date(date.getTime() + 60 * 1000);
	const url = `http://192.168.0.5:8123/api/history/period/${dateString}`;
	const response = await axios.get(url, {
		headers: {
			accept: "application/json",
			authorization: `Bearer ${token}`,
			"content-type": "application/json"
		},
		params: {
			filter_entity_id: sensor,
			minimal_response: "true"
		}
	});

	if (response.data.length) {
		return parseFloat(response.data[0][0].state);
	} else {
		return null;
	}
}

module.exports = {
	getValue: getPeroidValue
};
