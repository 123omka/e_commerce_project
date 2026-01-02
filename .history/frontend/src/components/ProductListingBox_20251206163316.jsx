import React from "react";

// Example product data
const products = [
  {
    id: 1,
    name: "Men's Jacket",
    price: "$79.99",
    discount: "20% OFF",
    image: "https://png.pngtree.com/png-vector/20230902/ourmid/pngtree-white-t-shirt-mockup-realistic-t-shirt-png-image_9906363.png",
  },
  {
    id: 2,
    name: "Women's Dress",
    price: "$59.99",
    discount: "15% OFF",
    image: "https://via.placeholder.com/300x300",
  },
  {
    id: 3,
    name: "Kids Shoes",
    price: "$39.99",
    discount: null,
    image: "https://via.placeholder.com/300x300",
  },
  {
    id: 4,
    name: "Winter Scarf",
    price: "$19.99",
    discount: "10% OFF",
    image: "https://via.placeholder.com/300x300",
  },
  {
    id: 4,
    name: "Winter Scarf",
    price: "$19.99",
    discount: "10% OFF",
    image: "https://via.placeholder.com/300x300",
  },
  {
    id: 4,
    name: "Winter Scarf",
    price: "$19.99",
    discount: "10% OFF",
    image: "https://via.placeholder.com/300x300",
  },
  {
    id: 4,
    name: "Winter Scarf",
    price: "$19.99",
    discount: "10% OFF",
    image: "https://via.placeholder.com/300x300",
  },
  {
    id: 4,
    name: "Winter Scarf",
    price: "$19.99",
    discount: "10% OFF",
    image: "https://via.placeholder.com/300x300",
  },
  {
    id: 4,
    name: "Winter Scarf",
    price: "$19.99",
    discount: "10% OFF",
    image: "https://via.placeholder.com/300x300",
  },
  {
    id: 4,
    name: "Winter Scarf",
    price: "$19.99",
    discount: "10% OFF",
    image: "https://via.placeholder.com/300x300",
  },
  {
    id: 4,
    name: "Winter Scarf",
    price: "$19.99",
    discount: "10% OFF",
    image: "https://via.placeholder.com/300x300",
  },
  {
    id: 4,
    name: "Winter Scarf",
    price: "$19.99",
    discount: "10% OFF",
    image: "https://via.placeholder.com/300x300",
  },
  {
    id: 4,
    name: "Winter Scarf",
    price: "$19.99",
    discount: "10% OFF",
    image: "https://via.placeholder.com/300x300",
  },

  {
    id: 4,
    name: "Winter Scarf",
    price: "$19.99",
    discount: "10% OFF",
    image: "https://via.placeholder.com/300x300",
  },
  {
    id: 4,
    name: "Winter Scarf",
    price: "$19.99",
    discount: "10% OFF",
    image: "https://via.placeholder.com/300x300",
  },
  {
    id: 4,
    name: "Winter Scarf",
    price: "$19.99",
    discount: "10% OFF",
    image: "https://via.placeholder.com/300x300",
  },
  {
    id: 4,
    name: "Winter Scarf",
    price: "$19.99",
    discount: "10% OFF",
    image: "https://via.placeholder.com/300x300",
  },
  {
    id: 4,
    name: "Winter Scarf",
    price: "$19.99",
    discount: "10% OFF",
    image: "https://via.placeholder.com/300x300",
  },
];

const ProductListingBox = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Products</h2>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white border border-gray-200 shadow-sm rounded-lg p-4 flex flex-col items-center hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
          >
            <div className="relative w-full mb-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-md"
              />
              {product.discount && (
                <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
                  {product.discount}
                </span>
              )}
            </div>
            <h3 className="text-gray-800 font-medium mb-2 text-center">
              {product.name}
            </h3>
            <p className="text-gray-900 font-bold mb-2">{product.price}</p>
            <button onClick={addtocart({product.id,pro\})}>add to cart</button>
          </div>
           
        ))}
      </div>
       
    </div>
  );
};

export default ProductListingBox;
