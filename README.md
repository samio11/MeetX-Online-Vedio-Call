# 🎥 MeetX - Online Video Calling Platform

<div align="center">

![MeetX Banner](https://img.shields.io/badge/MeetX-Video%20Calling-blue?style=for-the-badge&logo=video&logoColor=white)

<img width="1919" height="939" alt="image" src="https://github.com/user-attachments/assets/36d2ac32-8adc-4621-832a-fd1867524b9f" />


**Connect face-to-face from anywhere in the world**

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)](LICENSE)

[Features](#-features) • [Demo](#-demo) • [Installation](#-installation) • [Usage](#-usage) • [Tech Stack](#-tech-stack) • [Contributing](#-contributing)

</div>

---

## 📖 About

**MeetX** is a modern, feature-rich online video calling platform built with Next.js. It provides seamless real-time video communication with an intuitive interface, making virtual meetings easy and accessible for everyone.

## ✨ Features

- 🎬 **High-Quality Video Calls** - Crystal clear video and audio communication
- 👥 **Multi-Participant Support** - Connect with multiple people simultaneously
- 💬 **Real-Time Chat** - Integrated chat functionality during video calls
- 🔒 **Secure Connections** - End-to-end encrypted video streams
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- 🎨 **Modern UI/UX** - Clean and intuitive user interface
- ⚡ **Fast Performance** - Optimized for speed and reliability
- 🌐 **Cross-Browser Compatible** - Works on all modern browsers

## 🚀 Live Link



```
https://meet-x-online-vedio-call.vercel.app
```

## 🛠️ Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/) - React framework with App Router
- **Language:** [TypeScript](https://www.typescriptlang.org/) - Type-safe development
- **Styling:** CSS Modules / Tailwind CSS
- **Video Communication:** WebRTC
- **Real-Time Features:** Socket.io / WebSockets
- **Font:** [Geist](https://vercel.com/font) - Optimized font family by Vercel

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** / **yarn** / **pnpm** / **bun**

## 💻 Installation

1. **Clone the repository**

```bash
git clone https://github.com/samio11/MeetX-Online-Vedio-Call.git
cd MeetX-Online-Vedio-Call
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory:

```env
# Add your environment variables here
NEXT_PUBLIC_API_URL=your_api_url
NEXT_PUBLIC_SOCKET_URL=your_socket_url
```

4. **Run the development server**

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

5. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000) to see the application running.

## 📁 Project Structure

```
MeetX-Online-Vedio-Call/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── ...
├── components/            # Reusable components
├── public/               # Static assets
├── styles/               # Global styles
├── lib/                  # Utility functions
├── types/                # TypeScript type definitions
└── package.json          # Project dependencies
```

## 🎯 Usage

1. **Starting a Meeting**
   - Click on "New Meeting" to create a new video call
   - Share the meeting link with participants

2. **Joining a Meeting**
   - Enter the meeting ID or click on a shared link
   - Allow camera and microphone permissions
   - Join the call

3. **During the Call**
   - Toggle video/audio on/off
   - Share your screen
   - Use the chat feature to send messages
   - Invite more participants


## 🚀 Deployment

The easiest way to deploy MeetX is using the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme):

```bash
npm run build
vercel deploy
```

For detailed deployment instructions, check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

## 👨‍💻 Author

**Samio**

- GitHub: [@samio11](https://github.com/samio11)
- Project Link: [https://github.com/samio11/MeetX-Online-Vedio-Call](https://github.com/samio11/MeetX-Online-Vedio-Call)

## 🙏 Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [WebRTC](https://webrtc.org/)
- [Vercel](https://vercel.com)
- All contributors who help improve this project

## 📧 Contact & Support

If you have any questions, feel free to reach out or open an issue in the repository.

---

<div align="center">

**⭐ Star this repository if you find it helpful!**

Made with ❤️ by [Samio](https://github.com/samio11)

</div>
