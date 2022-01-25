import React, { Component } from 'react';
import ForgeViewer from 'react-forge-viewer';

const forgeViewerComp = {
  width: '100px',
  height: '100px'
}

const bimViewerForgediv = {
  border: 'solid rgb(220,220,220)',
  width: '60%',
  height: '65%',
  position: 'fixed',
  top: '110px',
  right: '10px',
}

class ModelViewer extends Component {
 
  constructor(props){
    super(props);
 
    this.state = {
      view:null
    }
  }
 
  handleViewerError(error){
    console.log('Error loading viewer.');
  }
 
  /* after the viewer loads a document, we need to select which viewable to
  display in our component */
  handleDocumentLoaded(doc, viewables){
    if (viewables.length === 0) {
      console.error('Document contains no viewables.');
    }
    else{
      //Select the first viewable in the list to use in our viewer component
      this.setState({view:viewables[0]});
    }
  }
 
  handleDocumentError(viewer, error){
    console.log('Error loading a document');
  }
 
  handleModelLoaded(viewer, model){
    console.log('Loaded model:', model);
  }
 
  handleModelError(viewer, error){
    console.log('Error loading the model.');
  }
 
  getForgeToken(){
    /* this would call an endpoint on our server to generate a public
    access token (using the client id and sercret). Doing so should yield a
    response that looks something like the following...
    */
    return {
      access_token: "eyJhbGciOiJSUzI1NiIsImtpZCI6IlU3c0dGRldUTzlBekNhSzBqZURRM2dQZXBURVdWN2VhIn0.eyJzY29wZSI6WyJkYXRhOnJlYWQiLCJkYXRhOndyaXRlIiwiZGF0YTpjcmVhdGUiLCJidWNrZXQ6cmVhZCIsImJ1Y2tldDpjcmVhdGUiXSwiY2xpZW50X2lkIjoiMXdkZm1rNE5PSjlMS1Q0MmFBTFI5d1VBVWZ5THhDSU4iLCJhdWQiOiJodHRwczovL2F1dG9kZXNrLmNvbS9hdWQvYWp3dGV4cDYwIiwianRpIjoiSHlnQVVwVlZmcG95V3BoV2NXbmZ1eFlUbjV6NWFFTWUxOVJqRTJaUEdhSldtaFFRd2pqZ1VzVERxYjNia3JmQiIsImV4cCI6MTYyNDE2NDY5Nn0.NJgbTNKsjxVbwgUd2OwngeAhkKjgBFfzWOKzyx6FlFLboLcGUTa_tZ_cBx7CcQ-F_TfBdUGcRhakVbxDGiOoDB0oESq6iYRlH8scJwkH3m8TkjpFsPh_gBKubAbNTNVelRlkfVnOMnydDuPE3SxHggghJ2b36Qkba8ld7EPSeJ0hF5aim0w-7we-iGuEK0upiTiv6OQSTjdYWXKOb_ZhCFx3ZyODnVJsGLXFfMX1XStkarqBecdGR0rLJxIO7ajB8iGufjU3tL4vpbm5Cr9aH1OYIcGf8YQYW7V9QFRsHtqAtumqpzV_RRq63r8BWikpDLAFQhdaCCWtpvvMtQ8Z2w",
      expires_in: 3599,
      token_type: "Bearer"
    };
  }
 
  /* Once the viewer has initialized, it will ask us for a forge token so it can
  access the specified document. */
  handleTokenRequested(onAccessToken){
    console.log('Token requested by the viewer.');
    if(onAccessToken){
      let token = this.getForgeToken();
      if(token)
        onAccessToken(
          token.access_token, token.expires_in);
    }
  }
  
  render() {
    return (
      <div className="ModelViewer" style={bimViewerForgediv}>
        <ForgeViewer
          version="6.0"
          urn="dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6a2V2aW5fMjAyMC0wNy0xMC9NRVAlMjAyJTIwR3JhcGhfMS5ydnQ"
          view={this.state.view}
          headless={false}
          onViewerError={this.handleViewerError.bind(this)}
          onTokenRequest={this.handleTokenRequested.bind(this)}
          onDocumentLoad={this.handleDocumentLoaded.bind(this)}
          onDocumentError={this.handleDocumentError.bind(this)}
          onModelLoad={this.handleModelLoaded.bind(this)}
          onModelError={this.handleModelError.bind(this)}
          style={forgeViewerComp}
        />
      </div>
    );
  }
}
 
export default ModelViewer;
