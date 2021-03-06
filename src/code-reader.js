import React, { useState, useRef, useEffect, useCallback } from 'react'
import { MultiFormatReader } from '@zxing/library';
import { Html5Qrcode } from 'html5-qrcode'
import { Button } from 'antd'



const qrCodeRegionId = new MultiFormatReader();


export default function QrCodePlugin(props) {
	const [cameraScanning, setCameraScanning] = useState(false)
	const [cameraIdStatus, setCameraId] = useState('')
	const html5QrCodeRef = useRef(null)

	const handleStartCamera = useCallback(() => {
		const html5QrCode = new Html5Qrcode(qrCodeRegionId)
		html5QrCodeRef.current = html5QrCode

		Html5Qrcode.getCameras()
			.then((devices) => {
				if (devices && devices.length) {
					let cameraId = devices[0].id
					setCameraId(cameraId)
					html5QrCode.start(
						{ facingMode: "environment" },
						{
							fps: 10, // Optional, frame per seconds for qr code scanning
							qrbox:props.qrbox , // Optional, if you want bounded box UI
						},
						props.qrCodeSuccessCallback,
						props.qrCodeErrorCallback
					)
				}
			})
			.catch((error) => console.log('THE ERROR ', error))
	}, [])

	useEffect(() => {
		function createConfig(props) {
			var config = {}
			if (props.fps) {
				config.fps = props.fps
			}
			if (props.qrbox) {
				config.qrbox = props.qrbox
			}
			if (props.aspectRatio) {
				config.aspectRatio = props.aspectRatio
			}
			if (props.disableFlip !== undefined) {
				config.disableFlip = props.disableFlip
			}
			return config
		}

		var config = createConfig(props)

		// Suceess callback is required.
		if (!props.qrCodeSuccessCallback) {
			throw 'qrCodeSuccessCallback is required callback.'
		}
		return () => {}
	}, [])

	const handleStopCamera = () => {
		html5QrCodeRef.current
			.stop()
			.then((ignore) => console.log('stop ignore ', ignore))
			.catch((err) => console.log('stop error ', err))
	}

	return (
		<>
			<div id={qrCodeRegionId} />
			<Button
				onClick={() => {
					cameraScanning ? handleStopCamera() : handleStartCamera()
					setCameraScanning((previousState) => !previousState)
				}}>
				{cameraScanning ? 'Detener Escaneo' : 'Escanear con c??mara'}
			</Button>
			{/* <p>{cameraIdStatus}</p> */}
		</>
	)
}
