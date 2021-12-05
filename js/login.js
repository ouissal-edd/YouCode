const login = document.getElementById("login");
class User {
    constructor(email, password) {
        this.email = email;
        this.password = password;


    }

    checkUser() {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        return fetch(`http://localhost:8000/users?email=${this.email}&&password=${this.password}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                return result;
            })
            .catch(error => console.log('error', error));


    }
}


login.addEventListener('click', async e => {
    e.preventDefault();
    const password = document.getElementById("mdp").value;
    const email = document.getElementById("mail_log").value;

    const user = new User(email, password);
    let ChekifExist = await user.checkUser();
    console.log(ChekifExist);

    if (ChekifExist.length == 0) {
        console.log('noooooo data')
    } else if (ChekifExist.length !== 0) {
        let data = [];
        ChekifExist.forEach(element => {
            data.push({
                full_name: element.full_name,
                CIN: element.CIN,

            });
            var dataJSON = JSON.stringify(data);
            localStorage.setItem('StoredData', dataJSON);
            window.location.replace("file:///C:/Users/admin/Desktop/youcode/testOnline.html");


        });
    }
})