import { createSignal, createEffect } from 'solid-js';
import { createStore } from 'solid-js/store';
import './style.css';

function App() {
  const [products, setProducts] = createStore([]);
  const [showModal, setShowModal] = createSignal(false);
  const [selectedProduct, setSelectedProduct] = createStore({});

  createEffect(async () => {
    try {
      const response = await fetch('https://dummyjson.com/products');
      const data = await response.json();
      setProducts(data.products);
    } catch (error) {
      console.error(error);
    }
  });

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleSaveProduct = () => {
    const updatedProduct = {
      ...selectedProduct,
      title: document.getElementById('title').value,
      description: document.getElementById('description').value,
      price: Number(document.getElementById('price').value),
    };
    const updatedProducts = [...products];
    const index = updatedProducts.findIndex(
      (product) => product.id === updatedProduct.id
    );
    updatedProducts[index] = updatedProduct;
    setProducts(updatedProducts);
    setShowModal(false);
  };

  const handleCancelEdit = () => {
    setShowModal(false);
  };

  const renderModal = () => {
    return (
      showModal() && (
        <div class="modal">
          <div class="modal-content">
            <h2>Edit Product</h2>
            <form>
              <label for="title">Title:</label>
              <input type="text" id="title" value={selectedProduct.title} />
              <label for="description">Description:</label>
              <textarea
                id="description"
                value={selectedProduct.description}
              ></textarea>
              <label for="price">Price:</label>
              <input type="number" id="price" value={selectedProduct.price} />
              <div class="modal-buttons">
                <button type="button" onClick={handleSaveProduct}>
                  Save
                </button>
                <button type="button" onClick={handleCancelEdit}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )
    );
  };

  const renderTable = () => {
    return (
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
            <tr>
              <td>{product.id}</td>
              <td>{product.title}</td>
              <td>{product.description}</td>
              <td>${product.price.toFixed(2)}</td>
              <td>
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  style="max-width: 100px"
                />
              </td>
              <td>
                <button onClick={() => handleEditProduct(product)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div>
      {renderTable()}
      {renderModal()}
    </div>
  );
}

export default App;