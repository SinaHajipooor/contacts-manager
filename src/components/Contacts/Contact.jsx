import { Link } from "react-router-dom";

const Contact = ({ contact, deleteContact }) => {
  return (
    <div className="col-md-6">
      <div
        style={{
          backgroundColor: "rgb(250, 250, 250)",
          borderRadius: "12px",
          boxShadow: "0 1px 8px gray",
        }}
        className="card my-2"
      >
        <div className="card-body">
          <div className="row align-items-center d-flex justify-content-around">
            <div className="col-md-4 col-sm-4">
              <img
                src={contact.photo}
                alt={contact.fullname}
                style={{
                  borderRadius: "6px",
                  boxShadow: "0 1px 8px gray",
                }}
                className="img-fluid rounded"
              ></img>
            </div>
            <div className="col-md-7 col-sm-7">
              <ul className="list-group">
                <li
                  className="list-group-item list-group-item-dark"
                  style={{
                    backgroundColor: "rgb(235, 232, 232)",
                    border: "0.1px solid white",
                    borderRadius: "6px",
                    boxShadow: "0 1px 8px gray",
                  }}
                >
                  fullname : <span className="fw-bold">{contact.fullname}</span>
                </li>
                <li
                  className="list-group-item list-group-item-dark"
                  style={{
                    backgroundColor: "rgb(235, 232, 232)",
                    border: "0.1px solid white",
                    borderRadius: "6px",
                    boxShadow: "0 1px 8px gray",
                  }}
                >
                  phone number :{" "}
                  <span className="fw-bold">{contact.mobile}</span>
                </li>{" "}
                <li
                  className="list-group-item list-group-item-dark"
                  style={{
                    backgroundColor: "rgb(235, 232, 232)",
                    border: "0.1px solid white",
                    borderRadius: "6px",
                    boxShadow: "0 1px 8px gray",
                  }}
                >
                  Email Address :{" "}
                  <span className="fw-bold">{contact.email}</span>
                </li>
              </ul>
            </div>
            <div className="col-md-1 col-sm-1 d-flex flex-column align-items-center">
              {/* to see the contact */}
              <Link
                to={`/contacts/${contact.id}`}
                className="btn my-2"
                style={{ backgroundColor: "#ffb86c" }}
              >
                <i className="fa fa-eye" />
              </Link>
              {/* to edit contact */}
              <Link
                to={`/contacts/edit/${contact.id}`}
                className="btn my-2"
                style={{ backgroundColor: "#8be9fd" }}
              >
                <i className="fa fa-pen" />
              </Link>
              {/* to delet contact */}
              <button
                className="btn my-2"
                style={{ backgroundColor: "#ff5555" }}
                //  use the confirm function that we declare in App.js and also we initialize it in the contacts component
                onClick={deleteContact}
              >
                <i className="fa fa-trash" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
