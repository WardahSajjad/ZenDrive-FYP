using System;
[System.Serializable]
public class QuizQuestion
{
    public string _id; 
    public string questionText;
    public List<QuizOption> options;
    public string correctOptionId; // Store the ID of the correct option


}
