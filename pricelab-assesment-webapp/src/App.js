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

  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState(initData);
  const [showTable, setShowTable] = useState(false);
  const handleSubmit = () => {
    setShowTable(true)
    apiRequest(formData)
    .then(res => {
      console.log("front",res.data.data.products)
      setItems(res.data.data.products)
    })
    .catch(err => {
      console.log(err)
    })
  }

  const formattedCSV = (items) => {
    const headers = ['SNo', 'Listing ID', 'Listing Title', 'Url'];
    const headerRow = headers.join(',');
    const itemRows = items.map(item => Object.values(item).join(','));
    const content = `${headerRow}\n${itemRows.join('\n')}`;
    console.log(content)
    return content;
}


  const downloadCSV = () => {
    if ((items.length) == 0){
      return alert('Nothing to Download')
    }

    else{
      const csvContent = "data:text/xls;charset=utf-8," + formattedCSV(items);
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "items.xls");
      document.body.appendChild(link);
      link.click();
    }
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
      {showTable && !!(items.length) && <div style={{marginTop: '40px'}}>
        <TableContent items={items}/>
      </div>}
    </div>
  );
};

export default App;
