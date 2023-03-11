import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  products: Product[] = [];
  editedProduct: Product | null = null;
  modalActive = false;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.http.get<{ products: Product[] }>('https://dummyjson.com/products')
      .subscribe(response => {
        this.products = response.products;
      }, error => {
        console.log('Failed to fetch products', error);
      });
  }

  editProduct(product: Product): void {
    this.editedProduct = { ...product };
    this.modalActive = true;
  }

  saveProduct(): void {
    if (this.editedProduct) {
      const index = this.products.findIndex(p => p.id === this.editedProduct!.id);
      if (index >= 0) {
        this.products[index] = { ...this.editedProduct };
      }
      this.editedProduct = null;
      this.modalActive = false;
    }
  }

  cancelEdit(): void {
    this.editedProduct = null;
    this.modalActive = false;
  }
}