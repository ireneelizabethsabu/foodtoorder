import { Address } from "./address"
import { Dish } from "./dish"

export class Restaurant{
    id:number
    name:string
    addresses: Address[]
    dishes: Dish[]
    restSrc: string
    ownerid: number

    constructor(id:number,name:string,addresses:Address[],dishes:Dish[],src:string,ownerid: number){
        this.id = id
        this.name = name
        this.addresses = addresses
        this.dishes = dishes
        this.restSrc = src
        this.ownerid = ownerid
    }
}