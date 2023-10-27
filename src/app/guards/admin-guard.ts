import { CanActivateFn } from "@angular/router";

export function adminGuard() : CanActivateFn {
    let role = localStorage.getItem("role");

    return () => {
        if(role == "admin"){
            return true;
        }
        alert("Sorry access denied!")
        return false
    }
}