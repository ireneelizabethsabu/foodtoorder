import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BannerComponent } from './components/banner/banner.component';
import { ContentComponent } from './components/content/content.component';
import { FooterComponent } from './components/footer/footer.component';
import { UserComponent } from './components/user/user.component';
import { RestaurantComponent } from './components/restaurant/restaurant.component';
import { OrderComponent } from './components/order/order.component';
import { CartComponent } from './components/cart/cart.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { AdminComponent } from './components/admin/admin.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RestaurantOwnerComponent } from './components/restaurant-owner/restaurant-owner.component';
import { RestaurantDetailsComponent } from './components/restaurantDetails/restaurant-details/restaurant-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTabsModule} from '@angular/material/tabs';
import { UserDetailsComponent } from './components/user-details/user-details/user-details.component';
import { CartDetailsComponent } from './components/cart-details/cart-details/cart-details.component';
import { OrderDetailsComponent } from './components/order-details/order-details/order-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignUpComponent } from './components/sign-up/sign-up/sign-up.component';
import { UpdateUserComponent } from './components/update-user/update-user/update-user.component';
import { AddRestaurantComponent } from './components/add-restaurant/add-restaurant/add-restaurant.component';
import {MatStepperModule} from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar'; 
import { HttpClientModule } from '@angular/common/http';
import { UpdateRestaurantComponent } from './components/update-restaurant/update-restaurant/update-restaurant.component';
import { CurrentCartComponent } from './components/current-cart/current-cart/current-cart.component';
import { UpdateCartComponent } from './components/update-cart/update-cart/update-cart.component';
import { UpdateOrderComponent } from './components/update-order/update-order/update-order.component';
import { RestaurantCardComponent } from './components/restaurant-card/restaurant-card/restaurant-card.component';
import { JsonPipe } from '@angular/common';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatDialogModule} from '@angular/material/dialog';
import { DialogComponent } from './components/dialog/dialog/dialog.component';
import { ConfirmDialogDirective } from './directives/confirm-dialog.directive';

import {MatCardModule} from '@angular/material/card';


@NgModule({
  declarations: [
    AppComponent,
    BannerComponent,
    ContentComponent,
    FooterComponent,
    UserComponent,
    RestaurantComponent,
    OrderComponent,
    CartComponent,
    AboutUsComponent,
    AdminComponent,
    ContactUsComponent,
    HomeComponent,
    PageNotFoundComponent,
    RestaurantOwnerComponent,
    RestaurantDetailsComponent,
    UserDetailsComponent,
    CartDetailsComponent,
    OrderDetailsComponent,
    SignUpComponent,
    UpdateUserComponent,
    AddRestaurantComponent,
    UpdateRestaurantComponent,
    CurrentCartComponent,
    UpdateCartComponent,
    UpdateOrderComponent,
    RestaurantCardComponent,
    DialogComponent,
    ConfirmDialogDirective,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTabsModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatToolbarModule,
    HttpClientModule,
    MatSlideToggleModule,
    MatPaginatorModule,
    JsonPipe, 
    MatDialogModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
