import { useRef } from "react";
import { useState } from "react";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
// import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import "./eachitem.css";
// export default function IconLabelButtons() {
//   return (
//     <Stack direction="row" spacing={2}>
//       <Button variant="outlined" startIcon={<DeleteIcon />}>
//         Delete
//       </Button>
//       <Button variant="outlined">Edit</Button>
//     </Stack>
//   );
// }

export default function Eachitem(props) {
  const { elem, ondelete, onedited, onsaving } = props;
  const { company, price, id } = elem;
  const [state, setState] = useState(false);

  const [chane, setchane] = useState({
    pro: price,
    comp: company,
  });

  const deleting = () => {
    ondelete(id);
  };

  const editing = (id) => {
    if (state === false) {
      setState(true);
    }
  };

  const changehandles = (e) => {
    const { name, value } = e.target;

    setchane((prev) => ({ ...prev, [name]: value }));
  };

  const onSave = () => {
    console.log("j33wq");
    console.log(chane.pro, chane.comp);
    if (chane.pro.length >= 1 && chane.comp.length >= 1) {
      onsaving(chane.pro, chane.comp, id);
      setState(false);
      console.log("hello");
    }
    console.log("sf");
  };

  return (
    <div className="trda">
      <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
        <TableCell align="right">
          {state ? (
            <TextField
              type="text"
              name="comp"
              label={!chane.comp.length ? "fill this input" : "product"}
              onChange={changehandles}
              value={chane.comp}
              color={!chane.comp.length && "error"}
              required
            />
          ) : (
            <p>{company}</p>
          )}
        </TableCell>
        <TableCell component="th" scope="row">
          {state ? (
            <TextField
              type="number"
              name="pro"
              onChange={changehandles}
              value={chane.pro}
              id="outlined-basic"
              label={!chane.comp.length ? "fill this input" : "price"}
              variant="outlined"
              color={!chane.pro.length && "error"}
              required
            />
          ) : (
            <p>{price}</p>
          )}
        </TableCell>

        <TableCell align="right">
          {state ? (
            // <button onClick={onSave}>update </button>

            <Stack direction="row" spacing={2}>
              <Button onClick={onSave} variant="outlined">
                Update
              </Button>
            </Stack>
          ) : (
            // <button onClick={editing}>edit</button>

            <Stack direction="row" spacing={2}>
              <Button onClick={editing} color="success" variant="outlined">
                Edit
              </Button>
            </Stack>
          )}
        </TableCell>
        <TableCell align="right">
          {/* <button >Delete</button> */}
          <Stack direction="row" spacing={2}>
            <Button onClick={deleting} color="error" variant="outlined">
              Delete
            </Button>
          </Stack>
        </TableCell>
      </TableRow>
    </div>
  );
}
