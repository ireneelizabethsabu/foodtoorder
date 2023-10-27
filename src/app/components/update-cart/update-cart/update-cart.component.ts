import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Address } from 'src/app/models/address';
import { Cart } from 'src/app/models/cart';
import { Dish } from 'src/app/models/dish';
import { Restaurant } from 'src/app/models/restaurant';
import { CartService } from 'src/app/services/cart/cart.service';
import { RestaurantService } from 'src/app/services/restaurant/restaurant.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-update-cart',
  templateUrl: './update-cart.component.html',
  styleUrls: ['./update-cart.component.scss']
})

export class UpdateCartComponent {
  firstFormGroup = this.formBuilder.group({
    cart_id: [''],
    rName: ['', Validators.required],
  });

  isLinear = false;
  arrCart : Cart[] = []
  
  restaurant: Restaurant = new Restaurant(0,'',[],[],'',0)
  addresses: Address[] = [];
  dishes: Dish[] = []
  idUpdated: number = 0

  count: number = 0
  dishcount: number = 0
  countSecondFormSubmit: number = 0;
  countThirdFormSubmit: number = 0;

  public addressForm: FormGroup
  public dishesForm: FormGroup
  
  constructor(private formBuilder: FormBuilder,
    private cartservice: CartService,
    private userService: UserService) {
    cartservice.getCart().subscribe(data => {
      this.arrCart = data;
    })
    this.addressForm = this.formBuilder.group({
      form_array_addresses: this.formBuilder.array([])
    })
    this.dishesForm = this.formBuilder.group({
      form_array_dishes: this.formBuilder.array([])
    })
  }

  saveFirstStepData(formdata: FormGroup){
    // this.restaurant.name = formdata.value['rName']
    // this.restaurant.restSrc  = formdata.value['rImgPath']
    // console.log('you submitted  value first step: ',this.restaurant);
    
  }

  saveSecondStepData(formdata: FormGroup){
    
    // this.countSecondFormSubmit++;
    // if (this.countSecondFormSubmit == this.count) {
    //   console.log("hiii")
    //   // this.addresses=Object.values(formdata);
    //   // console.log(formdata);
    //   let adressArr = Object.values(formdata);
    //   this.addresses = adressArr;
                    
    //   let temp = JSON.parse(JSON.stringify(this.addresses));
    //   this.restaurant.addresses = temp[0];
      
    //   console.log(this.restaurant);
    //   //this.restaurantservice.addRestaurant(this.restaurant)
      
    // }
  }

  saveThirdStepData(formdata: FormGroup){
    // this.countThirdFormSubmit++;
    // console.log(this.countThirdFormSubmit,this.dishcount)
    // if (this.countThirdFormSubmit == this.dishcount) {
      
    //   let dishArr = Object.values(formdata);
    //   this.dishes = dishArr;
                    
    //   let temp = JSON.parse(JSON.stringify(this.dishes));
    //   this.restaurant.dishes = temp[0];
      
    //   console.log(this.restaurant.dishes);
    //   this.restaurant.dishes.forEach((dish,index) => {
    //     dish.isAvailable = true;
    //     dish.id = index + 1;
    //   });
    //   this.restaurantservice.updateRestaurant(this.restaurant).subscribe(data => {})
      
    // }
  } 

  form_array_addresses(): FormArray{
    return this.addressForm.get("form_array_addresses") as FormArray
  }

  form_array_dishes(): FormArray{
    return this.dishesForm.get("form_array_dishes") as FormArray
  }

  private createAddressFormGroup() : FormGroup{
    this.count++
    return new FormGroup({
      'houseNo': new FormControl('',Validators.required),
      'street': new FormControl('',Validators.required),
      'area': new FormControl('',Validators.required),
      'city': new FormControl('',Validators.required),
      'state': new FormControl('',Validators.required),
      'country': new FormControl('',Validators.required),
      'pincode': new FormControl('',Validators.required)
    })
  }

  public removeOrClearAddress(i: number) {
    const form_array_addresses = this.addressForm.get('form_array_addresses') as FormArray
    if (form_array_addresses.length > 1) {
      form_array_addresses.removeAt(i)
      
    }
    else {
      form_array_addresses.reset()
      
    }
  }

  public addAddressFormGroup() {
    const form_array_addresses = this.addressForm.get('form_array_addresses') as FormArray
    form_array_addresses.push(this.createAddressFormGroup())
  }

  private createDishFormGroup() : FormGroup{
    this.dishcount++
    return new FormGroup({
      'name': new FormControl('',Validators.required),
      'price': new FormControl('',Validators.required),
      'imagesrc': new FormControl('',Validators.required),
    })
  }

  public removeOrClearDish(i: number) {
    const form_array_dishes = this.dishesForm.get('form_array_dishes') as FormArray
    if (form_array_dishes.length > 1) {
      form_array_dishes.removeAt(i)
    }
    else {
      form_array_dishes.reset()
    }
  }

  public addDishFormGroup() {
    const form_array_dishes= this.dishesForm.get('form_array_dishes') as FormArray
    form_array_dishes.push(this.createDishFormGroup())
  }  

  onChangeType(evt: any){
    // this.countSecondFormSubmit = 0
    // this.countThirdFormSubmit = 0
    // this.count = 0
    // this.dishcount = 0
    
    console.log(evt.target.value)
    let idObtained = evt.target.value
    this.idUpdated = parseInt(idObtained.split(":")[1].trim());['1','1']
    
    // this.form_array_addresses().controls  = []
    // this.form_array_dishes().controls = []
    // this.restaurantservice.getRestaurantById(this.idUpdated).subscribe(data => {
    //   this.restaurant = data;
    //   this.firstFormGroup.get('rName')?.setValue(this.restaurant.name)
    //   this.firstFormGroup.get('rImgPath')?.setValue(this.restaurant.restSrc)
    //   this.restaurant.addresses.forEach(element => {
    //     this.countSecondFormSubmit++;
    //     let addform = this.createAddressFormGroup()
    //     addform.get('houseNo')?.setValue(element.houseNo)
    //     addform.get('street')?.setValue(element.street)
    //     addform.get('area')?.setValue(element.area)
    //     addform.get('city')?.setValue(element.city)
    //     addform.get('pincode')?.setValue(element.pincode)
    //     addform.get('state')?.setValue(element.state)
    //     addform.get('country')?.setValue(element.country)
    //     const form_array_addresses = this.addressForm.get('form_array_addresses') as FormArray
    //     form_array_addresses.push(addform)
    //   });
    //   this.countSecondFormSubmit--;
    //   this.restaurant.dishes.forEach(element => {
    //     this.countThirdFormSubmit++;
    //     let dform = this.createDishFormGroup()
    //     dform.get('name')?.setValue(element.name)
    //     dform.get('price')?.setValue(element.price)
    //     dform.get('imagesrc')?.setValue(element.imagesrc)
    //     const form_array_dishes= this.dishesForm.get('form_array_dishes') as FormArray
    //     form_array_dishes.push(dform)
    //   });
    //   this.countThirdFormSubmit--;
    // })
  }
}
