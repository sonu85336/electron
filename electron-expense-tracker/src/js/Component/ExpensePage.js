import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { useReactToPrint } from "react-to-print";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import classes from "./css/ExpensePage.module.css";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import BarChart from "./Chart/BarChart";
 import { useHistory } from "react-router-dom";
 import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
function ExpensePage() {
  const [expense, setExpense] = useState("");
  const [details, setDetails] = useState("");
  const [category, setCategory] = useState("");
  const [data, setData] = useState([]);
  const [idtobetrue, setIdToBeTrue] = useState(false);
  const [editid, setEditid] = useState("");
   const history = useHistory()
  const componentPdf = useRef();

  const DeleteHandler = (id) => {
    axios.delete(
      `https://permanent-expensetracker-default-rtdb.firebaseio.com/electron/${id}.json`
    );
    const temp = [...data];
    temp.forEach((item, index) => {
      if (item.id === id) {
        temp.splice(index, 1);
      }
    });
    setData(temp);
  };

  const EditHandler = (item) => {
    setExpense(item.expense);
    setDetails(item.details);
    setCategory(item.category);
    setEditid(item.id);
    setIdToBeTrue(true);
  };

  const expenseHandler = (e) => {
    setExpense(e.target.value);
  };

  const detailsHandler = (e) => {
    setDetails(e.target.value);
  };
  const categoryHandler = (e) => {
    setCategory(e.target.value);
  };
  const SubmitHandler = (e) => {
    e.preventDefault();
    let obj = {
      expense: expense,
      details: details,
      category: category,
    };

    if (idtobetrue) {
      axios
        .put(
          `https://permanent-expensetracker-default-rtdb.firebaseio.com/electron/${editid}.json`,
          obj
        )
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
      let temp = [...data];
      temp.forEach((content, index) => {
        if (content.id === editid) {
          temp[index] = obj;
          setIdToBeTrue(false);
        }
      });
      setData(temp);
    } else {
      axios
        .post(
          `https://permanent-expensetracker-default-rtdb.firebaseio.com/electron.json`,
          obj
        )
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
      //setData([...data,obj])
    }

    setExpense("");
    setCategory("");
    setDetails("");
  };

  useEffect(() => {
    async function fetchdata() {
      try {
        const res = await axios.get(
          `https://permanent-expensetracker-default-rtdb.firebaseio.com/electron.json`
        );
        console.log(res.data, "from res.data");
        let getData = [];
        for (let key in res.data) {
          getData.push({
            id: key,
            expense: res.data[key].expense,
            details: res.data[key].details,
            category: res.data[key].category,
          });
        }
        console.log(getData, "from useEffect");

        setData(getData);
      } catch (err) {
        console.log(err);
      }
    }
    fetchdata();
  }, [SubmitHandler]);

 /********************** */
 const genratePDF = useReactToPrint({
    content:()=>componentPdf.current,
    documentTitle:'UserData',
    onAfterPrint:()=>alert("Data saved in PDF")
 })
 /********************** */
  return (
    <div> 
      
     <Header />
     
      
      
      <div  className={classes.xls}>
       <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    // className="download-table-xls-button"
                    className = "btn btn-warning"
                    table="table-to-xls"
                    filename="tablexls"
                    sheet="tablexls"
                    buttonText="XLS File"/>
       </div>
      <div  className={classes.pdf}>
        <button className="btn btn-info" onClick={genratePDF}><PictureAsPdfIcon/></button>
      
      </div>
      <div> <button onClick={()=>history.push('/')} className="btn btn-primary" style={{position:'absolute',marginLeft:'900px',marginTop:'20px', zIndex: '999'}}><LogoutRoundedIcon/></button></div>
      <div className={classes.formdiv}>
      
      
        <div style={{ marginTop: "120px" }}>
          <form
            className="container form-inline mb-4 mt-2"
            onSubmit={SubmitHandler}
          >
            <div className="row">
              <div className="form-group col ">
                <label htmlFor="Expense">Expense</label>
                <input
                  type="number"
                  className="form-control "
                  onChange={expenseHandler}
                  value={expense}
                ></input>
              </div>
              <div className="form-group col ">
                <label htmlFor="Details">Details</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={detailsHandler}
                  value={details}
                ></input>
              </div>
              <div className="form-group col">
                <label htmlFor="Category">Category</label>
                <select
                  className="form-control"
                  value={category}
                  onChange={categoryHandler}
                >
                  <option>Housing or Rent</option>
                  <option>Transportation</option>
                  <option>Car Insurance</option>
                  <option>Travel Expenses</option>
                  <option>Food and Groceries</option>
                  <option>Utility Bills</option>
                  <option>Cell Phone</option>
                  <option>Childcare and School Costs</option>
                  <option>Pet Food and Care</option>
                  <option>Pet Insurance</option>
                  <option>Clothing and Personal Upkeep</option>

                  <option>Health Insurance</option>
                  <option>Monthly Memberships</option>
                  <option>Life Insurance</option>
                  <option>Homeowners Insurance</option>
                  <option>Entertainment</option>
                  <option>Student Loans</option>
                  <option>Credit Card Debt</option>
                  <option>Emergency Fund</option>
                </select>
              </div>
              <div >
                <button className="btn btn-success mt-2">Submit</button>
              </div>
            </div>
          </form>
<div>
    <BarChart  chartdata = {data}/>
</div>
          <div className="container"  ref={componentPdf}>
            <table className="table mt-4 " id="table-to-xls">
              <thead  className="table-dark">
                <tr>
                  <th>Expense</th>
                  <th>Details</th>
                  <th>Category</th>
                  <th>Action</th>
                </tr>
              </thead>
              {data.map((item) => (
                <tbody key={item.id}>
                  <tr  className="table-light">
                    <td>{item.expense}</td>
                    <td>{item.details}</td>
                    <td>{item.category}</td>
                    <td>
                    <div  className={classes.delete}>
                      <button
                        className="btn  btn-default "
                        style={{ marginRight: "4px" }}
                        onClick={() => DeleteHandler(item.id)}
                      >
                        <DeleteIcon />
                      </button>
                     
                      <button
                      
                        className="btn  .btn-default"
                        onClick={() => EditHandler(item)}
                      >
                        <EditIcon />
                      </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
        </div>
      </div>
 
      <Footer />
    </div>
  );
}

export default ExpensePage;
