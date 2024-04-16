import React, { useEffect, useState } from "react";
import { Button, Input } from "antd";
import { apiRequest} from './apis';
import TableContent from './TableContent'
import "./App.css";

const App = () => {
  const initData = {
    address: null,
    pageSize: 10,
  };

  const [items, setItems] = useState();
  const [formData, setFormData] = useState(initData);

  const handleSubmit = () => {
    apiRequest(formData)
    .then(res => {
      console.log("front",res.data.data.products)
      setItems(res.data.data.products)
    })
    .catch(err => {
      console.log(err)
    })
  }

  const downloadCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," + items.map(item => Object.values(item).join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "items.csv");
    document.body.appendChild(link);
    link.click();
  };


  return (
    <div>
    <div className="input-form">
      <div className="address">
        <p>Address</p>
        <Input
          placeholder="Address"
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
        />
      </div>

      <div className="page-size">
        <p>Page Size</p>
        <Input
          placeholder="Page Size"
          value={formData.pageSize}
          onChange={(e) => setFormData({ ...formData, pageSize: e.target.value })}
        />
      </div>
      <div className="button-class">
        <Button onClick={handleSubmit} type="primary">
            Submit
        </Button>
      </div>
      <div className="button-class">
          <Button onClick={downloadCSV} type="primary">
            Download CSV
          </Button>
        </div>
    </div>
      <div style={{marginTop: '40px'}}>
        <TableContent />
      </div>
    </div>
  );
};

export default App;
