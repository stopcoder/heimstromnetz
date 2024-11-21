const stromPrice = require("./strom").price;

stromPrice().then((price) => {
	console.log(price);
});

