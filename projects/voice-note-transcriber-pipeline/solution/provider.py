import json
import secrets
import urllib.error
import urllib.parse
import urllib.request


def http_recognizer(endpoint, model="whisper-1", api_key="", timeout=30):
    parsed = urllib.parse.urlparse(endpoint)
    if parsed.scheme not in ("http", "https") or not parsed.netloc or parsed.username:
        raise ValueError(
            "Use an explicit HTTP(S) transcription endpoint without URL credentials"
        )
    if (
        not isinstance(model, str)
        or not model.strip()
        or any(c in model for c in "\r\n")
    ):
        raise ValueError("A valid transcription model is required")
    if not 0 < timeout <= 120:
        raise ValueError("Timeout must be between 0 and 120 seconds")

    def recognize(wav):
        if (
            not isinstance(wav, bytes)
            or not wav.startswith(b"RIFF")
            or wav[8:12] != b"WAVE"
            or len(wav) > 20_000_000
        ):
            raise ValueError("Recognizer requires WAV bytes of at most 20 MB")
        boundary = "aiefs-" + secrets.token_hex(16)
        body = (
            (
                f'--{boundary}\r\nContent-Disposition: form-data; name="model"\r\n\r\n{model}\r\n--{boundary}\r\nContent-Disposition: form-data; name="file"; filename="segment.wav"\r\nContent-Type: audio/wav\r\n\r\n'
            ).encode()
            + wav
            + f"\r\n--{boundary}--\r\n".encode()
        )
        headers = {"Content-Type": "multipart/form-data; boundary=" + boundary}
        if api_key:
            headers["Authorization"] = "Bearer " + api_key
        request = urllib.request.Request(endpoint, body, headers, method="POST")
        try:
            with urllib.request.urlopen(request, timeout=timeout) as response:
                raw = response.read(1_000_001)
        except urllib.error.URLError as error:
            if isinstance(error.reason, TimeoutError):
                raise TimeoutError("Transcription request timed out") from error
            raise
        if len(raw) > 1_000_000:
            raise ValueError("Transcription response exceeds 1 MB")
        result = json.loads(raw)
        if (
            not isinstance(result, dict)
            or not isinstance(result.get("text"), str)
            or not result["text"].strip()
        ):
            raise ValueError("Recognizer returned no usable text")
        return result["text"].strip()

    return recognize
