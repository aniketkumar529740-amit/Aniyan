/* ==========================================
   ANIYAN v2
   FOUNDATION
========================================== */

/* ==========================================
   SCREENS
========================================== */

const homeScreen =
document.getElementById("homeScreen");

const gkScreen =
document.getElementById("gkScreen");

const reasoningScreen =
document.getElementById("reasoningScreen");

const questionScreen =
document.getElementById("questionScreen");

/* ==========================================
   BUTTONS
========================================== */

const gkModeBtn =
document.getElementById("gkModeBtn");

const reasoningModeBtn =
document.getElementById("reasoningModeBtn");

const startGK =
document.getElementById("startGK");

const startReasoning =
document.getElementById("startReasoning");

const resetBtn =
document.getElementById("resetBtn");

const backButtons =
document.querySelectorAll(".back-btn");

/* ==========================================
   STATS
========================================== */

const highestLevelElement =
document.getElementById("highestLevel");

const currentStreakElement =
document.getElementById("currentStreak");

const totalAttemptsElement =
document.getElementById("totalAttempts");

const gkCurrentLevel =
document.getElementById("gkCurrentLevel");

const reasoningCurrentLevel =
document.getElementById("reasoningCurrentLevel");

/* ==========================================
   QUESTION ELEMENTS
========================================== */

const levelTitle =
document.getElementById("levelTitle");

const questionText =
document.getElementById("questionText");

const questionCounter =
document.getElementById("questionCounter");

const checkpointInfo =
document.getElementById("checkpointInfo");

const progressFill =
document.getElementById("progressFill");

const progressPercent =
document.getElementById("progressPercent");

const optionButtons =
document.querySelectorAll(".option-btn");

/* ==========================================
   LEVEL GRID
========================================== */

const gkLevelGrid =
document.getElementById("gkLevelGrid");

const reasoningLevelGrid =
document.getElementById("reasoningLevelGrid");

/* ==========================================
   MODALS
========================================== */

const successModal =
document.getElementById("successModal");

const failureModal =
document.getElementById("failureModal");

const gameCompleteModal =
document.getElementById("gameCompleteModal");

const nextLevelBtn =
document.getElementById("nextLevelBtn");

const retryBtn =
document.getElementById("retryBtn");

const victoryBtn =
document.getElementById("victoryBtn");

const successMessage =
document.getElementById("successMessage");

const failureMessage =
document.getElementById("failureMessage");

/* ==========================================
   STORAGE
========================================== */

const STORAGE_KEY =
"aniyanData";

/* ==========================================
   DEFAULT SAVE DATA
========================================== */

const defaultData = {

    highestGK:1,
    highestReasoning:1,

    currentGK:1,
    currentReasoning:1,

    currentStreak:0,

    bestStreak:0,

    totalAttempts:0,

    totalCorrect:0
};

/* ==========================================
   GAME STATE
========================================== */

let currentMode = "";

let currentLevel = 1;

let currentQuestionIndex = 0;

let currentQuestions = [];

/* ==========================================
   LOCAL STORAGE
========================================== */

function getData(){

    const saved =
    localStorage.getItem(
        STORAGE_KEY
    );

    if(!saved){

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(defaultData)
        );

        return {...defaultData};
    }

    return JSON.parse(saved);
}

function saveData(data){

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(data)
    );
}

/* ==========================================
   LOAD STATS
========================================== */

function loadStats(){

    const data = getData();

    highestLevelElement.textContent =
    Math.max(
        data.highestGK,
        data.highestReasoning
    );

    currentStreakElement.textContent =
    data.currentStreak;

    totalAttemptsElement.textContent =
    data.totalAttempts;

    gkCurrentLevel.textContent =
    data.currentGK;

    reasoningCurrentLevel.textContent =
    data.currentReasoning;
}

/* ==========================================
   SCREEN MANAGEMENT
========================================== */

function hideAllScreens(){

    homeScreen.classList.add("hidden");

    gkScreen.classList.add("hidden");

    reasoningScreen.classList.add("hidden");

    questionScreen.classList.add("hidden");
}

function showHome(){

    hideAllScreens();

    homeScreen.classList.remove(
        "hidden"
    );

    loadStats();

    buildGKGrid();

    buildReasoningGrid();
}

function showGKMode(){

    hideAllScreens();

    gkScreen.classList.remove(
        "hidden"
    );

    buildGKGrid();
}

function showReasoningMode(){

    hideAllScreens();

    reasoningScreen.classList.remove(
        "hidden"
    );

    buildReasoningGrid();
}

/* ==========================================
   CHECKPOINT SYSTEM
========================================== */

function getCheckpointLevel(level){

    if(level < 10){
        return 1;
    }

    return Math.floor(level / 10) * 10;
}

/* ==========================================
   LEVEL GRID BUILDERS
========================================== */

