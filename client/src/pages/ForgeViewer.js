import React, { useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import * as THREE from "three";

const FETCH_INSTALLATION_STATUS = gql`
  {
    getObjects {
      barcodeID
    }
  }
`; //Instead of returning everything, return only the barcode of those that hasnt been installed

function ModelViewer() {
  const viewerStyle = {
    position: "relative",
    width: "100%",
    height: "750px",
  };

  const {
    data: { getObjects: objects },
  } = useQuery(FETCH_INSTALLATION_STATUS);
  console.log(objects);

  // explicitly read any global variables from window
  const Autodesk = window.Autodesk;

  // Get token from server
  // this function returns a promise and not the data itself
  const getForgeToken = () => {
    return fetch("http://localhost:4001/api/forge/oauth/token")
      .then((response) => response.json())
      .then((data) => data);
  };

  const initializeViewer = async (urn) => {
    getForgeToken().then((result) => {
      const token = result;

      const viewerOptions = {
        env: "AutodeskProduction",
        accessToken: token.access_token,
        api: "derivativeV2",
      };

      var viewerContainer = document.getElementById("viewerContainer");
      var viewer = new Autodesk.Viewing.GuiViewer3D(viewerContainer);

      Autodesk.Viewing.Initializer(viewerOptions, () => {
        viewer.start();
        Autodesk.Viewing.Document.load(
          `urn:${urn}`,
          onDocumentLoadSuccess,
          onDocumentLoadFailure
        );
      });

      const onDocumentLoadSuccess = (doc) => {
        console.log("Document loaded.");
        var defaultModel = doc.getRoot().getDefaultGeometry();
        viewer.loadDocumentNode(doc, defaultModel).then((i) => {
          //Set everything to grey colour
          //get barcode installed
          const installed = [];
          if (objects) {
            objects.forEach((installedId) => {
              // console.log(installedId);
              installed.push(installedId["barcodeID"]);
            });
          }
          console.log(installed);

          //get DbIds that are installed
          const resArray = [];
          if (installed) {
            // console.log(installed.length);
            return new Promise((resolve) => {
              //using a Promise here or else the array will not be updated properly when accessed later.
              viewer.model.getExternalIdMapping((data) => {
                installed.forEach((externalId) => {
                  if (data[externalId]) {
                    resArray.push(data[externalId]);
                  }
                });
                console.log(resArray, resArray.length);
                resolve(resArray);

                console.log("Color change initiated.");
                THREE = window.THREE;
                for (let i = 0; i < resArray.length; i++) {
                  viewer.setThemingColor(
                    resArray[i],
                    new THREE.Vector4(0.44, 0.75, 0.57, 0.8)
                  );
                }
              });
            });
          }
        });
      };

      const onDocumentLoadFailure = (viewerErrorCode, viewerErrorMsg) => {
        console.error(
          "onDocumentLoadFailure() - errorCode:" +
            viewerErrorCode +
            "\n- errorMessage:" +
            viewerErrorMsg
        );
      };
    });
  };

  const urn =
    "dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6aWJzX2J1Y2tldC9LWV9GWVAucnZ0";
  useEffect(() => {
    initializeViewer(urn);
  }, []);

  return (
    <div>
      <div style={viewerStyle} id="viewerContainer"></div>
    </div>
  );
}

export default ModelViewer;
