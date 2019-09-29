import { Component, OnInit } from '@angular/core';
import { ProductService } from './service/product.service';
import { IProduct } from './model/product';
import { ICategory } from './model/category';
import { CATEGORYLIST } from './categorylist';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.scss']
})
export class ProductlistComponent implements OnInit {

  isProductsEmpty:Boolean;
  aryProducts:Array<IProduct>;
  aryCategories:Array<ICategory>;
  aryCategorySelection:Array<ICategory> = CATEGORYLIST;
  selectedCategory:number;
  pageHeaderTitle:string = 'Product List';

  constructor(private prodService:ProductService) { }

  ngOnInit() {
    this.aryProducts = this.prodService.getProducts();
    this.selectedCategory = 0;
  }

  categorySelected(val:ICategory) {
    this.selectedCategory = val.categoryID;
    let filteredProducts = this.prodService.getFilteredProducts(val);
    this.aryProducts = filteredProducts;
    this.isProductsEmpty = (this.aryProducts.length <= 0 || this.aryProducts == null);
  }

}
