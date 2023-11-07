const activeParties = [];

const getPartiesFromAPI = async () => {
	const response = await fetch(`https://fsa-crud-2aa9294fe819.herokuapp.com/api/2310-FSA-ET-WEB-FT-SF/events`);
	const responseJSON = await response.json();
	const arrayOfEvents = await responseJSON.data;

	const p = document.createElement('p');
	p.innerText = arrayOfEvents;
	centerDiv.appendChild(p);
};

const centerDiv = document.querySelector("main");

getPartiesFromAPI();