function buildGKGrid(){

    const data =
    getData();

    gkLevelGrid.innerHTML = "";

    for(
        let level = 1;
        level <= 50;
        level++
    ){

        const button =
        document.createElement(
            "button"
        );

        button.classList.add(
            "level-btn"
        );

        /* Completed */

        if(
            level <
            data.currentGK
        ){

            button.classList.add(
                "level-completed"
            );

            button.innerHTML =
            "✔<br>" + level;
        }

        if(
            level === 10 ||
            level === 20 ||
            level === 30 ||
            level === 40 ||
            level === 50
        ){
            button.classList.add(
                "milestone-level"
            );
        }

        /* Current */

        else if(
            level ===
            data.currentGK
        ){

            button.classList.add(
                "level-current"
            );

            button.innerHTML =
            "▶<br>" + level;
        }

        /* Locked */

        else{

            button.classList.add(
                "level-locked"
            );

            button.innerHTML =
            "🔒";
        }

        /* Click Event */

        if(
            level <=
            data.currentGK
        ){

            button.addEventListener(
                "click",
                ()=>{

                    currentMode =
                    "gk";

                    currentLevel =
                    level;

                    startLevel();
                }
            );
        }

        gkLevelGrid.appendChild(
            button
        );
    }
}

/* ==========================================
   REASONING GRID
========================================== */

function buildReasoningGrid(){

    const data =
    getData();

    reasoningLevelGrid.innerHTML =
    "";

    for(
        let level = 1;
        level <= 50;
        level++
    ){

        const button =
        document.createElement(
            "button"
        );

        button.classList.add(
            "level-btn"
        );

        if(
            level <
            data.currentReasoning
        ){

            button.classList.add(
                "level-completed"
            );

            button.innerHTML =
            "✔<br>" + level;
        }

        else if(
            level ===
            data.currentReasoning
        ){

            button.classList.add(
                "level-current"
            );

            button.innerHTML =
            "▶<br>" + level;
        }

        else{

            button.classList.add(
                "level-locked"
            );

            button.innerHTML =
            "🔒";
        }

        if(
            level <=
            data.currentReasoning
        ){

            button.addEventListener(
                "click",
                ()=>{

                    currentMode =
                    "reasoning";

                    currentLevel =
                    level;

                    startLevel();
                }
            );
        }

        reasoningLevelGrid.appendChild(
            button
        );
    }
}

/* ==========================================
   EVENTS
========================================== */

gkModeBtn.addEventListener(
    "click",
    showGKMode
);

reasoningModeBtn.addEventListener(
    "click",
    showReasoningMode
);

backButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            showHome
        );

    }
);

/* ==========================================
   START BUTTONS
========================================== */

startGK.addEventListener(
    "click",
    ()=>{

        currentMode =
        "gk";

        currentLevel =
        getData().currentGK;

        startLevel();
    }
);

startReasoning.addEventListener(
    "click",
    ()=>{

        currentMode =
        "reasoning";

        currentLevel =
        getData().currentReasoning;

        startLevel();
    }
);

/* ==========================================
   RESET PROGRESS
========================================== */

resetBtn.addEventListener(
    "click",
    ()=>{

        const answer =
        confirm(
            "Reset all progress?"
        );

        if(!answer){

            return;
        }

        localStorage.removeItem(
            STORAGE_KEY
        );

        location.reload();
    }
);

/* ==========================================
   START LEVEL
========================================== */

function startLevel(){

    hideAllScreens();

    questionScreen.classList.remove(
        "hidden"
    );

    currentQuestionIndex = 0;

    /* Load Questions */

    if(currentMode === "gk"){

        currentQuestions =
        gkLevels[
            currentLevel - 1
        ].questions;

    }else{

        currentQuestions =
        reasoningLevels[
            currentLevel - 1
        ].questions;
    }

    renderQuestion();
}

/* ==========================================
   RENDER QUESTION
========================================== */

function renderQuestion(){

    const question =
    currentQuestions[
        currentQuestionIndex
    ];

    /* Level */

    levelTitle.textContent =
    "Level " + currentLevel;

    /* Checkpoint */

    checkpointInfo.textContent =
    "Checkpoint: " +
    getCheckpointLevel(
        currentLevel
    );

    /* Counter */

    questionCounter.textContent =
    "Question " +
    (currentQuestionIndex + 1) +
    " / " +
    currentQuestions.length;

    /* Progress */

    const progress =
    (
        (currentQuestionIndex + 1)
        /
        currentQuestions.length
    ) * 100;

    progressFill.style.width =
    progress + "%";

    progressPercent.textContent =
    Math.round(progress) + "%";

    /* Question */

    questionText.textContent =
    question.question;

    /* Options */

    optionButtons.forEach(
        (button,index)=>{

            button.classList.remove(
                "correct"
            );

            button.classList.remove(
                "wrong"
            );

            button.disabled = false;

            button.textContent =
            question.options[index];
        }
    );
}

/* ==========================================
   HANDLE ANSWER
========================================== */

