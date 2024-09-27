import React, { useState, useEffect } from "react";
import { storage } from "../../../../firebase"; // Import storage from your Firebase config
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid"; // Importing uuid for unique file naming
import CategoryService from "../../../services/Category.Service";
import ProductService from "../../../services/Product.Service";
import Swal from "sweetalert2"; // SweetAlert2 for user-friendly alerts
import { useNavigate, useParams } from "react-router-dom"; // To get the product ID from the URL

const EditProduct = () => {
  const { id } = useParams(); // Getting the product ID from URL parameters
  const [product, setProduct] = useState({
    name: "",
    brand: "",
    description: "",
    category: null, // Changed from categoryId to category object
    price: 0,
    image: "", // Initialize with empty string to allow for existing URL
    stock: 0,
    vendorId: localStorage.getItem("erp-vendorId"), // Assuming vendorId is stored in localStorage
  });

  const [categories, setCategories] = useState([]);
  const [imageFile, setImageFile] = useState(null); // State to store image file
  const [imagePreview, setImagePreview] = useState(""); // State to store the image preview URL
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  useEffect(() => {
    // Fetching categories when component mounts
    CategoryService.getAllCategories()
      .then((response) => {
        setCategories(response);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });

    // Fetching existing product details for editing
    ProductService.getProductById(id)
      .then((response) => {
        setProduct(response); // Set the fetched product to state
        setImagePreview(response.image); // Set the existing product image for preview
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
        Swal.fire({
          icon: "error",
          title: "Fetch Product Failed",
          text: "There was an error fetching the product details. Please try again.",
        });
      });
  }, [id]); // Dependency on product ID to refetch data if it changes

  // Handling form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  // Handling image file change and preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file); // Store the new image file
      setImagePreview(URL.createObjectURL(file)); // Show a preview of the new image
    } else {
      Swal.fire("Warning", "Please select a valid image file.", "warning");
    }
  };

  // Handle category change
  const handleCategoryChange = (e) => {
    const selectedCategory = categories.find((cat) => cat.id === e.target.value);
    setProduct((prevProduct) => ({
      ...prevProduct,
      category: selectedCategory, // Set the entire category object
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when submitting

    if (imageFile) {
      const storageRef = ref(storage, `products/${uuidv4() + imageFile.name}`);
      const uploadTask = uploadBytesResumable(storageRef, imageFile);

      uploadTask.on(
        "state_changed",
        null,
        (error) => {
          setLoading(false); // Set loading to false on error
          console.error("Error uploading file:", error);
          Swal.fire({
            icon: "error",
            title: "Image Upload Failed",
            text: "There was an issue uploading the image. Please try again.",
          });
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          const updatedProductData = {
            ...product,
            image: downloadURL,
          };

          // Submit updated product data to backend
          ProductService.updateProduct(id, updatedProductData)
            .then(() => {
              setLoading(false); // Set loading to false on success
              Swal.fire({
                icon: "success",
                title: "Product Updated",
                text: "Your product has been successfully updated!",
                showConfirmButton: false,
                timer: 1500,
              }).then(() => {
                navigate("../product-management"); // Redirect to product management
              });
            })
            .catch((error) => {
              setLoading(false); // Set loading to false on error
              console.error("Error updating product:", error);
              Swal.fire({
                icon: "error",
                title: "Product Update Failed",
                text: "There was an error updating the product. Please try again.",
              });
            });
        }
      );
    } else {
      // If no new image is uploaded, retain the existing image URL
      const updatedProductData = {
        ...product,
        image: product.image, // Keep the previous image URL
      };

      // Submit updated product data to backend
      ProductService.updateProduct(id, updatedProductData)
        .then(() => {
          setLoading(false); // Set loading to false on success
          Swal.fire({
            icon: "success",
            title: "Product Updated",
            text: "Your product has been successfully updated!",
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            navigate("../product-management"); // Redirect to product management
          });
        })
        .catch((error) => {
          setLoading(false); // Set loading to false on error
          console.error("Error updating product:", error);
          Swal.fire({
            icon: "error",
            title: "Product Update Failed",
            text: "There was an error updating the product. Please try again.",
          });
        });
    }
  };

  return (
    <div className="container">
      {/* Loading Spinner from Bootstrap */}
      {loading && (
        <div className="position-fixed top-0 start-0 w-100 h-100 bg-light d-flex justify-content-center align-items-center" style={{ zIndex: 1050 }}>
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
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

        {/* Brand */}
        <div className="mb-3">
          <label htmlFor="brand" className="form-label">Brand</label>
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

        {/* Description */}
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={product.description}
            onChange={handleChange}
            required
          />
        </div>

        {/* Category */}
        <div className="mb-3">
          <label htmlFor="category" className="form-label">Category</label>
          <select
            className="form-select"
            id="category"
            name="category"
            value={product.category?.id || ""} // Adjusting for category object
            onChange={handleCategoryChange}
            required
          >
            <option value="" disabled>Select a Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Price */}
        <div className="mb-3">
          <label htmlFor="price" className="form-label">Price per Unit</label>
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

        {/* Product Image */}
        <div className="mb-3">
          <label htmlFor="image" className="form-label">Product Image</label>
          {imagePreview && (
            <div className="mb-3">
              <img src={imagePreview} alt="Product Preview" style={{ width: "150px", height: "auto" }} />
            </div>
          )}
          <input
            type="file"
            className="form-control"
            id="image"
            onChange={handleImageChange}
            accept="image/*"
          />
        </div>

        {/* Stock */}
        <div className="mb-3">
          <label htmlFor="stock" className="form-label">Stock Quantity</label>
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

        <button type="submit" className="btn btn-primary">Update Product</button>
      </form>
    </div>
  );
};

export default EditProduct;
