import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductComponent } from './components/product/product.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {NavbarComponent  } from './components/navbar/navbar.component';
import { ViewcartComponent } from './components/viewcart/viewcart.component';


const routes: Routes = [

  {
    path:'',
    component:HomeComponent

  },

  {
    path:'product',
    component:ProductComponent
  },
  {
    path:'dashboard',
    component:DashboardComponent
  },
  {
    path:'cart',
    component:ViewcartComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
