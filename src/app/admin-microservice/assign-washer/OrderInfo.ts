import { Car } from "./CarInfo";

export interface OrderInfo{
    orderId:String;
    userEmailId:String;
    washerName:String;
    washpack:String;
    phoneNo:number;
    areapincode:String;
    status:String;
    cars:Car;
    addon:String;
}