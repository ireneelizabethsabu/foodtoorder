import { CanActivateFn } from "@angular/router";

export function ownerGuard() : CanActivateFn {
    let role = localStorage.getItem("role");

    return () => {
        if(role == "owner"){
            return true;
        }
        alert("Sorry access denied!")
        return false
    }
}