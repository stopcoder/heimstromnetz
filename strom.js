const { Buffer } = require('node:buffer');
const axios = require('axios');
const path = require('path');
const fs = require('fs');
const fsp = fs.promises;
const jsonfile = require('jsonfile');

const DAY = 24 * 60 * 60 * 1000;
let auth;

async function getTokenInfo() {
	if (!auth) {
		let content = await fsp.readFile("secret");
		if (content[content.length - 1] === 10) { // line break
			content = content.slice(0, content.length - 1);
		}
		auth = content.toString("base64");
	}

	const tokenInfo = await jsonfile.readFile("token.json");
	const now = new Date();

	if (now.getTime() > tokenInfo.expire_timestamp) {
		console.log("Refreshing Token ...");
		const response = await axios.post("https://auth.sandbox.ostrom-api.io/oauth2/token",
			{"grant_type" : "client_credentials"},
			{
				headers: {
					accept: "application/json",
					authorization: `Basic ${auth}`,
					"content-type": "application/x-www-form-urlencoded"
				}
			}
		);

		tokenInfo.expire_timestamp = now.getTime() + response.data.expires_in * 1000;
		tokenInfo.token = response.data.access_token;
		tokenInfo.type = response.data.token_type;

		await jsonfile.writeFile("token.json", tokenInfo);
	}

	return tokenInfo;
}

module.exports = {
	price: async function () {
		const tokenInfo = await getTokenInfo();
		const now = new Date();
		const zeroHour = new Date(now.getFullYear(), now.getMonth(), now.getDate());
		const startDate = new Date(zeroHour.getTime() + DAY);
		const endDate = new Date(zeroHour.getTime() + 2 * DAY);
		const filename = `${startDate.getFullYear()}`
			+ `${startDate.getMonth() > 8 ? startDate.getMonth() + 1 : ("0" + (startDate.getMonth() + 1))}`
			+ `${startDate.getDate() > 9 ? startDate.getDate() : ("0" + startDate.getDate())}`
			+ ".json";

		const filepath = path.join("data", filename);

		if (fs.existsSync(filepath)) {
			const prices = await jsonfile.readFile(filepath);
			if (prices?.length) {
				return prices;
			}
		} 

		console.log("Fetching Price ...");

		const response = await axios.get("https://sandbox.ostrom-api.io/spot-prices", {
			headers: {
				accept: "application/json",
				authorization: `${tokenInfo.type} ${tokenInfo.token}`,
			},
			params: {
				startDate: startDate.toISOString(),
				endDate: endDate.toISOString(),
				resolution: "HOUR",
				zip: "69226"
			}
		});

		const prices = response.data.data.map((entry) => {
			console.log(entry.grossKwhTaxAndLevies);
			return {
				date: entry.date,
				price: (entry.grossKwhPrice + entry.grossKwhTaxAndLevies).toFixed(2)
			}
		});
		await jsonfile.writeFile(filepath, prices);
		return prices;
	}
};
