import React, { useEffect, useState } from "react";
import Menu from "../Sheard/Menu";
import TopHeader from "../Sheard/TopHeader";
import Footer from "../Sheard/Footer";
import classes from "./home.module.css";
import axios from "axios";
import { AppContext } from "../context/Context";
import { AppState } from "../context/Context";
import { Base64 } from "js-base64";

const General = () => {
  const userInfo = JSON.parse(localStorage.getItem("userinfo"));
  const [alldeals, setAllDeals] = useState([]);
  const [Check, setCheck] = useState(false);
  const [profileInfo,setProfileInfo] = useState();

  const {userdetails} = AppState();

  const CheckBoxHandler = async(event) => {

    const id = userdetails?.data?.data?.ID;
    const encodepassword = userdetails?.data?.data?.Password;
    const password = Base64.decode(encodepassword);

    const {checked} = event.target;
    console.log(checked);
    setCheck(checked);
    const data = await axios.put("/checkboxhandler",{id,checked,password});
    
  }


  useEffect(() => {
    //console.log(userdetails?.data?.data);
    setProfileInfo(userdetails?.data?.data)
    // console.log(userdetails?.data?.data?.Email_When_Document_Uploaded);
    const ischecked = (userdetails?.data?.data?.Email_When_Document_Uploaded =="true" )? true:false
    setCheck(ischecked);
    for (let i = 0; i < userdetails?.data?.data?.Deals_Allowed_for_Access?.length; i++) {
      setAllDeals((preData) => [...preData, userdetails?.data?.data?.Deals_Allowed_for_Access[i]?.display_value]);
    }
  }, [userdetails]);

  return (
    <div>
      <TopHeader />
      <Menu></Menu>
      <div className="container mt-5">
        <div className="row d-flex justify-content-between">
          <div className="col-lg-4 col-md-4 col-sm-12 col-12">
            <h3 className="text-white text-start"> General </h3>
            {/* <p className="text-start text-white"> xxx </p> */}
          </div>

          <div className="col-lg-8 col-md-8 col-sm-12 col-12">
            <div
              className="accordion accordion-flush"
              id="accordionFlushExample"
            >
              <div className="accordion-item">
                <h2 className="accordion-header" id="flush-headingOne">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseOne"
                    aria-expanded="false"
                    aria-controls="flush-collapseOne"
                    style={{
                      color: "#61dafb",
                      fontSize: 25,
                    }}
                  >
                    Personal Alerts
                  </button>
                </h2>
                <div
                  id="flush-collapseOne"
                  className="accordion-collapse collapse"
                  aria-labelledby="flush-headingOne"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className="accordion-body text-start text-white">
                    <input
                      type="checkbox"
                      id="vehicle1"
                      name="vehicle1"
                      value="Bike"
                      onChange={CheckBoxHandler}
                      //checked={true}
                      checked = {Check}
                    />
                    &nbsp; Please email me when a new document has been uploaded
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="flush-headingTwo">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseTwo"
                    aria-expanded="false"
                    aria-controls="flush-collapseTwo"
                    style={{
                      color: "#61dafb",
                      fontSize: 25,
                    }}
                  >
                    Default & Personal Links
                  </button>
                </h2>
                <div
                  id="flush-collapseTwo"
                  className="accordion-collapse collapse"
                  aria-labelledby="flush-headingTwo"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className="accordion-body text-start text-white">
                    <ul
                      style={{
                        listStyle: "none",
                        paddingLeft: 0,
                      }}
                    >
                      <li>
                        <i
                          style={{
                            paddingRight: 15,
                            color: "#00adee",
                          }}
                          class="bi bi-arrow-right-circle-fill"
                        ></i>
                        <a
                          className={classes.default_and_personal_link}
                          href="https://www.amal.com.au/trustee-services"
                        >
                          AMAL Trustee Services
                        </a>
                      </li>

                      <li>
                        <i
                          style={{
                            paddingRight: 15,
                            color: "#00adee",
                          }}
                          class="bi bi-arrow-right-circle-fill"
                        ></i>
                        <a
                          className={classes.default_and_personal_link}
                          href="https://www.amal.com.au/"
                        >
                          AMAL Asset Management
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="flush-headingThree">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseThree"
                    aria-expanded="false"
                    aria-controls="flush-collapseThree"
                    style={{
                      color: "#61dafb",
                      fontSize: 25,
                    }}
                  >
                    User Profile
                  </button>
                </h2>
                <div
                  id="flush-collapseThree"
                  className="accordion-collapse collapse"
                  aria-labelledby="flush-headingThree"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className="accordion-body text-start text-white">
                    <div className="row">
                      <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                        <p>First Name : {userInfo?.firstname}</p>
                        <p>Email : {userInfo?.email}</p>
                        <p> Company : {profileInfo?.Company}</p>
                        <p> Role : {profileInfo?.Role}</p>
                      </div>

                      <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                        <p>Last Name : {userInfo?.lastname}</p>
                        <p> Phone : {profileInfo?.Phone_Number}</p>
                        <p> Company Role : {profileInfo?.Company_Role}</p>
                        {/* {alldeals?.map((data,index)=>{
                          return (<p> Deals : {data}</p>)
                        })} */}
                        <div>
                          <p>
                            {" "}
                            Deals :{" "}
                            {/* <button onClick={()=>console.log(alldeals)}>check</button> */}
                            {alldeals?.map((data, index) => {
                              return <p>{data}</p>;
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </div>

      <Footer></Footer>
    </div>
  );
};

export default General;
