import React from "react";
import Footer from "../Sheard/Footer";
import Menu from "../Sheard/Menu";
import TopHeader from "../Sheard/TopHeader";
import "./Help.css";

const Help = () => {
  return (
    <div>
      <TopHeader />
      <Menu></Menu>

      {/* Help Section Start  */}
      <div className="container mt-5">
        <div className="row d-flex justify-content-between">
          <div className="col-lg-4 col-md-4 col-sm-12 col-12">
            <h3 className="text-white text-start"> Help </h3>
            {/* <p className="text-start text-white"> xxx </p> */}
          </div>

          <div className="col-lg-8 col-md-8 col-sm-12 col-12">
            <div class="accordion accordion-flush" id="accordionFlushExample">
              <div class="accordion-item">
                <h2 class="accordion-header" id="flush-help-headingOne">
                  <button
                    class="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-helpOne"
                    aria-expanded="false"
                    aria-controls="flush-helpOne"
                    style={{
                      color: "#61dafb",
                      fontSize: 25,
                    }}
                  >
                    Contact Us
                  </button>
                </h2>
                <div
                  id="flush-helpOne"
                  class="accordion-collapse collapse"
                  aria-labelledby="flush-help-headingOne"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div class="accordion-body text-start text-white">
                    <span>
                      <i
                        class="bi bi-envelope-fill"
                        style={{ fontSize: 20, color: "#0694c9" }}
                      ></i>
                    </span>{" "}
                    &nbsp;<a href="https://www.investorportal.support@amaltrustees.com.au" target="_blank">investorportal.support@amaltrustees.com.au</a>
                  </div>
                </div>
              </div>

              <div class="accordion-item">
                <h2 class="accordion-header" id="flush-heading-help-Three">
                  <button
                    class="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapse-help-Three"
                    aria-expanded="false"
                    aria-controls="flush-heading-help-Three"
                    style={{
                      color: "#61dafb",
                      fontSize: 25,
                    }}
                  >
                    File Naming Convension
                  </button>
                </h2>
                <div
                  id="flush-collapse-help-Three"
                  class="accordion-collapse collapse"
                  aria-labelledby="flush-heading-help-Three"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div class="accordion-body text-start text-white">
                    In order to ensure successful report and document uploads, a
                    specific naming convention must be followed. All periodic
                    reports must contain a date in the file name and that date
                    will be used to determine when the report first displays on
                    the website. Static document uploads do not require a date
                    and will default to display as soon as published. Please see
                    below examples of the standard naming conventions for
                    periodic reports and static documents to be used for
                    heritage-JPMC SFR deal reports. Heritage-BNY IR deal reports
                    will continue to use the file naming conventions as
                    established on the former CTI IR website. A complete list of
                    ORIoN Deal Short Names and Report Abbreviations + File
                    Naming Conventions can be found in the file attachments
                    below for your reference. These files are updated as needed
                    per month. Please note that the report upload mechanism will
                    only recognize existing ORIoN Deal Short Names and Report
                    Abbreviations. Be aware that reports may fail to upload due
                    to: failure to follow the file naming convention, use of
                    incorrect deal or report abbreviations, placement of the
                    file in the wrong product folder, a deal not having been set
                    up for web reporting, and unrecognized file formats for the
                    report. It is recommended that you verify the posting of
                    your reports on the website following any upload. Should a
                    report or document fail to be posted on-site, please
                    double-check your file naming conventions or contact the Web
                    Client Access team at SFRWeb@bnymellon.com for further
                    assistance. Standard naming convention for periodic reports:
                    ORIoN Deal Short Name_Report Abbreviation_YYMMDD Standard
                    naming convention for static documents: ORIoN Deal Short
                    Name_Report Abbreviation (Please note: Heritage-IR web deal
                    reports will continue to use the established naming
                    conventions used on the former CTI IR website){" "}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Help Section End  */}

      <Footer></Footer>
    </div>
  );
};

export default Help;
