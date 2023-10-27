import {Component} from '@angular/core';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormGroup, FormControl, FormArray} from '@angular/forms';
import { Address } from 'src/app/models/address';
import { Dish } from 'src/app/models/dish';
import { Restaurant } from 'src/app/models/restaurant';
import { User } from 'src/app/models/user';
import { RestaurantService } from 'src/app/services/restaurant/restaurant.service';
import { UserService } from 'src/app/services/user/user.service';


@Component({
  selector: 'app-add-restaurant',
  templateUrl: './add-restaurant.component.html',
  styleUrls: ['./add-restaurant.component.scss'],
})

export class AddRestaurantComponent {
  firstFormGroup = this.formBuilder.group({
    rName: ['', Validators.required],
    rImgPath: ['',Validators.required],
    owner_id: ['']
  });

  arrUser: User[] = []
  isLinear = false;
  arrRestaurant : Restaurant[] = []
  restaurant: Restaurant = new Restaurant(0,'',[],[],'',0)
  addresses: Address[] = [];
  dishes: Dish[] = []
  //dish: Dish = new Dish()

  count: number = 0
  dishcount: number = 0
  countSecondFormSubmit: number = 0;
  countThirdFormSubmit: number = 0;

  public addressForm: FormGroup
  public dishesForm: FormGroup
  
  constructor(private formBuilder: FormBuilder,private restaurantservice: RestaurantService
    ,private userService: UserService) {
    restaurantservice.getRestaurants().subscribe(data => {
      this.arrRestaurant = data;
    })
    this.addressForm = this.formBuilder.group({
      form_array_addresses: this.formBuilder.array([this.createAddressFormGroup()])
    })
    this.dishesForm = this.formBuilder.group({
      form_array_dishes: this.formBuilder.array([this.createDishFormGroup()])
    })
    userService.getUsers().subscribe(data => {
      this.arrUser = data.filter(d => d.role == "owner")
    })
  }

  saveFirstStepData(formdata: FormGroup){
    var maxId = 0
    this.arrRestaurant.forEach(rest => {
      if(maxId < rest.id)
        maxId = rest.id
    })

    
    let id = maxId + 1
 
    this.restaurant.id = id
    this.restaurant.name = formdata.value['rName']
    this.restaurant.restSrc  = formdata.value['rImgPath']
    this.restaurant.ownerid = formdata.value['owner_id']
    
    console.log('you submitted  value: ',this.restaurant);
    
  }

  saveSecondStepData(formdata: FormGroup){
    this.countSecondFormSubmit++;
    if (this.countSecondFormSubmit == this.count) {
      // this.addresses=Object.values(formdata);
      // console.log(formdata);
      let adressArr = Object.values(formdata);
      this.addresses = adressArr;
                    
      let temp = JSON.parse(JSON.stringify(this.addresses));
      this.restaurant.addresses = temp[0];
      
      console.log(this.restaurant);
      //this.restaurantservice.addRestaurant(this.restaurant)
      
    }
  }

  saveThirdStepData(formdata: FormGroup){
    this.countThirdFormSubmit++;
    if (this.countThirdFormSubmit == this.dishcount) {
      
      let dishArr = Object.values(formdata);
      this.dishes = dishArr;
                    
      let temp = JSON.parse(JSON.stringify(this.dishes));
      this.restaurant.dishes = temp[0];
      
      console.log(this.restaurant.dishes);
      this.restaurant.dishes.forEach((dish,index) => {
        dish.isAvailable = true;
        dish.id = index + 1;
      });
      this.restaurantservice.addRestaurant(this.restaurant).subscribe(data => {})
      
    }
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
  onNext(stepper: any){
    if(this.firstFormGroup.valid)
      stepper.next();
  }
}
