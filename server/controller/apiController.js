const axios = require("axios");
const { createObjectCsvStringifier } = require("csv-writer");
const getData = (req, res) => {
    res.status(200).json({ message: "All Data is here" });
};

const addData = async (req, res) => {
    const { name, id } = req.body;

    axios
        .get("https://dummy.restapiexample.com/api/v1/employee/1")
        .then((response) => {
            const data = response.data.data;

            const csvStringifier = createObjectCsvStringifier({
                header: [
                    { id: 'id', title: 'Sno' },
                    { id: 'employee_name', title: 'Name' },
                    { id: 'employee_salary', title: 'Salary' },
                    { id: 'employee_age', title: 'Age' }
                ]
            });

            const csvData = csvStringifier.getHeaderString() + csvStringifier.stringifyRecords([data]);

            res.setHeader("Content-Type", "text/csv");
            res.setHeader("Content-Disposition", 'attachment; filename="csv_data.csv"');

            res.status(200).send(csvData)
            // res.status(200).json({ data: data, csvData: csvData });
        })
        .catch((error) => {
            console.error("Error:", error);
            res.status(500).json({ message: "Something went wrong", error: error });
        });
};

module.exports = { addData };


module.exports = { getData, addData };

// const express = require("express");
// const bodyParser = require('body-parser');
// const fs = require("fs");
// const { createObjectCsvStringifier } = require("csv-writer");
// const vrboGraphQlApiResp = require("./dumApiResp");
// const { axios } = require("axios");

// const app = express();
// const port = 3000;

// app.use(bodyParser.urlencoded({ extended: true }));
// app.set('views', __dirname + '/views');
// app.set('view engine', 'ejs');

// function extractAndFilterData(response, add, psz) {

//     const listings = response.data.propertySearch.propertySearchListings;

//     const filteredListings = listings.filter(listing => listing.id !== undefined && listing.id !== null);

//     const extractedData = filteredListings.map((listing, idx) => ({
//         SNo: idx + 1,
//         id: listing.id ?? "-",
//         title: listing.headingSection?.heading ?? "-",
//         nightlyPrice: listing.priceSection?.priceSummary?.displayMessages?.[0]?.lineItems?.[0]?.price?.formatted ?? "-",
//         url: listing.cardLink?.resource?.value ?? "-",
//     }));

//     return extractedData;
// }

// app.get("/", (req, res, next) => {
//     res.sendFile(__dirname + '/views/index.html');
// });

// app.post('/api/sendPayload', (req, res) => {
//     const address = req.body.address;
//     const pageSize = req.body.pageSize;

//     const filterExtractedData = extractAndFilterData(vrboGraphQlApiResp, address, pageSize);

//     const csvStringifier = createObjectCsvStringifier({
//         header: [
//             { id: "SNo", title: "SNo" },
//             { id: "id", title: "Listing ID" },
//             { id: "title", title: "Listing Title" },
//             { id: "nightlyPrice", title: "Nightly Price" },
//             { id: "url", title: "Listing URL" },
//         ],
//     });

//     const csvString = csvStringifier.getHeaderString() + csvStringifier.stringifyRecords(filterExtractedData);
//     res.setHeader("Content-Type", "text/csv");
//     res.setHeader("Content-Disposition", 'attachment; filename="csv_data.csv"');
//     res.send(csvString);

// });

// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });
