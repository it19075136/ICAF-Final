import axios from "axios"
import hashPassword from 'password-hash'
import jwt from 'jsonwebtoken'
export const postUser=(user)=> dispatch=>{

   return  new Promise ((resolve,reject)=>{
       user.password = hashPassword.generate(user.password);
    axios.post('https://icaf-rest.herokuapp.com/user/add',user).then(res=>{
        const token = res.data;
        if(token){
            const userResponds =jwt.decode(token);
            const userDetails ={
                _id:userResponds._id,
                name :userResponds.name,
                email : userResponds.email,
                gender : userResponds.gender,
                type : userResponds.type,
                phoneNumber :userResponds.phoneNumber
            }
            console.log('decode token userRespond',userResponds);
            console.log('send details to redux',userDetails)
            // localStorage.setItem('user',token);
            dispatch({type:'ADD_USER',payload:userDetails})
            resolve(res.data);
        }
    }).catch(err=>{
        console.log(err)
        reject(err)
    })
   })
    
}