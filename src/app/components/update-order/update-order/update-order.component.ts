import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Cart } from 'src/app/models/cart';
import { Order } from 'src/app/models/order';
import { CartService } from 'src/app/services/cart/cart.service';
import { OrderService } from 'src/app/services/order/order.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-update-order',
  templateUrl: './update-order.component.html',
  styleUrls: ['./update-order.component.scss']
})
export class UpdateOrderComponent {
  firstFormGroup = this.formBuilder.group({
    order_id: ['']
  });

  isLinear = false;
  arrOrder : Order[] = []
  order: Order = new Order(0,"",0,0,new Cart(0,[],0,[],0))
  idUpdated: number = 0
  public dishesForm: FormGroup
  dishcount: number = 0

  constructor(private formBuilder: FormBuilder,
    private orderService: OrderService) {
    orderService.getOrders().subscribe(data => {
      this.arrOrder = data;
    })
    this.dishesForm = this.formBuilder.group({
      form_array_dishes: this.formBuilder.array([])
    })
  }

  saveFirstStepData(formdata: FormGroup){
        
  }

  form_array_dishes(): FormArray{
    return this.dishesForm.get("form_array_dishes") as FormArray
  }

  getTotalCartAmount() : number{
    let amount = 0;
    this.order.cart.dishes.forEach((dish,index) => {
      amount += dish.price * this.order.cart.quantity[index]
    })
    return amount;
  }

  saveThirdStepData(formdata: FormGroup){
    let dishArr = Object.values(formdata);              
    let temp = JSON.parse(JSON.stringify(dishArr));
    console.log(temp[0], dishArr)
    //this.order.cart.dishes = temp[0];
    this.order.cart.quantity.forEach((element,index) => {
      
      this.order.cart.quantity[index] = parseInt(temp[0][index].quantity + "")
    });
    this.order.amount = this.getTotalCartAmount()
    this.order.cart.amount = this.getTotalCartAmount()
    this.orderService.updateOrder(this.order).subscribe(data => {})
  }

  private createDishFormGroup() : FormGroup{
    this.dishcount++
    return new FormGroup({
      'name': new FormControl('',Validators.required),
      'price': new FormControl('',Validators.required),
      'quantity': new FormControl('',Validators.required),
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
    console.log(evt.target.value)
    let idObtained = evt.target.value
    this.idUpdated = parseInt(idObtained.split(":")[1].trim());['1','1']
    this.form_array_dishes().controls = []
    this.orderService.getOrderById(this.idUpdated).subscribe(data => {
      this.order = data
      this.order.cart.dishes.forEach((element,index) => {
        //this.countThirdFormSubmit++;
        let dform = this.createDishFormGroup()
        dform.get('name')?.setValue(element.name)
        dform.get('price')?.setValue(element.price)
        dform.get('quantity')?.setValue(this.order.cart.quantity[index])
        dform.get('imagesrc')?.setValue(element.imagesrc)
        const form_array_dishes= this.dishesForm.get('form_array_dishes') as FormArray
        form_array_dishes.push(dform)
      });

    })


  }
}
