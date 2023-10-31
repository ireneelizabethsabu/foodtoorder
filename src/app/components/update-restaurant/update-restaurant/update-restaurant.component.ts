import { Component } from '@angular/core';
import { Form, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Address } from 'src/app/models/address';
import { Dish } from 'src/app/models/dish';
import { Restaurant } from 'src/app/models/restaurant';
import { User } from 'src/app/models/user';
import { RestaurantService } from 'src/app/services/restaurant/restaurant.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-update-restaurant',
  templateUrl: './update-restaurant.component.html',
  styleUrls: ['./update-restaurant.component.scss']
})

export class UpdateRestaurantComponent {
  firstFormGroup = this.formBuilder.group({
    restaurant_id: [''],
    rName: ['', Validators.required],
    rImgPath: ['',Validators.required]
  });

  isLinear = false;
  arrRestaurant : Restaurant[] = []
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
    private restaurantservice: RestaurantService) {
    
    let role = localStorage.getItem("role")
    restaurantservice.getRestaurants().subscribe(data => {
      if(role == "admin"){
        this.arrRestaurant = data
      }else if(role == "owner"){
        let ownerid = parseInt('' + localStorage.getItem("id"))
        this.arrRestaurant = data.filter(element => element.ownerid == ownerid)
      }
      
    })
    this.addressForm = this.formBuilder.group({
      form_array_addresses: this.formBuilder.array([])
    })
    this.dishesForm = this.formBuilder.group({
      form_array_dishes: this.formBuilder.array([])
    })
  }

  saveFirstStepData(formdata: FormGroup){
    console.log(this.restaurant.id)
    this.restaurant.name = formdata.value['rName']
    this.restaurant.restSrc  = formdata.value['rImgPath']
    console.log('you submitted  value first step: ',this.restaurant);
    
  }

  saveSecondStepData(formdata: FormGroup){
    
    this.countSecondFormSubmit++;
    if (this.countSecondFormSubmit == this.count) {
      //console.log("hiii")
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
    console.log(this.countThirdFormSubmit,this.dishcount)
    if (this.countThirdFormSubmit == this.dishcount) {
      
      let dishArr = Object.values(formdata);
      this.dishes = dishArr;
      console.log(this.dishes)             
      let temp = JSON.parse(JSON.stringify(this.dishes));
      console.log(temp[0]);
      this.restaurant.dishes = temp[0];
      
      console.log(this.restaurant.dishes);
      // this.restaurant.dishes.forEach((dish,index) => {
        
      //   dish. = index + 1;
      // });
      console.log(JSON.stringify(this.restaurant))
      
      this.restaurantservice.updateRestaurant(this.restaurant).subscribe(data => {})
      
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
      'id': new FormControl(0),
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
      'id': new FormControl(0),
      'name': new FormControl('',Validators.required),
      'price': new FormControl('',Validators.required),
      'imagesrc': new FormControl('',Validators.required),
      'isAvailable': new FormControl(true,Validators.required),
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
    console.log(form_array_dishes)
    form_array_dishes.push(this.createDishFormGroup())
  }  

  onChangeType(evt: any){
    this.countSecondFormSubmit = 0
    this.countThirdFormSubmit = 0
    this.count = 0
    this.dishcount = 0
    
    console.log(evt.target.value)
    let idObtained = evt.target.value
    this.idUpdated = parseInt(idObtained.split(":")[1].trim());['1','1']
    this.form_array_addresses().controls  = []
    this.form_array_dishes().controls = []
    this.restaurantservice.getRestaurantById(this.idUpdated).subscribe(data => {
      this.restaurant = data;
      this.firstFormGroup.get('rName')?.setValue(this.restaurant.name)
      this.firstFormGroup.get('rImgPath')?.setValue(this.restaurant.restSrc)
      this.restaurant.addresses.forEach(element => {
        this.countSecondFormSubmit++;
        let addform = this.createAddressFormGroup()
        addform.get('id')?.setValue(element.id)
        addform.get('houseNo')?.setValue(element.houseNo)
        addform.get('street')?.setValue(element.street)
        addform.get('area')?.setValue(element.area)
        addform.get('city')?.setValue(element.city)
        addform.get('pincode')?.setValue(element.pincode)
        addform.get('state')?.setValue(element.state)
        addform.get('country')?.setValue(element.country)
        const form_array_addresses = this.addressForm.get('form_array_addresses') as FormArray
        form_array_addresses.push(addform)
      });
      this.countSecondFormSubmit--;
      this.restaurant.dishes.forEach(element => {
        this.countThirdFormSubmit++;
        let dform = this.createDishFormGroup()
        
        dform.get('id')?.setValue(element.id)
        dform.get('name')?.setValue(element.name)
        dform.get('price')?.setValue(element.price)
        dform.get('imagesrc')?.setValue(element.imagesrc)
        dform.get('isAvailable')?.setValue(element.isAvailable)
        const form_array_dishes= this.dishesForm.get('form_array_dishes') as FormArray
        form_array_dishes.push(dform)
        console.log(form_array_dishes as FormArray)
      });
      this.countThirdFormSubmit--;
    })
  }
}
