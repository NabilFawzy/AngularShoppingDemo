import { Component ,OnInit} from '@angular/core';
import { IProduct } from './product';
import { ProductService } from './product.service';


@Component({
    selector:'pm-products',
    templateUrl:'./product-list.component.html',
    styleUrls:['./product-list.component.css']
})

export class ProductListComponent implements OnInit{
 
  pageTitle : string="Product List";
  imageWidth:number=50;
  imageMargin:number=2;
   showImage:boolean=false;
    filteredProducts : IProduct[];
   _listFilter:string;
   errorMessage:string;
   get listFilter(){
     return this._listFilter;
   }
   set listFilter( value:string){
     this._listFilter=value;
     this.filteredProducts=this._listFilter? this.performFilter(this._listFilter) : this.products;

   }
  
  // any here for any type
  products : IProduct[]=[]; 
    toggleImage():void{
    this.showImage=! this.showImage;
  }
  constructor(private productService:ProductService){
  }
  performFilter(filterBy:string):IProduct[]{
    filterBy=filterBy.toLocaleLowerCase();
    return this.products.filter((product :IProduct)=>product.productName.toLocaleLowerCase().indexOf(filterBy)!==-1);
  }
  ngOnInit(): void {
   this.productService.getProducts().subscribe({
     next: products=>{
       this.products=products;
       this.filteredProducts=this.products;},
       error: err=>this.errorMessage=err
   });
   
  }
  onRatingClicked(message : string ):void{
       this.pageTitle= "Product List "+ message;
  }
}