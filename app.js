class Game {
    // Create the constructor
    constructor(homeTeam, awayTeam, winningPitcherFirst, winningPitcherLast, losingPitcherFirst, losingPitcherLast, dateTime, venue) {
        this.homeTeam = homeTeam;
        this.awayTeam = awayTeam;
        this.winningPitcherFirst = winningPitcherFirst;
        this.winningPitcherLast = winningPitcherLast;
        this.losingPitcherFirst = losingPitcherFirst;
        this.losingPitcherLast = losingPitcherLast;
        this.dateTime = dateTime;
        this.venue = venue;
    }
}
// Create empty object array to hold all the games for the day
const gameArr = [];

// Get the data needed for the page
const getMLBData = async () => {
    // Pull the year, month and day from the user form
    let year = document.getElementById("yearSelected").value;
    let month = document.getElementById("monthSelected").value;
    let day = document.getElementById("daySelected").value;

    // Pull JSON data from the date selected by the user
    try {
        // Call load gif and apply it to the page
        let loader = `<div class="load"><img src="./src/img/spinner.gif" alt="Be patient..." /></div>`;
        document.getElementById('cardsHere').innerHTML = loader;
        // Start fetch
        const MLBRequest = await fetch(`https://gd2.mlb.com/components/game/mlb/year_${year}/month_${month}/day_${day}/master_scoreboard.json`);
        const currentGame = await MLBRequest.json();
        const jsonInfo = currentGame.data.games;
        // Assign all json data to a new object, and store each object in an object array
        for (const k of Object.keys(jsonInfo.game)) {
            gameArr[k] = (new Game(jsonInfo.game[k].home_team_name, jsonInfo.game[k].away_team_name, jsonInfo.game[k].winning_pitcher.first,
                jsonInfo.game[k].winning_pitcher.last, jsonInfo.game[k].losing_pitcher.first, jsonInfo.game[k].losing_pitcher.last,
                jsonInfo.game[k].time_date, jsonInfo.game[k].venue));
        }
        // Run the function to display all created objects
        createCard();
    } catch {
        alert("No game today!");
        // Erase the loading spinner
        document.getElementById('cardsHere').innerHTML = "";
    }
}

// Used to clear once you load cards for a new date
const clearCards = () => {
    document.getElementById('cardsHere').innerHTML = "";
}

