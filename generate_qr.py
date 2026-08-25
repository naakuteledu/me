import socket
import qrcode

PORT = 8000

def get_local_ip():
    """Find the computer's LAN IP address."""
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    try:
        s.connect(("8.8.8.8", 80))
        return s.getsockname()[0]
    except Exception:
        return "127.0.0.1"
    finally:
        s.close()

ip = get_local_ip()
url = f"http://{ip}:{PORT}/"

qr = qrcode.QRCode(
    version=None,
    error_correction=qrcode.constants.ERROR_CORRECT_H,
    box_size=12,
    border=4,
)

qr.add_data(url)
qr.make(fit=True)

image = qr.make_image(
    fill_color="#d81b60",
    back_color="white"
)

image.save("love_qr.png")

print()
print("=" * 55)
print(" LOVE WEBSITE QR CODE")
print("=" * 55)
print(f"Website: {url}")
print("QR saved as: love_qr.png")
print()
print("For phone testing:")
print("1. Connect phone and PC to the SAME Wi-Fi.")
print("2. Scan love_qr.png with your phone.")
print("3. If Windows asks about Firewall, allow Python.")
print("=" * 55)
