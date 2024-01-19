import React, { useState, useRef, useEffect } from "react";
import Button from "react-bootstrap/Button";
import InrFlag from "../images/inr.png";
import PHPflag from "../images/php.png";
import TickIcon from "../images/tickmark.png";
import Webcam from "react-webcam";
import {backEndCall,backEndCallObj} from "../../AdminComponents/Services/mainServiceFile"
import { toast } from "react-toastify";
import { LivenessQuickStartReact } from "../faceRecognition/faceliveness";
import Joi from "joi-browser";

const Modals = () => {
  const webcamRef = useRef();

  const [selCountryModal, setSelCountryModal] = useState(true);
  const [searchCountryModal, setSearchCountryModal] = useState(false);
  const [selIdCardModal, setSelIdCardModal] = useState(false);
  const [ShowIdCaptureInst, setShowIdCaptureInst] = useState(false);
  const [ShowIdCaptureCam, setShowIdCaptureCam] = useState(false);
  const [ShowRetakeId, setShowRetakeId] = useState(false);
  const [showselfieInstModal, setShowSelfieInstModal] = useState(false);
  const [ShowSelfieCaptureCam, setShowSelfieCaptureCam] = useState(false);
  const [showLivenessComponent, setShowLivenessComponent] = useState(false);
  const [ShowUploadPhotos, setShowUploadPhotos] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [selfieImage, setSelfieImage] = useState(null);
  const [documentCode, setdocumentCode] = useState(null);
  const [showKYCSuccess, setShowKYCSuccess] = useState(null);
  const [takeIdBack, setTakeIdBack] = useState(false);
  const [kycStatus, setKycStatus] = useState("pending");
  const [errorMsg, setErrorMsg] = useState(null);
  const [backButtonDisble, setBackButtonDisble] = useState(false);
  const [proceedButtonDisable, setProceedButtonDisable] = useState(false);
  const [notifyUrl, setNotifyUrl] = useState("");
  const [success, setSuccessUrl] = useState("");
  const [userId, setUserId] = useState("");
  const [appIdKey, setAppIdKey] = useState("");
  const [refNo, setRefNo] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [validationError, setValidationError] = useState("");

  const [countries] = useState([
    { name: "India", flag: InrFlag },
    { name: "Philippines", flag: PHPflag },
  ]);

  const [searchInput, setSearchInput] = useState("");
  const [selectedCountry, setSelectedCountry] = useState({
    name: "Philippines",
    flag: PHPflag,
  });
  const [governmentIDList, setGovernmentIDList] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [idPhoto, setIdPhoto] = useState("");
  const [idBackPhoto, setIdBackPhoto] = useState("");

  const [country, setCountry] = useState("PHL");
  const [userValidation, setUserValidation] = useState("loading");

  const validationSchema = Joi.object({
    appIdKey: Joi.string()
      .invalid("null", "undefined")
      .regex(/^[a-zA-Z0-9]+$/)
      .required()
      .label("App Id")
      .min(30)
      .max(40)
      .error(() => {
        return {
          message: "App ID Key Should Not Contain Special Characters And Spaces",
          "any.required": "AppId Key Is Invalid",
          
        };
      }),

    refNo: Joi.string()
      .invalid("null", "undefined")
      .regex(/^[a-zA-Z0-9]+$/)
      .min(8)
      .max(25)
      .required()
      .error(() => {
        return {
          message:
            "Reference Number Should Not Contain Special Characters And Spaces",
          "any.required": "Reference Number Cannot Be Empty",
          "any.invalid": "Reference Number Is Invalid",
        };
      }),

    phoneNumber: Joi.string()
      .invalid("null", "undefined")
      .regex(/^[6789]\d{9}$/)
      .length(10)
      .required()
      .error(() => {
        return {
          message:
            "Phone Number Should Start With 6, 7, 8 or 9 And Should Not Contain Special Characters",
          "any.required": "Phone Number Cannot Be Empty",
          "any.invalid": "Phone Number Is Invalid",
        };
      }),
  });

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const newAppId = urlSearchParams.get("appIdKey");
    const newRefNo = urlSearchParams.get("refNo");
    const newPhoneNumber = urlSearchParams.get("phoneNumber");

    if (!newAppId || newAppId === "null" || newAppId === "undefined") {
      toast.error("AppId Key is required");
    }
    if (!newRefNo || newRefNo === "null" || newRefNo === "undefined") {
      toast.error("Reference Number is required");
    }

    if (
      !newPhoneNumber ||
      newPhoneNumber === "null" ||
      newPhoneNumber === "undefined"
    ) {
      toast.error("Phone Number is required");
    }
    setAppIdKey(newAppId);
    setRefNo(newRefNo);
    setPhoneNumber(newPhoneNumber);
    urlSearchParams.delete("appIdKey");
    urlSearchParams.delete("refNo");
    urlSearchParams.delete("phoneNumber");
    const newUrl = `${window.location.pathname}`;
    window.history.replaceState({}, document.title, newUrl);

    fetchData(newAppId, newRefNo, newPhoneNumber);
  }, []);

  const fetchData = async (appIdKey, refNo, phoneNumber) => {
    try {
      const validationData = { appIdKey, refNo, phoneNumber };
      await validationSchema.validate(validationData);

      const response = await backEndCall(
        `/kyc?appIdKey=${appIdKey}&refNo=${refNo}&phoneNumber=${phoneNumber}`
      );

      setUserValidation("success");

      setNotifyUrl(response.notifyUrl);
      setSuccessUrl(response.successUrl);
      setUserId(response.userId);
      setPhoneNumber(response.phoneNumber);
    } catch (error) {
      setShowKYCSuccess(false);

      if (error?.isJoi) {
        setUserValidation("error");
        setValidationError(
          error.details.map((detail) => detail.message).join(". ")
        );
      } else {
        if (error?.response?.status === 400) {
          setUserValidation("error");
          if (error.response.data === "Invalid Encrypted String") {
            setValidationError("App Id Key is Ivalid");
          } else {
            setValidationError(error.response.data);
          }
        } else {
          setUserValidation("error");

          setValidationError("App Id Key or Ref No is Invalid");
        }
      }
    }
  };

  const videoConstraints = {
    facingMode: "environment",
  };
  const handleShowSearchModal = () => {
    setSelCountryModal(false);
    setSearchCountryModal(true);
  };

  const handleShowSelCountry = () => {
    setSelCountryModal(true);
    setSearchCountryModal(false);
  };

  const handleSetSelfieImage = (value) => {
    setSelfieImage(value);
  };

  const handleShowSelIdModal = async () => {
    setProceedButtonDisable(true);

    try {
      setIsDisabled(true);

      const response = await backEndCallObj("/kyc/get_documents", {
        country: country,
      });

      const governmentIDList = response.map((obj) => {
        return {
          documentName: obj.documentName,
          documentCode: obj.documentCode,
        };
      });

      setGovernmentIDList(governmentIDList);
      setSelIdCardModal(true);
      setShowIdCaptureInst(false);
      setSelCountryModal(false);
      setTakeIdBack(false);
      setProceedButtonDisable(false);
    } catch (ex) {
      setProceedButtonDisable(false);

      if (ex.response && ex.response.status === 400) {
        toast.error(ex?.response);
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setProceedButtonDisable(false);

      setTimeout(() => {
        setIsDisabled(false);
      }, 2000);
    }
  };

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleShowIdCaptureInst = ({ documentName, documentCode }) => {
    setBackButtonDisble(true);
    setShowIdCaptureInst(true);
    setSelIdCardModal(false);
    setShowIdCaptureCam(false);
    setSelectedId(documentName);
    setdocumentCode(documentCode);
    setBackButtonDisble(false);
  };

  const handleCloseWebCam = () => {
    setProceedButtonDisable(true);
    setShowIdCaptureInst(true);
    setShowIdCaptureCam(false);
    setProceedButtonDisable(false);
  };

  const handleSelectCountry = async (country) => {
    let countryCode;

    if (country.name === "India") {
      countryCode = "IND";
    } else if (country.name === "Philippines") {
      countryCode = "PHL";
    }

    setSelectedCountry(country);
    setSearchCountryModal(false);
    setSelCountryModal(true);
    setCountry(countryCode);
  };

  const handleBackToSelCountry = () => {
    setProceedButtonDisable(true);
    setSelIdCardModal(false);
    setSelCountryModal(true);
    setProceedButtonDisable(false);
  };

  const handleSelfieInstModal = () => {
    setBackButtonDisble(true);
    setShowSelfieInstModal(true);
    setShowRetakeId(false);
    setShowSelfieCaptureCam(false);
    setBackButtonDisble(false);
  };

  const handleOpenCamForId = () => {
    setProceedButtonDisable(true);
    setIdPhoto("");
    setIdBackPhoto("");
    if (selectedId === "Aadhaar Card") {
      setTakeIdBack(true);
    } else {
      setTakeIdBack(false);
    }
    setShowIdCaptureCam(true);
    setShowIdCaptureInst(false);
    setShowRetakeId(false);
    setShowSelfieInstModal(false);
    setProceedButtonDisable(false);
  };

  const handleShowRetakeID = () => {
    setBackButtonDisble(true);
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setShowRetakeId(true);
      setShowIdCaptureCam(false);

      if (takeIdBack && selectedId === "Aadhaar Card") {
        setIdPhoto(imageSrc);
      }
      if (!takeIdBack && selectedId === "Aadhaar Card") {
        setIdBackPhoto(imageSrc);
      }
      if (selectedId !== "Aadhaar Card") {
        setIdPhoto(imageSrc);
      }
    } else {
      console.error("Webcam ref is not available.");
    }
    setBackButtonDisble(false);
  };

  const handleOpenCamForSelfie = () => {
    setBackButtonDisble(true);
    setShowSelfieCaptureCam(true);
    setShowSelfieInstModal(false);
    setShowLivenessComponent(true);
    setShowUploadPhotos(false);
    setShowKYCSuccess(false);
    setBackButtonDisble(false);
  };

  const handleShowUploadPhotos = async () => {
    try {
      setShowUploadPhotos(true);
      setShowSelfieCaptureCam(false);
      const response = await backEndCallObj("/kyc/processKyc/", {
        country: country,
        documentCode: documentCode,
        selfie: selfieImage,
        document: idPhoto,
        documentBack: idBackPhoto,
        userId: userId,
        refNo: refNo,
      });
      await setKycStatus(response.kycStatus);
      setShowKYCSuccess(true);
      setShowUploadPhotos(false);
    } catch (ex) {
      if (ex.response && ex.response?.status === 400) {
        setErrorMsg(ex.response?.data || null);
      } else {
        setErrorMsg("Something went wrong");
      }
    }
  };

  const handleTakeIdBackPhoto = () => {
    setBackButtonDisble(true);
    setShowRetakeId(false);
    setShowIdCaptureCam(true);
    setTakeIdBack(false);
    setBackButtonDisble(false);
  };

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().startsWith(searchInput.toLowerCase())
  );

  
  return (
    <div className="main-content row justify-content-center">
      <div className="col-12 col-sm-10 col-md-8 col-xl-6 col-xxl-5">
        {userValidation === "error" && (
          <div className="card">
            <div className="alert alert-warning py-2 px-3 fw-bold mb-3">
              !! {validationError}
            </div>
            <div className="card-body">
              <ul className="text-muted">
                <li>Please check your internet connection.</li>
                <li>Please check your proxy and connection.</li>
                <li>Please try again with valid App Id an Reference NUmber</li>
              </ul>
            </div>
          </div>
        )}
        {userValidation === "loading" && <div className="camLoad" />}
        {userValidation === "success" && (
          <div id="SelectCountry">
            {selCountryModal && (
              <div className="card">
                <div className="card-body">
                  <h4 style={{ fontSize: "23px" }}>
                    Which Country Issued Your Government ID ?
                  </h4>
                  <p className="text-muted">
                    This helps us to process your application in a compliant
                    manner
                  </p>
                  <div
                    className="input-container"
                    onClick={!isDisabled ? handleShowSearchModal : null}
                  >
                    <img
                      src={selectedCountry.flag}
                      alt="Indian Flag"
                      className="flag-icon"
                    />
                    <span className="country-text ">
                      {selectedCountry.name}
                    </span>
                    <span>
                      <i
                        className="fas fa-chevron-down"
                        style={{ cursor: "pointer" }}
                      ></i>
                    </span>
                  </div>
                </div>
                <div className="card-footer">
                  <Button
                    onClick={handleShowSelIdModal}
                    className="btn btn-primary btn-block"
                    disabled={isDisabled}
                  >
                    {isDisabled ? "Please wait" : "Proceed to Select ID Card"}
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}

        <div id="SearchCountry">
          {searchCountryModal && (
            <div className="card">
              <div className="card-header d-flex align-items-center">
                <span
                  onClick={handleShowSelCountry}
                  className="flex-shrink-0 gap-3"
                >
                  <i
                    className=" fas fa-light fa-arrow-left"
                    style={{ cursor: "pointer" }}
                  ></i>
                </span>

                <input
                  type="text"
                  className="form-control ms-3 box-shadow-none"
                  placeholder="Search for your country"
                  value={searchInput}
                  onChange={handleSearchInputChange}
                />
                {searchInput && (
                  <span
                    className="clear-icon"
                    onClick={() => setSearchInput("")}
                  >
                    <i className="fas fa-times "></i>
                  </span>
                )}
              </div>
              <div className="card-body">
                <ul className="ps-0 mb-0">
                  {filteredCountries.map((country, index) => (
                    <li
                      key={index}
                      onClick={() => handleSelectCountry(country)}
                      className={selectedCountry === country ? "selected" : ""}
                    >
                      <div
                        className="d-flex align-items-center px-3 py-2 country-ele"
                        type="button"
                      >
                        <img
                          src={country.flag}
                          alt={`${country.name} Flag`}
                          className="flag-icon flex-shrink-0"
                        />
                        <span className="country-text flex-grow-1 ms-2">
                          {country.name}
                        </span>

                        {selectedCountry === country && (
                          <img
                            src={TickIcon}
                            className="flag-icon flex-shrink-0 ms-auto"
                            alt="Tick Icon"
                          />
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        <div id="SelectIdCard">
          {selIdCardModal && (
            <div className="card">
              <div className="card-header">
                <span
                  onClick={backButtonDisble ? null : handleBackToSelCountry}
                >
                  <i
                    className=" fas fa-light fa-arrow-left"
                    style={{ cursor: "pointer" }}
                  ></i>
                </span>
              </div>
              <div className="card-body">
                <h4 style={{ fontSize: "23px" }}>
                  {" "}
                  Which Government ID Card Are You Using ?
                </h4>
                <p className="text-muted">
                  Photo of your Government ID is required to validate your
                  identity
                </p>
                <div className="government-id-list">
                  <ul className="ps-0 mb-0">
                    {governmentIDList.map(({ documentName, documentCode }) => (
                      <li
                        key={documentCode}
                        className="govt-id-item"
                        onClick={
                          proceedButtonDisable
                            ? null
                            : () =>
                                handleShowIdCaptureInst({
                                  documentName,
                                  documentCode,
                                })
                        }
                      >
                        <div className="input-container">
                          <span className="country-text ">{documentName}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        <div id="CaptureIdInstructions">
          {ShowIdCaptureInst && (
            <div className="card">
              <div className="card-header">
                <span onClick={backButtonDisble ? null : handleShowSelIdModal}>
                  <i
                    className=" fas fa-light fa-arrow-left"
                    style={{ cursor: "pointer" }}
                  ></i>
                </span>
              </div>
              <div className="card-body">
                <h4>{selectedId} Capture Tips</h4>
                <p className="text-muted">
                  Ensure a clear picture of ID card to get approved faster
                </p>
                <div className="idCapture" />
              </div>
              <div className="card-footer" style={{ justifyContent: "center" }}>
                <Button
                  onClick={proceedButtonDisable ? null : handleOpenCamForId}
                  className="btn btn-primary btn-block"
                >
                  Proceed to Capture ID Card
                </Button>
              </div>
            </div>
          )}
        </div>

        <div id="CaptureId">
          {ShowIdCaptureCam && (
            <div className={`card`}>
              <div className="card-header">
                <span onClick={backButtonDisble ? null : handleCloseWebCam}>
                  <i
                    className=" fas fa-light fa-arrow-left"
                    style={{ cursor: "pointer" }}
                  ></i>
                </span>
              </div>
              <div className="card-body">
                {selectedId === "Aadhaar Card" && takeIdBack === true && (
                  <h4>Capture Front side of the {selectedId}</h4>
                )}
                {selectedId === "Aadhaar Card" && takeIdBack === false && (
                  <h4>Capture Back side of the {selectedId}</h4>
                )}
                {selectedId !== "Aadhaar Card" && (
                  <h4>Capture Front side of {selectedId}</h4>
                )}
                <p style={{ fontSize: "15px" }} className="text-muted">
                  Make sure your document is without any glare and it is fully
                  inside
                </p>
                <div className="overflow-hidden">
                  <Webcam
                    audio={false}
                    screenshotFormat="image/png"
                    ref={webcamRef}
                    className="webcam-container rectangle"
                    videoConstraints={videoConstraints}
                  />
                </div>
              </div>
              <div className="card-footer">
                <Button
                  onClick={proceedButtonDisable ? null : handleShowRetakeID}
                  className="btn btn-primary btn-block"
                  disabled={!webcamRef}
                >
                  <i
                    className="fas fa-camera"
                    style={{ marginRight: "8px", cursor: "pointer" }}
                  ></i>{" "}
                  Capture Photo
                </Button>
              </div>
            </div>
          )}
        </div>

        <div id="RetakeID">
          {ShowRetakeId && (
            <div className="card">
              <div className="card-header">
                <span onClick={backButtonDisble ? null : handleOpenCamForId}>
                  <i
                    className=" fas fa-light fa-arrow-left"
                    style={{ cursor: "pointer" }}
                  ></i>
                </span>
              </div>
              <div className="card-body">
                <h4>Review photo of your {selectedId}</h4>
                <p className="text-muted">
                  Make sure the lighting is good and letters are clearly visible
                </p>
                <img
                  src={idBackPhoto ? idBackPhoto : idPhoto}
                  className="idcardclass"
                />
              </div>
              <div className="card-footer">
                <div className="d-flex flex-column gap-2">
                  <Button
                    onClick={backButtonDisble ? null : handleOpenCamForId}
                    className="btn btn-secondary"
                  >
                    Retake Photo
                  </Button>
                  {takeIdBack && (
                    <Button
                      className="btn btn-primary btn-block"
                      onClick={
                        proceedButtonDisable ? null : handleTakeIdBackPhoto
                      }
                    >
                      Take Aadhar Backside
                    </Button>
                  )}
                  {!takeIdBack && (
                    <Button
                      className="btn btn-primary btn-block"
                      onClick={
                        proceedButtonDisable ? null : handleSelfieInstModal
                      }
                    >
                      Use this Photo
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        <div id="SefieInstructions">
          {showselfieInstModal && (
            <div className="card">
              <div className="card-header">
                <span onClick={backButtonDisble ? null : handleOpenCamForId}>
                  <i
                    className=" fas fa-light fa-arrow-left"
                    style={{ cursor: "pointer" }}
                  ></i>
                </span>
              </div>
              <div className="card-body">
                <h4>Selfie Tips</h4>
                <p className="text-muted">
                  Please remove Spectacles ,Hats and masks.A clearly visible
                  selfie will get approved
                </p>
                <div className="selfieCapture" />
              </div>
              <div className="card-footer">
                <Button
                  onClick={proceedButtonDisable ? null : handleOpenCamForSelfie}
                  className="btn btn-primary btn-block"
                >
                  Proceed to Take Selfie
                </Button>
              </div>
            </div>
          )}
        </div>

        <div id="CaptureSelfie">
          {ShowSelfieCaptureCam && (
            <div className="card">
              <div className="card-header">
                <span onClick={handleSelfieInstModal}>
                  <i
                    className=" fas fa-light fa-arrow-left"
                    style={{ cursor: "pointer" }}
                  ></i>
                </span>
              </div>
              <div className="card-body">
                {showLivenessComponent && (
                  <LivenessQuickStartReact
                    onUploadSelfieClick={handleShowUploadPhotos}
                    sendSelfieImage={handleSetSelfieImage}
                    moveToSelfieInst={handleSelfieInstModal}
                  />
                )}
              </div>
            </div>
          )}
        </div>

        <div id="UploadPhotos">
          {ShowUploadPhotos && (
            <div className="card">
              <div className="card-body">
                {!errorMsg ? (
                  <>
                    <h4>Uploading documents</h4>
                    <p>This may take a few seconds, please wait </p>
                    <div className="uploading" />
                  </>
                ) : (
                  <div className="error-block">
                    <div className="alert alert-warning py-2 px-3 fw-bold mb-3">
                      {errorMsg}
                    </div>
                    <p className="fw-bold mb-2">Note :</p>
                    <ul className="text-muted list-unstyled">
                      <li>Please check your internet connection.</li>
                      <li>Please check your proxy and connection.</li>
                      <li>Make sure completely fill the oval with the face.</li>
                      <li>
                        Make sure your selfie and documents are clear and
                        visible.
                      </li>
                    </ul>
                    <div className="text-center">
                      <button
                        className="btn btn-primary mt-3"
                        onClick={() => {
                          setSelCountryModal(true);
                          setShowUploadPhotos(false);
                          setErrorMsg(null);
                        }}
                      >
                        Try Again
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div id="statusModal">
          {showKYCSuccess && (
            <div className="card">
              <div className="card-header">
                <span onClick={handleOpenCamForSelfie}>
                  <i
                    className=" fas fa-light fa-arrow-left"
                    style={{ cursor: "pointer" }}
                  ></i>
                </span>
              </div>
              <div className="card-body">
                {kycStatus === "failed" && (
                  <>
                    <h4>KYC Verification Failed </h4>
                    <div className="failure"></div>
                    <div className="error-block">
                      <ul className="text-muted list-unstyled">
                        <li>Please check your internet connection.</li>
                        <li>Please check your proxy and connection.</li>
                        <li>
                          Make sure your documents(including document containing
                          face) are clear and visible.
                        </li>
                      </ul>
                    </div>
                    <div className="text-center">
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          setSelCountryModal(true);
                          setShowKYCSuccess(false);
                        }}
                      >
                        Try Again
                      </button>
                    </div>
                  </>
                )}
                {kycStatus === "success" && (
                  <>
                    <h4>KYC Verification success</h4>
                    <div className="success" />
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modals;
