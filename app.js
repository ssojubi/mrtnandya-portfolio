  const themeBtn = document.getElementById('themeBtn');
  const html = document.documentElement;
  let isDark = false;
  themeBtn.addEventListener('click', () => {
    isDark = !isDark;
    html.setAttribute('data-theme', isDark ? 'dark' : 'light');
    themeBtn.textContent = isDark ? '☀️' : '🌙';
  });

  const fab = document.getElementById('chatFab');
  const win = document.getElementById('chatWindow');
  const close = document.getElementById('chatClose');
  const input = document.getElementById('chatInput');
  const send = document.getElementById('chatSend');
  const msgs = document.getElementById('chatMessages');
  let chatOpen = false;

  const toggle = () => {
    chatOpen = !chatOpen;
    win.classList.toggle('hidden', !chatOpen);
    fab.textContent = chatOpen ? '✕' : '💬';
  };
  fab.addEventListener('click', toggle);
  close.addEventListener('click', toggle);

  const addMsg = (text, type) => {
    const div = document.createElement('div');
    div.className = `msg ${type}`;
    div.textContent = text;
    msgs.appendChild(div);
    msgs.scrollTop = msgs.scrollHeight;
  };

  const showTyping = () => {
    const t = document.createElement('div');
    t.className = 'typing'; t.id = 'typing';
    t.innerHTML = '<span></span><span></span><span></span>';
    msgs.appendChild(t);
    msgs.scrollTop = msgs.scrollHeight;
    return t;
  };

  const replies = [
    "Thanks for reaching out! I'd love to connect. Feel free to reach me through email or LinkedIn.",,
    "I'm currently available for consulting and project work. What's your timeline?",
    "You can check out my latest projects in the section below."
  ];
  let replyIdx = 0;

  const handleSend = () => {
    const text = input.value.trim();
    if (!text) return;
    addMsg(text, 'user');
    input.value = '';
    input.style.height = 'auto';
    const t = showTyping();
    setTimeout(() => {
      t.remove();
      addMsg(replies[replyIdx % replies.length], 'bot');
      replyIdx++;
    }, 1000 + Math.random() * 600);
  };

  send.addEventListener('click', handleSend);
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
  });
  input.addEventListener('input', () => {
    input.style.height = 'auto';
    input.style.height = Math.min(input.scrollHeight, 100) + 'px';
  });