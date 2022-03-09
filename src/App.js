import React, { useState, useRef, useEffect, useCallback } from 'react'
import { Button } from 'antd'
import QrCodePlugin from './code-reader'
import QrCodePluginRead from './code-reader-file'

function App(props) {
  const [text, settext] = useState('')

	const handleSuccessScan = (decodeText, decodeResult) => {
		console.log('FFFFFF ', decodeText)
    settext(decodeText)
	}

	const handleErrorScan = (item) => {
    console.log('Error ', item)
  }


  return (
    <>
      {/* <QrCodePlugin
											fps={10}
											qrbox={{ width: 700, height: 200 } }
											disableFlip={false}
											qrCodeSuccessCallback={handleSuccessScan}
											qrCodeErrorCallback={handleErrorScan}
			/>   */}
      <QrCodePluginRead
    
        qrCodeSuccessCallback={handleSuccessScan}
        qrCodeErrorCallback={handleErrorScan}
      />

      { <p>{text}</p> }

    </>
  );
}

export default App;
