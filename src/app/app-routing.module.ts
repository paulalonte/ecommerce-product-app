import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ProductlistComponent } from "./productlist/productlist.component";
import { AddProductComponent } from "./addproduct/addproduct.component";
import { ProductDetailComponent } from "./productdetail/productdetail.component";

const routes: Routes = [
  { path: "addproduct", component: AddProductComponent },
  { path: "productlist", component: ProductlistComponent },
  {
    path: "productdetail/:id",
    component: ProductDetailComponent,
    data: { product: "product" },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
