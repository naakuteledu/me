import http.server
import socketserver
import subprocess
import sys
import socket
import os
import time

PORT = 8000

def get_local_ip():
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    try:
        s.connect(("8.8.8.8", 80))
        return s.getsockname()[0]
    except Exception:
        return "127.0.0.1"
    finally:
        s.close()

# Generate the QR code
print("Creating QR code...")
subprocess.run([sys.executable, "generate_qr.py"], check=True)

class Handler(http.server.SimpleHTTPRequestHandler):
    pass

ip = get_local_ip()
url = f"http://{ip}:{PORT}/"
local_url = f"http://127.0.0.1:{PORT}/"

print()
print("=" * 60)
print(" LOVE WEBSITE IS RUNNING")
print("=" * 60)
print(f"Computer: {local_url}")
print(f"Phone:    {url}")
print()
print("QR file:  love_qr.png")
print()
print("Opening the website in your browser...")
print("Keep this window open while using the website.")
print("Press CTRL+C here to stop it.")
print("=" * 60)
print()

# Start the server first, then open the browser.
with socketserver.TCPServer(("0.0.0.0", PORT), Handler) as server:
    try:
        time.sleep(1)

        if os.name == "nt":
            # Windows: use the system browser directly.
            subprocess.Popen(["cmd", "/c", "start", "", local_url])
        else:
            import webbrowser
            webbrowser.open(local_url)

        server.serve_forever()

    except KeyboardInterrupt:
        print("\nWebsite stopped.")
    except OSError as e:
        print(f"\nCould not start the server: {e}")
        print("Port 8000 may already be in use.")
