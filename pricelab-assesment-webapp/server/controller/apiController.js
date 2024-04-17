const axios = require("axios");
const getData = (req, res) => {
    res.status(200).json({ message: "All Data is here" });
};

const addData = async (req, res) => {

    const address = req.query.address;
    const pageSize = req.query.pageSize;
    

    // let data = {
    //     "variables": {
    //       "context": {
    //         "siteId": 9001001,
    //         "locale": "en_US",
    //         "eapid": 1,
    //         "currency": "USD",
    //         "device": {
    //           "type": "DESKTOP"
    //         },
    //         "identity": {
    //           "duaid": "65cbd87c-ebb5-ab83-a4c1-812db78bb787",
    //           "expUserId": "-1",
    //           "tuid": "-1",
    //           "authState": "ANONYMOUS"
    //         },
    //         "privacyTrackingState": "CAN_TRACK",
    //         "debugContext": {
    //           "abacusOverrides": []
    //         }
    //       },
    //       "criteria": {
    //         "primary": {
    //           "dateRange": {
    //             "checkInDate": {
    //               "day": 1,
    //               "month": 3,
    //               "year": 2024
    //             },
    //             "checkOutDate": {
    //               "day": 5,
    //               "month": 3,
    //               "year": 2024
    //             }
    //           },
    //           "destination": {
    //             "regionName": "73 W Monroe St, Chicago, IL 60603, USA",
    //             "regionId": null,
    //             "coordinates": null,
    //             "pinnedPropertyId": null,
    //             "propertyIds": null,
    //             "mapBounds": null
    //           },
    //           "rooms": [
    //             {
    //               "adults": 2,
    //               "children": []
    //             }
    //           ]
    //         },
    //         "secondary": {
    //           "counts": [
    //             {
    //               "id": "resultsStartingIndex",
    //               "value": 150
    //             },
    //             {
    //               "id": "resultsSize",
    //               "value": 50
    //             }
    //           ],
    //           "booleans": [],
    //           "selections": [
    //             {
    //               "id": "sort",
    //               "value": "RECOMMENDED"
    //             },
    //             {
    //               "id": "privacyTrackingState",
    //               "value": "CAN_TRACK"
    //             },
    //             {
    //               "id": "useRewards",
    //               "value": "SHOP_WITHOUT_POINTS"
    //             },
    //             {
    //               "id": "searchId",
    //               "value": "d1342ebe-2e4c-4c8d-8838-a3967204a6f2"
    //             }
    //           ],
    //           "ranges": []
    //         }
    //       },
    //       "destination": {
    //         "regionName": null,
    //         "regionId": null,
    //         "coordinates": null,
    //         "pinnedPropertyId": null,
    //         "propertyIds": null,
    //         "mapBounds": null
    //       },
    //       "shoppingContext": {
    //         "multiItem": null
    //       },
    //       "returnPropertyType": false,
    //       "includeDynamicMap": true
    //     },
    //     "operationName": "LodgingPwaPropertySearch",
    //     "extensions": {
    //       "persistedQuery": {
    //         "sha256Hash": "e4ffcd90dd44f01455f9ddd89228915a177f9ec674f0df0db442ea1b20f551c3",
    //         "version": 1
    //       }
    //     }
    //   };
      
    //   let config = {
    //     method: 'post',
    //     maxBodyLength: Infinity,
    //     url: 'https://www.vrbo.com/graphql',
    //     headers: { 
    //       'authority': 'www.vrbo.com', 
    //       'accept': '*/*', 
    //       'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8,no;q=0.7,de;q=0.6', 
    //       'cache-control': 'no-cache', 
    //       'client-info': 'shopping-pwa,unknown,unknown', 
    //       'content-type': 'application/json', 
    //       'origin': 'https://www.vrbo.com', 
    //       'pragma': 'no-cache', 
    //       'referer': 'https://www.vrbo.com/search?adults=2&amenities=&children=&d1=2023-12-27&d2=2023-12-28&destination=73%20W%20Monroe%20St%2C%20Chicago%2C%20IL%2060603%2C%20USA&endDate=2024-03-05&latLong=&mapBounds=&pwaDialog=&regionId&semdtl=&sort=RECOMMENDED&startDate=2024-03-01&theme=&userIntent=', 
    //       'sec-ch-ua': '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"', 
    //       'sec-ch-ua-mobile': '?0', 
    //       'sec-ch-ua-platform': '"macOS"', 
    //       'sec-fetch-dest': 'empty', 
    //       'sec-fetch-mode': 'cors', 
    //       'sec-fetch-site': 'same-origin', 
    //       'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36', 
    //       'x-enable-apq': 'true', 
    //       'x-page-id': 'page.Hotel-Search,H,20', 
    //       'Cookie': 'DUAID=b05d549f-dbe7-5ad7-e344-bb004a4b5490; HMS=fc4150cf-7a22-455d-94a5-4050441c899b; MC1=GUID=b05d549fdbe75ad7e344bb004a4b5490; ak_bmsc=24577E016E04EF2AB35FDD142D83043F~000000000000000000000000000000~YAAQTm/ZF0sprcqOAQAAxPf64Rc4KErRXlmfWdfPZKDZbDJITDdHg9WBTR7w8rGCSpvdMG0VizNM+5WNmsjKEpGCHCFmX4C+SeldjqDwzlXjGh1e9aH1kgN2+E7zF1+WXpyzpyZDsaFvegCrHFDXTGjqdQdRuvW0T4wC7o2xe0Kjk66/QTD3Gds0PH+zj60gvTW3s9q0qcBE7RnDEbgqrxOiDe66/JVHl5xIoxhwAEEG4VqnlR15P1mxv1uVyh99mX1O5/cAKHotL2Vs3d1cNXXblO3d6iXmMtMHJLYIWoV0GH6qQumYOTvv9o5DtEo9/cDcKWDMwQLQSFX5XAxiixvlN37FYZU4aIO3pzfc0Jgf+OOvrqU1TABL; cesc=%7B%22marketingClick%22%3A%5B%22false%22%2C1713188304798%5D%2C%22hitNumber%22%3A%5B%221%22%2C1713188304798%5D%2C%22visitNumber%22%3A%5B%2212%22%2C1713188304798%5D%2C%22entryPage%22%3A%5B%22page.Hotel-Search%22%2C1713188304798%5D%7D; hav=b05d549f-dbe7-5ad7-e344-bb004a4b5490; ha-device-id=b05d549f-dbe7-5ad7-e344-bb004a4b5490; has=1172495b-e046-269a-29c2-424b34cc7c73; hav=b05d549f-dbe7-5ad7-e344-bb004a4b5490'
    //     },
    //     data : data
    //   };
      

    console.log("typpppp",address, pageSize)

    axios
        .get("https://dummyjson.com/products")
        .then((response) => {
            const data = response.data;
            res.status(200).json({ data: data, flag: true});
        })
        .catch((error) => {
            console.error("Error:", error);
            res.status(500).json({ message: "Something went wrong", error: error });
        });
};

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
