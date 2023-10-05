// TODO: Menu --> list by category
// TODO: Framework for creating player articles
// TODO: Add default player articles to database
// TODO: Allow moderators to create/edit player articles
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import UserService from "../services/user.service";

import Container from 'react-bootstrap/Container';

import "./Players.css";
import { Table } from "react-bootstrap";

const Players = () => {
  // Get user from local storage via Redux
  const { user: currentUser } = useSelector((state) => state.auth);
  
  const themePrimary = useSelector((state) => state.theme.themePrimary);
  const themeSecondary = useSelector((state) => state.theme.themeSecondary);

  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);

  const data = [
    {
      "id": 1,
      "name": "Manuel Neuer",
      "birthday": "1986/03/27",
      "nationality": "German",
      "played": 478,
    }
  ];

  const [tableData, setTableData] = useState(data);
  const columns = [
    { label: "#", key: "id", dataType: "" },
    { label: "Name", key: "name", dataType: "string" },
    { label: "Age", key: "birthday", dataType: "number" },
    { label: "Nationality", key: "nationality", dataType: "string" },
    { label: "Games Played", key: "played", dataType: "number" },
  ];

  return (
    <Table responsive striped>
      <thead>
        <tr>
          { columns.map(({ label, key }) => <th key={key}>{label}</th>) }
        </tr>
      </thead>
      <tbody>
        {tableData.map((data) => {
          return (
            <tr key={data.id}>
              { columns.map(({ key }) => {
                const tData = data[key] ? data[key] : "-";
                return <td key={key}>{tData}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default Players;