function handleAnswer(index){

    const question =
    currentQuestions[
        currentQuestionIndex
    ];

    const correctAnswer =
    question.answer;

    /* Correct */

    if(index === correctAnswer){

        optionButtons[index]
        .classList.add(
            "correct"
        );

        optionButtons.forEach(
            button=>{

                button.disabled =
                true;
            }
        );

        setTimeout(()=>{

            currentQuestionIndex++;

            if(
                currentQuestionIndex >=
                currentQuestions.length
            ){

                levelComplete();

            }else{

                renderQuestion();
            }

        },500);

        return;
    }

    /* Wrong */

    optionButtons[index]
    .classList.add(
        "wrong"
    );

    optionButtons[
        correctAnswer
    ].classList.add(
        "correct"
    );

    optionButtons.forEach(
        button=>{

            button.disabled =
            true;
        }
    );

    setTimeout(()=>{

        levelFailed();

    },900);
}

/* ==========================================
   OPTION EVENTS
========================================== */

optionButtons.forEach(
    (button,index)=>{

        button.addEventListener(
            "click",
            ()=>{

                handleAnswer(
                    index
                );
            }
        );

    }
);


/* ==========================================
   LEVEL COMPLETE
========================================== */

function levelComplete(){

    const data =
    getData();

    /* Update Stats */

    data.currentStreak++;

    data.totalCorrect++;

    /* ==================================
       GK MODE
    ================================== */

    if(currentMode === "gk"){

        /* Finished All 50 Levels */

        if(currentLevel >= 50){

            data.highestGK = 50;
            data.currentGK = 50;

            saveData(data);

            loadStats();

            gameCompleteModal
            .classList.remove(
                "hidden"
            );

            return;
        }

        /* Unlock Next Level */

        data.currentGK =
        currentLevel + 1;

        if(
            currentLevel + 1 >
            data.highestGK
        ){

            data.highestGK =
            currentLevel + 1;
        }
    }

    /* ==================================
       REASONING MODE
    ================================== */

    else{

        if(currentLevel >= 50){

            data.highestReasoning =
            50;

            data.currentReasoning =
            50;

            saveData(data);

            loadStats();

            gameCompleteModal
            .classList.remove(
                "hidden"
            );

            return;
        }

        data.currentReasoning =
        currentLevel + 1;

        if(
            currentLevel + 1 >
            data.highestReasoning
        ){

            data.highestReasoning =
            currentLevel + 1;
        }
    }

    saveData(data);

    loadStats();

    successMessage.textContent =
    "Level " +
    (currentLevel + 1) +
    " Unlocked";

    successModal.classList.remove(
        "hidden"
    );
}

/* ==========================================
   LEVEL FAILED
========================================== */

function levelFailed(){

    const data =
    getData();

    data.totalAttempts++;

    data.currentStreak = 0;

    const checkpoint =
    getCheckpointLevel(
        currentLevel
    );

    /* GK */

    if(currentMode === "gk"){

        data.currentGK =
        checkpoint;
    }

    /* REASONING */

    else{

        data.currentReasoning =
        checkpoint;
    }

    saveData(data);

    loadStats();

    failureMessage.textContent =
    "Wrong Answer!\n" +
    "Back To Level " +
    checkpoint;

    failureModal.classList.remove(
        "hidden"
    );
}

/* ==========================================
   SUCCESS MODAL BUTTON
========================================== */

nextLevelBtn.addEventListener(
"click",
()=>{

    successModal.classList.add(
        "hidden"
    );

    const data = getData();

    if(currentMode === "gk"){

        currentLevel =
        data.currentGK;

    }else{

        currentLevel =
        data.currentReasoning;
    }

    startLevel();

});

/* ==========================================
   FAILURE MODAL BUTTON
========================================== */

retryBtn.addEventListener(
    "click",
    ()=>{

        failureModal.classList.add(
            "hidden"
        );

        showHome();
    }
);

/* ==========================================
   FINAL VICTORY BUTTON
========================================== */

victoryBtn.addEventListener(
    "click",
    ()=>{

        gameCompleteModal
        .classList.add(
            "hidden"
        );

        showHome();
    }
);

/* ==========================================
   INITIAL LOAD
========================================== */

loadStats();

buildGKGrid();

buildReasoningGrid();

showHome();






// Service Worker Registration

if ("serviceWorker" in navigator) {

    navigator.serviceWorker
    .register("./sw.js")

    .then(() => {
        console.log("SW Registered");
    })

    .catch((error) => {
        console.log(error);
    });

}


// achievement system

if(currentLevel === 10){
   showAchievement("Explorer");
}

if(currentLevel === 20){
   showAchievement("Thinker");
}

if(currentLevel === 30){
   showAchievement("Strategist");
}

if(currentLevel === 40){
   showAchievement("Mastermind");
}

if(currentLevel === 50){
   showAchievement("Legend");
}