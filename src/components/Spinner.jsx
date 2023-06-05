// import SpinnerGIF from "../assets/loading.gif";
import SpinnerGIF from "../assets/spinnerLoad.gif";

const Spinner = () => {
  return (
    <>
      <img
        src={SpinnerGIF}
        className="d-block m-auto"
        style={{ width: "200px", height: "200px", marginTop: "500px" }}
      ></img>
    </>
  );
};
export default Spinner;
