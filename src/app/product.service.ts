import { Injectable } from '@angular/core';
import { v4 as uuid } from 'uuid';
import { of } from 'rxjs/observable/of';
import { delay, tap } from 'rxjs/operators';

@Injectable()
export class ProductService {

  constructor() { }

  createGuestCart() {
    return of(uuid())
      .pipe(
        delay(500),
        tap(id => console.log(id))
      );
  }

  addProductToCart(prodID, cartID) {
    return of(`Added ${prodID} to ${cartID}`)
      .pipe(
        delay(300),
        tap(id => console.log(`Result: ${id}`))
      );
  }

}
