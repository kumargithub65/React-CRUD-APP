import { Component, useState } from "react";
import Eachitem from "./components/eachitem/eachitem";

import { v4 as uuid } from "uuid";
import { useRef } from "react";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
// import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import "./App.css";
// export default function IconLabelButtons() {
//   return (

const userlist = [];

function App() {
  const input1 = useRef();
  const input2 = useRef();
  const [state, setState] = useState({
    list: userlist,
    company: "",
    price: "",
    err: false,
    check: false,
  });
  // console.log(state);
  const onDeleteHandle = (id) => {
    const localitemm = localStorage.getItem("tasklist");
    let localitem = localitemm === null ? [] : JSON.parse(localitemm);
    const filtered = localitem.filter((ele) => ele.id !== id);
    localStorage.setItem("tasklist", JSON.stringify(filtered));
    setState((prev) => ({ ...prev, list: filtered }));
  };

  const onchangehandler = (e) => {
    const { name, value } = e.target;

    setState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // const edited = ()=>{
  //   se
  // }

  const saved = (pro, comp, id) => {
    const changed = state.list.map((ele) => {
      if (ele.id === id) {
        ele.company = comp;
        ele.price = pro;
      }
    });
    const localitemm = localStorage.getItem("tasklist");
    let localitem = localitemm === null ? [] : JSON.parse(localitemm);

    console.log(localitem);
    const newupdate = localitem.map((ele) => {
      if (ele.id === id) {
        ele.company = comp;
        ele.price = pro;
      }
    });
    console.log(newupdate);
    console.log(localitem);
    localStorage.setItem("tasklist", JSON.stringify(localitem));
    setState((prev) => ({ ...prev, check: true }));
  };

  const onsubmitchange = (e) => {
    const { company, price } = state;
    e.preventDefault();
    const newElem = {
      id: uuid(),
      company,
      price,
    };

    if (newElem.company.length > 0 && newElem.price.length > 0) {
      localStorage.setItem(
        "tasklist",
        JSON.stringify([...state.list, newElem])
      );
      setState((prev) => ({
        ...prev,
        list: [...prev.list, newElem],
        company: "",
        price: "",
        err: false,
      }));
    } else {
      setState((prev) => ({ ...prev, err: true }));
    }
  };
  // if (state.list.length > 0) {
  const localitemm = localStorage.getItem("tasklist");
  let localitem = localitemm === null ? [] : JSON.parse(localitemm);
  // }
  return (
    <div>
      <form className="forma" onSubmit={onsubmitchange}>
        {/* <input
          value={state.company}
          type="text"
          name="company"
          onChange={onchangehandler}
          ref={input1}
        /> */}
        {/* <input
          value={state.price}
          type="text"
          name="price"
          onChange={onchangehandler}
          ref={input2}
        /> */}

        <TextField
          value={state.company}
          type="text"
          name="company"
          onChange={onchangehandler}
          placeholder="product"
          // onBlur={onblurhandler}
          ref={input1}
          label={state.err ? "fill this input" : "product"}
          // color={state.err && "error"}
          id="outlined-basic"
          variant="outlined"
        />
        <TextField
          value={state.price}
          type="number"
          name="price"
          onChange={onchangehandler}
          // onBlur={onblurhandler}
          ref={input2}
          placeholder="price"
          id="outlined-basic"
          label={state.err ? "fill this input" : "Price"}
          // color={state.err && "error"}
          variant="outlined"
        />
        {/* <button type="submit">submit</button> */}
        <Stack direction="row" spacing={2}>
          <Button type="submit" variant="outlined">
            Submit
          </Button>
        </Stack>
      </form>
      {/* <h1>hello world</h1> */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableBody>
            {localitem.length >= 1 &&
              localitem.map((ele) => (
                <Eachitem
                  elem={ele}
                  ondelete={onDeleteHandle}
                  onsaving={saved}
                  key={ele.id}
                />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
//////////////////////////////////////

export default App;
