using UnityEngine;
using UnityEngine.Networking;
using TMPro;
using System.Collections.Generic;

public class QuizManager : MonoBehaviour
{
    public TextMeshProUGUI questionText;
    public List<TextMeshProUGUI> answerButtons;
    public TextMeshProUGUI scoreText;

    private List<QuizQuestion> quizQuestions;
    private int currentQuestionIndex = 0;
    private int score = 0;

    private void Start()
    {
        FetchQuizQuestions();
    }

    private void FetchQuizQuestions()
    {
        string apiUrl = "http://localhost:3000/quiz/getQuestions"; // Replace with your server URL
        StartCoroutine(GetQuizQuestions(apiUrl));
    }

    private IEnumerator GetQuizQuestions(string url)
    {
        using (UnityWebRequest www = UnityWebRequest.Get(url))
        {
            yield return www.SendWebRequest();

            if (www.result != UnityWebRequest.Result.Success)
            {
                Debug.LogError("Failed to fetch quiz questions: " + www.error);
                yield break;
            }

            quizQuestions = JsonUtility.FromJson<QuizQuestionList>(www.downloadHandler.text).questions;
            ShowNextQuestion();
        }
    }

    private void ShowNextQuestion()
    {
        if (currentQuestionIndex < quizQuestions.Count)
        {
            QuizQuestion currentQuestion = quizQuestions[currentQuestionIndex];
            questionText.text = currentQuestion.questionText;

            for (int i = 0; i < answerButtons.Count; i++)
            {
                answerButtons[i].text = currentQuestion.options[i].text;
            }

            currentQuestionIndex++;
        }
        else
        {
            // Quiz is completed, show the user's score or perform any other actions
            Debug.Log("Quiz completed! Score: " + score);
            scoreText.text = "Score: " + score;
        }
    }

    public void OnAnswerButtonClicked(int selectedOption)
    {
        QuizQuestion currentQuestion = quizQuestions[currentQuestionIndex - 1];
        if (currentQuestion.options[selectedOption].isCorrect)
        {
            score++; // Increase the score if the answer is correct
        }

        ShowNextQuestion();
    }
}
