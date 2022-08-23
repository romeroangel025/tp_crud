const fs = require('fs');
const path = require('path');

const{loadProducts}=require('../data/productModule');

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	index: (req, res) => {
		// Do the magic

		const products=loadProducts();
		const inSale = products.filter(product => product.category==='in-sale');
		const visited = products.filter(product => product.category==='visited');
		return res.render('index',{
			inSale,visited,toThousand
		})
	},
	search: (req, res) => {
		// Do the magic
		let {keywords} = req.query;
		const products=loadProducts();
const productsSearch=products.filter( product => product.name.toLowerCase().includes(keywords.toLowerCase()));
		return res.render('results',{
			productsSearch,toThousand,keywords
	})
},
}
module.exports = controller;
