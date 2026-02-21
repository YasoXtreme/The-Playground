## 📱 Network Scanner: Dual-Architecture Network Scanner

A portable, full-stack local network scanner designed to map out active IP addresses on complex subnetworks. This project bypasses standard Android sandbox restrictions by bridging a modern web frontend with a background C++ Node.js engine to execute low-level TCP ping sweeps.

[![Network Scanner v1.0](https://img.shields.io/github/v/release/yasoxtreme/The-Playground?filter=networkscanner-v1.0&style=for-the-badge&color=FF416C)](https://github.com/YOURUSERNAME/YOURREPO/releases/tag/networkscanner-v1.0)

> 📥 **Quick Download:** Don't want to compile the code from scratch? You can download the install-ready `.apk` file directly from the [Releases page](https://github.com/yasoxtreme/The-Playground/releases/tag/networkscanner-v1.0) to test it on your Android device immediately.

### 📦 Project Dependencies

Because this is a dual-environment architecture, the dependencies are split across two separate universes:

1. **The Native Shell (Root):** Relies on `cordova-android` to build the mobile app and the `nodejs-mobile-cordova` plugin to embed the C++ engine.
2. **The Backend Engine (`www/nodejs-project/`):** A fully isolated Node.js environment utilizing `express` (v4) and `cors` to serve local network requests to the frontend WebView.

### 🛠️ Setup & Installation

_Note: Ensure you have the Android SDK, Java SDK, Gradle, and Cordova CLI installed globally before building._

**1. Install Root Dependencies**
From within this project's root folder (`01-cordova-networking-app`), install the Cordova plugins and native tools:

```bash
npm install
```

**2. Install Backend Dependencies**

Navigate into the isolated Node.js background environment and install the server packages:

**Bash**

```
cd www/nodejs-project
npm install
cd ../..
```

**3. Generate and Build the App**

Build the native Android factory and push the compiled application to a connected physical device:

**Bash**

```
cordova platform add android
cordova run android
```

### ⚙️ Core Architecture Notes

- **Cleartext Traffic:** Android 9+ blocks local HTTP requests by default. The `config.xml` file contains a custom `<edit-config>` block that injects a `usesCleartextTraffic="true"` bypass directly into the native `AndroidManifest.xml`.
- **TCP Sweep:** The backend does not use ARP commands. It uses Node's native `net` and `os` modules to concurrently knock on Port 80 across the subnet, leveraging `ECONNREFUSED` errors to identify live devices behind firewalls.
