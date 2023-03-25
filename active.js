const inputForm = document.querySelector('[data-create-form]')
const formSubmitButton = document.querySelector('[data-from-submit-button]');

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
        function onPlayerName() {
            let newPlayerName = playerNameInput.value;
            // console.log(newPlayerName);
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
                    let newPlayerId = Date.now();
                    // console.log(newPlayerId);
                    return newPlayerId;
                }


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


// Prevents page reload, and saves user info to local storage 
inputForm.addEventListener('submit', function(event) {
    event.preventDefault();
})
    formSubmitButton.addEventListener('click', function() {
        addPlayer(onPlayerName(), onPlayerSkill(), onPlayerSkillValue(), onPlayerId());
        selectedCourseInfo(onCourseName(), onCourseId());
        
        console.log('Form Submitted');
        console.log(currentPlayers);
        console.log(currentCourse);

        localStorage.setItem('activePlayers', JSON.stringify(currentPlayers));
        localStorage.setItem('activeCourse', JSON.stringify(currentCourse));

        setTimeout(window.location.href = 'index.html', 500)
    })