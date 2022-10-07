import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./registration.css";

const Registration = () => {
  const login = useNavigate();
  const UserData = useLocation();
  const [useremail,setUserEmail] = useState([]);
  const [firstname, setFirstName] = useState();
  const [lastname, setLastName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [company, setCompany] = useState();
  const [dealsaccess, setDealsAccess] = useState();
  const [companyrole,setCompanyRole] = useState();
  const [jobrole,setJobRole] = useState();
  const [alertmsg, setAlertmsg] = useState();

  const UserRegistration = () => {

    //console.log(useremail);
    //console.log(firstname, lastname, email, phone, company, dealsaccess, companyrole, jobrole);
    // if(useremail){
    //   for(let k=0; k<useremail.length; k++){
    //     if(useremail[k] === email){
    //       setAlertmsg("Email already taken! Plz try with another valid email.");
    //     }
    //   }
    // }

    if (!firstname || !lastname || !email || !phone || !dealsaccess || !jobrole) {
      setAlertmsg("Please complete all mandatory information!");
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setAlertmsg("Invalid Email entered.");
    } else {
      // const monthNames = [
      //   "January",
      //   "February",
      //   "March",
      //   "April",
      //   "May",
      //   "June",
      //   "July",
      //   "August",
      //   "September",
      //   "October",
      //   "November",
      //   "December",
      // ];
      // var today = new Date();
      // var date =
      //   today.getDate() +
      //   "-" +
      //   monthNames[today.getMonth()] +
      //   "-" +
      //   today.getFullYear();
      axios
        .post("/addrecord", {
          firstname,
          lastname,
          email,
          phone,
          company,
          companyrole,
          dealsaccess,
          jobrole
        })
        .then(function (data) {
          //console.log(data);
          const userid = data.data;
          //console.log(userid);
          if(data?.data?.message === "Data Added Successfully"){
            setAlertmsg("Your registration created successfully!");
          }
          else if(data?.data?.error?.Email === "This value already exists. Enter a unique value."){
            setAlertmsg("Email already taken! Please try with another valid email.");
          }
          
          
        });
    }
  };

  useEffect(()=>{
    //console.log(UserData.state);
    // for(let i=0; i<UserData?.state?.length; i++){
    //   setUserEmail(predata=>[...predata,UserData.state[i].Email]);
    // }
  },[])

  return (
    <div>
      <div className="container">
        <div className="row justify-content-md-center">
          <h3 className="text-white text-start mt-5 mb-4">
        
            Welcome to AMAL Trustees
          </h3>

          {/* Registration all details start  */}

          <section
            className="col-lg-12 col-md-12 col-sm-12 col-12"
            style={{
              backgroundColor: "#00ADEE",
              padding: 20,
            }}
          >
            <div>
              <h2 className="text-white"> Register your details</h2>

              <p className="text-white">
                In order for our team to set up your account, could you please
                complete the following information.
              </p>
            </div>

            <div>
              <div className="row">
                {" "}
                
                  <div
                    style={{
                      display: "flex",
                    }}
                  >
                    <div
                      class="form-group mt-2"
                      style={{ width: "50%", padding: 5 }}
                    >
                      <input
                        style={{ backgroundColor: "#00ADEE", color: "white" }}
                        type="text"
                        class="form-control"
                        id="firstname"
                        aria-describedby="firstname"
                        placeholder="First Name* "
                        onChange={(e)=>setFirstName(e.target.value)}
                      />
                    </div>
                    <div
                      class="form-group mt-2"
                      style={{ width: "50%", padding: 5 }}
                    >
                      <input
                        type="text"
                        class="form-control"
                        id="lastname"
                        aria-describedby="firstname"
                        placeholder="Last Name* "
                        style={{ backgroundColor: "#00ADEE", color: "white" }}
                        onChange={(e)=>setLastName(e.target.value)}
                      />
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                    }}
                  >
                    <div
                      class="form-group mt-2"
                      style={{ width: "50%", padding: 5 }}
                    >
                      <input
                        type="text"
                        class="form-control"
                        id="email"
                        aria-describedby="email"
                        placeholder="Email* "
                        style={{ backgroundColor: "#00ADEE", color: "white" }}
                        onChange={(e)=>setEmail(e.target.value.toLowerCase())}
                      />
                    </div>
                    <div
                      class="form-group mt-2"
                      style={{ width: "50%", padding: 5 }}
                    >
                      <input
                        type="text"
                        class="form-control"
                        id="lastname"
                        aria-describedby="phone"
                        placeholder="
                        Phone*"
                        style={{ backgroundColor: "#00ADEE", color: "white" }}
                        onChange={(e)=>setPhone(e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <div
                      class="form-group mt-2"
                      style={{ width: "100%", padding: 5 }}
                    >
                      <input
                        type="text"
                        class="form-control"
                        id="company"
                        aria-describedby="company*"
                        placeholder="Company"
                        style={{ backgroundColor: "#00ADEE", color: "white" }}
                        onChange={(e)=>setCompany(e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <div
                      class="form-group mt-2"
                      style={{ width: "100%", padding: 5 }}
                    >
                      <input
                        type="text"
                        class="form-control"
                        id="desls"
                        aria-describedby="deals*"
                        placeholder="Which deals do you require access to?* "
                        style={{ backgroundColor: "#00ADEE", color: "white" }}
                        onChange={(e)=>setDealsAccess(e.target.value)}
                      />
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                    }}
                  >
                    <div
                      class="form-group mt-2"
                      style={{ width: "50%", padding: 5 }}
                    >
                      <select
                        name="productType"
                        id="productType"
                        style={{
                          width: "90%",
                          height: 40,
                          backgroundColor: "transparent",
                          color: "white",
                        }}
                        onChange={(e)=>setCompanyRole(e.target.value)}
                      >
                        <option
                          style={{
                            width: "90%",
                            height: 40,
                            backgroundColor: "transparent",
                            color: "black",
                          }}
                          value="none"
                        >
                          Company Role{" "}
                        </option>
                        <option
                          style={{
                            width: "90%",
                            height: 40,
                            backgroundColor: "transparent",
                            color: "black",
                          }}
                          value="Issuer"
                        >
                          Issuer{" "}
                        </option>
                        <option
                          style={{
                            width: "90%",
                            height: 40,
                            backgroundColor: "transparent",
                            color: "black",
                          }}
                          value="Financier"
                          default
                        >
                          Financier
                        </option>
                        <option
                          style={{
                            width: "90%",
                            height: 40,
                            backgroundColor: "transparent",
                            color: "black",
                          }}
                          value="Investor"
                        >
                          Investor{" "}
                        </option>
                        <option
                          style={{
                            width: "90%",
                            height: 40,
                            backgroundColor: "transparent",
                            color: "black",
                          }}
                          value="Other"
                        >
                          Other{" "}
                        </option>
                      </select>
                    </div>

                    <div
                      class="form-group mt-2"
                      style={{ width: "50%", padding: 5 }}
                    >
                      <input
                        type="text"
                        class="form-control"
                        id="jobrole"
                        aria-describedby="jobrole"
                        placeholder="Job Role*"
                        style={{ backgroundColor: "#00ADEE", color: "white" }}
                        onChange={(e)=>setJobRole(e.target.value)}
                      />
                    </div>
                  </div>

                  <div class="form-group mt-3">
                  <button
                      type="button"
                      className="btn btn-primary  mt-2 border-0"
                      id="registetionbutton"
                      onClick={()=>login(-1)}
                    >
                    Already have an account?
                    </button>
                    <button
                      style={{ marginLeft:"20px" }}
                      type="button"
                      className="btn btn-primary  mt-2 border-0"
                      id="registetionbutton"
                      onClick={UserRegistration}
                    >
                      Submit
                    </button>
                  </div>
      
              </div>
            </div>
            <p style={{marginTop:"10px"}}>{alertmsg}</p>
          </section>

          {/* Registration all details end  */}
          
        </div>
      </div>
    </div>
  );
};

export default Registration;
