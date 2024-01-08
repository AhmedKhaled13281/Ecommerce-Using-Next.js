import React , {useRef, useState} from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { IoMdAddCircleOutline } from "react-icons/io";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import AddForm from "./AddForm";
import ToastUI from "../UI/ToastUI";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../config/firebaseConfig";


const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      ADD PRODUCT
    </Tooltip>
  );

const ModalProduct = ({ show, handleClose, handleShow , categories }) => {
  const [showToast , setShowToast] = useState(false)
  const [validated, setValidated] = useState(false);
  const productNameRef = useRef()
  const descriptionRef = useRef()
  const priceRef = useRef()
  const [images , setImages] = useState([])
  const [imageUrls, setImageUrls] = useState([]);
  const [dropDownValue , setDropDownValue] = useState('')

  const handleDropDownInput = (e) => {
    setDropDownValue(e.target.value);
  };

  const handle = async (e) => {
    e.preventDefault()
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    setValidated(true);
    const title = productNameRef.current.value
    const description = descriptionRef.current.value
    const price = priceRef.current.value
    const data = {title , description , price , imageUrls , category : dropDownValue}
    const hasNonEmptyValues = Object.values(data).every(
      (value) => !!value)

    if(data.title && data.description && data.imageUrls.length > 0 && data.price && data.category){
        //console.log(data);
        const res = await fetch('/api/products/productApi' , {
            method : "POST",
            body : JSON.stringify(data),
            headers : {'Content-Type' : 'application/json'}
        })
        const ff= await res.json()
        console.log(ff);
        setImages([])
        setImageUrls([])
        handleClose()
        setShowToast(true)
        console.log(data);
    }

  }
  // Handle Upload Image
  const handleImageChange = async (e) => {
    const files = e.target.files;

    if (files.length > 0) {
      const newImages = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setImages((prevImages) => [...prevImages, ...newImages]);

      const imageRef = ref(storage, `images/${files[0].name + Date.now()}`);
      try {
        const snapshot = await uploadBytes(imageRef, files[0]);
        const url = await getDownloadURL(snapshot.ref);

        // Use the URL as needed, e.g., store it in state or perform further actions
        setImageUrls((prev) => [...prev, url]);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const handleDeleteImage = (index) => {
    const updatedImages = [...images];
    const updatedImagesUrls = [...imageUrls];
    updatedImagesUrls.splice(index, 1);
    updatedImages.splice(index, 1);

    setImages(updatedImages);
    setImageUrls(updatedImagesUrls);
  };


  return (
    <>
      <OverlayTrigger
        placement="left"
        delay={{ show: 250, hide: 400 }}
        overlay={renderTooltip}
      >
        <Button
          variant="success"
          onClick={handleShow}
          className="position-fixed bottom-0 end-0 translate-middle rounded-5 p-3"
        >
          <IoMdAddCircleOutline className="fs-2" />
        </Button>
      </OverlayTrigger>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>New Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddForm
            validated={validated}
            handleSubmit={handle}
            productNameRef={productNameRef}
            descriptionRef={descriptionRef}
            priceRef={priceRef}
            images={images}
            handleImageChange={handleImageChange}
            handleDeleteImage={handleDeleteImage}
            categories={categories}
            handleDropDownInput={handleDropDownInput}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={handle}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastUI show={showToast} handleClose={setShowToast} />
    </>
  );
};

export default ModalProduct;
