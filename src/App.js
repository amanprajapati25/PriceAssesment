import { Button, Input } from "antd";
import React, { useEffect, useState } from "react";
import "./App.css";
const App = () => {
  const initData = {
    address: null,
    pageSize: 10,
  };
  const [items, setItems] = useState();
  const [data, setData] = useState(initData);
  return (
    <div>
    <div className="input-form">
      <div className="address">
        <p>Address</p>
        <Input
          placeholder="Address"
          value={data.address}
          onChange={(e) => setData({ ...data, address: e.target.value })}
        />
      </div>

      <div className="page-size">
        <p>Page Size</p>
        <Input
          placeholder="Page Size"
          value={data.pageSize}
          onChange={(e) => setData({ ...data, pageSize: e.target.value })}
        />
      </div>
      <div className="submit-button">
        <Button type="primary">
            Submit
        </Button>
      </div>
    </div>
    <div className="table">
      
    </div>
    </div>
  );
};

export default App;
