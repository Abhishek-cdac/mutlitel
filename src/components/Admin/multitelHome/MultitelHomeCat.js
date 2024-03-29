
import React, { useEffect, useState } from "react";
// import data from "./DummyData";
import { showAlert } from "../../../utils/showAlert";
import { Button, Modal, Form, Table } from "react-bootstrap";
import { getAllRecCategories,getAddRecCategories,getEditRecCategories,getDeleteRecCategories } from "../../../services/Phase_2/WhoWeR";

export const MultitelHomeCat = () => {
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [buttondisabled, setButtonDisabled] = useState(false);
  const [deleteRecord, setDeleteRecord] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [show, setShow] = useState(false);
  const [ShowEditModal, setShowEditModal] = useState(false);
  const [DeleteShow, setDeleteShow] = useState(false);
  const [data,setData] = useState('')
  const [file, setfile] = useState("");
  const [data2, setData2] = useState({
    id: "",
    Title: "",
    description:"",
  });
  const { id, Title, description } = data2;

  const handleChange = (e) => {
    setData2({ ...data2, [e.target.name]: e.target.value });
  };


  const handleDeleteshow = (item) => {
    setDeleteShow(true);
    setDeleteRecord(item);
  };
  const handlecloseDelete = () => {
    setDeleteShow(false);
  };

  const handleDeleteData = async() => {
    const data = {
      id: deleteRecord.id,
    };
    try {
      await getDeleteRecCategories(data);
      showAlert( " Recruitment Category Deleted Successfully","success");
      setDeleteShow(false);
      handleAllRecCat();
    } catch (error) {
      console.log("error", error);
      showAlert("Something Went Wrong","error");
    }
  };

  const handleEditClose = () => {
    setData2(" ");
    setfile("");
    setShowEditModal(false);
  };

  //   Add API

  const handleSubmit = async(e) => {
    e.preventDefault();
   
    const data = {
    "description" : description,
    "name": Title
}
    
   
    if (
      Title === "" 
    ) {
      setErrorMsg("Fill the Mandatory Fields");
    } else
      try {
        setButtonDisabled(true)
        await getAddRecCategories(data);
        showAlert("Added Recruitment Category successfully", "success");
        setData2('')
        setShow(false);
        setButtonDisabled(false)
        handleAllRecCat();
      } catch (error) {
        showAlert(error.data.message, "error");
      } finally {
        setShow(false);
      }
  
  };

  //Edit API

  const handleEditShow = (item) => {
    setData2({
      id: item.id,
      Title: item.name,
    });
    setShowEditModal(true);
  };

  const handleEditData = async() => { 

    const data = {
        "name": Title,
        "id":id,
    }
       
    try {
      await getEditRecCategories(data);
      showAlert(" Corporate Category Edited Sucessfully","success");
      setData2(' ')
      setfile("");
      setShowEditModal(false);
      handleAllRecCat();
    } catch (error) {
      showAlert("Something Went Wrong","error");
    }
  };

 
  const handleAllRecCat = async () => {
    try {
      const resp = await getAllRecCategories();
      setData(resp && resp.data);
      console.log("resp", resp);
    } catch (error) {
      console.log("error", error);
      showAlert("something went Wrong","error");
    }
  };


useEffect(() => {
    handleAllRecCat();
}, []);


  return (
    <div id="layoutSidenavContent">
      <div className="container-fluid">
        <div class="row d-flex align-items-center justify-content-between">
          <div
            class="col-lg-12 col-md-12 text-left"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <h3 className="mt-4 mb-4">Multitel Home Categories</h3>
            <div
              className="header justify-content-end"
              style={{ marginTop: "10px" }}
            >
              <button
                type="button"
                className="btn btn-primary btn-sm my-3"
                style={{
                  marginBottom: "10px",
                  backgroundColor: "#0076B5",
                }}
                onClick={handleShow}
              >
                <i className="fas fa-plus-circle"></i> Add Category 
              </button>
              <Modal show={show} onHide={handleClose} className="add_cat_modal">
                <Modal.Body>
                  <button
                    type="button"
                    className="close"
                    onClick={handleClose}
                    style={{ position: "absolute", top: "5px", right: "10px" }}
                  >
                    <span aria-hidden="true">×</span>
                    <span className="sr-only">Close</span>
                  </button>
                  <Modal.Title style={{ color: "#0076B5", marginLeft: "25px" }}>
                    Add New Category
                  </Modal.Title>
                  <div className="container">
                    <Form.Group>
                      <Form.Label>Title</Form.Label>
                      <span style={{ color: "red" }}>*</span>
                      <Form.Control
                        type="text"
                        value={Title}
                        name="Title"
                        onChange={handleChange}
                      ></Form.Control>
                    </Form.Group>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="primary"
                    size="lg"
                    disabled={buttondisabled}
                    onClick={handleSubmit}
                    style={{ width: "200%" }}
                  >
                    Submit
                  </Button>

                  <label style={{ color: "red", justifyContent: "center" }}>
                    {errorMsg}
                  </label>
                </Modal.Footer>
              </Modal>
            </div>
          </div>
        </div>
        <div>
          {" "}
          <Table striped bordered hover size="md" responsive>
            <thead style={{ backgroundColor: "#0076B5", color: "white" }}>
              <tr>
                <th>Sr.No.</th>
                <th>Id</th>
                <th>Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data?.map((item, i) => (
                  <tr>
                    <td>{i + 1}</td>
                    <td>{item.id ?item.id:''}</td>
                    <td>{item.name ?item.name:''}</td>
                    <td>
                      <a
                        className="nav-link"
                        onClick={() => {
                          handleDeleteshow(item);
                        }}
                      >
                        {" "}
                        <i className="fa fa-trash-o" />
                      </a>
                      <a
                        className="nav-link"
                        onClick={() => {
                          handleEditShow(item);
                        }}
                      >
                        <i
                          className="fa fa-edit"
                          style={{ paddingLeft: "0px" }}
                        />
                      </a>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
          {/* Delete Modal */}
          <Modal show={DeleteShow} onHide={handlecloseDelete}>
            <Modal.Header closeButton>
              <Modal.Title style={{ color: "#0076B5" }}>
                Delete Product
              </Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <p>Are you sure want to delete this Category ?</p>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={() => handlecloseDelete()}>
                Close
              </Button>
              <Button
                variant="primary"
                onClick={() => handleDeleteData(deleteRecord)}
              >
                Delete
              </Button>
            </Modal.Footer>
          </Modal>
          {/* Edit Modal */}
          <div className="col-xl-5  col-lg-4 col-md-3 col-sm-2">
            <div className="header">
              <Modal show={ShowEditModal} onHide={handleEditClose} size="md">
                <Modal.Header closeButton>
                  <Modal.Title style={{ color: "#0076B5", marginLeft: "25px" }}>
                    Edit Menu data
                  </Modal.Title>
                  <button
                    type="button"
                    class="btn-close"
                    aria-label="Close"
                  ></button>
                </Modal.Header>
                <Modal.Body>
                  <div className="container">
                    <Form.Group>
                      <Form.Label>Title</Form.Label>
                      <Form.Control
                        type="text"
                        value={Title}
                        name="Title"
                        onChange={handleChange}
                      ></Form.Control>
                    </Form.Group>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={handleEditData}
                    style={{ width: "200%" }}
                  >
                    Submit
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
