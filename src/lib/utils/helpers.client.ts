import JSZip from 'jszip';
import { saveAs } from 'file-saver';

export const getPrefixLinks = () => location.origin + '/links/';
export const getLinks = (text: string): string => {
	return new URL(text, getPrefixLinks()).href;
};

export type QRDownloadData = { canvas: HTMLCanvasElement; name: string };
export const downloadQRCodes = async (
	data: QRDownloadData | QRDownloadData[],
	zipName?: string
) => {
	const isBlobSupported = !!new Blob();
	const isCanvasBlobSupported = isBlobSupported && !!HTMLCanvasElement.prototype.toBlob;

	if (!isBlobSupported || !isCanvasBlobSupported)
		throw new Error('Browser anda tidak mendukung fitur ini');

	if (Array.isArray(data) && zipName) {
		// save multiple QR Code canvases as zip
		const zip = new JSZip();
		const folder = zip.folder(zipName);
		if (!folder) throw new Error('Error creating zip folder');
		const promises = data.map((item, index) => {
			const { canvas, name } = item;
			return new Promise<void>((resolve, reject) => {
				canvas.toBlob((blob) => {
					if (blob) {
						folder.file(`${(index + 1).toString().padStart(3, '0')}. ${name}.png`, blob, {
							binary: true
						});
						resolve();
					} else {
						reject(new Error('Blob is not supported'));
					}
				});
			});
		});
		await Promise.all(promises);

		zip.generateAsync({ type: 'blob' }).then((content) => {
			saveAs(content, `${zipName}.zip`);
		});
	}
	if (!Array.isArray(data)) {
		// Save single QR code canvas as jpeg
		const { canvas, name } = data;
		canvas.toBlob((blob) => {
			if (blob) saveAs(blob, `${name}.jpeg`);
		});
	}
};
