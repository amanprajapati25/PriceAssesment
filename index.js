const axios = require("axios");
const express = require("express");
const fs = require("fs");
const { createObjectCsvStringifier } = require("csv-writer");
const vrboGraphQlApiResp = require("./dumApiResp");
const app = express();
const port = 3000;

function extractData(response) {
    const listings = response.data.propertySearch.propertySearchListings;

    const extractedData = listings
        .filter(listing => listing.id !== undefined && listing.id !== null)
        .map((listing, idx) => ({
            SNo: idx + 1,
            id: listing.id ?? "-",
            title: listing.headingSection?.heading ?? "-",
            nightlyPrice: listing.priceSection?.priceSummary?.displayMessages?.[0]?.lineItems?.[0]?.price?.formatted ?? "-",
            url: listing.cardLink?.resource?.value ?? "-",
        }));

    return extractedData;
}

app.get("/api/csv", (req, res) => {
    const filePath = "./csv_data.csv";
    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
    }

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", 'attachment; filename="csv_data.csv"');

    const extractedData = extractData(vrboGraphQlApiResp);
    const csvStringifier = createObjectCsvStringifier({
        header: [
            { id: "SNo", title: "SNo" },
            { id: "id", title: "Listing ID" },
            { id: "title", title: "Listing Title" },
            { id: "nightlyPrice", title: "Nightly Price" },
            { id: "url", title: "Listing URL" },
        ],
    });
    // const csvString =
    //     csvStringifier.getHeaderString() +
    //     csvStringifier.stringifyRecords(extractedData);
        

    res.status(200).send({flag: true, msg: 'CSV data has been exported successfully.', data:extractedData});

});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
