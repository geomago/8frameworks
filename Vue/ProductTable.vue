<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Title</th>
          <th>Description</th>
          <th>Price</th>
          <th>Thumbnail</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td>{{ product.id }}</td>
          <td>{{ product.title }}</td>
          <td>{{ product.description }}</td>
          <td>{{ product.price }}</td>
          <td><img :src="product.thumbnail" :style="{ maxWidth: '100px' }"></td>
          <td><button @click="showModal(product)">Edit</button></td>
        </tr>
      </tbody>
    </table>
    <div v-if="showEditModal" class="modal" @click.self="hideModal">
      <div class="modal-content">
        <h2>Edit Product</h2>
        <form @submit.prevent="saveProduct">
          <div>
            <label for="title">Title:</label>
            <input id="title" type="text" v-model="editedProduct.title">
          </div>
          <div>
            <label for="description">Description:</label>
            <textarea id="description" v-model="editedProduct.description"></textarea>
          </div>
          <div>
            <label for="price">Price:</label>
            <input id="price" type="number" v-model="editedProduct.price">
          </div>
          <div>
            <button type="submit">Save</button>
            <button type="button" @click="hideModal">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      products: [],
      editedProduct: null,
      showEditModal: false,
      error: null,
      loading: true,
    };
  },
  mounted() {
    fetch('https://dummyjson.com/products')
      .then(response => response.json())
      .then(data => {
        this.products = data.products;
        this.loading = false;
      })
      .catch(error => {
        console.error(error);
        this.error = 'Failed to fetch data';
        this.loading = false;
      });
  },
  methods: {
    showModal(product) {
      this.editedProduct = { ...product };
      this.showEditModal = true;
    },
    hideModal() {
      this.showEditModal = false;
    },
    saveProduct() {
      // Here you could send an HTTP request to update the product on the server
      const index = this.products.findIndex(product => product.id === this.editedProduct.id);
      if (index !== -1) {
        this.products[index] = { ...this.editedProduct };
      }
      this.hideModal();
    },
  },
};
</script>

<style>
  th, td {
    padding: 5px;
    border: 1px solid black;
  }
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
  }
  .modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  }
</style>