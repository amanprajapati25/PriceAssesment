import React from 'react'
import { Table } from "antd";
import './App.css'
const tableContent = ({items}) => {
  console.log("here",items)
  
  const dataSource = () => {
    return (items || []).map((item, idx) => ({
      key:idx,
      listingID: item.id,
      SNo: item.id,
      listingTitle: item.brand,
      url: "http.abc.com",
    }));
  };

  const columns = [
    {
      title: 'SNo',
      dataIndex: 'SNo',
      key: 'sno',
    },
    {
      title: 'Listing ID',
      dataIndex: 'listingID',
      key: 'listingID',
    },
    {
      title: 'Listing Title',
      dataIndex: 'listingTitle',
      key: 'listingTitle',
    },
    {
      title: 'Url',
      dataIndex: 'url',
      key: 'url',
    },
  ];

  return (
    <div className="data-table">
      <Table dataSource={dataSource()} columns={columns} />
    </div>
  )
}

export default tableContent
