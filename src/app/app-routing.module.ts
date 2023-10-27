import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { RestaurantComponent } from './components/restaurant/restaurant.component';
import { AdminComponent } from './components/admin/admin.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { adminGuard } from './guards/admin-guard';
import { ownerGuard } from './guards/owner-guard';
import { RestaurantOwnerComponent } from './components/restaurant-owner/restaurant-owner.component';
import { RestaurantDetailsComponent } from './components/restaurantDetails/restaurant-details/restaurant-details.component';
import { UserDetailsComponent } from './components/user-details/user-details/user-details.component';
import { CartDetailsComponent } from './components/cart-details/cart-details/cart-details.component';
import { OrderDetailsComponent } from './components/order-details/order-details/order-details.component';

const routes: Routes = [
  {path: '',component: HomeComponent},
  {path: 'aboutus',component: AboutUsComponent},
  {path: 'restaurants',component: RestaurantComponent},
  {path: 'admin',component: AdminComponent,canActivate:[adminGuard()]},
  {path: 'owner',component: RestaurantOwnerComponent,canActivate:[ownerGuard()]},
  {path: 'contactus',component: ContactUsComponent},
  {path: 'restaurantdetails/:rid',component: RestaurantDetailsComponent},
  {path: 'userdetails/:uid',component: UserDetailsComponent,canActivate:[adminGuard()]},
  {path: 'cartdetails/:cid',component: CartDetailsComponent,canActivate:[adminGuard()]},
  {path: 'orderdetails/:oid',component: OrderDetailsComponent,canActivate:[adminGuard()]},
  {path: '**',component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,/*{enableTracing: true}*/)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

