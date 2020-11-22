import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DbUploadService } from 'src/app/shared/db-upload.service';
import { SharedDataService } from 'src/app/shared/shared-data.service';

declare var paypal;

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.scss'],
})
export class CheckoutPageComponent implements OnInit {
  @ViewChild('paypal', { static: true }) paypalElement: ElementRef;
  constructor(
    private sharedDataService: SharedDataService,
    private fb: FormBuilder,
    private dbUploadService: DbUploadService,
    private router: Router
  ) {}

  paidFor = false;
  checkoutForm: FormGroup;

  ngOnInit(): void {
    if (this.sharedDataService.totalCart == null) {
      this.router.navigate(['../cart']);
    }
    this.checkoutForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      adress: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', Validators.required],
    });

    paypal
      .Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                // description: this.product.description,
                amount: {
                  currency_code: 'USD',
                  value: this.sharedDataService.totalCart,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          this.paidFor = true;
        },
        onError: (err) => {
          console.log(err);
        },
      })
      .render(this.paypalElement.nativeElement);
  }

  onSubmit() {
    const order = {
      adress: this.checkoutForm.value,
      cart: JSON.parse(localStorage.getItem('cart')),
      total: this.sharedDataService.totalCart.toString(),
    };
    this.dbUploadService.addOrder(order);
    localStorage.removeItem("cart");
    this.checkoutForm.reset();
    this.sharedDataService.updateCart(true);
    alert('Order sent!');
    this.router.navigate(['../../'])
  }
}
