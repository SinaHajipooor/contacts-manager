import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";

import { ContactContext } from "./context/contactContext";

// because our exported files are in the  index.jsx , we dont need to tell it where should it go and just we should write the component folder
import { EditContact, ViewContact, Contacts, Navbar } from "./components";
import AddContact from "./components/Contacts/AddContact";
import { getAllContacts, getAllGroups, createContact, deleteContact } from "./services/contactService";

//----------------------------------------------------------------------------------

const App = () => {
    // contacts array
    const [loading, setLoading] = useState(false);
    const [contacts, setContacts] = useState([]);
    // for the contact that the use had been searched
    const [filteredContacts, setFilteredContacts] = useState([]);
    const [groups, setGroups] = useState([]);
    // here we want to have one state for all the form feilds
    const [contact, setContact] = useState({});

    // the contact name that the user will search in the search field
    const [contactQuery, setContactQuery] = useState({ text: "" });

    // store the resault of useNavigate
    const navigate = useNavigate();

    //----------------------------------------------------------------------------------

    // mount useEffect
    useEffect(() => {
        // fetch data by using async await
        const fetchData = async () => {
            try {
                // we want to have a loading spinner until the data comes
                setLoading(true);
                // get the response
                // const response = await axios.get("http://localhost:9000/contacts");
                // get the data by destructuring tha response
                const { data: contactsData } = await getAllContacts();
                const { data: groupsData } = await getAllGroups();

                //set the data that we get
                setContacts(contactsData);
                // set data for the contact that the use had been searched
                setFilteredContacts(contactsData);
                setGroups(groupsData);

                // now we have the data so set the spinner off
                setLoading(false);
            } catch (err) {
                console.log(err.message);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    //----------------------------------------------------------------------------------

    // // update useEffect(there is no need to this part)
    // useEffect(() => {
    //   const fetchData = async () => {
    //     try {
    //       setLoading(true);
    //       const { data: contactsData } = await getAllContacts();
    //       setContacts(contactsData);
    //       setLoading(false);
    //     } catch (err) {
    //       console.log(err.message);
    //       setLoading(false);
    //     }
    //   };
    //   fetchData();
    // }, [forceRender]);

    //----------------------------------------------------------------------------------

    // submit form handler
    const createContactForm = async (event) => {
        event.preventDefault();
        try {
            setLoading((prevLoading) => !prevLoading);

            const { status, data } = await createContact(contact);

            if (status == 201) {
                // copy the previous data and set the new data
                const allContacts = [...contacts, data];
                //set the new data to state
                setContacts(allContacts);
                setFilteredContacts(allContacts);
                // we set the setContact to an empty obj to remove the previous data
                setContact({});
                setLoading((prevLoading) => !prevLoading);
                // after that the new contact has been created , we want to send the user to the contacts
                navigate("/contacts");
            }
        } catch (err) {
            console.log(err.message);
            setLoading((prevLoading) => !prevLoading);
        }
    };

    //----------------------------------------------------------------------------------

    // event handler to set the contacts information ( this  handler will be active whenever the user eneter a charechter)
    const onContactChange = (event) => {
        // ... getContact ---> this part is the fields that the user had filled
        // [event.target.name] ---> this part is the name of the input that the user is filling it
        // event.target.value is the data that the user will insert
        setContact({ ...contact, [event.target.name]: event.target.value });
    };

    //----------------------------------------------------------------------------------

    // deleteConfirm alert
    const confirmDelete = (contactId, contactFullname) => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div
                        dir="ltr"
                        style={{
                            backgroundColor: "rgb(235, 232, 232)",
                            borderRadius: "12px",
                            boxShadow: "0 1px 8px gray",
                        }}
                        className="p-5"
                    >
                        <h1
                            style={{
                                color: "#ff5555",
                                textAlign: "center",
                                marginBottom: "20px",
                            }}
                        >
                            {/* <i className="fa-solid fa-triangle-exclamation"></i>{" "} */}
                        </h1>
                        <p style={{ color: "black", marginBottom: "40px" }}> Are you sure you want to delete {contactFullname} ?</p>
                        <button
                            onClick={() => {
                                removeContact(contactId);
                                onClose();
                            }}
                            className="btn mt-2"
                            style={{
                                backgroundColor: "#50fa7b",
                                marginLeft: "70px",
                                marginRight: "20px",
                                borderRadius: "6px",
                                boxShadow: "0 1px 8px gray",
                            }}
                        >
                            Confirm
                        </button>
                        <button
                            onClick={onClose}
                            className="btn mt-2"
                            style={{
                                backgroundColor: "#ff5555",
                                marginRight: "40px",
                                borderRadius: "6px",
                                boxShadow: "0 1px 8px gray",
                            }}
                        >
                            Cancel
                        </button>
                    </div>
                );
            },
        });
    };

    //----------------------------------------------------------------------------------

    // delete handler
    // in this method , first we want to  delete contact and then send a request to server and get the data
    const removeContact = async (contactId) => {
        // make a copy of contacts
        const allContacts = [...contacts];
        try {
            // update the contacts and find the contact that we want to delete ( we want that the filter method return all the contacts except of the contact that we want to delete) so  here the updatedContact array will all the contacts except the deleted Contact
            const updatedContact = contacts.filter((c) => c.id !== contactId);
            // set the contacts
            setContacts(updatedContact);
            setFilteredContacts(updatedContact);

            //send the request
            const { status } = await deleteContact(contactId);

            // here we want to know if the request was successful or not ( if it wasnt successful i want to dont effect the changes that we had . so to do this we want to reset the previous contacts array (allContacts in line 196) )
            if (status !== 200) {
                setContacts(allContacts);
                setFilteredContacts(allContacts);
            }
        } catch (err) {
            console.log(err.message);
            // if we had an error we want to set the previous contacts again
            setContacts(allContacts);
            setFilteredContacts(allContacts);
        }
    };

    //----------------------------------------------------------------------------------

    ///search handler
    const contactSearch = (event) => {
        setContactQuery({ ...contactQuery, text: event.target.value });
        const allContacts = contacts.filter((contact) => {
            return contact.fullname.toLowerCase().includes(event.target.value.toLowerCase());
        });

        setFilteredContacts(allContacts);
    };

    //----------------------------------------------------------------------------------

    return (
        <ContactContext.Provider
            value={{
                loading,
                setLoading,
                contact,
                setContacts,
                contactQuery,
                contacts,
                filteredContacts,
                setFilteredContacts,
                groups,
                onContactChange,
                deleteContact: confirmDelete,
                createContact: createContactForm,
                contactSearch,
            }}
        >
            <div className="App">
                {/* send the query (the fullname that the user had been searched ) and also the searchContact (search handler) */}
                <Navbar />
                <Routes>
                    <Route path="/" element={<Navigate to="/contacts" />} />
                    <Route path="/contacts" element={<Contacts />} />
                    <Route path="/contacts/add" element={<AddContact />} />
                    <Route path="/contacts/:contactId" element={<ViewContact />} />
                    <Route path="/contacts/edit/:contactId" element={<EditContact />} />
                </Routes>
            </div>
        </ContactContext.Provider>
    );
};

export default App;
