"use client";
import axios from "axios";
// A common function to make every API calls

const APIRequest = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
});

export const apiCallFunction = async (
    method: string,
    endpoint: string,
    reqData?: object,
    params?: any
) => {

    console.log('%c API CALLING REQUEST', 'background:gray ; color:white', {
        method: method,
        url: process.env.NEXT_PUBLIC_BASE_API_URL + endpoint,
        data: reqData,
        headers: {
            language: "en",
            authorization: localStorage.getItem("AUTH_TOKEN"),
            "Content-Type": 'application/json',
        },
        params: params,
    });

    return APIRequest({
        method: method,
        url: process.env.NEXT_PUBLIC_BASE_API_URL + endpoint,
        data: reqData,
        headers: {
            // language: "en",
            // authorization: localStorage.getItem("AUTH_TOKEN"),
            "Content-Type": 'multipart/form-data',
        },
        params: params,
    })
        .then((response) => {
            console.log('%c RESPONSE DATA', 'background: green; color: white', response)
            return response;
        })
        .catch((err) => {
            console.log("%c ERROR DATA :", 'background: red; color: white', err)
            return err;
        });
};
