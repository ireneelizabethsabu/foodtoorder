export class Dish{
    id: number
    name: string
    isAvailable: boolean
    price: number
    imagesrc: string

    constructor(id: number,name: string,isAvailable: boolean = true,price: number,imagesrc: string)
    {
        this.id = id
        this.name = name
        this.isAvailable = isAvailable
        this.price = price
        this.imagesrc = imagesrc
    }
}