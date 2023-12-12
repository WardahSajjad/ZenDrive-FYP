using UnityEngine;
using TMPro; // Import the TextMeshPro namespace
using System.Collections;
using UnityEngine.Networking;
using UnityEngine.UI;
using System.Collections.Generic;
using System.Text;

public class SignupScript : MonoBehaviour
{
    [SerializeField] private TMP_InputField emailInputField;
    [SerializeField] private TMP_InputField usernameInputField;
    [SerializeField] private TMP_InputField passwordInputField;
     [SerializeField] private Button signupButton;


    [SerializeField] private TextMeshProUGUI resultText;
    

  public void OnSignupButtonClicked()
{
    string email = emailInputField.text;
    string username = usernameInputField.text;
    string password = passwordInputField.text;

    Debug.Log("Email: " + email);
    Debug.Log("Username: " + username);
    Debug.Log("Password: " + password);

    // Create an instance of the SignupData class
    SignupData requestData = new SignupData
    {
        rEmail = email,
        rUsername = username,
        rPassword = password
    };

    // Serialize the SignupData object using Json.NET
    string jsonRequestData = JsonConvert.SerializeObject(requestData);

    Debug.Log("JSON Data Sent: " + jsonRequestData);

    Debug.Log("Starting signup process...");
    StartCoroutine(Signup(jsonRequestData));
}


  private IEnumerator Signup(string jsonRequestData)
{
    Debug.Log("Sending signup request...");

    string signupEndpoint = "http://localhost:3000/account/create";

    // Convert the JSON string to a byte array with the correct encoding.
    byte[] jsonBytes = Encoding.UTF8.GetBytes(jsonRequestData);

    // Set the headers.
    var headers = new Dictionary<string, string>
    {
        { "Content-Type", "application/json" }
    };

    // Create a POST request.
    using (UnityWebRequest www = new UnityWebRequest(signupEndpoint, "POST"))
    {
        // Attach headers.
        foreach (var header in headers)
        {
            www.SetRequestHeader(header.Key, header.Value);
        }

        // Attach the JSON data as a byte array to the request.
        www.uploadHandler = new UploadHandlerRaw(jsonBytes);

        // Set the download handler to handle the server's response.
        www.downloadHandler = new DownloadHandlerBuffer();

        // Send the request.
        yield return www.SendWebRequest();

        if (www.result != UnityWebRequest.Result.Success)
        {
            Debug.LogError("Signup request failed. Error: " + www.error);
            resultText.text = "Signup request failed. Error: " + www.error;
        }
        else
        {
            Debug.Log("Signup successful: " + www.downloadHandler.text);
            resultText.text = "Signup successful: " + www.downloadHandler.text;
            // Handle successful signup, like transitioning to the login scene.
        }
    }
}

    private void Start()
    {
        signupButton.onClick.AddListener(OnSignupButtonClicked);
    }
}