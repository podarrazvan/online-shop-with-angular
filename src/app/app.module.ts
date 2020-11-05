import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';

import { AppRoutingModule } from './shared/app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { CarouselComponent } from './shared/carousel/carousel.component';
import { GetProductsComponent } from './shared/get-products/get-products.component';
import { ShortenPipe } from './shared/shorten.pipe';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { AdminComponent } from './pages/admin/admin.component';
import { SidebarComponent } from './pages/admin/sidebar/sidebar.component';
import { AddProductComponent } from './pages/admin/add-product/add-product.component';
import { OrdersComponent } from './pages/admin/orders/orders.component';
import { MessagesComponent } from './pages/admin/messages/messages.component';
import { StatisticsComponent } from './pages/admin/statistics/statistics.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from 'src/environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { ProductsComponent } from './pages/admin/products/products.component';
import { WebsiteEditComponent } from './pages/admin/website-edit/website-edit.component';
import { HomepageEditAlertComponent } from './pages/admin/products/homepage-edit-alert/homepage-edit-alert.component';
import { ProductComponent } from './pages/product/product.component';
import { CartComponent } from './pages/cart/cart.component';
import { SharedDataService } from './shared/shared-data.service';
import { DeleteAlertComponent } from './pages/admin/products/delete-alert/delete-alert.component';
import { FooterComponent } from './footer/footer.component';
import { ContactComponent } from './pages/contact/contact.component';
import { MessageComponent } from './pages/admin/messages/message/message.component';
import { TermsOfUseComponent } from './pages/terms-of-use/terms-of-use.component';
import { TermsOfUseEditComponent } from './pages/admin/website-edit/terms-of-use-edit/terms-of-use-edit.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { AboutUsEditComponent } from './pages/admin/website-edit/about-us-edit/about-us-edit.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { AuthComponent } from './auth/auth.component';
import { SearchComponent } from './pages/search/search.component';
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';
import { OrderComponent } from './pages/admin/orders/order/order.component';
import { DbUploadService } from './shared/db-upload.service';
import { DbFetchDataService } from './shared/db-fetch-data.service';
import { DbWebsiteEditService } from './shared/db-website-edit.sevice';
import { DbDeleteService } from './shared/db-delete.service';
import { DarkModeDirective } from './shared/dark-mode.directive';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    CarouselComponent,
    GetProductsComponent,
    ShortenPipe,
    PageNotFoundComponent,
    AdminComponent,
    SidebarComponent,
    AddProductComponent,
    OrdersComponent,
    MessagesComponent,
    StatisticsComponent,
    ProductsComponent,
    WebsiteEditComponent,
    HomepageEditAlertComponent,
    ProductComponent,
    CartComponent,
    DeleteAlertComponent,
    FooterComponent,
    ContactComponent,
    MessageComponent,
    TermsOfUseComponent,
    TermsOfUseEditComponent,
    AboutUsComponent,
    AboutUsEditComponent,
    CategoriesComponent,
    AuthComponent,
    SearchComponent,
    CheckoutPageComponent,
    OrderComponent,
    DarkModeDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    HttpClientModule
  ],
  providers: [DbUploadService,DbFetchDataService,DbWebsiteEditService,DbDeleteService,SharedDataService],
  bootstrap: [AppComponent,AngularFirestore]
})
export class AppModule { }
