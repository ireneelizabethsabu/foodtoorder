import { Dish } from "./dish"

export class Cart{
    id: number
    dishes: Dish[]
    amount: number
    quantity: number[]
    rid: number

    constructor(id:number,dishes: Dish[],amount: number,quantity: number[],rid: number)
    {
        this.id = id
        this.dishes = dishes
        this.amount = amount
        this.quantity = quantity
        this.rid = rid
    }
}