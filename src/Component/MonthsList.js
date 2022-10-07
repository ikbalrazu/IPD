import React, { useState, useEffect } from "react";
import Footer from "../Sheard/Footer";
import Menu from "../Sheard/Menu";
import TopHeader from "../Sheard/TopHeader";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function MonthsList() {
  const location = useLocation();
  const detailspage = useNavigate();
  const [documents,setDocuments] = useState([]);
  const [monthreport,setMonthReport] = useState();
  const [dealname, setDealName] = useState();

  const userInfo = JSON.parse(localStorage.getItem("userinfo"));
  

  const DocumentHandler2 = async() => {
    let MonthsReport=[];
    const dealid = location?.state;
    //console.log(dealid);
    await axios.post("/documentswithdealsid",{dealid}).then(function(data){
      //console.log(data);
      // setDealName(data?.data?.data?.Deals?.display_value)
      for(let i=0; i<data?.data?.data?.length; i++){
        // if(data?.data?.data[i]?.Access_Type === "Private"){
          //console.log(data?.data?.data[i]?.DocumentName);
          const filename = data?.data?.data[i]?.Documents;
          const fileformat = filename?.split(".")[1];
          const MonthReport = data?.data?.data[i]?.MonthOfReport?.split(" & ").join(" ");
          MonthsReport.push(MonthReport);
          setDocuments(olddata=>[...olddata,{"Id":data.data.data[i].ID,"DocumentName":data.data.data[i].DocumentName,"DownloadLink":data.data.data[i].Documents,"FormatType":fileformat,"ReportDate":data.data.data[i].CreatedDateTime,"MonthReport":MonthReport}]);
        //}
      }
      return MonthsReport;
    }).then(MonthsReport=>{
      //console.log(MonthsReport);
      const withoutDuplicates_MonthsReport= [...new Set(MonthsReport)];
      //console.log(withoutDuplicates_MonthsReport);
      setMonthReport(withoutDuplicates_MonthsReport);
      
    })

  }
  
  useEffect(()=>{
    DocumentHandler2();
    //console.log(location?.state);
  },[])
  return (
    <div>
      <TopHeader></TopHeader>
      <Menu></Menu>

      <div className="container">
        <div className="row">
          <div className="col-lg-8 col-md-8 col-sm-12 col-12">
            {/* Search Section Start */}
            <section>
              <div
                className=" mt-4"
                style={
                  {
                    // backgroundColor: "#232323",
                    // padding: 20,
                  }
                }
              >
                <h5 className="text-start py-1" style={{ color: "#00ADEE" }}>
                  Welcome, {userInfo?.name}
                </h5>

                
              </div>
            </section>
            {/* Search Section End  */}

            {/* File Section tart  */}

            <section
              className="container mt-1"
              style={{
                backgroundColor: "#222222",
                padding: 25,
              }}
            >
              
              <div className="tab-content" id="pills-tabContent">
                <div
                  className="tab-pane fade show active text-white"
                  id="pills-home"
                  role="tabpanel"
                  aria-labelledby="pills-home-tab"
                >
                  <h3> Issuser Name </h3>
                  <span>{monthreport?.length} Search Results</span>

                  <table className="table text-white mt-3">
                    <thead>
                      <tr>
                        <th scope="col">Month</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                    {monthreport?.map((data,index)=>{
                        var months_list_filter = documents?.filter(function(el){
                          return el.MonthReport === monthreport[index];
                        })
                        return(
                          <tr onClick={()=>{
                            
                            //console.log(months_list_filter);
                            detailspage("/details",{state:{months_list_filter}})}} >
                          <th scope="row" style={{cursor:"pointer"}}> {data} </th>
                          <td></td>
                          <td></td>
                          <td>
                          {" "}
                          <i className="bi bi-arrow-up-right-square"> </i>{" "}
                          </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>

                {/* End table of All content  */}

                
              </div>
            </section>

            {/* File Section End  */}
          </div>

          
        </div>
      </div>

      <Footer></Footer>
    </div>
  );
}
