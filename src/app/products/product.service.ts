import {  Injectable } from '@angular/core';
import { IProduct } from './product';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError,tap, map } from 'rxjs/operators';

@Injectable({
    providedIn:'root'
})
export class ProductService{
    private productURL='api/products/products.json';
    constructor(private httpClient : HttpClient){
        
    }
 
    getProduct(id: number): Observable<IProduct | undefined> {
      return this.getProducts()
        .pipe(
          map((products: IProduct[]) => products.find(p => p.productId === id))
        );
    }
   getProducts():Observable< IProduct[]>{ 
    return this.httpClient.get<IProduct[]>(this.productURL)
    .pipe(tap(data=>console.log('All: '+JSON.stringify(data)),
    catchError(this.handleError)
    ))
   }
   private handleError(err: HttpErrorResponse) {
    
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}