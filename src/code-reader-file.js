import React, { useState, useRef, useEffect, useCallback } from 'react'
import { MultiFormatReader } from '@zxing/library';
import {Html5Qrcode,  Html5QrcodeScanner } from 'html5-qrcode'
import { Upload, message, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';


const qrCodeRegionId = new MultiFormatReader();


export default function QrCodePluginRead() {
	const html5QrCodeRef = useRef(null)



	const onChange = (info) => {
		// console.log(info.fileList[0])
		const  html5QrCode  =  new  Html5Qrcode ("qr-input-file",  "lector") ; 
		const imageFile= info.fileList[0].originFileObj
		html5QrCode.scanFile(imageFile, true)
		.then(decodedText => {
		  // success, use decodedText
		  console.log(decodedText);
		})
		.catch(err => {
		  // failure, handle it.
		  console.log(`Error scanning file. Reason: ${err}`)
		});
	}

	  

	return (
		<>
		  	<Upload name='file'  id="qr-input-file" onChange={onChange}>
				<Button icon={<UploadOutlined />}>Click to Upload</Button>
			</Upload>
		</>
	)
}
