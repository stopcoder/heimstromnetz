// const stromPrice = require("./strom").price;
// 
// stromPrice().then((price) => {
// 	console.log(price);
// });

const Period = require("./Period");
const Sensors = require("./Sensors");

async function run() {
	const base = new Date();

	Array.from({length: 4}).reduce(async (pChain, _, i) => {
		await pChain;
		const now = new Date(base.getFullYear(), base.getMonth(), base.getDate() - i);
		console.log(now.toString());

		const aValues = await [0,1].reduce(async (pChain, delta) => {
			const aValues = await pChain;
			const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() - delta * 7);
			const value = await Period.getValue(Sensors.HouseConsumption, d, 6, 9);
			aValues.push(value);
			return aValues;
		}, Promise.resolve([]));

		console.log(aValues, ((aValues[0] - aValues[1]) / aValues[1] * 100).toFixed(2) + "%");
	}, Promise.resolve());
}

run();
