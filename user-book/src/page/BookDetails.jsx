import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import "./BookDetails.css";

const apiUrl = import.meta.env.VITE_API_URL;

function BookDetails() {
  const { id } = useParams();

  const [book, setBook] = useState(null);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);

  // Get book details from backend
  useEffect(() => {
    axios
      .get(`${apiUrl}/book/${id}`)
      .then((response) => {
        setBook(response.data.data);
      })
      .catch(() => {
        setError("Unable to load this book.");
      });
  }, [id]);

  // Quantity
  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  // Add to Cart
  const handleAddToCart = () => {
    const oldCart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingBook = oldCart.find(
      (item) => item._id === book._id
    );

    let newCart;

    if (existingBook) {
      newCart = oldCart.map((item) => {
        if (item._id === book._id) {
          return {
            ...item,
            quantity: (item.quantity || 1) + quantity,
          };
        }
        return item;
      });
    } else {
      newCart = [
        ...oldCart,
        {
          ...book,
          quantity,
        },
      ];
    }

    localStorage.setItem("cart", JSON.stringify(newCart));
    alert("Book added to cart 🛒");
  };

  if (error) {
    return (
      <Container className="book-message">
        <h3>Book Not Found</h3>
        <p>{error}</p>
        <Button as={Link} to="/books" variant="dark">
          Back to Books
        </Button>
      </Container>
    );
  }

  if (!book) {
    return (
      <Container className="book-message">
        <h3>Loading Book...</h3>
      </Container>
    );
  }

  const title = book.bookTitle || book.bookTittle || "Book";
  const price = book.originalPrice ?? book.price;

  // All available book information
  const bookFields = [
    ["Imprint", book.imprint],
    ["Publication Year", book.publicationYear || book.publication],
    ["Product From", book.productFrom],
    ["Publisher", book.publisher],
    ["Genre", book.genre],
    ["ISBN No", book.isbnNo],
    ["Book Category", book.bookCategory],
    ["Book Sub Category", book.bookSubCategory],
    ["Edition", book.edition],
    ["Language", book.language],
    ["Country of Origin", book.countryOfOrigin],
    ["Manufacturer", book.nameOfManufacturer],
    ["Manufacturer Address", book.addressOfManufacturer],
    ["Packager", book.nameOfPackager],
    ["Packager Address", book.addressOfPackager],
  ].filter(
    ([, value]) =>
      value !== undefined &&
      value !== null &&
      value !== ""
  );

  return (
    <section className="book-details-page">
      <Container fluid="xl">

        {/* Breadcrumb */}
        <div className="book-breadcrumb">
          <Link to="/">Home</Link>
          <span>›</span>
          <Link to="/books">Books</Link>
          <span>›</span>
          <strong>{title}</strong>
        </div>

        {/* MAIN PRODUCT LAYOUT */}
        <div className="product-layout">

          {/* LEFT SIDE: PRODUCT IMAGE */}
          <div className="product-gallery">

            <div className="gallery-thumbnails">
              <div className="thumbnail active">
                <img
                  src={book.bookImage}
                  alt={title}
                />
              </div>
            </div>

            <div className="main-book-image">
              <span className="featured-label">
                ★ Featured
              </span>

              <img
                src={book.bookImage}
                alt={title}
              />

              <div className="image-caption">
                <span>📖</span>
                A story waiting to be discovered
              </div>
            </div>

          </div>

          {/* RIGHT SIDE: ALL PRODUCT DETAILS */}
          <div className="product-information">

            <div className="product-heading">
              <span className="product-category">
                {book.bookCategory || "BOOK COLLECTION"}
              </span>

              <h1>{title}</h1>

              {book.authorName && (
                <p className="product-author">
                  By <strong>{book.authorName}</strong>
                </p>
              )}

              {/* Rating: show only when actual rating exists */}
              {book.rating && (
                <div className="product-rating">
                  <span className="rating-stars">★★★★★</span>
                  <strong>{book.rating}</strong>
                  {book.reviews && (
                    <span>({book.reviews} reviews)</span>
                  )}
                </div>
              )}
            </div>

            <div className="product-line" />

            {/* DESCRIPTION ON RIGHT SIDE */}
            {book.shortDescription && (
              <div className="right-description">
                <h5>About This Book</h5>
                <p>{book.shortDescription}</p>
              </div>
            )}

            {book.description && (
              <div className="right-description">
                <h5>Book Description</h5>
                <p>{book.description}</p>
              </div>
            )}

            {/* PRICE */}
            <div className="product-price-section">
              <span className="price-caption">Price</span>

              <div className="price-display">
                <strong>₹{price}</strong>

                {book.discount && (
                  <span className="discount-label">
                    {book.discount}% OFF
                  </span>
                )}
              </div>
            </div>

            {/* QUANTITY AND STOCK */}
            <div className="purchase-information">

              <div className="quantity-section">
                <label>Quantity</label>

                <div className="quantity-selector">
                  <button
                    type="button"
                    onClick={decreaseQuantity}
                    disabled={quantity === 1}
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>

                  <span>{quantity}</span>

                  <button
                    type="button"
                    onClick={increaseQuantity}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="stock-information">
                <span className="stock-dot" />
                <div>
                  <strong>Available for purchase</strong>
                  <small>Order your copy today</small>
                </div>
              </div>

            </div>

            {/* BUTTONS */}
            <div className="product-buttons">

              <Button
                className="add-cart-button"
                onClick={handleAddToCart}
              >
                🛒 Add to Cart
              </Button>

              <Button
                as={Link}
                to="/checkout"
                state={{
                  book: book,
                  quantity: quantity,
                }}
                className="buy-now-button"
              >
                Buy Now <span>→</span>
              </Button>

            </div>

            {/* ALL BOOK SPECIFICATIONS ON RIGHT */}
            {bookFields.length > 0 && (
              <div className="right-book-specifications">

                <div className="specification-heading">
                  <span>📚</span>
                  <h4>Product Details</h4>
                </div>

                <div className="right-specification-list">
                  {bookFields.map(([label, value]) => (
                    <div
                      className="right-specification-row"
                      key={label}
                    >
                      <span>{label}</span>
                      <strong>{value}</strong>
                    </div>
                  ))}
                </div>

              </div>
            )}

            {/* DELIVERY INFORMATION */}
            <div className="delivery-features">
              <div>
                <span>🔒</span>
                <p>Secure Payment</p>
              </div>

              <div>
                <span>📦</span>
                <p>Safe Packaging</p>
              </div>

              <div>
                <span>🚚</span>
                <p>Delivery Available</p>
              </div>
            </div>

          </div>
        </div>

      </Container>
    </section>
  );
}

export default BookDetails;