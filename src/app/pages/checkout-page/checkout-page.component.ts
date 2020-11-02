import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DBService } from 'src/app/shared/db.service';
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
    private db: DBService
  ) {}

  paidFor = false;
  checkoutForm: FormGroup;

  ngOnInit(): void {
    this.checkoutForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      adress: ['', Validators.required],
      adress2: [''],
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
          console.log(order);
        },
        onError: (err) => {
          console.log(err);
        },
      })
      .render(this.paypalElement.nativeElement);
  }

  onSubmit() {
    this.db.addOrder(this.checkoutForm.value);
    this.checkoutForm.reset();
    alert('Order sent!');
  }
}
