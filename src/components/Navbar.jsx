import SearchContact from "./Contacts/SearchContact";
// import { background, Red } from "../helpers/color";
import { useLocation } from "react-router-dom";
const Navbar = () => {
  const location = useLocation();

  return (
    <nav
      className="navbar navbar-dark navbar-expand-sm shadow-lg"
      style={{ backgroundColor: "white" }}
    >
      <div className="container">
        <div className="row w-100">
          <div className="col">
            <i className="fas fa-id-badge" style={{ color: "#1e90ff	" }} />

            <span
              style={{ color: "black", fontFamily: "italic", fontSize: "22px" }}
            >
              {" "}
              Contacts{" "}
              <span style={{ color: "#1e90ff	", fontFamily: "bold" }}>
                Management
              </span>{" "}
              Application
            </span>
          </div>
          {location.pathname == "/contacts" ? (
            <div className="col">
              {/* search component (we didnt use search and query and we just send them to the search component ) */}
              <SearchContact />
            </div>
          ) : null}
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
