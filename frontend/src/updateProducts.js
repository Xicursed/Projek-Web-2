import Header from "./header";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function UpdateProducts() {
  const { id } = useParams(); // Get the product ID from the route parameters
  const navigate = useNavigate(); // Initialize useNavigate

  const [name, setName] = useState("");
  const [file, setFile] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [data, setData] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        let result = await fetch(`http://localhost:8000/api/product/${id}`);
        result = await result.json();
        setData(result);
        setName(result.name);
        setPrice(result.price);
        setDescription(result.description);
        setFile(result.file_path);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    }

    fetchData();
  }, [id]);

  async function editProduct() {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("price", price);
    formData.append("name", name);
    formData.append("description", description);

    try {
      let result = await fetch(
        `http://localhost:8000/api/updateproduct/${id}?_method=PUT`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (result.ok) {
        alert("Product has been updated!");
        navigate("/"); // Redirect to home page after update
      } else {
        alert("Failed to update product.");
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  }

  return (
    <div>
      <Header />
      <h1>Update Products</h1>
      <div className="col-sm-6 offset-sm-3">
        <br />
        <input
          className="form-control"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <input
          className="form-control"
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <br />
        <textarea
          className="form-control"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <br />
        <input
          className="form-control"
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <br />
        {data.file_path && (
          <img
            width="50%"
            height="50%"
            src={`http://localhost:8000/${data.file_path}`}
            alt="Product"
          />
        )}
        <br />
        <br />
        <button className="btn btn-danger" onClick={editProduct}>
          Update Product
        </button>
      </div>
    </div>
  );
}

export default UpdateProducts;
