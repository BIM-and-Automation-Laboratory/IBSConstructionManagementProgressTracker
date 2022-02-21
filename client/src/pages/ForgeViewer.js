import React, { Component } from 'react';
import ForgeViewer from 'react-forge-viewer';

const forgeViewerComp = {
  width: '100px',
  height: '100px'
}

const bimViewerForgediv = {
  border: 'solid rgb(0,128,128) 2px',
  width: '100%',
  height: '850px',
  position: 'relative',
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
    access token (using the client id and secret).*/   
    return fetch('http://localhost:4001/api/forge/oauth/token')
      .then((res) => res.json())
      .then((data) => data);
  }
 
  /* Once the viewer has initialized, it will ask us for a forge token so it can
  access the specified document. */
  handleTokenRequested(onAccessToken){
    console.log('Token requested by the viewer.');
    if(onAccessToken){
      this.getForgeToken().then((result) => {
        const token = result;
        
        if(token)
        onAccessToken(
          token.access_token, token.expires_in);
      });
    }
  }
  
  render() {
    return (
        <div className="ModelViewer" style={bimViewerForgediv}>
        <ForgeViewer
          version="7.61"
          urn="dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6aWJzX2J1Y2tldC9UcmFja2VyX01vZGVsLnJ2dA=="
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
