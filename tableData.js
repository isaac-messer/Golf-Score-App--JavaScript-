const scoreCardContainer = document.querySelector('[data-score-card-container]');

let currentPlayers = JSON.parse(localStorage.getItem('activePlayers')); 
let currentCourseData =  JSON.parse(localStorage.getItem('activeCourse'));

let scoreId = null;

document.addEventListener('submit', function(event) {
    event.preventDefault();

    console.log('Form Submited');
    
    const findTargetElement = event.target.id;

    let targetElementInfo = document.getElementById(`scoreInput-${findTargetElement}`);

    let targetPlayerIndexValue = targetElementInfo.getAttribute('data');
    let targetPlayerScoreValue = targetElementInfo.value

    currentPlayers[targetPlayerIndexValue].score.push(targetPlayerScoreValue);
    renderPlayerScore(targetPlayerScoreValue, targetPlayerIndexValue)

    targetElementInfo.value = '';
    
});

   

const selectedCourseToPlay = async (courseId) =>{
    const response = await fetch(`https://exquisite-pastelito-9d4dd1.netlify.app/golfapi/course${courseId}.json`);
    const apiData = await response.json();
    
    console.log(apiData)
    renderPage(apiData);
};

function renderPage(api) {
    renderHeadingCourseInfo(currentCourseData.name, currentCourseData.id);

    for (i = 0; i < currentPlayers.length; i++) {
        renderHeadingPlayerInfo(currentPlayers[i].name, currentPlayers[i].skill, currentPlayers[i].skillValue, i);
        renderTable(api, i)
    }
};

function renderHeadingPlayerInfo(playerName, playerSkillLevel, playerSkillValue, playerIndex) {
    console.log(playerName, playerSkillLevel, playerSkillValue);

    let playerContainer = document.createElement('div')
    playerContainer.setAttribute('id', playerIndex);
    let playerHeader = document.createElement('h3');
    let playerHeaderText = document.createTextNode(`${playerName} - ${playerSkillLevel}`);

    playerHeader.appendChild(playerHeaderText);
    playerContainer.appendChild(playerHeader)
    scoreCardContainer.appendChild(playerContainer);
};

function renderHeadingCourseInfo(courseName, courseId) {
    console.log(courseName, courseId);

    let courseHeader = document.createElement('h1');
    let courseHeaderText = document.createTextNode(`${courseName}: id-${courseId}`);

    courseHeader.appendChild(courseHeaderText);
    scoreCardContainer.appendChild(courseHeader);

};

function renderTable(api, index) {
   
    let playerScoreContainer = document.getElementById(index)
    let addTable = document.createElement('table');
    let singleWordName = currentPlayers[index].name.split(' ').join('');
    addTable.classList.add(`${singleWordName}`)
    addTable.setAttribute('id', `table-${currentPlayers[index].id}`);
    addTable.setAttribute('border', '1');

    playerScoreContainer.appendChild(addTable);
    renderTableInformation(api, index);
};

