export interface adminDetails{
    email:"",
    password:"", 
    fullname:"",
}
export interface admin{
    id:"",
    email:"",
    password:"",
    token:"",
    fullname:"",
    enabled:boolean,
    roles:[{id:"",role:"ADMIN"}]
 }