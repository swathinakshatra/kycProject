import React, { useEffect, useState } from "react";
import { FaceLivenessDetector } from "@aws-amplify/ui-react-liveness";
import { ThemeProvider } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import {backEndCall,backEndCallObj} from "../../AdminComponents/Services/mainServiceFile"


export function LivenessQuickStartReact({
  onUploadSelfieClick,
  sendSelfieImage,
  moveToSelfieInst,
}) {
  Amplify.configure({
    Auth: {
      aws_project_region: "us-east-1",
      region: "us-east-1",
      mandatorySignIn: false,
      identityPoolId: "us-east-1:3db75a3d-fc4d-4297-a2a6-2d77ff1009d3",
      accessKeyId: "AKIAT2VLVY43YY7LIV2O",
      secretAccessKey: "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",
    },
  });

  const [loading, setLoading] = useState(true);
  const [sessionId, setsessionId] = useState(null);
  const [finalImg, setFinalImg] = useState(null);
  const [result, setResult] = useState(null);
  const [Confidence, setConfidence] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  sendSelfieImage(finalImg);

  const fetchCreateLiveness = async () => {
    try {
      const response = await backEndCall("/kyc/get_sessionId");

      const sessionId = response.sessionId;

      setsessionId(sessionId);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setErrorMsg(error);
    }
  };

  useEffect(() => {
    fetchCreateLiveness();
  }, []);

  const handleAnalysisComplete = async () => {
    try {
      const response = await backEndCallObj("/kyc/get_sessionResults", {
        sessionId: sessionId,
      });

      setResult(response.Status);
      setConfidence(response.Confidence);

      setFinalImg(response.ReferenceImage.data);
    } catch (error) {
      setErrorMsg(error);
    }
  };

  const onUserCancel = (e) => {
    fetchCreateLiveness();
  };

  const getErrorMessage = (errorMsg) => {
    if (errorMsg.error?.message === "Client Timeout") {
      return (
        <div>
          <div className="alert alert-warning py-2 px-3 fw-bold mb-3">
            !! Time Out
          </div>
          <p className="">
            The face didn't fit inside the oval in the time limit. Please
            completely fill the oval with your face and try again.
          </p>
          <div className="card-body">
            <ul className="text-muted list-unstyled">
              <li>Please check your internet connection.</li>
              <li>Please check your proxy and connection.</li>
              <li>Make sure completely fill the oval with the face.</li>
              <li>Make sure your selfie is clear and visible.</li>
            </ul>
          </div>
        </div>
      );
    }
    if (errorMsg.message === "Network Error") {
      return (
        <>
          <div className="alert alert-warning py-2 px-3 fw-bold mb-3">
            !! Network Error
          </div>
          <ul className="text-muted list-unstyled">
            <li>Please check your internet connection.</li>
            <li>Please check your proxy and connection.</li>
          </ul>
        </>
      );
    }

    if (errorMsg.response?.data) {
      return (
        <>
          <div className="alert alert-warning py-2 px-3 fw-bold mb-3">
            {errorMsg.response.data}
          </div>
          <ul className="text-muted">
            <li>Please check your internet connection.</li>
            <li>Please check your proxy and connection.</li>
            <li>Please make sure your selfie is clear and visible</li>
          </ul>
        </>
      );
    }
    return (
      <>
        <div className="alert alert-warning py-2 px-3 fw-bold mb-3">
          !! Unable To Reach The Server
        </div>
        <ul className="text-muted list-unstyled">
          <li>Please check your internet connection.</li>
          <li>Please check your proxy and connection.</li>
          <li>Make sure completely fill the oval with the face.</li>
          <li>Make sure your selfie is clear and visible.</li>
        </ul>
      </>
    );
  };

  return (
    <ThemeProvider>
      {loading ? (
        <>
          <div
            className="camLoad
          "
          />
        </>
      ) : (
        <div>
          {finalImg ? (
            <div>
              <h4 className="mb-3">Face Liveness Result</h4>
              <div className="mb-3">
                <div>
                  <span className="fw-semibold me-2">Liveness Result : </span>
                  {parseInt(Confidence) >= 75 ? (
                    <span className="text-success">Success</span>
                  ) : (
                    <span className="text-danger">Failed</span>
                  )}
                </div>
              </div>
              <div className="d-flex align-items-center flex-wrap mb-3 gap-2">
                <button
                  className="btn btn-sm btn-secondary"
                  onClick={() => moveToSelfieInst()}
                >
                  Retake Selfie
                </button>
                <button
                  className="btn btn-primary "
                  onClick={() => onUploadSelfieClick()}
                  disabled={parseInt(Confidence) < 75}
                >
                  Verify Documents
                </button>
              </div>

              <img
                src={`data:image/png;base64,${finalImg}`}
                alt="Analysis Result"
                className="finalImg"
              />
            </div>
          ) : errorMsg === null ? (
            <FaceLivenessDetector
              sessionId={sessionId}
              region="us-east-1"
              onUserCancel={onUserCancel}
              onAnalysisComplete={handleAnalysisComplete}
              onError={(error) => {
                setErrorMsg(error);
              }}
            />
          ) : (
            <div className="error-block">
              {getErrorMessage(errorMsg)}

              {errorMsg.name === "Time" && (
                <>
                  <p className="warning-message">
                    <span className="text-danger">!! </span>Time Out Face didn't
                    fit inside the oval in the time limit. Try again and
                    completely fill the oval with the face.
                  </p>
                </>
              )}
              <div className="text-center">
                <button
                  className="btn btn-primary"
                  onClick={() => moveToSelfieInst()}
                >
                  Try Again
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </ThemeProvider>
  );
}
