import React from "react";
import Contact from "./Contact";
import Spinner from "../Spinner";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ContactContext } from "../../context/contactContext";
import { useLocation } from "react-router-dom";

const Contacts = () => {
  const location = useLocation();

  // store the resault of context (just the parts that we need)
  const { filteredContacts, loading, deleteContact } =
    useContext(ContactContext);

  return (
    <>
      <section className="container">
        <div className="grid">
          <div className="row">
            <div className="col">
              <p className="h3 float-start">
                {location.pathname == "/contacts" ? (
                  <Link
                    to={"/contacts/add"}
                    className="btn mt-3"
                    style={{ backgroundColor: "#50fa7b", borderRadius: "10px" }}
                  >
                    {" "}
                    New Contact
                    <i className="fa fa-plus-circle mx-2" />
                  </Link>
                ) : null}
              </p>
            </div>
          </div>
        </div>
      </section>

      {loading ? (
        <Spinner />
      ) : (
        <section className="container">
          <div className="row">
            {/* contacts  */}
            {filteredContacts.length > 0 ? (
              filteredContacts.map((c) => (
                <Contact
                  key={c.id}
                  // here we initialize the deleteContact in the loop for each of the contacts
                  deleteContact={() => deleteContact(c.id, c.fullname)}
                  contact={c}
                />
              ))
            ) : (
              <div
                className="text-center py-5"
                style={{ backgroundColor: "white" }}
              >
                <img
                  src={require("../../assets/no-found.gif")}
                  alt="NOT FOUND"
                  className="w-25"
                ></img>
                <p className="h3" style={{ color: "red", marginTop: "50px" }}>
                  NOT FOUND !!
                </p>
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default Contacts;