// Dynamically generate cards for the games of the day
const createCard = () => {
    let gameCount = 1;

    // Wipe all previous cards
    clearCards();

    for (const i of Object.keys(gameArr)) {
        // Card building divs
        let column = document.createElement('div');
        column.className = 'column is-one-quarter-desktop is-full-mobile is-full-tablet';
        column.id = `card${[i]}`;

        let card = document.createElement('div');
        card.className = 'card';

        let cardContent = document.createElement('div');
        cardContent.className = 'card-content';

        // Title
        let title = document.createElement('p');
        title.className = 'content modal-card-title';
        let titleContent = document.createTextNode(`Game ${gameCount++}`);
        title.appendChild(titleContent);

        let gameInfo = document.createElement('p');
        gameInfo.className = 'content';

        // Home Team Name
        let gameInfoHome = document.createTextNode(`Home Team Name: `);

        let gameInfoHomeLink = document.createElement('a');
        gameInfoHomeLink.setAttribute('href', '#');
        gameInfoHomeLink.setAttribute('class', 'homeTeam');

        let GameInfoHomeName = document.createTextNode(`${gameArr[i].homeTeam}`);
        gameInfoHomeLink.appendChild(GameInfoHomeName);

        let pWrapHome = document.createElement('p');

        pWrapHome.appendChild(gameInfoHome);
        pWrapHome.appendChild(gameInfoHomeLink);
        gameInfo.appendChild(pWrapHome);

        // Away Team Name
        let gameInfoAway = document.createTextNode(`Away Team Name: `);

        let gameInfoAwayLink = document.createElement('a');
        gameInfoAwayLink.setAttribute('href', '#');
        gameInfoAwayLink.setAttribute('class', 'awayTeam');

        let GameInfoAwayName = document.createTextNode(`${gameArr[i].awayTeam}`);
        gameInfoAwayLink.appendChild(GameInfoAwayName);

        let pWrapAway = document.createElement('p');

        pWrapAway.appendChild(gameInfoAway);
        pWrapAway.appendChild(gameInfoAwayLink);
        gameInfo.appendChild(pWrapAway);

        // Winning Pitcher
        let gameWinningPitch = document.createTextNode(`Winning Pitcher: `);

        let gameWinningPitchLink = document.createElement('a');
        gameWinningPitchLink.setAttribute('href', '#');
        gameWinningPitchLink.setAttribute('class', 'pitchWin');

        let gameWinningPitchName = document.createTextNode(`${gameArr[i].winningPitcherFirst} ${gameArr[i].winningPitcherLast}`);
        gameWinningPitchLink.appendChild(gameWinningPitchName);

        let pWrapWin = document.createElement('p');

        pWrapWin.appendChild(gameWinningPitch);
        pWrapWin.appendChild(gameWinningPitchLink);
        gameInfo.appendChild(pWrapWin);

        // Losing Pitcher
        let gameLosingPitch = document.createTextNode(`Losing Pitcher: `);

        let gameLosingPitchLink = document.createElement('a');
        gameLosingPitchLink.setAttribute('href', '#');
        gameLosingPitchLink.setAttribute('class', 'pitchLose');

        let gameLosingPitchName = document.createTextNode(`${gameArr[i].losingPitcherFirst} ${gameArr[i].losingPitcherLast}`);
        gameLosingPitchLink.appendChild(gameLosingPitchName);

        let pWrapLoss = document.createElement('p');

        pWrapLoss.appendChild(gameLosingPitch);
        pWrapLoss.appendChild(gameLosingPitchLink);
        gameInfo.appendChild(pWrapLoss);


        // Venue
        let gameVenue = document.createTextNode(`Venue: `);

        let gameVenueLink = document.createElement('a');
        gameVenueLink.setAttribute('href', '#');
        gameVenueLink.setAttribute('class', 'venue');

        let gameVenueName = document.createTextNode(`${gameArr[i].venue}`);
        gameVenueLink.appendChild(gameVenueName);

        let pWrapVenue = document.createElement('p');

        pWrapVenue.appendChild(gameVenue);
        pWrapVenue.appendChild(gameVenueLink);
        gameInfo.appendChild(pWrapVenue);

        // Date
        let time = document.createElement('time');
        let timeContent = document.createTextNode(`${gameArr[i].dateTime}`);

        time.appendChild(timeContent);
        gameInfo.appendChild(time);

        // Footer
        let footer = document.createElement('footer');
        footer.className = 'card-footer';

        // Edit Button
        let editLink = document.createElement('a');
        editLink.className = 'card-footer-item openModal';
        //editLink.id = `modalBtn${i}`;
        editLink.setAttribute('href', '#');

        let edit = document.createTextNode(`Edit`);
        editLink.appendChild(edit);

        footer.appendChild(editLink);

        cardContent.appendChild(title);
        cardContent.appendChild(gameInfo);

        card.appendChild(cardContent);
        card.appendChild(footer);
        column.appendChild(card);

        document.getElementById('cardsHere').appendChild(column);
    }
    // Creates a modal for each card
    createModal();

    // Allow for editing of the cards with the modal
    // Filter area used to select text

    // Find the modal being used
    let modals = document.getElementsByClassName('modal');
    // Get the button that opens the modal
    let btns = document.getElementsByClassName("openModal");
    // Save and close buttons
    let save = document.getElementsByClassName("save");
    let spans = document.getElementsByClassName("close");
    // Edit home team
    let homeTeam = document.getElementsByClassName("homeTeam");
    let homeTeamEdit = document.getElementsByClassName("homeTeamEdit");
    // Edit away team
    let awayTeam = document.getElementsByClassName("awayTeam");
    let awayTeamEdit = document.getElementsByClassName("awayTeamEdit");
    // Edit winning pitcher
    let pitchWin = document.getElementsByClassName("pitchWin");
    let pitchWinEdit = document.getElementsByClassName("pitchWinEdit");
    // Edit losing pitcher
    let pitchLose = document.getElementsByClassName("pitchLose");
    let pitchLoseEdit = document.getElementsByClassName("pitchLoseEdit");
    // Edit venuea
    let venue = document.getElementsByClassName("venue");
    let venueEdit = document.getElementsByClassName("venueEdit");

    // Find the correct modal to open and display
    for (let i = 0; i < btns.length; i++) {
        btns[i].onclick = function () {
            modals[i].style.display = "flex";
        }
    }
    for (let i = 0; i < spans.length; i++) {
        spans[i].onclick = function () {
            modals[i].style.display = "none";
        }
    }
    for (let i = 0; i < spans.length; i++) {
        save[i].onclick = function () {
            // Changing the values
            homeTeam[i].innerHTML = homeTeamEdit[i].value;
            awayTeam[i].innerHTML = awayTeamEdit[i].value;
            pitchWin[i].innerHTML = pitchWinEdit[i].value;
            pitchLose[i].innerHTML = pitchLoseEdit[i].value;
            venue[i].innerHTML = `Venue: ${venueEdit[i].value}`;
            modals[i].style.display = "none";
        }
    }
}

