import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'


// signup
export const createCustomer= createAsyncThunk("auth/signup", async (data) => {
    try {
        const headers = {
            "X-Authorization": 'sk_49359792715311bc702c21e4368e8f3a0402bb43be291',
            "Content-Type": "application/json",
            "Accept": "application/json",
        };        
        const body = {
            "email": data.email,
            "phone": data.phone,
            "firstname": data.firstname,
            "lastname": data.lastname
        }
        const res= await axios.post('https://api.chec.io/v1/customers',  body, {headers})
        console.log(res)
    } catch (error) {
        console.log(error)
    }
})

// login
export const login= createAsyncThunk("auth/login", async (email) => {
    try {
        const headers = {
            "X-Authorization": 'sk_test_493593c27a21262e012396e616f3d96c2c9d7990c54f1',
            "Content-Type": "application/json",
            "Accept": "application/json",
        };        
        const body = {
            'email': `${email}`,
            'base_url': 'http://localhost:3000/confirm-user'
        }
        const res= await axios.post('https://api.chec.io/v1/customers/email-token',  body, {headers})
        return res
        console.log(res);

    } catch (error) {
        console.log(error.message)
    }
})

// confirm customer-  token for jwt
export const loginTokenForJWT= createAsyncThunk("auth/jwt", async (token) => {
    try {
        const headers = {
            "X-Authorization": "pk_test_49359e6683868a6cf6e213b81f76cdebc8a3f61e900a5",
            "Content-Type": "application/json",
            "Accept": "application/json",
        };
        const body = {
            'token': `${token}`
        }
        const res= await axios.post("https://api.chec.io/v1/customers/exchange-token",body, {headers})
        console.log(res);
        localStorage.setItem("commercejs_customer_id", res?.data?.customer_id)
        localStorage.setItem("commercejs_customer_token", res?.data?.jwt)

    } catch (error) {
        console.log(error.message)
    }
})

// my profile-  get user information
export const getCustomer= createAsyncThunk("auth/getCustomer", async (customerId) => {
    try {
        const url = new URL(
            `https://api.chec.io/v1/customers/${customerId}`
        );
        
        const headers = {
            "X-Authorization": "sk_49359792715311bc702c21e4368e8f3a0402bb43be291",
            "Accept": "application/json",
            "Content-Type": "application/json",
        };
        
        const data = fetch(url, {
            method: "GET",
            headers: headers,
        })
            .then(response => response.json())
            .then((data) => {
                return data;
              })

        return data
    } catch (error) {
        console.log(error.message)
    }
})


// update customer

export const updateCustomer= createAsyncThunk("auth/updateCustomer", async (data) => {
    try {
        const headers = {
            "X-Authorization": "sk_49359792715311bc702c21e4368e8f3a0402bb43be291",
            "Content-Type": "application/json",
            "Accept": "application/json",
        };
        const body = {
            'email': `${data?.email}`,
            'phone': `${data?.phone}`,
            'firstname': `${data?.firstname}`,
            'lastname': `${data?.lastname}`
        }
        const res= await axios.put(`https://api.chec.io/v1/customers/${data?.id}`,body, {headers})
        console.log(res)
    } catch (error) {
        console.log(error.message)
    }
})


export const authActions = {
    createCustomer,
    login,
    loginTokenForJWT,
    getCustomer,
    updateCustomer
}