const birthDate = new Date("2026-07-06");

function updateAge() {

    const today = new Date();

    const diff = today - birthDate;

    const days = Math.floor(diff / (1000*60*60*24));

    const age = document.getElementById("age");

    if(age){

        age.innerHTML = days + " Days Old";

    }

}

window.onload = updateAge;
