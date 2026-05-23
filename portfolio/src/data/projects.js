// Project preview images: place these in /public/projects/
// marketagent.png, aurasync.png, codearena.png, herbtrace.png, realestate.png
// If you don't have screenshots, the gradient fallback will show instead.

export const PROJECTS = [
  {
    id: 1,
    title: 'MarketAgent',
    subtitle: 'AI-Powered Financial RAG System',
    description:
      'Autonomous financial intelligence platform using Agentic RAG architecture to synthesize structured research reports grounded in real-time market data — zero hallucinations.',
    bullets: [
      'Agentic RAG with dynamic tool-calling pipelines via LangChain.js',
      'Integrated Polygon.io + Tavily AI for live fact grounding',
      'Fallback mechanisms in Node.js/Express for API rate-limit resilience',
    ],
    stack: ['React.js', 'Node.js', 'Express', 'LangChain.js', 'Groq API', 'Llama 3.3-70B', 'Polygon.io', 'Tavily AI'],
    demo:     'https://market-agent-1-jp5a.onrender.com',
    github:   'https://github.com/Ansh0864',
    category: 'AI / GenAI',
    color:    '#00e5ff',
    gradient: 'linear-gradient(135deg,#001a2e 0%,#003d5c 50%,#00e5ff18 100%)',
    image:    '/projects/marketagent.png',
    emoji:    '📈',
    featured: true,
  },
  {
    id: 2,
    title: 'AuraSync',
    subtitle: 'Real-Time Emotion Recognition System',
    description:
      'End-to-end AI pipeline classifying 7 human micro-expressions in real time via WebRTC webcam and mapping emotional state to dynamic acoustic environments via Spotify.',
    bullets: [
      'Custom CNN on FER-2013 — 7 emotion classes, high accuracy',
      'Sub-80ms CPU inference via FastAPI; grayscale normalisation pipeline',
      'WebRTC capture → emotion inference → Spotify acoustic mood mapping',
    ],
    stack: ['Python', 'TensorFlow/Keras', 'FastAPI', 'React.js', 'WebRTC', 'Spotify API'],
    demo:     'https://aura-sync-1.onrender.com',
    github:   'https://github.com/Ansh0864',
    category: 'AI / ML',
    color:    '#a855f7',
    gradient: 'linear-gradient(135deg,#1a0028 0%,#3b0068 50%,#a855f718 100%)',
    image:    '/projects/aurasync.png',
    emoji:    '😊',
    featured: true,
  },
  {
    id: 3,
    title: 'CodeArena',
    subtitle: 'Real-Time Competitive Programming Platform',
    description:
      'High-concurrency competitive coding platform with live 1v1 duels, ELO-based matchmaking, and four specialised game modes with real-time score syncing via Socket.io.',
    bullets: [
      'ELO rating matchmaking — Socket.io bidirectional real-time sync',
      'Four modes: Rapid Duel, Bug Hunter, Code Duel, Complexity Duel',
      'Room-based architecture for multi-user concurrent session management',
    ],
    stack: ['React.js', 'Node.js', 'Tailwind CSS', 'MongoDB', 'Socket.io'],
    demo:     'https://codearena-murex.vercel.app',
    github:   'https://github.com/Ansh0864',
    category: 'Full Stack',
    color:    '#22c55e',
    gradient: 'linear-gradient(135deg,#001a0a 0%,#003d1c 50%,#22c55e18 100%)',
    image:    '/projects/codearena.png',
    emoji:    '⚔️',
    featured: false,
  },
  {
    id: 4,
    title: 'HerbTrace',
    subtitle: 'AI & Blockchain Herb Traceability System',
    description:
      'Full-stack traceability platform ensuring authenticity of Ayurvedic herbs from farmer to consumer using CNN image classification and Ethereum smart contracts.',
    bullets: [
      'CNN model for herb species classification from uploaded images',
      'Ethereum Solidity smart contracts for tamper-proof sourcing records',
      'Web3.py integration for on-chain provenance verification',
    ],
    stack: ['Python', 'FastAPI', 'TensorFlow/Keras', 'Solidity', 'Web3.py', 'React.js', 'Tailwind CSS'],
    demo:     'https://herbtrace-1-0vsq.onrender.com',
    github:   'https://github.com/Ansh0864',
    category: 'AI / Blockchain',
    color:    '#f59e0b',
    gradient: 'linear-gradient(135deg,#1a1000 0%,#3d2800 50%,#f59e0b18 100%)',
    image:    '/projects/herbtrace.png',
    emoji:    '🌿',
    featured: false,
  },
  {
    id: 5,
    title: 'AI Real Estate Valuator',
    subtitle: 'Deep Learning Price Prediction Engine',
    description:
      'End-to-end deep learning pipeline for housing price prediction with an interactive mortgage calculator and 5-year investment forecaster wrapped in a clean SaaS dashboard.',
    bullets: [
      'TensorFlow/Keras DL pipeline with Pandas + Scikit-Learn preprocessing',
      'st.session_state bridges AI predictions into mortgage calculator',
      'Raw model outputs translated to clean, responsive SaaS dashboard',
    ],
    stack: ['Python', 'TensorFlow', 'Scikit-Learn', 'Pandas', 'Streamlit'],
    demo:     'https://houseprice-uvfqtmyueyznh8ktadx9ng.streamlit.app/',
    github:   'https://github.com/Ansh0864',
    category: 'AI / ML',
    color:    '#ef4444',
    gradient: 'linear-gradient(135deg,#1a0000 0%,#3d0000 50%,#ef444418 100%)',
    image:    '/projects/realestate.png',
    emoji:    '🏠',
    featured: false,
  },
]

export const CATEGORIES = ['All', 'AI / GenAI', 'AI / ML', 'Full Stack', 'AI / Blockchain']