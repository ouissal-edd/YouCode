const add = document.getElementById("add");


class User {
    constructor(fullName, cin, age, email, password, adress) {
        this.fullName = fullName;
        this.cin = cin;
        this.age = age;
        this.email = email;
        this.password = password;
        this.adress = adress;


    }

    usersData() {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        return fetch(`http://localhost:8000/users?email=${this.email}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                return result;
            })
            .catch(error => console.log('error', error));


    }

    postData() {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({
            "full_name": this.fullName,
            "CIN": this.cin,
            "age": this.age,
            "email": this.email,
            "password": this.password,


        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:8000/users", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }

}


add.addEventListener('click', async e => {
    e.preventDefault();
    const cin = document.getElementById("CIN").value;
    const full_name = document.getElementById("fullName").value;
    const age = document.getElementById("age").value;
    const email = document.getElementById("email").value;
    const adress = document.getElementById("adress").value;

    var pass = "";
    var str =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ" + "abcdefghijklmnopqrstuvwxyz0123456789@#$";
    for (i = 1; i <= 8; i++) {
        var char = Math.floor(Math.random() * str.length + 1);
        pass += str.charAt(char);
    }
    const password = pass;

    console.log(full_name, cin, age, email, password, adress);
    const user = new User(full_name, cin, age, email, password, adress);
    let ChekifExist = await user.usersData();
    if (age < 35 && age >= 18 && ChekifExist.length == 0) {
        user.postData();
    } else if (ChekifExist.length !== 0) {
        console.log("exist")
    }
})