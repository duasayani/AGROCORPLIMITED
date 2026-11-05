/* ===== AGRO CORP LTD - Admin Dashboard ===== */
const DB_URL = "https://firqrpeemkxtvdkhnwpx.supabase.co";
const DB_KEY = "sb_publishable_DC8XvOjUsac-vzmXh5cKQQ_gJjwGrh3";
const db = window.supabase.createClient(DB_URL, DB_KEY);

const $ = s => document.querySelector(s);
const STATUS = { new: 'New', in_progress: 'In progress', completed: 'Completed' };
let inquiries = [];

/* ---------- helpers ---------- */
const esc = v => String(v ?? '').replace(/[&<>"']/g, c =>
  ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const fmtDate = d => d ? new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '';

/* ---------- theme (same key as website) ---------- */
function applyTheme(t) {
  document.documentElement.setAttribute('data-theme', t);
  $('#themeBtn').textContent = t === 'dark' ? '☀️' : '🌙';
}
(function () {
  let t = 'light';
  try { t = localStorage.getItem('emaza-theme') || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'); } catch (e) {}
  applyTheme(t);
})();
$('#themeBtn').onclick = () => {
  const t = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  applyTheme(t);
  try { localStorage.setItem('emaza-theme', t); } catch (e) {}
};

/* ---------- navigation ---------- */
const TITLES = {
  dashboard: 'Dashboard overview', inquiries: 'All inquiries', messages: 'Messages',
  products: 'Products', settings: 'Settings'
};
function showView(name) {
  document.querySelectorAll('.view').forEach(v => v.hidden = v.id !== 'view-' + name);
  document.querySelectorAll('.nav').forEach(n => n.classList.toggle('active', n.dataset.view === name));
  $('#pageTitle').textContent = TITLES[name];
  $('#sidebar').classList.remove('open');
}
document.querySelectorAll('.nav').forEach(n => n.onclick = () => showView(n.dataset.view));
$('#menuBtn').onclick = () => $('#sidebar').classList.toggle('open');

/* ---------- admin access check ---------- */
async function checkAdmin() {
  const { data: { session }, error } = await db.auth.getSession();
  if (error || !session) { location.replace('index.html'); return; }

  const { data: admin, error: adminError } = await db
    .from('admin_users').select('user_id').eq('user_id', session.user.id).maybeSingle();

  if (adminError || !admin) {
    await db.auth.signOut();
    location.replace('index.html');
    return;
  }
  $('#status').textContent = 'Welcome back, Admin. Here is your business overview.';
  $('#adminMail').textContent = session.user.email;
  $('#logoutBtn').hidden = false;
  loadInquiries();
}
$('#logoutBtn').onclick = async () => {
  await db.auth.signOut();
  location.replace('index.html');
};

/* ---------- inquiries ---------- */
async function loadInquiries() {
  const { data, error } = await db.from('inquiries').select('*').order('created_at', { ascending: false });
  if (error) {
    console.error(error);
    const msg = '<tr><td colspan="7" class="empty">Could not load inquiries. Check that the "inquiries" table exists in Supabase.</td></tr>';
    $('#inquiryRows').innerHTML = msg;
    $('#recentRows').innerHTML = msg;
    return;
  }
  inquiries = data || [];
  render();
}

function render() {
  const count = s => inquiries.filter(i => (i.status || 'new') === s).length;
  $('#total').textContent = inquiries.length;
  $('#new').textContent = count('new');
  $('#progress').textContent = count('in_progress');
  $('#completed').textContent = count('completed');

  const pill = s => `<span class="pill ${esc(s)}">${esc(STATUS[s] || s)}</span>`;

  $('#recentRows').innerHTML = inquiries.slice(0, 5).map(i => `
    <tr><td>${esc(i.full_name)}<small>${esc(i.company)}</small></td>
    <td>${esc(i.product)}</td><td>${esc(i.country)}</td><td>${pill(i.status || 'new')}</td></tr>`).join('')
    || '<tr><td colspan="4" class="empty">No inquiries yet.</td></tr>';

  const msgs = inquiries.filter(i => i.message);
  $('#messageList').innerHTML = msgs.map(i => `
    <div class="msg"><b>${esc(i.full_name)}</b>
    <small>${esc(i.email)} · ${fmtDate(i.created_at)}</small><p>${esc(i.message)}</p></div>`).join('')
    || '<p class="empty">No customer messages yet.</p>';

  renderTable();
}

function renderTable() {
  const q = $('#search').value.trim().toLowerCase();
  const f = $('#statusFilter').value;
  const rows = inquiries.filter(i =>
    (!f || (i.status || 'new') === f) &&
    (!q || [i.full_name, i.company, i.product, i.country, i.email].join(' ').toLowerCase().includes(q)));

  $('#inquiryRows').innerHTML = rows.map(i => `
    <tr>
      <td>${esc(i.full_name)}<small>${esc(i.email)}</small></td>
      <td>${esc(i.company)}</td><td>${esc(i.product)}</td><td>${esc(i.country)}</td>
      <td>${esc(i.quantity)}</td><td>${fmtDate(i.created_at)}</td>
      <td><select data-id="${esc(i.id)}" aria-label="Change status">
        ${Object.entries(STATUS).map(([v, l]) =>
          `<option value="${v}" ${(i.status || 'new') === v ? 'selected' : ''}>${l}</option>`).join('')}
      </select></td>
    </tr>`).join('')
    || '<tr><td colspan="7" class="empty">No inquiries match your search.</td></tr>';
}
$('#search').oninput = renderTable;
$('#statusFilter').onchange = renderTable;

/* change status */
$('#inquiryRows').addEventListener('change', async e => {
  const sel = e.target.closest('select[data-id]');
  if (!sel) return;
  const { error } = await db.from('inquiries').update({ status: sel.value }).eq('id', sel.dataset.id);
  if (error) { alert('Could not update status. Please try again.'); loadInquiries(); return; }
  const item = inquiries.find(i => String(i.id) === sel.dataset.id);
  if (item) item.status = sel.value;
  render();
});

checkAdmin();