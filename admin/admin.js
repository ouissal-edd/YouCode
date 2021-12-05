const add = document.getElementById("submit");

class Admin {
    constructor(context, technology) {
        this.context = context;
        this.technology = technology;

    }
    shwoData() {


        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch("http://localhost:8000/resultTest", requestOptions)
            .then(response => response.json())
            .then(result => {

                for (let i = 0; i < result.length; i++) {
                    document.querySelector('#candidat').innerHTML +=
                        `
                       <tr>
                       <td>${result[i].Nom_complet}</td>
                       <td>${result[i].CIN}</td>
                       <td>${result[i].testOnline}</td>
                       <td>${result[i].testMotivation}</td>
                       <td>${result[i].testAdministratif}</td>
                       <td>${result[i].testSass}</td>


                       </tr>
                   
                   `
                }

            })
            .catch(error => console.log('error', error));
    }
    postData() {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({
            "contexte": this.context,
            "technologie": this.technology,
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:8000/brief", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }
}

add.addEventListener('click', e => {
    e.preventDefault();
    var content = document.getElementById("Context").value;
    var inputTechno = document.getElementById("technologie").value;

    console.log(content, inputTechno);
    const admin = new Admin(content, inputTechno);
    admin.postData();
});
document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, options);
});

// Initialize collapsible (uncomment the lines below if you use the dropdown variation)
// var collapsibleElem = document.querySelector('.collapsible');
// var collapsibleInstance = M.Collapsible.init(collapsibleElem, options);

// Or with jQuery

$(document).ready(function () {
    $('.sidenav').sidenav();
});

const admin = new Admin();
admin.shwoData();