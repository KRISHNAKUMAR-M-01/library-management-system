"use-strict";

/* Validation Rules */
const validators={
    fullName:function(value){
        const name=value.trim();

        if(name === "") {
            return "Enter your full name."
        }
        if(name.length < 3){
            return "Name must be at least 3 characters."
        }
        if(!/^[A-Za-z ]+$/.test(name)) {
            return "Name can contain only letters and spaces"
        }
        return "";
    },

    email:function(value) {
       const email=value.trim();
       if(email === "") {
        return "Enter your email address.";
       }
       if(/^\d/.test(email)) {
        return "Email must not start with a number.";
       }
       if(!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
        return "Enter a valid email address.";
       }
       return "";
    },

    department: function(value) {
        return value !== "" ? "" : "Select your department.";
    },

    password: function(value) {
        if(value.length < 8){
            return "Password must be at least 8 characters.";
        }
        if(!/[A-Z]/.test(value)) {
            return "Add at least one uppercase letter.";
        }
        if(!/[a-z]/.test(value)) {
            return "Add at least one lowercase letter.";
        }
        if(!/\d/.test(value)) {
            return "Add at least one number"
        }
        return "";
    },

    confirmPassword: function(value) {
        if(value === "") {
            return "Confirm your password";
        }
        if(value !== document.getElementById('password').value){
            return "Password does not match"
        }
        return "";
    },

    term: function(checked) {
        return checked ? "" : "You must accept the library rules"
    },

    loginPassword:function(value) {
        return value !=="" ? "" : "Enter your password.";
    }
};

/* Validate one input and show the result*/
function validateField(input) {

    const value = input.type === "checkbox" ? input.checked : input.value;


    const message=validators[input.id](value);
    const feedback=input.closest(".mb-3").querySelector(".invalid-feedback");

    feedback.textContent=message;
    input.classList.toggle("is-invalid", message!== "");
    input.classList.toggle("is-valid",message==="");
    return message === "";
} 