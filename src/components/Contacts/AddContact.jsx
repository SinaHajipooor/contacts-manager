import { Link } from "react-router-dom";
import { useContext } from "react";
import { ContactContext } from "../../context/contactContext";
import { Spinner } from "../";
// import { COMMENT, GREEN, PURPLE } from "../../helpers/colors";

const AddContact = () => {
  const { loading, contact, onContactChange, groups, createContact } =
    useContext(ContactContext);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <section className="p-3">
            <img
              src={require("../../assets/man-taking-note.png")}
              height="400px"
              style={{
                position: "absolute",
                marginLeft: "500px",
                marginTop: "75px",
                zIndex: "-1",
                top: "130px",
                left: "100px",
                opacity: "70%",
              }}
            />
            <div className="row">
              <div className="col">
                <p
                  className="h4 fw-bold text-center"
                  style={{ color: "rgb(0,191,255)", marginTop: "40px" }}
                >
                  Creaet new contact
                </p>
              </div>
            </div>
            <hr style={{ color: "rgb(0, 191, 255)" }} />

            <div className="container" style={{ marginTop: "110px" }}>
              <div className="row mt-5">
                <div className="col-md-4">
                  <form onSubmit={createContact}>
                    <div className="mb-2">
                      <input
                        name="fullname"
                        type="text"
                        value={contact.fullname}
                        onChange={onContactChange}
                        className="form-control"
                        placeholder="Fullname"
                        required={true}
                        style={{
                          borderRadius: "10px",
                          boxShadow: "0 1px 8px rgb(235, 234, 234)",
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
                        placeholder="Image address"
                        style={{
                          borderRadius: "10px",
                          boxShadow: "0 1px 8px rgb(235, 234, 234)",
                        }}
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        name="mobile"
                        type="number"
                        value={contact.mobile}
                        onChange={onContactChange}
                        className="form-control"
                        required={true}
                        placeholder="Phone number"
                        style={{
                          borderRadius: "10px",
                          boxShadow: "0 1px 8px rgb(235, 234, 234)",
                        }}
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        type="email"
                        name="email"
                        value={contact.email}
                        onChange={onContactChange}
                        className="form-control"
                        required={true}
                        placeholder="Email address"
                        style={{
                          borderRadius: "10px",
                          boxShadow: "0 1px 8px rgb(235, 234, 234)",
                        }}
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        type="text"
                        name="job"
                        value={contact.job}
                        onChange={onContactChange}
                        className="form-control"
                        required={true}
                        placeholder="Job"
                        style={{
                          borderRadius: "10px",
                          boxShadow: "0 1px 8px rgb(235, 234, 234)",
                        }}
                      />
                    </div>
                    <div className="mb-2">
                      <select
                        style={{
                          color: "#6c757d",
                          borderRadius: "10px",
                          boxShadow: "0 1px 8px rgb(235, 234, 234)",
                        }}
                        name="group"
                        value={contact.group}
                        onChange={onContactChange}
                        required={true}
                        className="form-control"
                      >
                        <option value="">Choose Group</option>
                        {groups.length > 0 &&
                          groups.map((group) => (
                            <option key={group.id} value={group.id}>
                              {group.name}
                            </option>
                          ))}
                        ;
                      </select>
                    </div>
                    <div className="mx-2">
                      <input
                        type="submit"
                        className="btn"
                        style={{
                          backgroundColor: "#50fa7b",
                          marginTop: "20px",
                          borderRadius: "10px",
                        }}
                        value="create contact"
                      />
                      <Link
                        to={"/contacts"}
                        className="btn mx-2"
                        style={{
                          backgroundColor: "#ff5555",
                          marginTop: "20px",
                          borderRadius: "10px",
                        }}
                      >
                        Cancel
                      </Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default AddContact;
