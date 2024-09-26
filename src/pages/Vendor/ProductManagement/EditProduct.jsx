import React, { useState, useEffect } from "react";
import { storage } from "../../../../firebase"; // Import storage from your Firebase config
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid"; // Importing uuid for unique file naming
import CategoryService from "../../../services/Category.Service";
import ProductService from "../../../services/Product.Service";
import Swal from "sweetalert2"; // SweetAlert2 for user-friendly alerts";
import { useNavigate, useParams } from "react-router-dom"; // To get the product ID from the URL

const EditProduct = () => {
  const { id } = useParams(); // Getting the product ID from URL parameters
  const [product, setProduct] = useState({
    name: "",
    brand: "",
    description: "",
    categoryId: "",
    price: 0,
    image: "", // Initialize with empty string to allow for existing URL
    stock: 0,
    vendorId: localStorage.getItem("erp-vendorId"), // Assuming vendorId is stored in localStorage
  });

  const [categories, setCategories] = useState([]); 
  const [imageFile, setImageFile] = useState(null); // State to store image file
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

  // Handling image file change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file); // Store the new image file
    } else {
      Swal.fire("Warning", "Please select a valid image file.", "warning");
    }
  };

  // Handle category change
  const handleCategoryChange = (e) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      categoryId: e.target.value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (imageFile) {
      const storageRef = ref(storage, `products/${uuidv4() + imageFile.name}`);
      const uploadTask = uploadBytesResumable(storageRef, imageFile);

      uploadTask.on(
        "state_changed",
        null,
        (error) => {
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
              Swal.fire({
                icon: "success",
                title: "Product Updated",
                text: "Your product has been successfully updated!",
                showConfirmButton: false,
                timer: 1500,
              }).then(() => {
                window.location.href = "../product-management"; // Redirect to product management
              });
            })
            .catch((error) => {
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
          Swal.fire({
            icon: "success",
            title: "Product Updated",
            text: "Your product has been successfully updated!",
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            window.location.href = "../product-management"; // Redirect to product management
          });
        })
        .catch((error) => {
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
            
          />
        </div>

        {/* Category */}
        <div className="mb-3">
          <label htmlFor="categoryId" className="form-label">Category</label>
          <select
            className="form-select"
            id="categoryId"
            name="categoryId"
            value={product.categoryId}
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
          <input
            type="file"
            className="form-control"
            id="image"
            name="image"
            onChange={handleImageChange}
            accept="image/*"
          />
          {product.image && <img src={product.image} alt="Product" style={{ width: "100px", marginTop: "10px" }} />}
        </div>

        {/* Stock */}
        <div className="mb-3">
          <label htmlFor="stock" className="form-label">Available Stock</label>
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

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary">
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
