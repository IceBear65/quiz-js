document.addEventListener('DOMContentLoaded', function () {
    const options = document.querySelectorAll('.option');
    const attemptedCount = document.getElementById('attemptedCount');
    const correctCount = document.getElementById('correctCount');
    const wrongCount = document.getElementById('wrongCount');
    const percentage = document.getElementById('percentage');
    const timerElement = document.getElementById('timer');
    const restartQuizButton = document.getElementById('restartQuiz');

    let totalQuestions = 0;
    let correctAnswers = 0;
    const attemptedQuestions = new Set();
    let timer;
    let timeLeft = 60;

    // Start the countdown timer
    function startTimer() {
        timer = setInterval(function () {
            if (timeLeft <= 0) {
                clearInterval(timer);
                alert('Time is up!');
                endQuiz();
            } else {
                timerElement.textContent = `Time Left: ${timeLeft} seconds`;
                timeLeft--;
            }
        }, 1000);
    }

    // Event listener for option clicks
    options.forEach(option => {
        option.addEventListener('click', () => {
            const questionId = option.getAttribute('data-question');
            const isCorrect = option.getAttribute('data-correct') === 'true';

            if (!attemptedQuestions.has(questionId)) {
                options.forEach(o => {
                    if (o.getAttribute('data-question') === questionId) {
                        o.classList.remove('selected', 'correct', 'wrong');
                        if (o === option) {
                            o.classList.add('selected');
                            if (isCorrect) {
                                o.classList.add('correct');
                                correctAnswers++;
                            } else {
                                o.classList.add('wrong');
                                options.forEach(correctOption => {
                                    if (
                                        correctOption.getAttribute('data-question') === questionId &&
                                        correctOption.getAttribute('data-correct') === 'true'
                                    ) {
                                        correctOption.classList.add('correct');
                                    }
                                });
                            }
                            totalQuestions++;
                            attemptedQuestions.add(questionId);
                        }
                    }
                });
            }

            // Show explanation
            const explanation = document.querySelector(`.explanation[data-question="${questionId}"]`);
            if (explanation) {
                explanation.style.display = 'block';
            }
            updateReportCard();
        });
    });

    // Update the report card
    function updateReportCard() {
        attemptedCount.textContent = totalQuestions;
        correctCount.textContent = correctAnswers;
        wrongCount.textContent = totalQuestions - correctAnswers;
        percentage.textContent = ((correctAnswers / totalQuestions) * 100).toFixed(2) + '%';
    }

    // End the quiz
    function endQuiz() {
        options.forEach(option => {
            option.style.pointerEvents = 'none'; // Disable further clicks
        });
        updateReportCard();
    }

    // Restart the quiz
    restartQuizButton.addEventListener('click', function () {
        location.reload();
    });

    // Start the quiz timer when the page is loaded
    startTimer();
});
