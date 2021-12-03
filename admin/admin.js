const add = document.getElementById("submit");

class Sass {
    constructor(context, technology) {
        this.context = context;
        this.technology = technology;

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
    const sass = new Sass(content, inputTechno);
    sass.postData();
})