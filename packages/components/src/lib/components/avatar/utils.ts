type Status = "idle" | "loading" | "ready" | "error";

export function getImageStatus(image: HTMLImageElement | undefined, src?: string | null): Status {
	if (!src) {
		return "error";
	}

	if (!image) {
		return "idle";
	}

	if (image.complete && image.naturalWidth > 0) {
		return "ready";
	}

	return "loading";
}

type LoadImageOptions = {
	src: string;
	crossOrigin: string | null;
	referrerPolicy: ReferrerPolicy | null;
	srcset: string | null;
};

export function loadImage(
	setter: (status: Status) => void,
	{ src, srcset, crossOrigin, referrerPolicy }: LoadImageOptions
) {
	const _image = new Image();
	_image.src = src;

	if (crossOrigin) {
		_image.crossOrigin = crossOrigin;
	}

	if (referrerPolicy) {
		_image.referrerPolicy = referrerPolicy;
	}

	if (srcset) {
		_image.srcset = srcset;
	}

	_image.onload = () => setter("ready");
	_image.onerror = () => setter("error");
}