function renderTableInformation(api, index) {
    let total = 20;

    let table = document.getElementById(`table-${currentPlayers[index].id}`);

    totalYards = 0;
    totalPar = 0;
    totalHandicap = 0;

    for ( n = 0 ; n <= total; n++) {
        if (n === 0) {
            let addRow = document.createElement('tr');
            addRow.setAttribute('id', `holeRow-${currentPlayers[index].id}`)

            table.appendChild(addRow);

        }else if (n === 1) {
            let addHeaderCell = document.createElement('th');
            let addHeaderCellText = document.createTextNode('Hole');

            let row = document.getElementById(`holeRow-${currentPlayers[index].id}`);
            addHeaderCell.appendChild(addHeaderCellText);
            row.appendChild(addHeaderCell);
        } else if (n <= total - 1){
            let addDataCell = document.createElement('td')
            let addDataCellText = document.createTextNode(api.holes[n-2].hole)

            let row = document.getElementById(`holeRow-${currentPlayers[index].id}`);
            addDataCell.appendChild(addDataCellText);
            row.appendChild(addDataCell);
        } else {
            let addDataCell = document.createElement('td')
            let addDataCellText = document.createTextNode('Total')

            let row = document.getElementById(`holeRow-${currentPlayers[index].id}`);
            addDataCell.appendChild(addDataCellText);
            row.appendChild(addDataCell);
        };
    };

    for ( n = 0 ; n <= total; n++) {
        if (n === 0) {
            let addRow = document.createElement('tr');
            addRow.setAttribute('id', `yardageRow-${currentPlayers[index].id}`)

            table.appendChild(addRow);

        }else if (n === 1) {
            let addHeaderCell = document.createElement('th');
            let addHeaderCellText = document.createTextNode('Yardage');

            let row = document.getElementById(`yardageRow-${currentPlayers[index].id}`);
            addHeaderCell.appendChild(addHeaderCellText);
            row.appendChild(addHeaderCell);
        } else if (n <= total - 1) {
            let addDataCell = document.createElement('td')
            let addDataCellText = document.createTextNode(api.holes[n-2].teeBoxes[currentPlayers[index].skillValue].yards)
            totalYards += Number(addDataCellText.textContent);

            let row = document.getElementById(`yardageRow-${currentPlayers[index].id}`);
            addDataCell.appendChild(addDataCellText);
            row.appendChild(addDataCell);
        } else {
            let addDataCell = document.createElement('td')
            let addDataCellText = document.createTextNode(totalYards)

            let row = document.getElementById(`yardageRow-${currentPlayers[index].id}`);
            addDataCell.appendChild(addDataCellText);
            row.appendChild(addDataCell);
        }; 
    };

    for ( n = 0 ; n <= total; n++) {
        if (n === 0) {
            let addRow = document.createElement('tr');
            addRow.setAttribute('id', `parRow-${currentPlayers[index].id}`)

            table.appendChild(addRow);

        }else if (n === 1) {
            let addHeaderCell = document.createElement('th');
            let addHeaderCellText = document.createTextNode('par');

            let row = document.getElementById(`parRow-${currentPlayers[index].id}`);
            addHeaderCell.appendChild(addHeaderCellText);
            row.appendChild(addHeaderCell);
        } else if (n <= total - 1){
            let addDataCell = document.createElement('td')
            let addDataCellText = document.createTextNode(api.holes[n-2].teeBoxes[currentPlayers[index].skillValue].par)
            totalPar += Number(addDataCellText.textContent);

            let row = document.getElementById(`parRow-${currentPlayers[index].id}`);
            addDataCell.appendChild(addDataCellText);
            row.appendChild(addDataCell);
        } else {
            let addDataCell = document.createElement('td');
            let addDataCellText = document.createTextNode(totalPar);

            let row = document.getElementById(`parRow-${currentPlayers[index].id}`);
            addDataCell.appendChild(addDataCellText);
            row.appendChild(addDataCell);
        };
    };

    for ( n = 0 ; n <= total; n++) {
        if (n === 0) {
            let addRow = document.createElement('tr');
            addRow.setAttribute('id', `handicapRow-${currentPlayers[index].id}`);

            table.appendChild(addRow);

        }else if (n === 1) {
            let addHeaderCell = document.createElement('th');
            let addHeaderCellText = document.createTextNode('Handicap');

            let row = document.getElementById(`handicapRow-${currentPlayers[index].id}`);
            addHeaderCell.appendChild(addHeaderCellText);
            row.appendChild(addHeaderCell);
        } else if (n<= total - 1) {
            let addDataCell = document.createElement('td');
            let addDataCellText = document.createTextNode(api.holes[n-2].teeBoxes[currentPlayers[index].skillValue].hcp);
            totalHandicap += Number(addDataCellText.textContent);

            let row = document.getElementById(`handicapRow-${currentPlayers[index].id}`);
            addDataCell.appendChild(addDataCellText);
            row.appendChild(addDataCell);
        } else {
            let addDataCell = document.createElement('td');
            let addDataCellText = document.createTextNode(totalHandicap);

            let row = document.getElementById(`handicapRow-${currentPlayers[index].id}`);
            addDataCell.appendChild(addDataCellText);
            row.appendChild(addDataCell);
        };
    };

    for ( n = 0 ; n <= total; n++) {
        if (n === 0) {
            let addRow = document.createElement('tr');
            addRow.setAttribute('id', `playerRow-${currentPlayers[index].id}`);

            table.appendChild(addRow);

        }else if (n === 1) {
            let addHeaderCell = document.createElement('th');
            let addHeaderCellText = document.createTextNode(currentPlayers[index].name);

            let row = document.getElementById(`playerRow-${currentPlayers[index].id}`);
            addHeaderCell.appendChild(addHeaderCellText);
            row.appendChild(addHeaderCell);
        } else if (n <= total - 1){
            let addDataCell = document.createElement('td');
            addDataCell.setAttribute('id', `playerId:${currentPlayers[index].id}-cellNumber:${n-2}`)
            let addDataCellText = document.createTextNode('');

            let row = document.getElementById(`playerRow-${currentPlayers[index].id}`);
            addDataCell.appendChild(addDataCellText);
            row.appendChild(addDataCell);
        } else {
            let addDataCell = document.createElement('td');
            addDataCell.setAttribute('id', `playerId:${currentPlayers[index].id}-totalCell`)
            let addDataCellText = document.createTextNode('');

            let row = document.getElementById(`playerRow-${currentPlayers[index].id}`);
            addDataCell.appendChild(addDataCellText);
            row.appendChild(addDataCell);
        };
    };

    function renderScoreInput(index) {
        let scoreForm = document.createElement('form');
        scoreForm.setAttribute('data', 'score-from-input');
        scoreForm.setAttribute('id', `${currentPlayers[index].id}`);

        let scoreLabel = document.createElement('label');
        let scoreLableText = document.createTextNode('Input Score: ');
        scoreLabel.appendChild(scoreLableText);

        let scoreInput = document.createElement('input');
        scoreInput.setAttribute('type', 'text');
        scoreInput.setAttribute('id', `scoreInput-${currentPlayers[index].id}`)
        scoreInput.setAttribute('data', index);


        let scoreSubmit = document.createElement('input');
        scoreSubmit.setAttribute('type', 'submit');
        scoreSubmit.setAttribute('value', 'Submit');
        scoreSubmit.setAttribute('id', `submitScore-${currentPlayers[index].id}`)

        scoreLabel.appendChild(scoreInput);
        scoreLabel.appendChild(scoreSubmit);
        scoreForm.appendChild(scoreLabel);
        table.appendChild(scoreForm);
    };

    renderScoreInput(index);
};

function renderPlayerScore(scoreValue, index) {
    let totalScore = 0;

    let scoreIndex = currentPlayers[index].score.length - 1;
    let selectedCell = document.getElementById(`playerId:${currentPlayers[index].id}-cellNumber:${scoreIndex}`);

    selectedCell.innerHTML = scoreValue;

    let totalCell = document.getElementById(`playerId:${currentPlayers[index].id}-totalCell`);

    for ( n = 0; n < currentPlayers[index].score.length; n++) {
        totalScore += Number(currentPlayers[index].score[n]);
    }
    totalCell.innerHTML = totalScore;
};