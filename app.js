const state = { category: '全部', tag: '全部', query: '', sort: 'newest' };
const categories = ['全部', ...new Set(posts.map(post => post.category))];
const tags = ['全部', ...new Set(posts.flatMap(post => post.tags))];
const categoryFilters = document.querySelector('#category-filters');
const tagFilters = document.querySelector('#tag-filters');
const postList = document.querySelector('#post-list');
const emptyState = document.querySelector('#empty-state');
const resultCount = document.querySelector('#result-count');
const resultTitle = document.querySelector('#result-title');
const search = document.querySelector('#search');
const clearSearch = document.querySelector('#clear-search');
const sortOrder = document.querySelector('#sort-order');
const dialog = document.querySelector('#article-dialog');

function buttons(items, type, container) {
  container.innerHTML = items.map(item => `<button type="button" class="${item === state[type] ? 'active' : ''}" data-${type}="${item}">${item}</button>`).join('');
}
function filteredPosts() {
  const term = state.query.trim().toLowerCase();
  return posts
    .filter(post => (state.category === '全部' || post.category === state.category) && (state.tag === '全部' || post.tags.includes(state.tag)) && (!term || [post.title, post.category, post.tags.join(' '), post.excerpt, post.body.join(' ')].join(' ').toLowerCase().includes(term)))
    .sort((a, b) => state.sort === 'newest'
      ? b.date.localeCompare(a.date)
      : a.date.localeCompare(b.date));
}
function render() {
  buttons(categories, 'category', categoryFilters); buttons(tags, 'tag', tagFilters);
  const results = filteredPosts();
  postList.innerHTML = results.map(post => `<article class="post-card" tabindex="0" role="button" data-id="${post.id}" aria-label="阅读：${post.title}"><p class="post-meta">${post.date} · ${post.category}</p><h3>${post.title}</h3><p class="excerpt">${post.excerpt}</p><div class="post-tags">${post.tags.map(tag => `<span>${tag}</span>`).join('')}</div></article>`).join('');
  emptyState.hidden = results.length > 0; resultCount.textContent = `${results.length} 篇文章`;
  resultTitle.textContent = state.query ? `“${state.query}” 的结果` : (state.category === '全部' ? '最近文章' : state.category);
  clearSearch.hidden = !state.query;
}
function openArticle(id) { const post = posts.find(item => item.id === id); document.querySelector('#article-content').innerHTML = `<p class="article-meta">${post.date} · ${post.category} · ${post.tags.map(tag => '#'+tag).join(' ')}</p><h1 id="article-title">${post.title}</h1><div class="article-body">${post.body.map(p => `<p>${p}</p>`).join('')}</div>`; dialog.showModal(); }
categoryFilters.addEventListener('click', e => { if(e.target.dataset.category) { state.category=e.target.dataset.category; render(); } });
tagFilters.addEventListener('click', e => { if(e.target.dataset.tag) { state.tag=e.target.dataset.tag; render(); } });
postList.addEventListener('click', e => { const card=e.target.closest('.post-card'); if(card) openArticle(card.dataset.id); });
postList.addEventListener('keydown', e => { if(e.key==='Enter' && e.target.dataset.id) openArticle(e.target.dataset.id); });
search.addEventListener('input', e => { state.query=e.target.value; render(); });
sortOrder.addEventListener('change', e => { state.sort=e.target.value; render(); });
clearSearch.addEventListener('click', () => { search.value=''; state.query=''; render(); search.focus(); });
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', e => { if(e.target === dialog) dialog.close(); });
document.querySelector('#year').textContent = new Date().getFullYear();
render();
