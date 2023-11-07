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
		table.appendChild(tableRow);

		// Alternate background colors for table rows:
		if (isRowOdd) {
			tableRow.style.background = oddRowColor;
		}
		else {
			tableRow.style.background = evenRowColor;
		}
		isRowOdd = !isRowOdd;

		const addTableData = (data) => {
			const tableData = document.createElement('td');
			tableData.innerText = data;
			tableRow.appendChild(tableData);
		};

		const deleteButton = document.createElement('button');
		deleteButton.innerText = `Delete event ${activeParties.indexOf(party) + 1}`;
		tableRow.appendChild(deleteButton);
		deleteButton.addEventListener(`click`, () => {
			/* Gets the row number from the text of the button,
			then splices it out of the activeParties array. */
			const rowNum = Number(deleteButton.innerText.slice(13)) - 1;
			activeParties.splice(rowNum, 1);
			render();
		});

		for (const key in party) {
			// Don't render the id or cohortId.
			if (key === `id` || key === `cohortId`) {
				continue;
			}

			addTableData(party[key]);
		}
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