// [] - create a list
// {} - create a dictionary that stores key-value pairs

const database1 = [
  {
    question : "Who is good?",
    options : ["me", "you","idk","depends"],
    answer : "depends"         
  },
    
  {
    question : "Should Bob share his cupcakes with the needy?",
    options : ["idk", "he should","no","yes"],
    answer : "he should"         
  },

  {
    question : "What is the sentence for the worst crime ever?",
    options : ["Death", "Prison forever","Fine $500B","All of them"],
    answer : "All of them"         
  },

  
  
  {
    question : "Will AI rule Earth?",
    options : ["idk", "NO","no","yes"],
    answer : "NO"         
  },



  {
    question : "What's this? A",
    options :["idk", "unfinished pacman"," the letter A","white"],
    answer : "idk"         
  },
  
  
  {
    question : "Was this quiz important to you?",
    options :["no", "yes","doesn't matter","i don't care"],
    answer : "doesn't matter"         
  },       
];

 
 
 
const DropDown = document.getElementById("drop-down");
const StartButton = document.getElementById ("start-btn");
const TimerText = document.getElementById ("timer-text");
const QuestionLabel = document.getElementById("question");
const OptionBox = document.getElementById("option-box");
const ProgressBarFill = document.getElementById("progress-bar-fill");
const ScoreLabel = document.getElementById("score-label");
const FeedbackLabel = document.getElementById("feedback-label");
const BgmDropdown = document.getElementById("bgm-options");
const BgmButton = document.getElementById("music-btn");

let CurrentSong = null;
let IsBgmPlaying = false;

//what happens when people select a soundtrack
BgmDropdown.addEventListener("change", () => {
  const SelectedSong = BgmDropdown.value;

  //if the song cant be found stop function 
  if(!SelectedSong) return;


  //stop and reset song if it exists
  if(CurrentSong)
  {
    CurrentSong.pause()
    CurrentSong.currentTime = 0;
  }

  
  //load and play the SelectedSong
  CurrentSong = new Audio(SelectedSong);
  CurrentSong.loop = true;
  CurrentSong.volume = 0.5;
  CurrentSong.play();
  IsBgmPlaying = true;
  BgmButton.textContent = "🔊 Music On";
  BgmButton.style.backgroundColor = "green";
});


BgmButton.addEventListener("click", () => {
  if(IsBgmPlaying)
  {
    CurrentSong.pause();
    BgmButton.textContent = "🔇Music Off";
    BgmButton.style.backgroundColor = "crimson";
    IsBgmPlaying = false;
  } else
  {
    CurrentSong.play();
    BgmButton.textContent = "🔊 Music On";
    BgmButton.style.backgroundColor = "green";
    IsBgmPlaying = true;
  }
});








StartButton.addEventListener("click",StartQuiz);

let timer;
let question_index = 0;
let score = 0;

function StartQuiz()
{
  StartButton.style.display ='none';
  DropDown.style.display = 'none';
  LoadQuestion();
}

function LoadQuestion() 
{
  // check if there're question in the database that are yet to be loaded
  if(question_index < database1.length)
  {
    // clear feedback label
    FeedbackLabel.textContent = "";

    // reset timer
    TimerText.textContent = 15;

    //update the progress bar
    ProgressBarFill.style.width = `${ ((question_index + 1) / database1.length) * 100 }%`;

    // load a question from the database
    const CurrentQuestionSet = database1[question_index];
    QuestionLabel.textContent = CurrentQuestionSet.question;

    //erase previous option buttons 
    OptionBox.innerHTML = '';

    
    //clone all option buttons associated to a question
    CurrentQuestionSet.options.forEach((item) => {
      const button = document.createElement('button');
      button.textContent = item;
      button.classList.add('option-btn');
      OptionBox.appendChild(button);
      
      button.addEventListener('click', () => {
        DisableAllOptionButtons();
        CheckAnswer(item);
      });
    });
    // turn on the timer
    timer = setInterval(() => {
      //reduce timer text by 1
      TimerText.textContent =  parseInt(TimerText.textContent) - 1;

      if(parseInt(TimerText.textContent) === 0)
      {
        clearInterval(timer); //to stop the timer
        DisableAllOptionButtons();
        CheckAnswer(null);
      }

    }, 800);
  } else
  {
    EndQuiz();
  }
} 



function EndQuiz()
{
  clearInterval(timer);
  QuestionLabel.textContent = "You are now a master with 600 eq!"
  FeedbackLabel.style.display = 'none';
  OptionBox.style.display = 'none';
  TimerText.textContent = "😎";
}








function DisableAllOptionButtons()
{
  const all_option_buttons = document.querySelectorAll('.option-btn');

  all_option_buttons.forEach(button => {
    button.disabled = true;
  });
}


//item -> player selected option
function CheckAnswer(item)
{
  clearInterval(timer);
  
  const actual_ans = database1[question_index].answer;
  let message = "";

  if(item === actual_ans)
  {
    score = score + 100;
    message = "correct! +100 eq😀";
  } else if (item===null)
  {
    message = " UR SUCH A SLOWPOKE🤬🤬";
  } else
  {
    message = "wrong. what? its not like u tried🙄";
  }

  FeedbackLabel.textContent = message;
  ScoreLabel.textContent = `eq:${score} some progress`;  

  // hold for 3 secs before loading the next question
  setTimeout(() => {
    question_index = question_index + 1;
    LoadQuestion();
  },2500)
}                      