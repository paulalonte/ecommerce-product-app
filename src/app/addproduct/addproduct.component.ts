import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IProduct } from '../productlist/model/product';
import { ProductService } from '../productlist/service/product.service';
import { ICategory } from '../productlist/model/category';
import { CATEGORYLIST } from '../productlist/categorylist';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.scss']
})
export class AddProductComponent implements OnInit {

  formGroup: FormGroup;
  allCategoryID:number = 0;
  isAllCategory:boolean;

  constructor(private fb:FormBuilder, private prodService:ProductService) { 
    this.createForm();
  }

  ngOnInit() {}

  //sample categories here - should be dynamic and coming from admin - created global shared data as CATEGORYLIST
  public aryCategories:Array<ICategory> = CATEGORYLIST;
  public aryCategoryValues:any;

  createForm() {
    this.formGroup = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(10)]],
      sku: ['', Validators.required],
      desc: [''],
      aryCategoryValues: ['', Validators.required]
    })
  }

  save(addForm:any) {
    let itemSequence = this.prodService.getIncrementItemNumber();

    let aryCategoryID:ICategory[] = addForm.value.aryCategoryValues;
    let all = aryCategoryID.find(category => category.categoryID === this.allCategoryID);
    this.isAllCategory = (all) ? true : false;

    let product = {} as IProduct;
    product.id = itemSequence;
    product.title = addForm.value.title;
    product.description = addForm.value.desc;
    product.sku = addForm.value.sku + '-' + itemSequence;

    if(this.isAllCategory) {
      product.categories = CATEGORYLIST;
    } else {
      product.categories = addForm.value.aryCategoryValues;  
    }
    

    let isSuccessful = this.prodService.addItem(product);
    if(isSuccessful) {
      alert('success');
    }

  }

  getProducts() {
    let products = this.prodService.getProducts();
  }

}
