import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdminauthService } from './adminauth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) { }
  url=`http://localhost:8093/admins/findUnassigned`
  getUnassignedOrders(){
    return this.http.get(this.url);
  }
  getWashers(){
   let url1=`http://localhost:8093/manage/users/WASHER`
    return this.http.get(url1);
  }
  assignWasher(orderId:String,washerName:string){
    return this.http.put(`http://localhost:8093/admins/assignWasher/${orderId}`,washerName,{responseType:'Text'as'json'});
  }
  getWashPacks(){
    return this.http.get(`http://localhost:8093/admins/findallWp`
    );
  }
  editWashpack(washpackId:String,washpack:any){
   return this.http.put(`http://localhost:8093/admins/updateWp/${washpackId}`,washpack,{responseType:'Text' as 'json'});
  }
  deleteWashpack(washpackId:String){
    return this.http.delete(`http://localhost:8093/admins/deleteWp/${washpackId}`);
  }
  addWashpack(washpack:any){
    return this.http.post(`http://localhost:8093/admins/addWp`,washpack);
  }
  updateProfile(id:string,admin:any){
    return this.http.put(`http://localhost:8093/manage/updateprofile/${id}`,admin,{responseType:'Text' as 'json'});
  }
 
}
