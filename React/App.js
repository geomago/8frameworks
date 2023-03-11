import React, { useState, useEffect } from "react";
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((response) => response.json())
      .then((data) => setProducts(data.products))
      .catch((error) => console.error(error));
  }, []);

  function handleEdit(product) {
    setEditingProduct(product);
  }

  function handleSave(updatedProduct) {
    setProducts(
      products.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
    setEditingProduct(null);
  }

  function handleCancel() {
    setEditingProduct(null);
  }

  return (
    <div>
      <h1>Product Table</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Thumbnail</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.title}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td>
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  style={{ maxWidth: 100 }}
                />
              </td>
              <td>
                <button onClick={() => handleEdit(product)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editingProduct && (
        <EditProductForm
          product={editingProduct}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
}

function EditProductForm({ product, onSave, onCancel }) {
  const [title, setTitle] = useState(product.title);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(product.price);

  function handleSubmit(event) {
    event.preventDefault();
    onSave({
      ...product,
      title,
      description,
      price,
    });
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Edit Product</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </div>
          <div>
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            ></textarea>
          </div>
          <div>
            <label htmlFor="price">Price:</label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(event) => setPrice(Number(event.target.value))}
            />
          </div>
          <div>
            <button type="submit">Save</button>
            <button type="button" onClick={onCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
