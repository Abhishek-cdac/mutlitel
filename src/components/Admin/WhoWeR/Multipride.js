import React, { useState, useEffect } from "react";
// import data from "./DummyData";
import {
  getAllMultiPride,
  getAddMultiPride,
  getEditMultipride,
  getDeleteMultipride,
  imageUrl,
} from "../../../services/Phase_2/WhoWeR";
import { Button, Modal, Form, Table } from "react-bootstrap";
import { showAlert } from "../../../utils/showAlert";

const Multipride = () => {
  
  const handleShow = () => setShow(true);
  const [buttondisabled, setButtonDisabled] = useState(false);
  const [show, setShow] = useState(false);
  const [Multi, setMulti] = useState("");
  const [ShowEditModal, setShowEditModal] = useState(false);
  const [deleteRecord, setDeleteRecord] = useState("");
  const [DeleteShow, setDeleteShow] = useState(false);
  const handleClose = () =>  {setShow(false); setData2('')}
  const [errorMsg, setErrorMsg] = useState("");
  const [file, setfile] = useState([]);
  const [data2, setData2] = useState({
    id: "",  
    Title: "",
    description: "",
    sort_description: "",
    category: "",
  });
  const { id, Title, description, sort_description, category } = data2;

  const handleChange = (e) => {
    setData2({ ...data2, [e.target.name]: e.target.value });
  };

  // const handleFileChange = (e) => {
  //   setfile(e.target.files);
  // };

  const handleFileChange = (e) => {
    if (e.target.files) {
      // setfile({ ...file, slider_images: [...e.target.files] });
      setfile(e.target.files)
    }
    console.log("Update slider images", file);
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
      console.log("data",data)
      await getDeleteMultipride(data);
      showAlert("MultiPride Deleted Successfully","success");
      setDeleteShow(false);
      handleAllMulti();
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

  //Edit API

  const handleEditShow = (item) => {
    setData2({
      id: item.id,
      Title: item.title,
      description: item.description,
      sort_description: item.sort_description,
    });
    setShowEditModal(true);
    // console.log("item", item);
  };

  const handleEditData = async () => {
    const data = new FormData();
    for (var x = 0 ; x < file.length; x++) {
      data.append("image", file[x]);
    }
    data.append("description", description);
    data.append("title", Title);
    data.append("id",id)
    try {
      await getEditMultipride(data);
      showAlert("Multipride Edited Sucessfully","success");
      setData2(' ')
      setfile("");
      setShowEditModal(false);
      handleAllMulti();
    } catch (error) {
      showAlert("Something Went Wrong","error");
    }
  };


  //   Add API

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    for (var x = 0; x < file.length; x++) {
      data.append("multitel_pride_images", file[x]);
    }
    // [...file].forEach(image => {
    //   data.append("multitel_pride_images",image)
    // })
    data.append("description", description);
    data.append("title", Title);
    data.append("sort_description", sort_description);

    if (Title === "" || description === "") {
      setErrorMsg("Fill the Mandatory Fields");
    } else
      try {
        setButtonDisabled(true);
        await getAddMultiPride(data);
        showAlert("Added MultiPride successfully", "success");
        setData2("");
        setShow(false);
        setButtonDisabled(false);
        handleAllMulti();
      } catch (error) {
        showAlert(error.data.message, "error");
      } finally {
        setShow(false);
      }
  };

  // Add Api

  //get Api
  const handleAllMulti = async () => {
    try {
      const resp = await getAllMultiPride();
      setMulti(resp && resp.data);
      console.log("multi", resp);
    } catch (error) {
      showAlert("SOmthing went wrong", "error");
    }
  };

  useEffect(() => {
    handleAllMulti();
  }, []);

  return (
    <div id="layoutSidenavContent">
      <div className="container-fluid">
        <div class="row d-flex align-items-center justify-content-between">
          <div
            class="col-lg-12 col-md-12 text-left"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <h3 className="mt-4 mb-4">Multitel Pride</h3>
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
                <i className="fas fa-plus-circle"></i> Add New content
              </button>
              <Modal show={show} onHide={handleClose} className="add_cat_modal">
                {/* <Modal.Header closeButton>
                  <Modal.Title style={{ color: "#0076B5", marginLeft: "25px" }}>
                    Add New Category
                  </Modal.Title>
                </Modal.Header> */}

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
                    Add New content
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
                      <Form.Label>Description</Form.Label>
                      <span style={{ color: "red" }}>*</span>
                      <Form.Control
                        type="textarea"
                        value={description}
                        name="description"
                        onChange={handleChange}
                      ></Form.Control>
                      <Form.Label>Sort Description</Form.Label>
                      <span style={{ color: "red" }}>*</span>
                      <Form.Control
                        type="textarea"
                        value={sort_description}
                        name="sort_description"
                        onChange={handleChange}
                      ></Form.Control>
                      <Form.Label>Upload Image</Form.Label>{" "}
                      <Form.Control
                        multiple
                        type="file"
                        id="file"
                        accept="image/png, image/gif, image/jpeg"
                        onChange={handleFileChange}
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
                <th>Title</th>
                <th>image</th>
                {/* <th>Tags</th> */}
                {/* <th>Description</th> */}
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {Multi &&
                Multi.map((item, i) => (
                  <tr>
                    <td>{i + 1}</td>
                    <td>{item.id}</td>
                    <td>{item.title}</td>
                    {/* <td>{item.category}</td> */}
                    <td>
                      {item.multitel_pride_images &&
                        item.multitel_pride_images.map(
                          (image) => (
                            console.log(image.image, "img"),
                            (
                              <img
                                src={imageUrl(image.image)}
                                alt="No Image"
                                style={{ width: "60px" }}
                              />
                            )
                          )
                        )}
                    </td>

                    {/* <td>{item.message_tags && Tabletag(item)}</td> */}

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
                    Edit Content data
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
                      <Form.Label>Description</Form.Label>
                      <Form.Control
                        type="textarea"
                        value={description}
                        name="description"
                        onChange={handleChange}
                      ></Form.Control>
                      <Form.Label>Sort Description</Form.Label>
                      <span style={{ color: "red" }}>*</span>
                      <Form.Control
                        type="textarea"
                        value={sort_description}
                        name="sort_description"
                        onChange={handleChange}
                      ></Form.Control>
                      <Form.Label>Upload</Form.Label>{" "}
                      <Form.Control
                        multiple
                        className="form-control"
                        type="file"
                        name="image"
                        id="image"
                        accept="image/png, image/jpeg"
                        onChange={handleFileChange}
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

export default Multipride;