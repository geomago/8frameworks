<!-- App.svelte -->

<script>
    import { onMount } from "svelte";
    
    let products = [];
    let editingProduct = null;
    let showModal = false;
    
    async function fetchProducts() {
      try {
        const response = await fetch("https://dummyjson.com/products");
        const data = await response.json();
        products = data.products;
      } catch (error) {
        console.error(error);
      }
    }
    
    function handleEdit(product) {
      editingProduct = product;
      showModal = true;
    }
    
    function handleClose() {
      editingProduct = null;
      showModal = false;
    }
    
    function handleSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const title = formData.get("title");
  const description = formData.get("description");
  const price = parseFloat(formData.get("price"));

  // Find the index of the editingProduct in the products array
  const index = products.findIndex((product) => product.id === editingProduct.id);

  // Update the product data in the products array
  products = [
    ...products.slice(0, index),
    {
      ...editingProduct,
      title,
      description,
      price
    },
    ...products.slice(index + 1)
  ];

  handleClose();
}

    
    onMount(fetchProducts);
  </script>
  
  <style>
    table {
      border-collapse: collapse;
      width: 100%;
    }
    
    th, td {
      text-align: left;
      padding: 8px;
    }
    
    th {
      background-color: #4CAF50;
      color: white;
    }
    
    tr:nth-child(even) {
      background-color: #f2f2f2;
    }
    
    .thumbnail img {
      max-width: 100px;
    }
    
    .modal {
      display: block;
      position: fixed;
      z-index: 1;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      overflow: auto;
      background-color: rgba(0,0,0,0.4);
    }
    
    .modal-content {
      background-color: #fefefe;
      margin: 15% auto;
      padding: 20px;
      border: 1px solid #888;
      width: 80%;
      max-width: 600px;
    }
    
    .close {
      color: #aaa;
      float: right;
      font-size: 28px;
      font-weight: bold;
    }
    
    .close:hover,
    .close:focus {
      color: black;
      text-decoration: none;
      cursor: pointer;
    }
  </style>
  
  <h1>Product List</h1>
  
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
      {#each products as product}
        <tr>
          <td>{product.id}</td>
          <td>{product.title}</td>
          <td>{product.description}</td>
          <td>${product.price.toFixed(2)}</td>
          <td class="thumbnail">
            <img src={product.thumbnail} alt="Thumbnail"/>
          </td>
          <td>
            <button on:click={() => handleEdit(product)}>Edit</button>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
  
  {#if showModal}
  <div class="modal">
    <div class="modal-content">
      <span class="close" on:click={handleClose}>&times;</span>
      {#if editingProduct}
  
      <h2>Edit Product</h2>
      <form on:submit={handleSubmit}>
        <label>
          Title:
          <input type="text" name="title" value={editingProduct.title} on:input={() => editingProduct.title = event.target.value} required/>
        </label>
        <br>
        <label>
          Description:
          <textarea name="description" on:input={() => editingProduct.description = event.target.value} required>{editingProduct.description}</textarea>
        </label>
        <br>
        <label>
          Price:
          <input type="number" step="0.01" name="price" value={editingProduct.price} on:input={() => editingProduct.price = parseFloat(event.target.value)} required/>
        </label>
        <br>
        <button type="submit">Save</button>
        <button type="button" on:click={handleClose}>Cancel</button>
      </form>
      {/if}
    </div>
  </div>
{/if}

