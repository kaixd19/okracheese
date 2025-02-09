import java.io.IOException;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import com.google.gson.Gson;
import java.util.HashMap;
import java.util.Map;

public class SendEmailToSheet {

    public static void main(String[] args) {
        String scriptUrl = "https://script.google.com/macros/s/AKfycbxZMtHgso8rhdEBksJZL-HqwWEGqMbng-KQHmIV1gSIpxUOAG1WlaMIzsWxLRpkirDF/exec"; // Replace with your actual Apps Script URL
        String userEmail = "rosedymagdato329@gmail.com"; // Replace with the actual email address

        try {
            sendEmailToSheet(scriptUrl, userEmail);
            System.out.println("Email sent successfully!");
        } catch (IOException e) {
            System.err.println("Error sending email: " + e.getMessage());
            e.printStackTrace(); // Good for debugging
        }
    }

    public static void sendEmailToSheet(String scriptUrl, String email) throws IOException {
        // 1. Prepare the JSON payload
        Map<String, String> jsonMap = new HashMap<>();
        jsonMap.put("loginEmail", email); // Key MUST match the Apps Script!
        Gson gson = new Gson();
        String jsonData = gson.toJson(jsonMap);

        // 2. Create the URL object
        URL url = new URL(scriptUrl);
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();

        // 3. Configure the connection
        connection.setRequestMethod("POST");
        connection.setRequestProperty("Content-Type", "application/json; charset=UTF-8");
        connection.setDoOutput(true);  // Important:  Indicates you're sending data

        // 4. Write the JSON data to the output stream
        try (OutputStream os = connection.getOutputStream()) {
            byte[] input = jsonData.getBytes(StandardCharsets.UTF_8);
            os.write(input, 0, input.length);
        }

        // 5. Get the response from the Apps Script
        int responseCode = connection.getResponseCode();
        System.out.println("Response Code: " + responseCode);

        if (responseCode == HttpURLConnection.HTTP_OK) {
            // Read and print the response (optional)
            java.io.BufferedReader in = new java.io.BufferedReader(new java.io.InputStreamReader(connection.getInputStream()));
            String inputLine;
            StringBuilder response = new StringBuilder();

            while ((inputLine = in.readLine()) != null) {
                response.append(inputLine);
            }
            in.close();

            System.out.println("Response from Apps Script: " + response.toString());
        } else {
            System.out.println("Error in Apps Script request. Response Code: " + responseCode);
            // Optionally, read the error stream for more details
            java.io.BufferedReader errorReader = new java.io.BufferedReader(new java.io.InputStreamReader(connection.getErrorStream()));
            String errorLine;
            StringBuilder errorResponse = new StringBuilder();

            while ((errorLine = errorReader.readLine()) != null) {
                errorResponse.append(errorLine);
            }
            errorReader.close();
             System.err.println("Error Response from Apps Script: " + errorResponse.toString());

        }

        connection.disconnect();
    }
}
