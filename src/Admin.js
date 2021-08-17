import {
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { db } from "./firebase";

function Admin() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [rating, setRating] = useState("");
  const [category, setCategory] = useState("");
  const [key, setKey] = useState("");

  const [products, setProducts] = useState([]);

  function getProducts() {
    const productsRef = db.collection("products");
    productsRef.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        const productData = doc.data();
        items.push(productData);
      });
      setProducts(items);
    });
  }

  useEffect(() => {
    getProducts();
  }, []);

  const addProduct = (e) => {
    e.preventDefault();
    if (key === "naveen") {
      const productRef = db.collection("products");

      var newProductID = db.collection("products").doc();

      productRef
        .doc(`${newProductID.id}`)
        .set({
          pid: newProductID.id,
          title: title,
          description: description,
          image: image,
          price: price,
          rating: rating,
          category: category,
        })
        .then(() => {
          setTitle("");
          setDescription("");
          setImage("");
          setPrice("");
          setRating("");
          setCategory("");
          setKey("");
          console.log("Product Added Successfully");
        })
        .catch((error) => {
          console.error("Error Adding Product: ", error);
        });
    } else {
      console.log("Key is wrong");
    }
  };

  const deleteProduct = (pid) => {
    const productRef = db.collection("products");
    productRef.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // console.log(doc.data());
        const productData = doc.data();
        if (pid === doc.data().pid) {
          productRef.doc(doc.id).delete();
          console.log("Product Deleted Successfully");
        }
      });
    });
  };

  return (
    <div className="admin">
      <center>
        <h1>Add Product</h1>
      </center>
      <form>
        <TextField
          id="standard-basic"
          label="Title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ marginTop: 30 }}
        />
        <TextField
          id="standard-basic"
          label="Description"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          style={{ marginTop: 15 }}
        />
        <TextField
          id="standard-basic"
          label="Image"
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          required
          style={{ marginTop: 15 }}
        />
        <TextField
          id="standard-basic"
          label="Price"
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          style={{ marginTop: 15 }}
        />
        <TextField
          id="standard-basic"
          label="Rating"
          type="text"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          required
          style={{ marginTop: 15 }}
        />
        <FormControl>
          <InputLabel id="demo-simple-select-label">Category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Category"
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            style={{ marginTop: 15, width: 200 }}
          >
            <MenuItem value="Mobiles">Mobiles</MenuItem>
            <MenuItem value="Fashion">Fashion</MenuItem>
            <MenuItem value="Electronics">Electronics</MenuItem>
          </Select>
        </FormControl>

        <TextField
          id="standard-basic"
          label="Key"
          type="Secret Key"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          required
          style={{ marginTop: 10, marginBottom: 30 }}
        />

        <button type="submit" onClick={addProduct}>
          Add Product
        </button>
      </form>

      <div className="productsEdit">
        <center>
          <h2>My Products</h2>
        </center>
        {products.map((product, index) => {
          return (
            <div key={index} className="productName">
              {product.title}
              <button onClick={() => deleteProduct(product.pid)}>Delete</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Admin;
