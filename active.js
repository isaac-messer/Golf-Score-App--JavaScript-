const inputForm = document.querySelector('[data-create-form]')
const formSubmitButton = document.querySelector('[data-from-submit-button]');

let numberOfPlayers = document.querySelector('[data-number-of-players]');
let nameFormContainer = document.querySelector('[data-player-names-input]')
let courseSelectDropdown = document.querySelector('[data-course-dropdown]');
let playerNameInput = document.querySelector('[data-player-name]');
let playerSkillDropdown = document.querySelector('[data-player-Skill-dropdown]');

let currentPlayers = []
let currentCourse = null;

// Gets User Data from input form on userInfo.html
function onCourseId() {
    let newCourseId = courseSelectDropdown.value
    // console.log(newCourseId);
    return newCourseId;
}
function onCourseName() {
    let newCourseName = courseSelectDropdown.options[courseSelectDropdown.selectedIndex].text;
    // console.log(newCourseName);
    return newCourseName;
}
function onNumberOfPlayers() {
    let newNumberOfPlayers = numberOfPlayers.value;
    // console.log(numberOfPlayers);
    return newNumberOfPlayers;
}
function onPlayerName(index) {
    let newPlayerName = document.getElementById(`playerNameInput-${index}`).value;
    console.log(newPlayerName);
    return newPlayerName;
}
function onPlayerSkill() {
    let newPlayerSkill = playerSkillDropdown.options[playerSkillDropdown.selectedIndex].text;
    // console.log(newPlayerSkill);
    return newPlayerSkill;
}
function onPlayerSkillValue() {
    let newPlayerSkillValue = playerSkillDropdown.value;
    // console.log(newPlayerSkillValue);
    return newPlayerSkillValue
}
function onPlayerId() {
  let newPlayerId = ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
  console.log(newPlayerId);
  return newPlayerId;
}

numberOfPlayers.addEventListener('change', function() {
    nameFormContainer.innerHTML = "";
    renderNameInputForm(onNumberOfPlayers());
})

// Inserts form information into arrays from easier organization for multiple players
function addPlayer(playerName, playerSkill, playerSkillValue, playerId) {
    const newPlayer = {
        name: playerName,
        skill: playerSkill,
        skillValue: playerSkillValue,
        id: playerId,
        score: Array(0).fill(0),
    }
    
    currentPlayers.push(newPlayer);
}

function selectedCourseInfo(courseName, courseId) {
    const selectedCourse = {
        name: courseName,
        id: courseId,
    }

    currentCourse = selectedCourse;
}

function renderNameInputForm (number) {
    let numberOfPlayers = number;
            
    let playerForm = document.createElement('form');
    for ( n = 0; n <= numberOfPlayers; n++ ) {
        let playerLabel = document.createElement('label');
        let playerLabelText = document.createTextNode(`Player ${playerPosition(n)}`);

        let playerInput = document.createElement('input');
        playerInput.setAttribute('id', `playerNameInput-${n}`)
        playerInput.setAttribute('type', 'text');
        playerInput.setAttribute('placeholder', '-Enter Name-');

        let inputBreak = document.createElement('br');

        playerLabel.appendChild(playerLabelText);
        playerLabel.appendChild(inputBreak);
        playerLabel.appendChild(playerInput);
        playerForm.appendChild(playerLabel);
        playerForm.appendChild(inputBreak);
    };
    function playerPosition(n) {
        if (n === 0) {
            return 'One:';
        } else if (n === 1) {
            return 'Two:';
        } else if (n === 2) {
            return 'Three:'
        } else {
            return 'Four:'
        };
    };
    nameFormContainer.appendChild(playerForm);

}


// Prevents page reload, and saves user info to local storage 
inputForm.addEventListener('submit', function(event) {
    event.preventDefault();
})
    formSubmitButton.addEventListener('click', function() {
        for (n = 0; n <= onNumberOfPlayers(); n++) {
            addPlayer(onPlayerName(n), onPlayerSkill(), onPlayerSkillValue(), onPlayerId());
        };
        selectedCourseInfo(onCourseName(), onCourseId());
        
        console.log('Form Submitted');
        console.log(currentPlayers);
        console.log(currentCourse);

        localStorage.setItem('activePlayers', JSON.stringify(currentPlayers));
        localStorage.setItem('activeCourse', JSON.stringify(currentCourse));

        setTimeout(window.location.href = 'index.html', 500)
    })