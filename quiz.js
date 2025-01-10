const options = document.querySelectorAll('.option');
        const attemptedCount = document.getElementById('attemptedCount');
        const correctCount = document.getElementById('correctCount');
        const wrongCount = document.getElementById('wrongCount');
        const percentage = document.getElementById('percentage');
        const timerDisplay = document.getElementById('timer');
        const restartButton = document.getElementById('restartQuiz');

        let totalQuestions = 0;
        let correctAnswers = 0;
        let timeLeft = 60;
        const attemptedQuestions = new Set();

        // Timer functionality
        const timerInterval = setInterval(() => {
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                alert('Time is up!');
                document.querySelectorAll('.option').forEach(option => option.style.pointerEvents = 'none');
            } else {
                timerDisplay.textContent = `Time Left: ${timeLeft--} seconds`;
            }
        }, 1000);

        // Option selection functionality
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

                attemptedCount.textContent = totalQuestions;
                correctCount.textContent = correctAnswers;
                wrongCount.textContent = totalQuestions - correctAnswers;
                percentage.textContent = ((correctAnswers / totalQuestions) * 100).toFixed(2) + '%';
            });
        });

        // Restart button functionality
        restartButton.addEventListener('click', () => {
            window.location.reload();
        });
