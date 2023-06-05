import { useContext } from "react";
import { ContactContext } from "../../context/contactContext";

const SearchContact = () => {
  const { contactQuery, contactSearch } = useContext(ContactContext);
  return (
    <div className="input-group mx-2 w-50" dir="ltr">
      {/* search icon */}
      <span
        className="input-group-text"
        id="basic-addon1"
        style={{
          backgroundColor: "rgb(235, 232, 232)",
          borderColor: "rgb(179, 176, 176)",
          cursor: "pointer",
          borderRadius: "2px",
          boxShadow: "0 1px 2px gray",
        }}
      >
        <i className="fa fa-search"></i>
      </span>
      {/* search text input  */}
      <input
        dir="ltr"
        type="text"
        value={contactQuery.text}
        onChange={contactSearch}
        style={{
          backgroundColor: "rgb(235, 232, 232)",
          borderColor: "rgb(179, 176, 176)",
          borderRadius: "2px",
          boxShadow: "0 1px 2px gray",
        }}
        className="form-control"
        placeholder="search for contact"
        aria-label="Search"
        aria-describedby="basic-addon1"
      ></input>
    </div>
  );
};
export default SearchContact;
