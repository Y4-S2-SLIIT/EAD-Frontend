import React, { useState, useEffect } from "react";
import { storage } from "../../../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import CategoryService from "../../../services/Category.Service";
import ProductService from "../../../services/Product.Service";
import Swal from "sweetalert2";

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    brand: "",
    description: "",
    category: null,
    price: 0,
    image: null,
    stock: 0,
    vendorId: localStorage.getItem("erp-vendorId"),
  });

  const [categories, setCategories] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null); // State for image preview
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    CategoryService.getAllCategories()
      .then((response) => {
        setCategories(response);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file)); // Generate the image preview URL
    } else {
      Swal.fire("Warning", "Please select a valid image file.", "warning");
    }
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = categories.find(
      (cat) => cat.id === e.target.value
    );
    setProduct((prevProduct) => ({
      ...prevProduct,
      category: selectedCategory,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    if (imageFile) {
      const storageRef = ref(storage, `products/${uuidv4() + imageFile.name}`);
      const uploadTask = uploadBytesResumable(storageRef, imageFile);

      uploadTask.on(
        "state_changed",
        null,
        (error) => {
          setLoading(false);
          console.error("Error uploading file:", error);
          Swal.fire({
            icon: "error",
            title: "Image Upload Failed",
            text: "There was an issue uploading the image. Please try again.",
          });
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          const productData = {
            ...product,
            image: downloadURL,
          };

          ProductService.addProduct(productData)
            .then(() => {
              setLoading(false);
              Swal.fire({
                icon: "success",
                title: "Product Added",
                text: "Your product has been successfully added!",
                showConfirmButton: false,
                timer: 1500,
              }).then(() => {
                window.location.href = "./product-management";
              });
            })
            .catch((error) => {
              setLoading(false);
              console.error("Error adding product:", error);
              Swal.fire({
                icon: "error",
                title: "Product Submission Failed",
                text: "There was an error adding the product. Please try again.",
              });
            });
        }
      );
    } else {
      setLoading(false);
      Swal.fire({
        icon: "warning",
        title: "No Image Selected",
        text: "Please select an image file to upload.",
      });
    }
  };

  return (
    <div className="container">
      {loading && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 bg-light d-flex justify-content-center align-items-center"
          style={{ zIndex: 1050 }}
        >
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      <h2>Add New Product</h2>
      <div style={{ maxHeight: "75vh", overflowY: "auto" }}>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={product.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="brand" className="form-label">
              Brand
            </label>
            <input
              type="text"
              className="form-control"
              id="brand"
              name="brand"
              value={product.brand}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              value={product.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="category" className="form-label">
              Category
            </label>
            <select
              className="form-select"
              id="category"
              name="category"
              value={product.category?.id || ""}
              onChange={handleCategoryChange}
              required
            >
              <option value="" disabled>
                Select a Category
              </option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="price" className="form-label">
              Price per Unit
            </label>
            <input
              type="number"
              className="form-control"
              id="price"
              name="price"
              value={product.price}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="image" className="form-label">
              Product Image
            </label>
            <input
              type="file"
              className="form-control"
              id="image"
              name="image"
              onChange={handleImageChange}
              required
              accept="image/*"
            />
          </div>

          {/* Image Preview */}
          {previewUrl && (
            <div className="mb-3">
              <div>
                <img
                  src={previewUrl}
                  alt="Product Preview"
                  className="img-fluid"
                  style={{ maxWidth: "300px" }}
                />
              </div>
            </div>
          )}

          <div className="mb-3">
            <label htmlFor="stock" className="form-label">
              Available Stock
            </label>
            <input
              type="number"
              className="form-control"
              id="stock"
              name="stock"
              value={product.stock}
              onChange={handleChange}
              required
              min="0"
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
