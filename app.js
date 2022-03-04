const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");


const app = express()

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {

    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us20.admin.mailchimp.com/lists/7e85c84b49";

    const options = {
        method: "POST",
        auth: "dalitso:42661f5c83dc095d3779a3688a025814-us20",
    }

    const request = https.request(url, options, function (response) {

        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
            // res.send("Successfully subscribed!")
        } else {
            res.sendFile(__dirname + "/failure.html");
            // res.send("There was an error with signing up, please try again");
        }


        // response.on("data", function (data) {
        //     console.log(JSON.parse(data));
        // });
    });

    request.write(jsonData);
    request.end();

});

app.post("/failure", function (req, res) {
    res.redirect("/")
})

app.listen(3000, function () {
    console.log("server is running on port 3000");
})
// apikey
// dede720f0f3e2bafb643f0aea59de039-us20
