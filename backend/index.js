const express = require("express");
const app = express();
const cors = require('cors');
const { google } = require("googleapis");
const { GoogleAuth } = require('google-auth-library');
const port = 3000;

//
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(cors({
    origin: "https://vendoralandingpage-1.onrender.com",
    credentials: true // If you're sending cookies or auth headers
  }));

app.post("/user", async (req, res) => {
    const userInfo = req.body;

    // Parse the credentials from environment variable
    const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS);
    
    //Fix the private key newlines
    credentials.private_key = credentials.private_key.replace(/\\n/g, '\n');

    //console.log(credentials);

    const auth = new GoogleAuth({
        credentials: credentials, // Use the fixed credentials
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    //client object (for auth) to pass into requests
    const client = await auth.getClient();

    //instance of google sheets api
    const googleSheets = google.sheets({version: "v4", auth: client});

    const spreadsheetId = "1Zini5Ih3Pi6o2oEvu98TUPbXpA5W7trrtz3nPS7oSqg";

    try {
        const result = await googleSheets.spreadsheets.values.append({
            spreadsheetId,
            range: "Sheet1!A:B",
            valueInputOption: "USER_ENTERED",
            resource: {
                values: [
                    [new Date().toLocaleString(), userInfo.userEmail],
                ]
            }

        })

        return res.status(200).json({message: "Successfully added to the waitlist"});
    } catch (error) {
        console.error("Google Sheets API error:", error.response?.data || error.message || error);
    return res.status(500).json({ message: "Failed to append to Google Sheets", error: error.message });
    }


})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
  });