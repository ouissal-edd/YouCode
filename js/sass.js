const add = document.getElementById("soumettre");
class Brief {
    constructor(answer) {
        this.answer = answer;
    }
    shwoData() {


        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch("http://localhost:8000/brief", requestOptions)
            .then(response => response.json())
            .then(result => {

                for (let i = 0; i < result.length; i++) {
                    document.querySelector('#contenu').innerHTML +=
                        `
                        <h4>Context</h4>
                    <p>${result[i].contexte}</p>
                    <h4>Technology</h4>
                    <p>${result[i].technologie}</p>
                   `
                }

            })
            .catch(error => console.log('error', error));
    }

    postAnswer() {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({
            "reponse": this.answer,
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



    postResultatStoreg() {
        let data = [];
        let allTest = localStorage.getItem('StoredData');
        var allTest1 = JSON.parse(allTest);

        allTest1.forEach(element => {
            const online = element.onlineTest;
            const motivation = element.Motivation;
            const administration = element.resultAdministration;

            data.push({
                onlineTest: online,
                Motivation: motivation,
                resultAdministration: administration,
                renduSass: this.answer

            });
            var dataJSON = JSON.stringify(data);
            localStorage.setItem('StoredData', dataJSON);

        });
    }


}

const brief = new Brief();
brief.shwoData();

add.addEventListener('click', e => {
    e.preventDefault();
    var answer = document.getElementById("link_rendu").value;
    const brief = new Brief(answer);
    brief.postResultatStoreg();


})