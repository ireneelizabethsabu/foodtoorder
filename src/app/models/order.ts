import { Cart } from "./cart"
import { Dish } from "./dish"

export class Order
{
    id: number
    date: string
    amount: number
    cart: Cart
    userid: number

    constructor(id: number,date: string,amount: number,userid: number,cart: Cart)
    {
        this.id = id
        this.date = date
        this.amount = amount
        this.userid = userid
        this.cart = cart
    }
}