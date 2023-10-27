import { Address } from "./address"

export class User{
    id: number
    firstName: string
    lastName: string
    role: string
    dob:string
    password: string
    email: string
    mobileNumber: string
    address: Address

    constructor(i:number, fN:string,lN:string, r:string, db:string,em:string,pw:string,address:Address,mobileNumber: string){
            this.id = i;
            this.firstName = fN
            this.lastName =lN
            this.role = r
            this.dob = db
            this.password = pw
            this.email = em
            this.address = address
            this.mobileNumber = mobileNumber
    }
}