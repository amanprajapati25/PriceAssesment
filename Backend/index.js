const express = require("express");
const bodyParser = require('body-parser');
const fs = require("fs");
const { createObjectCsvStringifier } = require("csv-writer");
const vrboGraphQlApiResp = require("./dumApiResp");
const { axios } = require("axios");

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

function extractAndFilterData(response, add, psz) {

    const listings = response.data.propertySearch.propertySearchListings;

    const filteredListings = listings.filter(listing => listing.id !== undefined && listing.id !== null);

    const extractedData = filteredListings.map((listing, idx) => ({
        SNo: idx + 1,
        id: listing.id ?? "-",
        title: listing.headingSection?.heading ?? "-",
        nightlyPrice: listing.priceSection?.priceSummary?.displayMessages?.[0]?.lineItems?.[0]?.price?.formatted ?? "-",
        url: listing.cardLink?.resource?.value ?? "-",
    }));


    return extractedData;
}

app.get("/", (req, res, next) => {
    res.sendFile(__dirname + '/views/index.html');
});

app.post('/api/sendPayload', (req, res) => {
    const address = req.body.address;
    const pageSize = req.body.pageSize;
    
    const filterExtractedData = extractAndFilterData(vrboGraphQlApiResp, address, pageSize);

    const csvStringifier = createObjectCsvStringifier({
        header: [
            { id: "SNo", title: "SNo" },
            { id: "id", title: "Listing ID" },
            { id: "title", title: "Listing Title" },
            { id: "nightlyPrice", title: "Nightly Price" },
            { id: "url", title: "Listing URL" },
        ],
    });

    const csvString = csvStringifier.getHeaderString() + csvStringifier.stringifyRecords(filterExtractedData);
    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", 'attachment; filename="csv_data.csv"');
    res.send(csvString);
        // res.status(200).send({flag: true, msg: 'CSV data has been exported successfully.', data:csvString});

});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
   // axios.get(('https://api.publicapis.org/entries')
    //     .then(res => {
    //         console.log(res)
    //     })
    //     .catch(err => {
    //         console.log('err',err)
    //     })
    // )