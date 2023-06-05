import { useState, useEffect } from "react";

import { useContext } from "react";
import { ContactContext } from "../../context/contactContext";
import { Link, useParams } from "react-router-dom";

import { getContact, getGroup } from "../../services/contactService";
import { Spinner } from "../";
// import { CURRENTLINE, CYAN, PURPLE } from "../../helpers/colors";

const ViewContact = () => {
  // contactId was declared in the route path in App.js
  const { contactId } = useParams();
  // store all the variables in state it isnt a good way because when we are settingt a new value to one of we need to set the other again if we dont do that , they will be removed
  const [state, setState] = useState({
    contact: {},
    group: {},
  });

  const { loading, setLoading } = useContext(ContactContext);

  // to get the data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data: contactData } = await getContact(contactId);
        const { data: groupData } = await getGroup(contactData.group);

        setLoading(false);

        setState({
          ...state,
          contact: contactData,
          group: groupData,
        });
      } catch (err) {
        console.log(err.message);
        setLoading(false);
      }
    };
    //cal the function
    fetchData();
  }, []);

  // take all the variables out if our main state
  const { contact, group } = state;

  return (
    <>
      <section className="view-contact-intro p3">
        <div className="container">
          <div className="row my-2 text-center">
            <p
              className="h3 fw-bold"
              style={{ color: "rgb(0, 191, 255)", marginTop: "25px" }}
            >
              Contact information
            </p>
          </div>
        </div>
      </section>

      <hr style={{ backgroundColor: "rgb(0, 191, 255)" }} />

      {loading ? (
        <Spinner />
      ) : (
        <>
          {/* here we want to check of the array has some values or not (because maybe the use had edited the url and an he shouldn see anything if there is no value in the array ) */}
          {Object.keys(contact).length > 0 && (
            <section className="view-contact mt-5">
              <div
                className="row w-50 mx-auto align-items-center mt-5"
                style={{
                  backgroundColor: "rgb(250, 250, 250)",
                  borderRadius: "10px",
                  boxShadow: "0 1px 8px gray",
                  border: "0.1px solid white",
                  padding: "25px",
                }}
              >
                <div
                  className="container p-2"
                  style={{ borderRadius: "1em", backgroundColor: "white" }}
                >
                  <div className="row align-items-center">
                    <div className="col-md-4 mb-4">
                      <img
                        src={contact.photo}
                        alt=""
                        className="img-fluid rounded "
                        style={{
                          borderRadius: "6px",
                          boxShadow: "0 1px 8px gray",
                          height: "230px",
                          marginTop: "50px",
                          marginLeft: "10px",
                        }}
                      />
                    </div>
                    <div className="col-md-8 mt-3">
                      <ul className="list-group">
                        <li
                          className="list-group-item list-group-item-dark"
                          style={{
                            backgroundColor: "rgb(235, 232, 232)",
                            borderRadius: "6px",
                            boxShadow: "0 1px 8px gray",
                          }}
                        >
                          Fullname :{" "}
                          <span className="fw-bold">{contact.fullname}</span>
                        </li>
                        <li
                          className="list-group-item list-group-item-dark"
                          style={{
                            backgroundColor: "rgb(235, 232, 232)",
                            borderRadius: "6px",
                            boxShadow: "0 1px 8px gray",
                          }}
                        >
                          Phone number:{" "}
                          <span className="fw-bold">{contact.mobile}</span>
                        </li>
                        <li
                          className="list-group-item list-group-item-dark"
                          style={{
                            backgroundColor: "rgb(235, 232, 232)",
                            borderRadius: "6px",
                            boxShadow: "0 1px 8px gray",
                          }}
                        >
                          Email :{" "}
                          <span className="fw-bold">{contact.email}</span>
                        </li>
                        <li
                          className="list-group-item list-group-item-dark"
                          style={{
                            backgroundColor: "rgb(235, 232, 232)",
                            borderRadius: "6px",
                            boxShadow: "0 1px 8px gray",
                          }}
                        >
                          Job : <span className="fw-bold">{contact.job}</span>
                        </li>
                        <li
                          className="list-group-item list-group-item-dark"
                          style={{
                            backgroundColor: "rgb(235, 232, 232)",
                            borderRadius: "6px",
                            boxShadow: "0 1px 8px gray",
                          }}
                        >
                          Group : <span className="fw-bold">{group.name}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="row my-2">
                    <div className="d-grid mb-2 mt-3 w-50 gap-2 col-6 mx-auto align-center">
                      <Link
                        to={"/contacts"}
                        className="btn"
                        style={{
                          backgroundColor: "#8be9fd",
                          // padding: "auto",
                          borderRadius: "6px",
                          boxShadow: "0 1px 8px gray",
                          marginLeft: "270px",
                        }}
                      >
                        Back
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}
        </>
      )}
    </>
  );
};

export default ViewContact;
