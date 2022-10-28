import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
const httpOptions={
  headers:new HttpHeaders({'Content-Type':'application/json'})
};
@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  constructor(private http:HttpClient) { }
  getWashpackCost(washpack:String){
    let url=`http://localhost:8093/admins/costByName/${washpack}`
    return this.http.get(url);
  }
  saveOrder(order:Object){
    let url = `http://localhost:8093/users/addOrder`
    return this.http.post(url,order,{responseType:'text'as'json'});
  }
  addOrder(form:any):Observable<any>{
  return this.http.post("http://localhost:8099/pg/createOrder",{
    customerName:form.name,
    email:form.mail,
    phoneNumber:form.phone,
    amount:form.cost
  },httpOptions);
  }
  getPacks(){
    let url=`http://localhost:8093/users/seeWp`
    return this.http.get(url);
  }
  getPendingOrders(email:String){

    let url =`http://localhost:8093/orders/findMyOrders/${email}`
    return this.http.get(url);
  }
  cancelOrder(order:Object){
    let url=`http://localhost:8093/users/cancelOrder`
    return this.http.put(url,order,{responseType:'text'as'json'});
  }
  getOrderById(id:String){
    let url =`http://localhost:8093/orders/findOne/${id}`
    return this.http.get(url);
  }
  updateOrder(orderId:String,order:Object){
    let url=`http://localhost:8093/orders/update/${orderId}`
    return this.http.put(url,order,{responseType:'text'as'json'});
  }
  viewRatings(){
    let url=`http://localhost:8093/users/getAllRatings`
    return this.http.get(url);
  }
  giveRatingComment(rating:Object){
    let url = `http://localhost:8093/users/addRating`
    return this.http.post(url,rating,{responseType:'text' as 'json'})
  }
  updateProfile(id:string,admin:any){
    return this.http.put(`http://localhost:8093/manage/updateprofile/${id}`,admin,{responseType:'Text' as 'json'});
  }
  deleteOrder(id:String){
    return this.http.delete(`http://localhost:8093/orders/delete/${id}`)
  }
  getWashpackById(id:String){
    return this.http.get(`http://localhost:8093/admins/findoneWp/${id}`)
  }
 
}
