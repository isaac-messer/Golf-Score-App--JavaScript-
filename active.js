const inputForm = document.querySelector('[data-create-form]')
const formSubmitButton = document.querySelector('[data-from-submit-button]');
const scoreCardContainer = document.querySelector('[data-score-card-container]')

let courseSelectDropdown = document.querySelector('[data-course-dropdown]');
let playerNameInput = document.querySelector('[data-player-name]');
let playerSkillDropdown = document.querySelector('[data-player-Skill-dropdown]');
let currentPlayerName = playerName;

// Gets User Input Data
function onCourseId() {
    let newCourseId = courseSelectDropdown.value
    return newCourseId;
}
    function onCourseName() {
        let newCourseName = courseSelectDropdown.options[courseSelectDropdown.selectedIndex].text;
        return newCourseName;
    }
        function onPlayerName() {
            let newPlayerName = playerNameInput.value;
            return newPlayerName;
        }
            function onPlayerSkill() {
                let newPlayerSkill = playerSkillDropdown.options[playerSkillDropdown.selectedIndex].text;
                return newPlayerSkill;
            }

// Prevents page reload, and runs RenderFunctions. As well as saves user info to local storage 
inputForm.addEventListener('submit', function(event) {
    event.preventDefault();
})
    formSubmitButton.addEventListener('click', function() {
        console.log('Form Submitted');

        localStorage.setItem('playerName', onPlayerName());
        localStorage.setItem('playerSkill', onPlayerSkill());
        localStorage.setItem('courseName', onCourseName());
        localStorage.setItem('courseId', onCourseId());

        setTimeout(window.location.href = 'index.html', 500)
    })

// These RenderFunctions inserts user input data onto Document

function renderPage() {
    renderHeadingPlayerInfo(localStorage.getItem('playerName'), localStorage.getItem('playerSkill'));
    renderHeadingPlayerInfo(localStorage.getItem('courseName'), localStorage.getItem('courseId'));
}
function renderHeadingPlayerInfo(playerName, playerSkillLevel) {
    console.log(playerName, playerSkillLevel);
    let playerHeader = document.createElement('h1');
    let playerHeaderText = document.createTextNode(`${playerName} - ${playerSkillLevel}`);

    playerHeader.appendChild(playerHeaderText);
    scoreCardContainer.appendChild(playerHeader);
}
    function renderHeadingCourseInfo(courseName, courseId) {
        console.log(courseName, courseId);
        let courseHeader = document.createElement('h3');
        let courseHeaderText = document.createTextNode(`${courseName}: id-${courseId}`);

        courseHeader.appendChild(courseHeaderText);
        scoreCardContainer.appendChild(courseHeader);
    }