// Create a modal for each card
const createModal = () => {
    let gameCount = 1;
    for (const i of Object.keys(gameArr)) {
        // Modal building divs
        let modal = document.createElement('div');
        modal.className = 'modal';

        let modalBg = document.createElement('div');
        modalBg.className = 'modal-background';

        modal.appendChild(modalBg);

        // Card inside modal
        let card = document.createElement('div');
        card.className = 'modal-card';

        // Card header
        let header = document.createElement('header');
        header.className = 'modal-card-head';

        let headerP = document.createElement('p');
        headerP.className = 'modal-card-title';
        let headerText = document.createTextNode(`Edit Game ${gameCount++} Info`);

        // Adding to source div
        headerP.appendChild(headerText);
        header.appendChild(headerP);
        card.appendChild(header);

        // Creating content div
        let section = document.createElement('section');
        section.className = 'modal-card-body';

        // Home Team Textbox
        inputHome = document.createElement('input');
        inputHome.className = 'input homeTeamEdit';
        inputHome.setAttribute('type', 'text');
        inputHome.setAttribute('placeholder', 'Edit Home Team');
        inputHome.setAttribute('onkeypress', 'filterText();');

        // Away Team Textbox
        inputAway = document.createElement('input');
        inputAway.className = 'input awayTeamEdit';
        inputAway.setAttribute('type', 'text');
        inputAway.setAttribute('placeholder', 'Edit Away Team');
        inputAway.setAttribute('onkeypress', 'filterText();');

        // Winning Pitcher Textbox
        inputPitchWin = document.createElement('input');
        inputPitchWin.className = 'input pitchWinEdit';
        inputPitchWin.setAttribute('type', 'text');
        inputPitchWin.setAttribute('placeholder', 'Edit Winning Pitcher');
        inputPitchWin.setAttribute('onkeypress', 'filterText();');

        // Losing Pitcher Textbox
        inputPitchLose = document.createElement('input');
        inputPitchLose.className = 'input pitchLoseEdit';
        inputPitchLose.setAttribute('type', 'text');
        inputPitchLose.setAttribute('placeholder', 'Edit Losing Pitcher');
        inputPitchLose.setAttribute('onkeypress', 'filterText();');

        // Venue Textbox
        inputVenue = document.createElement('input');
        inputVenue.className = 'input venueEdit';
        inputVenue.setAttribute('type', 'text');
        inputVenue.setAttribute('placeholder', 'Edit Venue ');
        inputVenue.setAttribute('onkeypress', 'filterText();');

        // Adding everything to section div
        section.appendChild(inputHome);
        section.appendChild(inputAway);
        section.appendChild(inputPitchWin);
        section.appendChild(inputPitchLose);
        section.appendChild(inputVenue);

        // Adding section div to source div
        card.appendChild(section);

        // Creating footer
        let footer = document.createElement('footer');
        footer.className = 'modal-card-foot';

        // Save button
        buttonSave = document.createElement('button');
        buttonSave.className = 'button is-success save';

        let buttonSaveText = document.createTextNode('Save');
        buttonSave.appendChild(buttonSaveText);

        // Cancel Button
        buttonClose = document.createElement('button');
        buttonClose.className = 'button close';

        let buttonCloseText = document.createTextNode('Cancel');
        buttonClose.appendChild(buttonCloseText);

        // Adding buttons to footer
        footer.appendChild(buttonSave);
        footer.appendChild(buttonClose);

        // Adding the footer to source div
        card.appendChild(footer);
        modal.appendChild(card);

        // Appending all the divs to the 
        document.getElementById('cardsHere').appendChild(modal);
    }
}

// Create a filter so only letters can be entered into the edit boxes
const filter = "ABCDEFGHIJKLMNOPQRSTUVWXYZ ";
const filterText = () => {
    // If the character entered is not in the filter, it will not be displayed
    if (!letterCheck(window.event.keyCode))
        window.event.returnValue = null;
}

// Checking each letter
const letterCheck = (l) => {
    // Pull the keystroke, convert it to a string, and set it to upper case
    let letter = (String.fromCharCode(l));
    letter = letter.toUpperCase();
    // Making sure the letter is in the filter string
    if (filter.indexOf(letter) !== -1)
        return true;
    else
        return false;
}

// Functionality for hamburger menu in mobile view
document.addEventListener('DOMContentLoaded', () => {
    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {
        // Add a click event on each of them
        $navbarBurgers.forEach(el => {
            el.addEventListener('click', () => {
                // Get the target from the "data-target" attribute
                const target = el.dataset.target;
                const $target = document.getElementById(target);
                // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
                el.classList.toggle('is-active');
                $target.classList.toggle('is-active');
            });
        });
    }
});