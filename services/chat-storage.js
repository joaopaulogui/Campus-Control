const CHATS_KEY = "chats";

const defaultChats = [
  {
    id: "CHAT001",
    participant: {
      id: "FUNC001",
      name: "João Silva",
      department: "Manutenção",
      online: true
    },
    unread: 2,
    messages: [
      {
        id: "MSG001",
        senderId: "FUNC001",
        text: "O AC da sala 201 já foi consertado",
        createdAt: "2026-06-28T10:30:00"
      },
      {
        id: "MSG002",
        senderId: "ME",
        text: "Perfeito! Obrigado pelo retorno",
        createdAt: "2026-06-28T10:32:00"
      },
      {
        id: "MSG003",
        senderId: "FUNC001",
        text: "Precisa de mais alguma coisa?",
        createdAt: "2026-06-28T10:33:00"
      },
      {
        id: "MSG004",
        senderId: "ME",
        text: "Por enquanto está tudo ok",
        createdAt: "2026-06-28T10:35:00"
      }
    ]
  },
  {
    id: "CHAT002",
    participant: {
      id: "FUNC002",
      name: "Maria Costa",
      department: "Coordenação",
      online: true
    },
    unread: 0,
    messages: [
      {
        id: "MSG001",
        senderId: "FUNC002",
        text: "Oi",
        createdAt: "2026-06-28T10:30:00"
      },
      {
        id: "MSG002",
        senderId: "ME",
        text: "Oi",
        createdAt: "2026-06-28T10:32:00"
      }
    ]
  },
  {
    id: "CHAT003",
    participant: {
      id: "FUNC003",
      name: "Pedro Santos",
      department: "TI",
      online: false
    },
    unread: 0,
    messages: [
      {
        id: "MSG001",
        senderId: "FUNC003",
        text: "Oi",
        createdAt: "2026-06-28T10:30:00"
      },
      {
        id: "MSG002",
        senderId: "ME",
        text: "Tchau",
        createdAt: "2026-06-28T10:32:00"
      }
    ]
  },
  {
    id: "CHAT004",
    participant: {
      id: "FUNC004",
      name: "Ana Lima",
      department: "Secretaria",
      online: true
    },
    unread: 0,
    messages: [
      {
        id: "MSG001",
        senderId: "ME",
        text: "Oi",
        createdAt: "2026-06-28T10:32:00"
      },
      {
        id: "MSG002",
        senderId: "FUNC004",
        text: "Tchau",
        createdAt: "2026-06-28T10:30:00"
      }
    ]
  },
  {
    id: "CHAT005",
    participant: {
      id: "FUNC005",
      name: "Carlos Souza",
      department: "Segurança",
      online: true,
    },
    unread: 0,
    messages: []
  }
];

function getChats() {
  const saved = localStorage.getItem(CHATS_KEY);

  if (saved) {
    return JSON.parse(saved);
  }

  return defaultChats;
}

function saveChats(chats) {
  localStorage.setItem(CHATS_KEY, JSON.stringify(chats));
}