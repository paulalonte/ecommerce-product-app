import { Injectable } from '@angular/core';
import { IProduct } from '../model/product';
import { ICategory } from '../model/category';

@Injectable({
    providedIn: 'root'
})

export class ProductService {

    localStorage: Storage;
    aryProducts: IProduct[] = [];
    itemCounter:number = 0;
    isSaveSuccessful:boolean;

    constructor() {
        
    }

    getIncrementItemNumber() {
        return this.itemCounter++;
    }

    getLocalStorage() {
        return (typeof window !== "undefined") ? window.localStorage : null;
    }

    addItem(val:IProduct) {
        this.localStorage = this.getLocalStorage();
        let product:IProduct = val;

        this.aryProducts.push(product);

        if(this.localStorage) {
            this.localStorage.setItem('products', JSON.stringify(this.aryProducts));
            this.isSaveSuccessful = true;
            return this.isSaveSuccessful; 
        }
    }

    getProducts():Array<IProduct> {
        this.localStorage = this.getLocalStorage();
        if(this.localStorage) {
            let products = this.localStorage.getItem('products');
            let parseObj = JSON.parse(products); 
            return parseObj;
        }
    }

    getFilteredProducts(val:ICategory) {
        //get category id
        //return the object based on the category ID

        let catID = val.categoryID;
        let aryProducts = this.getProducts();

        if(+catID !== 0) {
            let aryFilteredProducts:Array<IProduct> = [];

            //use standard loop for minimal weight and load compared to foreach/for loops
            for(var i = 0; i < aryProducts.length; i++) {
                let aryCategories:Array<ICategory> = aryProducts[i].categories;

                for(var j = 0; j < aryCategories.length; j++) {
                    if(aryCategories[j].categoryID === +catID) {
                        aryFilteredProducts.push(aryProducts[i]);
                    }
                }
            }

            return aryFilteredProducts;
        }else {
            return aryProducts;
        }
    }

    getProduct(id: number | string) {
        return this.getProducts().find(product => product.id === +id);
    }
}
