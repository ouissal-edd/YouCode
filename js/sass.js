const add = document.getElementById("soumettre");
class Brief {
    constructor(Nom, CIN, onlineTest, Motivation, resultAdministration, renduSass) {
        this.Nom = Nom;
        this.CIN = CIN;
        this.onlineTest = onlineTest;
        this.Motivation = Motivation;
        this.resultAdministration = resultAdministration;
        this.renduSass = renduSass;

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
            "Nom_complet": this.Nom,
            "CIN": this.CIN,
            "testOnline": this.onlineTest,
            "testMotivation": this.Motivation,
            "testAdministratif": this.resultAdministration,
            "testSass": this.renduSass,
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:8000/resultTest", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }



    postResultatStoreg() {
        let data = [];
        let allTest = localStorage.getItem('StoredData');
        var allTest1 = JSON.parse(allTest);
        var link = document.getElementById("link_rendu").value;
        allTest1.forEach(element => {

            data.push({
                Name: element.Name,
                CIN: element.CIN,
                onlineTest: element.onlineTest,
                Motivation: element.Motivation,
                resultAdministration: element.resultAdministration,
                renduSass: link

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
    const brief = new Brief();
    brief.postResultatStoreg();
    toPostData();

});

function toPostData() {

    let allTest = localStorage.getItem('StoredData');
    var allTest1 = JSON.parse(allTest);

    allTest1.forEach(element => {
        const brief = new Brief(element.Name,  element.CIN ,element.onlineTest, element.Motivation, element.resultAdministration, element.renduSass);
        brief.postAnswer();
        console.log(element.Name,  element.CIN ,element.onlineTest, element.Motivation, element.resultAdministration, element.renduSass)


    });
}