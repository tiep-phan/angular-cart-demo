import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { mergeMap, map, tap, concatMap, share } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { v4 as uuid } from 'uuid';

import { ProductService } from '../product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  addToCartSku$: Subject<string> = new Subject<string>();
  cartID: string;
  addtoCartResult$: Observable<string>;
  createGuestCart$: Observable<string> = this.productService.createGuestCart()
    .pipe(
      share()
    );

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.addtoCartResult$ = this.addToCartSku$.asObservable()
      .pipe(
        mergeMap(sku => {
          if (this.cartID) {
            return of(this.cartID);
          } else {
            return this.createGuestCart$
              .pipe(
                tap(cartID => this.cartID = cartID)
              );
          }
        }, (sku, cartID) => ({
          sku: sku,
          cartID: cartID
        })),
        mergeMap(cart => this.productService.addProductToCart(cart.sku, cart.cartID))
      );
  }

  addToCart(sku) {
    const s = sku + uuid();
    console.log(s);
    this.addToCartSku$.next(s);
  }
}
