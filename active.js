const courseSelectedSubmitButton = document.querySelector('[data-course-select-submit-button]')

let courseSelectDropdown = document.querySelector('[data-course-dropdown]');


let coursePlaying = null;
let players = [];

courseSelectedSubmitButton.addEventListener('click', function () {
    onCourseSelected();
})

function onCourseSelected () {
    let courseId = courseSelectDropdown.options[courseSelectDropdown.selectedIndex].value;
    let courseName = courseSelectDropdown.options[courseSelectDropdown.selectedIndex].text;
    console.log(`Selected Couse is: ${courseName}- ${courseId}`)
}
courseSelectDropdown.onchange = onCourseSelected;

async function selectedCourseToPlay(courseId) {
    const url = `https://exquisite-pastelito-9d4dd1.netlify.app/golfapi/course${courseId}.json`;
    coursePlaying = await

    makeHttpGetRequest(url);
}

async function makeHttpGetRequest(url) {
    const response = await fetch(url);

    return response.json();
}



function handleClickButtonToCreatePlayer() {
    const playerName = document.querySelector(Need an html element).value;
    const playerSkillLevel = document.querySelector(Need an html element).value;

    createPlayer({playerName, playerSkillLevel});
    renderScoreCardUI();
}

function createPlayer({playerName, playerSkillLevel}) {
    const newPlayer = {
        name: playerName,
        skill: playerSkillLevel,
        scores: Array(18).fill(0)
    };
    players.push(newPlayer);
}

function renderScoreCardUI() {
    
}