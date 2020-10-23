import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './shared/app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { CarouselComponent } from './pages/home/carousel/carousel.component';
import { DBService } from './shared/db.service';
import { GetProductsComponent } from './shared/get-products/get-products.component';
import { ShortenPipe } from './shared/shorten.pipe';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { AdminComponent } from './pages/admin/admin.component';
import { SidebarComponent } from './pages/admin/sidebar/sidebar.component';
import { AddProductComponent } from './pages/admin/add-product/add-product.component';
import { HomepageEditComponent } from './pages/admin/homepage-edit/homepage-edit.component';
import { OrdersComponent } from './pages/admin/orders/orders.component';
import { MessagesComponent } from './pages/admin/messages/messages.component';
import { StatisticsComponent } from './pages/admin/statistics/statistics.component';
import { FormsModule } from '@angular/forms';

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
    HomepageEditComponent,
    OrdersComponent,
    MessagesComponent,
    StatisticsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [DBService],
  bootstrap: [AppComponent]
})
export class AppModule { }
