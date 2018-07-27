"use strict";

//Global array for holding all questions
//I really wish we had classes that I could construct
const QuestionList = [
    // Question 1
    {
        question: "Question 1: What is one difference between prokaryotic and eukaryotic cells?",
        answers: [
            //Question 1's Answers
            "Eukaryotic cells are smaller than prokaryotic cells.",
            "Eukaryotic cells contain a nucleus; prokaryotic cells do not.",
            "Prokaryotic cells contain a nuclear membrane within their cytoplasm.",
            "Eukaryotic cells lack a plasma membrane."
        ],
        correctAnswer: 1,
    },
    //Question 2
    {
        question: "Question 2: Which organelle is responsible for cellular respiration?",
        answers: [
            "Mitochondria",
            "Chloroplast",
            "Ribosome",
            "Endoplasmic Reticulum",
        ],
        correctAnswer: 0,
    },
    //Question 3
    {
        question: "Question 3: Which of the following organelles are involved in protein synthesis?",
        answers: [
            "Cell Wall",
            "Lysosome",
            "Flagella",
            "Ribosome",
        ],
        correctAnswer: 3,
    },
    //Question 4
    {
        question: "Question 4: What is the primary function of cilia and flagella?",
        answers:[
            "Protein Synthesis",
            "Movement",
            "Photosynthesis",
            "Nutrient Transport",
        ],
        correctAnswer: 1,
    },
    //Question 5
    {
        question: "Question 5: How are the reactants and products of photosynthesis and cell respiration related?",
        answers: [
            "Photosynthesis has only reactants; cell respiration has only products.",
            "The products of cell respiration are the reactants of photosynthesis.",
            "The reactants of photosynthesis are the reactants of cell respiration.",
            "They are not related.",
        ],
        correctAnswer: 1,
    },
    //Question 6
    {
        question: "Question 6: When a blood cell was placed in a solution, it began to swell. Because of this, we know that the solution is most likely —",
        answers: [
            "Isotonic",
            "Hypotonic",
            "Hyptertonic",
            "Lysotonic",
        ],
        correctAnswer: 1,
    },
    //Question 7
    {
        question: "Question 7: Which of the following transport methods require energy?",
        answers: [
            "Osmosis",
            "Diffusion",
            "Facilitated Diffusion",
            "Active Transport",
        ],
        correctAnswer: 3,
    },
    //Question 8
    {
        question: "Question 8: Which category of biomolecules do most enzymes belong to?",
        answers: [
            "Nucleic Acids",
            "Lipids",
            "Proteins",
            "Carbohydrates",
        ],
        correctAnswer: 2,
    },
    //Question 9
    {
        question: "Question 9: What evidence involving mitochondria supports the endosymbiotic theory?",
        answers: [
            "Mitochondria contain their own DNA.",
            "Mitochondria are bacteria.",
            "Mitochondria kill invaders.",
            "Mitochondria are found in every cell.",
        ],
        correctAnswer: 0,
    },
    //Question 10
    {
        question: "Question 10: The plasma membrane is selectively permeable. This means that —",
        answers: [
            "glucose cannot enter the cell.",
            "the plasma membrane must be very thick.",
            "anything can pass into or out of a cell",
            "the plasma membrane regulates the passage of material into or out of the cell.",

        ],
        correctAnswer:3,
    },
];

//=======================================================
//Global Variables
//=======================================================

//current question index (always start at 0 - question 1)
let currentQuestion = 0;
//Number of questions that we've missed
let missedQuestions = 0;
//Number of questions that we've gotten correct
let correctQuestions = 0;

//String to insert finished icon
let finishedIcon = "<img class=\"headingimg\" src=\"http://files.softicons.com/download/toolbar-icons/status-icons-set-by-iconleak/png/256x256/12.png\" alt=\" Finished Icon\">";



//Builds an individual answer string
function buildAnswer(questionIndex, answerIndex)
{
    return  `<div class=\"answer\">
    <input type=\"radio\" id=\"${answerIndex}\" value=\"${answerIndex}\" name =\"question\" required>
    <label for=\"${answerIndex}\">${QuestionList[questionIndex].answers[answerIndex]}</label>
</div>`;


}

//Builds and returns our button string
function buildButton(buttonClass, buttonText)
{
    return `<button type=\"Submit\" class=\"${buttonClass}\">${buttonText}</button>`;
}

function chooseHeadingClass(score)
{
    //Failing grade
    if( score < 60)
    {
        //class with red font
        return "redtext";
    }
    //If our score is a 60 or a 70%
    else if(score >= 60 && score < 80)
    {
        return "yellowtext";
    }
    //If our student scored an 80 or 90%
    return "greentext";
}


//Function that creates our ending screen to display the user's score and let them restart
function buildEndingScreen()
{
    let score = correctQuestions / QuestionList.length * 100;
    let headingClass = chooseHeadingClass(score);

    let formString = `<p>Your score is:</p><h2 class=\"${headingClass}\">${score}%</h2>`;

    formString += buildButton("js-begin-button", "Try Again?");
    return formString;
}

