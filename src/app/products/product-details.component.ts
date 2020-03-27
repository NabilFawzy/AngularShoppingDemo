import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';
import {ActivatedRoute, Router} from '@angular/router';
import { ProductService } from './product.service';

@Component({
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
pageTitle:string='Details Page';
product: IProduct | undefined;
errorMessage = '';
  constructor(private router : ActivatedRoute, private rout:Router,   private productService: ProductService) {

   }

  ngOnInit() {
    let id= +this.router.snapshot.paramMap.get('id');// + to convert string to numeric
    this.pageTitle=` ${id}`;
    
    this.getProduct(id);
  }
  getProduct(id: number) {
    this.productService.getProduct(id).subscribe({
      next: product => this.product = product,
      error: err => this.errorMessage = err
    });
  }
  onBack():void{
    this.rout.navigate(['/products'])
  }
 
  

}
