import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WebsiteEditComponent } from '../pages/admin/website-edit/website-edit.component';
import { AddProductComponent } from '../pages/admin/add-product/add-product.component';
import { AdminComponent } from '../pages/admin/admin.component';
import { MessagesComponent } from '../pages/admin/messages/messages.component';
import { OrdersComponent } from '../pages/admin/orders/orders.component';
import { ProductsComponent } from '../pages/admin/products/products.component';
import { StatisticsComponent } from '../pages/admin/statistics/statistics.component';
import { HomeComponent } from '../pages/home/home.component';
import { PageNotFoundComponent } from '../pages/page-not-found/page-not-found.component';
import { ProductComponent } from '../pages/product/product.component';
import { CartComponent } from '../pages/cart/cart.component';
import { ContactComponent } from '../pages/contact/contact.component';
import { TermsOfUseComponent } from '../pages/terms-of-use/terms-of-use.component';
import { AboutUsComponent } from '../pages/about-us/about-us.component';
import { CategoriesComponent } from '../pages/categories/categories.component';
import { AuthGuard } from '../auth/auth.guard';
import { AuthComponent } from '../auth/auth.component';

const routes: Routes = [
    {path:'', component: HomeComponent},
    {path:'auth', component: AuthComponent},
    {path:'admin', component: AdminComponent, canActivate: [AuthGuard], children:[
      {path:'add-product',component: AddProductComponent},
      {path:'orders',component: OrdersComponent},
      {path:'messages',component: MessagesComponent},
      {path:'statistics',component: StatisticsComponent},
      {path:'products',component: ProductsComponent},
      {path:'website-edit',component: WebsiteEditComponent}
    ]},
    {path:'product/:category/:key', component: ProductComponent},
    {path:'category/:category', component: CategoriesComponent},
    {path:'cart',component: CartComponent},
    {path:'contact',component: ContactComponent},
    {path:'terms-of-use',component: TermsOfUseComponent},
    {path:'about-us',component: AboutUsComponent},
    {path:'**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
