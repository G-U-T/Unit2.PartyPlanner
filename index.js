let activeParties = [];

const centerDiv = document.querySelector("main");
const table = document.querySelector("table");

const computedStyle = getComputedStyle(document.body);
const oddRowColor = computedStyle.getPropertyValue(`--odd-row`);
const evenRowColor = computedStyle.getPropertyValue(`--even-row`);

// Render activeParties to HTML.
const render = () => {
	table.innerHTML = ``;

	let isRowOdd = true;
	activeParties.forEach((party) => {
		const tableRow = document.createElement('tr');
		const tableData = document.createElement('td');
		tableData.innerText = party.name;
		table.appendChild(tableRow);
		tableRow.appendChild(tableData);

		// Alternate background colors for table rows:
		if (isRowOdd) {
			tableRow.style.background = oddRowColor;
		}
		else {
			tableRow.style.background = evenRowColor;
		}
		isRowOdd = !isRowOdd;
	});
};

// Set activeParties to the parties from the API.
const getPartiesFromAPI = async () => {
	const response = await fetch(`https://fsa-crud-2aa9294fe819.herokuapp.com/api/2310-FSA-ET-WEB-FT-SF/events`);
	const responseJSON = await response.json();
	const arrayOfEvents = await responseJSON.data;

	activeParties = arrayOfEvents;
	render();
};

getPartiesFromAPI();