//Function that builds all answers and adds the check button
function buildQuestionForm(questionNumber)
{
    //Blank string we will return and insert into our form
    const questionArray = [];
    let formString = `<form class=/"js-question-form/">`;

    //Loop through all answers for the given question number
    for (let i = 0; i < QuestionList[questionNumber].answers.length; i++)
    {
        //Call our build answer and add the string to our array
        questionArray.push(buildAnswer(questionNumber, i));
    }

    //Join our question array together into a single string
    formString += questionArray.join("");

    //Append answers to our button here
    formString += buildButton("js-check-button", "Check Answer");

    formString += `</form>`;

    //This string will go into refreshForm
    return formString
}

function buildCheckAnswerForm(questionNumber)
{
    let answerIndex = QuestionList[questionNumber].correctAnswer;
    let formString = `<p>The correct answer is: \"${QuestionList[questionNumber].answers[answerIndex]}\"</p>`;

    formString += buildButton("js-next-button", "Next");
    return formString;
}

function buildQuestionCount()
{

    return `<p><strong>Question:</strong> ${currentQuestion + 1}/${QuestionList.length}</p>`;
}

function buildScore()
{
    return `<strong>Score:</strong> ${correctQuestions}/${missedQuestions}</p>`;
}

//Menu displayed after we check our answer
function buildCheckAnswerMenu(chosenAnswer)
{
    //Update our heading and score
    if(parseInt(chosenAnswer, 10) === QuestionList[currentQuestion].correctAnswer)
    {
        refreshHeading("<img class=\"headingimg\" src=\"http://www.clker.com/cliparts/9/I/e/1/i/B/dark-green-check-mark-hi.png\" alt=\" Correct Icon\"> Correct!");
        correctQuestions ++;
    }
    else
    {
        refreshHeading("<img class=\"headingimg\" src=\"http://backgroundcheckall.com/wp-content/uploads/2017/12/red-x-icon-transparent-background-6.png\" alt=\" Incorrect Icon\"> Incorrect.");
        missedQuestions ++;
    }

    refreshQuestionContainer(buildCheckAnswerForm(currentQuestion));

}
//=======================================================
//Form and Heading updates
//=======================================================

function clearQuestionCount()
{
    $(".js-question-count").html("");
}

function clearScore()
{
    $(".js-score").html("");
}

function refreshScore(content)
{
    $(".js-score").html(content);
}

function refreshQuestionCount(content)
{
    $(".js-question-count").html(content);
}

function refreshHeading(content)
{
    //Changes our heading to our new question or explantion
    $(".js-question-heading").html(content);
}

function refreshQuestionContainer(content)
{
    $(".js-question-container").html(content);
}

//=======================================================
//Button Events
//=======================================================

//Button clicked on our home screen - begin
function handleBeginButtonClick()
{
    $(".js-question-container").on('click', `.js-begin-button`, function(event)
    {
        // Stop our button from performing its regular duty!
        event.preventDefault();

        //Reset our counters (to be safe)
        currentQuestion = 0;
        missedQuestions = 0;
        correctQuestions = 0;
        
        //Build the first question and refresh the form with it.
        refreshHeading(QuestionList[currentQuestion].question);
        refreshQuestionContainer(buildQuestionForm(currentQuestion));
        refreshQuestionCount(buildQuestionCount());
        refreshScore(buildScore());
    });

}

//Present the next question
function handleNextButtonClick()
{
    $(".js-question-container").on('click', `.js-next-button`, function(event)
    {
        // Stop our button from performing its regular duty!
        event.preventDefault();
        
        currentQuestion ++;
        if(currentQuestion < QuestionList.length)
        {
            refreshQuestionCount(buildQuestionCount());
            refreshScore(buildScore());
            //Build the first question and refresh the form with it.
            refreshHeading(QuestionList[currentQuestion].question);
            refreshQuestionContainer(buildQuestionForm(currentQuestion));
        }
        else
        {
            //Handle code to display finished screen here
            refreshQuestionContainer(buildEndingScreen);
            refreshHeading(`${finishedIcon} You have completed the quiz! ${finishedIcon}`);
            clearQuestionCount();
            clearScore();
        }
    });
}

//Check Answer button at the bottom of each question
function handleCheckButtonClick()
{
    $(".js-question-container").on('submit', function(event)
    {
        // Stop our button from performing its regular duty!
        event.preventDefault();        

        //Build our new menu
        buildCheckAnswerMenu($('input:checked').val());
        refreshScore(buildScore());

    });
}


//=======================================================
//Binding Function
//=======================================================

function LoadQuiz()
{

    handleBeginButtonClick();
    handleNextButtonClick();
    handleCheckButtonClick();
}

$(LoadQuiz);