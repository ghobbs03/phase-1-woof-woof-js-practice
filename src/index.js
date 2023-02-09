const pupsAPI = 'http://localhost:3000/pups';
let isGoodDog;

fetch(pupsAPI)
    .then(resp => resp.json())
    .then(renderDogs)




function renderDogs(dogs) {
    dogs.forEach(dog => {
        const divDogBar = document.getElementById('dog-bar');
        const dogElement = document.createElement('span')
        dogElement.id = dog.id;
        dogElement.textContent = dog.name;
        divDogBar.append(dogElement);
        renderDog(dog);
    });
}

function renderDog(dog) {

    console.log( document.querySelector('span'))

    document.getElementById(dog.id).addEventListener('click', () => {
        const goodDogText = dog.isGoodDog ? "Good Dog!" : "Bad Dog!";

        const divDogInfo = document.getElementById('dog-info');
        divDogInfo.innerHTML =
            `<img src=${dog.image}> 
            <h2>${dog.name}</h2>
            <button id="good-state">${goodDogText}</button>`;

        const button = document.getElementById('good-state');

        let isGoodDog = dog.isGoodDog;

        button.addEventListener('click', e => {


            if (e.target.textContent === "Good Dog!") { // isGoodDog = true
                e.target.textContent = "Bad Dog!";
                isGoodDog = false;

            } else {
                e.target.textContent = "Good Dog!";
                isGoodDog = true;
            }



            fetch(pupsAPI + `/${dog.id}`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    isGoodDog: isGoodDog
                })

            })
                .then(resp => resp.json())
                .then(dog => {
                    console.log(dog)
                    renderDog(dog);
                })

        })



    })
}





function el(elementName) {
    return document.createElement(elementName);
}