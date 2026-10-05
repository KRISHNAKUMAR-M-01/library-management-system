"use strict";

//Name of the key in localStorage where user data is stored
const USERS_KEY = "lms_users";
const SESSION_KEY = "lms_session";

//Validation rules for form fields
const validators = {
    fullName: function(value){
        const name=value.trim();

        if(name === "") {
            return "Enter your full name.";
        }
        if(name.length < 3) {
            return "Name must be at least 3 characters.";
        }
        if(!/^[A-Za-z ]+$/.test(name)) {
            return "Name can contain only letters and spaces";
        }
        return "";
    },

    email: function(value) {
       const email = value.trim();
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
            return "Add at least one number";
        }
        return "";
    },

    confirmPassword: function(value) {
        if(value === "") {
            return "Confirm your password";
        }
        if(value !== document.getElementById('password').value){
            return "Password does not match";
        }
        return "";
    },

    terms: function(checked) {
        return checked ? "" : "You must accept the library rules";
    },

    loginPassword: function(value) {
        return value !=="" ? "" : "Enter your password.";
    }
};

//Validate a single field and display error feedback
function validateField(input) {

    const value = input.type === "checkbox" ? input.checked : input.value;


    const message = validators[input.id](value);
    const feedback=input.closest(".mb-3").querySelector(".invalid-feedback");

    feedback.textContent=message;
    input.classList.toggle("is-invalid", message !== "");
    input.classList.toggle("is-valid",message === "");
    return message === "";
} 

//Validate all fields in the form before submission
function validateForm(form){
    const inputs = Array.from(form.querySelectorAll("[data-validate]"));
    return inputs.map(validateField).every(Boolean);
}

//storage helper functions
function getUsers() {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
}

function saveUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function showAlert(type, message) {
    const alertBox = document.getElementById("formAlert");
    alertBox.className = "alert alert-" + type;
    alertBox.textContent = message;
}

//Handle Login Form Submission
function handleLogin(event) {
    event.preventDefault();
    const form = event.target;

    if(!validateForm(form)) {
        return;
    }
    
    const email = form.email.value.trim().toLowerCase();
    const password = form.loginPassword.value;
    const users = getUsers().find(function(savedUser) {
        return savedUser.email === email && savedUser.password === password;
    });

    if(!users) {
        showAlert("danger", "Invalid email or password.");
        return;
    }

    localStorage.setItem(SESSION_KEY, JSON.stringify({name: users.name, email: users.email}));

}

//Handle Registration Form Submission
function handleRegister(event){
    event.preventDefault();
    const form = event.target;

    if(!validateForm(form)) {
        return;
    }

    const email = form.email.value.trim().toLowerCase();
    const users = getUsers();

    if(users.some(function(user){ return user.email === email; })) {
        showAlert("danger", "Email is already registered.");
        return;
    }

    users.push({
        name: form.fullName.value.trim(),
        email: email,
        department: form.department.value,
        password: form.password.value
    });
    saveUsers(users);

    window.location.href = "index.html?registered=1";
}

//Event listeners for forms and live validation
document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");

    if(loginForm) {
        loginForm.addEventListener("submit", handleLogin);

        if(new URLSearchParams(window.location.search).has("registered")) {
            showAlert("success", "Account created successfully! Please log in.");
        }   
    }

    if(registerForm) {
        registerForm.addEventListener("submit", handleRegister);
    }

    //Live validation as user types
    document.querySelectorAll("[data-validate]").forEach(input => {
        input.addEventListener("input", function() {
            validateField(input);
        });
    });
})
