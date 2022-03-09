import React, { useState, useRef, useEffect, useCallback } from 'react'
import { Html5Qrcode, Html5QrcodeScanner } from 'html5-qrcode'
import { Button } from 'antd'
import QrCodePlugin from './code-reader'

function App(props) {
  const [text, settext] = useState('')
  const [result, setresult] = useState('')

	const handleSuccessScan = (decodeText, decodeResult) => {
		console.log('FFFFFF ', decodeResult)
	}

	const handleErrorScan = (item) => {
    console.log('Error ', item)
  }


  return (
    <>
      <QrCodePlugin
											fps={10}
											qrbox={250}
											disableFlip={false}
											qrCodeSuccessCallback={handleSuccessScan}
											qrCodeErrorCallback={handleErrorScan}
			/>
    </>
  );
}

export default App;
