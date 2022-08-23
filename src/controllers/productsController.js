const fs = require('fs');
const path = require('path');
const { loadProducts,storeProducts } = require('../data/productModule');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		// Do the magic
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		// Do the magic
		const products=loadProducts();
		const product = products.find(product => product.id===+req.params.id)
		
		return res.render('detail',{
			product,toThousand
		})
	},

	// Create - Form to create
	create: (req, res) => {
		return res.render("product-create-form");
	},
	
	// Create -  Method to store
	store: (req, res) => {
		// Do the magic
		const { id } = req.params;
		let { name, price, discount, description, category} = req.body;
		//const imagen = req.files["image"] ;
		let newProduct = {
		  id: products[products.length - 1].id + 1,
		  name: name.trim(),
		  description: description.trim(),
		  price: +price,
		  discount: +discount,
		  category,
		  image: "default-image.png",
		};
	
		let productsNew = [...products, newProduct];
	
		storeProducts(productsNew);
		return res.redirect("/");
	},

	// Update - Form to edit
	edit: (req, res) => {
		// Do the magic
		
		const product = products.find(product => product.id===+req.params.id);

		return res.render('product-edit-form',{
			product
		})
	},
	// Update - Method to update
	update: (req, res) => {
		//do the magic

		const { id } = req.params;
		let { name, price, discount, description, category } = req.body;
	
		const productModify = products.map((product) => {
		  if (product.id === +id) {
			return {
			  ...product,
			  name: name.trim(),
			  description: description.trim(),
			  price: +price,
			  discount: +discount,
			  category,
			};
		  } else {
			return product;
		  }
		});
	
		storeProducts(productModify);
		return res.redirect("/products/detail/" + id);
	  },

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		const {id} = req.params;
        const products = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'productsDataBase.json')));

        const productFilter = products.filter(product => product.id !== +id);

        storeProducts(productFilter);
        return res.redirect('/');
  }
};

module.exports = controller;