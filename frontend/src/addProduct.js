import Header from "./header";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Replace useHistory with useNavigate

function AddProducts() {
  const [name, setName] = useState("");
  const [file, setFile] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  async function addProduct() {
    console.warn(name, file, price, description);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("price", price);
    formData.append("name", name);
    formData.append("description", description);

    try {
      let result = await fetch("http://localhost:8000/api/addProduct", {
        method: "POST",
        body: formData,
      });
      if (result.ok) {
        alert("Product added successfully!");
        navigate("/"); // Redirect to home page
      } else {
        alert("Failed to add product.");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      alert("An error occurred while adding the product.");
    }
  }

  return (
    <div>
      <Header />
      <h1>Add Products</h1>
      <div className="col-sm-6 offset-sm-3">
        <br />
        <input
          type="text"
          className="form-control"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <input
          type="file"
          className="form-control"
          placeholder="File"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <br />
        <input
          type="text"
          className="form-control"
          placeholder="Price"
          onChange={(e) => setPrice(e.target.value)}
        />
        <br />
        <textarea
          className="form-control"
          placeholder="Description"
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <br />
        <button className="btn btn-primary" onClick={addProduct}>
          Add Product
        </button>
      </div>
    </div>
  );
}

export default AddProducts;
