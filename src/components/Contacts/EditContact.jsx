import { useEffect, useState, useContext } from "react";
import { ContactContext } from "../../context/contactContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getContact, updateContact } from "../../services/contactService";
import { Spinner } from "../";

const EditContact = () => {
  const { contactId } = useParams();
  const {
    setFilteredContacts,
    contacts,
    setContacts,
    loading,
    setLoading,
    groups,
  } = useContext(ContactContext);
  const navigate = useNavigate();

  const [contact, setContact] = useState({});

  // get the data of user by mount useEffect
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data: contactData } = await getContact(contactId);
        setLoading(false);
        setContact(contactData);
      } catch (err) {
        console.log(err.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  //set the contact iformation
  const onContactChange = (event) => {
    setContact({
      ...contact,
      [event.target.name]: event.target.value,
    });
  };

  const submitForm = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const { data, status } = await updateContact(contact, contactId);

      if (status == 200) {
        setLoading(false);

        // make a copy of all the previous contacts
        const allContacts = [...contacts];
        // find the index of the edited contact
        const contactIndex = allContacts.findIndex((c) => c.id == contact.id);
        console.log(allContacts[contactIndex]);
        // update the edited contact
        allContacts[contactIndex] = { ...data };
        console.log(allContacts[contactIndex]);
        // set all the previous contacts and also the edited contact
        setContacts(allContacts);
        setFilteredContacts(allContacts);

        // after editing we want to go back to the contacts page
        navigate("/contacts");
      }
    } catch (err) {
      console.log(err.message);
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <section className="p-3">
            <div className="container">
              <div className="row my-2">
                <div className="col text-center">
                  <p
                    className="h4 fw-bold mt-3 mb-3"
                    style={{ color: "rgb(0, 191, 255)" }}
                  >
                    Edit Contact
                  </p>
                </div>
              </div>
              <hr style={{ backgroundColor: "rgb(0, 191, 255)" }} />
              <div
                className="row p-2 w-75 mx-auto align-items-center mt-5"
                style={{
                  backgroundColor: "rgb(250, 250, 250)",
                  borderRadius: "10px",
                  boxShadow: "0 1px 8px gray",
                  border: "0.1px solid white",
                }}
              >
                <div className="col-md-8 mt-3">
                  <form onSubmit={submitForm}>
                    <div className="mb-2 mt-4">
                      <input
                        name="fullname"
                        type="text"
                        className="form-control"
                        value={contact.fullname}
                        onChange={onContactChange}
                        required={true}
                        placeholder="Fullname"
                        style={{
                          borderRadius: "10px",
                          boxShadow: "0 1px 8px rgb(235, 232, 232)",
                          border: "0.1px solid white",
                        }}
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        name="photo"
                        type="text"
                        value={contact.photo}
                        onChange={onContactChange}
                        className="form-control"
                        required={true}
                        placeholder="Photo address"
                        style={{
                          borderRadius: "10px",
                          boxShadow: "0 1px 8px rgb(235, 232, 232)",
                          border: "0.1px solid white",
                        }}
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        name="mobile"
                        type="number"
                        className="form-control"
                        value={contact.mobile}
                        onChange={onContactChange}
                        required={true}
                        placeholder="Phone number"
                        style={{
                          borderRadius: "10px",
                          boxShadow: "0 1px 8px rgb(235, 232, 232)",
                          border: "0.1px solid white",
                        }}
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        name="email"
                        type="email"
                        className="form-control"
                        value={contact.email}
                        onChange={onContactChange}
                        required={true}
                        placeholder="Email address"
                        style={{
                          borderRadius: "10px",
                          boxShadow: "0 1px 8px rgb(235, 232, 232)",
                          border: "0.1px solid white",
                        }}
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        name="job"
                        type="text"
                        className="form-control"
                        value={contact.job}
                        onChange={onContactChange}
                        required={true}
                        placeholder="Job"
                        style={{
                          borderRadius: "10px",
                          boxShadow: "0 1px 8px rgb(235, 232, 232)",
                          border: "0.1px solid white",
                        }}
                      />
                    </div>
                    <div className="mb-2">
                      <select
                        name="group"
                        value={contact.group}
                        onChange={onContactChange}
                        required={true}
                        className="form-control"
                        style={{
                          borderRadius: "10px",
                          boxShadow: "0 1px 8px rgb(235, 232, 232)",
                          border: "0.1px solid white",
                          color: "black",
                        }}
                      >
                        <option value="">Choose Group</option>
                        {groups.length > 0 &&
                          groups.map((group) => (
                            <option key={group.id} value={group.id}>
                              {group.name}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div className="mb-2 mt-5">
                      <input
                        type="submit"
                        className="btn"
                        style={{
                          backgroundColor: "#50fa7b",
                          borderRadius: "10px",
                        }}
                        value="Edit Contact"
                      />
                      <Link
                        to={"/contacts"}
                        className="btn mx-2"
                        style={{
                          backgroundColor: "#ff5555",
                          borderRadius: "10px",
                        }}
                      >
                        Cancel
                      </Link>
                    </div>
                  </form>
                </div>
                <div className="col-md-4">
                  <img
                    src={contact.photo}
                    className="img-fluid rounded"
                    style={{
                      borderRadius: "6px",
                      boxShadow: "0 1px 8px gray",
                      height: "280px",
                      marginBottom: "50px",
                    }}
                  />
                </div>
              </div>
            </div>

            {/* <div className="text-center mt-5">
              <img
                src={require("../../assets/man-taking-note.png")}
                height="300px"
                style={{ opacity: "60%" }}
              />
            </div> */}
          </section>
        </>
      )}
    </>
  );
};
export default EditContact;
