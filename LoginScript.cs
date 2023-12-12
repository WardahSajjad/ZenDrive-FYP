using UnityEngine;
using TMPro;
using System.Collections;
using UnityEngine.Networking;
using UnityEngine.UI;
using System.Collections.Generic;
using System.Text;

public class LoginScript : MonoBehaviour
{
    [SerializeField] private TMP_InputField emailInputField;
    [SerializeField] private TMP_InputField passwordInputField;
    [SerializeField] private Button loginButton;

    [SerializeField] private TextMeshProUGUI resultText;

    public void OnLoginButtonClicked()
    {
        string email = emailInputField.text;
        string password = passwordInputField.text;

        Debug.Log("Email: " + email);
        Debug.Log("Password: " + password);

        // Create an instance of the LoginData class
        LoginData requestData = new LoginData
        {
            rEmail = email,
            rPassword = password
        };

        // Serialize the LoginData object using Json.NET
        string jsonRequestData = JsonConvert.SerializeObject(requestData);

        Debug.Log("JSON Data Sent: " + jsonRequestData);

        Debug.Log("Starting login process...");
        StartCoroutine(Login(jsonRequestData));
    }

    private IEnumerator Login(string jsonRequestData)
    {
        Debug.Log("Sending login request...");

        string loginEndpoint = "http://localhost:3000/account/login"; // Change the URL to your server's login endpoint

        // Convert the JSON string to a byte array with the correct encoding.
        byte[] jsonBytes = Encoding.UTF8.GetBytes(jsonRequestData);

        // Set the headers.
        var headers = new Dictionary<string, string>
        {
            { "Content-Type", "application/json" }
        };

        // Create a POST request.
        using (UnityWebRequest www = new UnityWebRequest(loginEndpoint, "POST"))
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
                Debug.LogError("Login request failed. Error: " + www.error);
                resultText.text = "Login request failed. Error: " + www.error;
            }
            else
            {
                Debug.Log("Login successful: " + www.downloadHandler.text);
                resultText.text = "Login successful: " + www.downloadHandler.text;

                // Parse the JSON response (assuming it contains a token field)
                LoginResponse response = JsonConvert.DeserializeObject<LoginResponse>(www.downloadHandler.text);
                
                // Handle successful login, e.g., store the token or transition to the main menu.
                // You can access the token using response.token.

                // Example: Store the token in a player prefs
                PlayerPrefs.SetString("AuthToken", response.token);
            }
        }
    }

    private void Start()
    {
        loginButton.onClick.AddListener(OnLoginButtonClicked);
    }
}
