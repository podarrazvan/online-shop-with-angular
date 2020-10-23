import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddProductComponent } from '../pages/admin/add-product/add-product.component';
import { AdminComponent } from '../pages/admin/admin.component';
import { HomepageEditComponent } from '../pages/admin/homepage-edit/homepage-edit.component';
import { MessagesComponent } from '../pages/admin/messages/messages.component';
import { OrdersComponent } from '../pages/admin/orders/orders.component';
import { StatisticsComponent } from '../pages/admin/statistics/statistics.component';
import { HomeComponent } from '../pages/home/home.component';
import { PageNotFoundComponent } from '../pages/page-not-found/page-not-found.component';

const routes: Routes = [
    {path:'', component: HomeComponent},
    {path:'admin', component: AdminComponent, children:[
      {path:'add-product',component: AddProductComponent},
      {path:'homepage-edit',component:HomepageEditComponent},
      {path:'orders',component: OrdersComponent},
      {path:'messages',component: MessagesComponent},
      {path:'statistics',component: StatisticsComponent},
    ]},
    {path:'**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
