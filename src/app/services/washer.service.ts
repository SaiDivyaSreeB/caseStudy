import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class WasherService {

  constructor(private http:HttpClient) { }
  getPendingOrders(fullname:string){
    let url = `http://localhost:8093/washers/pendingWasherOrders/${fullname}`
    return this.http.get(url);
  }
   rejectOrder(orderId:String){
     let url=`http://localhost:8093/washers/reject/${orderId}`
     return this.http.get(url);
   }
  updateStatus(orderId:String){
    let url =`http://localhost:8093/washers/updateStatus/${orderId}`
    return this.http.get(url);
  }
  getUnassigned(){
    let url = `http://localhost:8093/washers/findUnassigned`
    return this.http.get(url);
  }
  assignHimself(orderId:string,washer:String){
    let url=`http://localhost:8093/washers/assign/${orderId}`
    return this.http.put(url,washer,{responseType:'text'as'json'})
  }
  updateProfile(id:String,user:Object){
    let url=`http://localhost:8093/washers/updateProfile/${id}`
    return this.http.put(url,user,{responseType:'text'as'json'})
  }
  viewRatings(){
    let url=`http://localhost:8093/users/getAllRatings`
    return this.http.get(url);
  }
}
