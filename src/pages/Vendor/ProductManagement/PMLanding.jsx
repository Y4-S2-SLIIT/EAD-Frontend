import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import ProductService from "../../../services/Product.Service";

const PMLanding = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch products by vendor ID
    ProductService.getProductsByVendorId(localStorage.getItem("erp-vendorId"))
      .then((response) => {
        setProducts(response);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  // Filter products based on search term
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleAddProductClick = () => {
    navigate("../add-product");
  };

  const handleEditProductClick = (id) => {
    navigate(`../edit-product/${id}`);
  };

  const deleteProduct = (id) => {
    // Show SweetAlert confirmation dialog
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        ProductService.deleteProduct(id)
          .then(() => {
            Swal.fire("Deleted!", "The product has been deleted.", "success");
            // Update the product list after deletion
            setProducts((prevProducts) =>
              prevProducts.filter((product) => product.id !== id)
            );
          })
          .catch((error) => {
            console.error("Error deleting product:", error);
            Swal.fire(
              "Error!",
              "There was an issue deleting the product.",
              "error"
            );
          });
      }
    });
  };

  return (
    <div className="container">
      <h2>Product Management</h2>

      <div className="mb-3">
        <button className="btn btn-primary" onClick={handleAddProductClick}>
          Add New Product
        </button>
      </div>

      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search Products"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      <div className="product-list">
        {filteredProducts.length > 0 ? (
          filteredProducts
            .slice()
            .reverse()
            .map((product) => (
              <div key={product.id} className="card mb-3">
                <div className="row g-0">
                  <div className="col-md-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="img-fluid rounded-start"
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title">{product.name}</h5>
                      <p className="card-text">
                        <strong>Brand:</strong> {product.brand}
                      </p>
                      <p className="card-text">
                        <strong>Description:</strong> {product.description}
                      </p>
                      <p className="card-text">
                        <strong>Price:</strong> ${product.price}
                      </p>
                      <p className="card-text">
                        <strong>Stock:</strong> {product.stock}
                      </p>
                      <p className="card-text">
                        <strong>Category:</strong>{" "}
                        {product.category?.name || "N/A"}
                      </p>

                      <div className="d-flex justify-content-end">
                        <button
                          className="btn btn-warning me-2"
                          onClick={() => handleEditProductClick(product.id)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => deleteProduct(product.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default PMLanding;
