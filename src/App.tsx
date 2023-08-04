/* eslint-disable */
import { useState } from 'react';
import classNames from 'classnames';
import './App.css';
import DeleteIcon from '@mui/icons-material/Delete';
// import SelectedListItem from './components/listGroup/ListGroup';
import ChatWindow from './components/chatWindow/ChatWindow';
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import {ArrowBackIos, ArrowForwardIos} from '@mui/icons-material';
import MetaSidebar, { MetaData} from './components/metaSidebar/MetaSidebar';
import {ChartElement} from './components/countChart/CountChart';
import TopBar from './components/topBar/TopBar';
import PdfUploadView from './components/pdfViewer/PDFViewer';
import ChartDataProvider from './components/countChart/ChartContext';

function cleanFileStorage() {
  localStorage.removeItem('pdfDataUrl');
  localStorage.removeItem('documentContent');
  localStorage.removeItem('chatHistory');
}

function showAlert(message: string, durationInSeconds: number) {
  let app = document.getElementById("appBox");
  const alertBox = document.createElement('div');
  alertBox.style.position = 'fixed';
  alertBox.style.bottom = '20px';
  alertBox.style.left = '50%';
  alertBox.style.color = 'white';
  alertBox.style.transform = 'translateX(-50%)';
  alertBox.style.padding = '10px';
  alertBox.style.backgroundColor = 'rgba(216, 136, 142, 0.8)';
  alertBox.style.border = '2px solid red';
  alertBox.style.borderRadius = '4px';
  alertBox.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.2)';
  alertBox.style.zIndex = '9999';
  alertBox.innerText = message;

  app?.appendChild(alertBox);

  setTimeout(() => {
    app?.removeChild(alertBox);
  }, durationInSeconds * 1000);
}

export default function App() {
  let items = ["Neues Dokument"];

  const handleSelectedItem = (item: string) => {
    cleanFileStorage();
    window.location.reload();
  }


  const [showChat, setShowChat] = useState(false);
  const [isRightMenuVisible, setRightMenuVisible] = useState(false);

  const toggleRightMenu = () => {
    setRightMenuVisible(!isRightMenuVisible)
  };

  const sidebarWidth = classNames('0px', {
    '450px': isRightMenuVisible,
  });

  const contentClassName = classNames('menu-content', {
    'content--toggled': isRightMenuVisible,
  });

  const arrowClassName = classNames('sidebarToggleIcon', {
    'sidebarToggleIcon--toggled': isRightMenuVisible,
  });

  const queryInputClassName = classNames('query-root', {
    'queryRootToggled': isRightMenuVisible,
  });

  const initMetaDataEntry: ChartElement = {name: "leer", value: 0}
  const metaStartData: MetaData = {
    PER: [initMetaDataEntry], 
    LOC: [initMetaDataEntry], 
    ELSE: [initMetaDataEntry]
  };
  const [metaData, setMetaData] = useState(metaStartData);
  
  const handleToggle = () => {
    const qa_setting = localStorage.getItem("documentContent");
    if (qa_setting) {
      const qa_support = JSON.parse(qa_setting).qa_support;
      if (qa_support) {
        setShowChat(!showChat);
      } else {
        showAlert("Die Sprache der Datei wird nicht unterstützt", 3);
      }
    }
  };

    return (
      <ChartDataProvider>
        <Box id="appBox" className={"appWrapper"}>
          {/* Left Sidebar */}
          {/*<Box className={"leftSidebarBox"}>*/}
            {/* Content */}
            {/*<SelectedListItem items={items} onSelectItem={handleSelectedItem}/>*/}
          {/*<Box>*/}
    
          {/* Main Content */}
          <Box className={"mainContent"}>

            {/* Top Bar */}
            <Box className={"topBar"}>
              {/* Top Bar Content */}
              <TopBar title="Berichtanalyse"/>
            </Box>
    
            {/* Menu Bar */}
            <Box className={"menuBar"}>
              {/* Menu Bar Content */}
                <div>
                  <span>Dokument</span>
                  <Switch 
                    checked={showChat} 
                    onChange={handleToggle} 
                    name="Dokument"
                    size="medium"
                    
                  />
                  <span>Chat</span>
                </div>
                <div id="clearButton" className="clearButton">
                <Button variant="outlined" startIcon={<DeleteIcon />} onClick={cleanFileStorage}>
                  Verwerfen
                </Button>
                </div>
            </Box>
    
            {/* Main Content */}
            <Box className={"mainContent"}>
              {/* Main Content */}
                  {showChat ? (
                        <ChatWindow className={contentClassName}queryInputClassName={queryInputClassName}/>
                      ) : (
                        <PdfUploadView className={contentClassName}/>
                    )}
            </Box>
          </Box>
    
          {/* Right Sidebar */}
          <Box sx={{ width: {sidebarWidth} }}>
          <div className="menu-toggle" onClick={toggleRightMenu}>
            {/* Content */}
            <div>   
              {isRightMenuVisible ? (
                <>
                  <IconButton color="primary" className={arrowClassName} aria-label="send">
                    <ArrowForwardIos />
                  </IconButton>
                  <MetaSidebar PER={metaData.PER} LOC={metaData.LOC} ELSE={metaData.ELSE}/>
                </>
              ) : (
                <>
                <IconButton color="primary" className={arrowClassName} aria-label="send">
                  <ArrowBackIos />
                </IconButton>
              </>
              )}
            </div>
        </div>
          </Box>
        </Box>
      </ChartDataProvider>
    );
  };
  
