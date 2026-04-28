const API = '/api/recipes';

async function api(url, opts) {
  const res = await fetch(url, opts);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

function getParam(name) {
  return new URLSearchParams(location.search).get(name);
}

function timeStr(mins) {
  if (!mins) return '';
  return mins >= 60 ? `${Math.floor(mins/60)}h ${mins%60}m` : `${mins}m`;
}

// --- Index page ---
async function loadRecipes() {
  const grid = document.getElementById('recipes-grid');
  if (!grid) return;
  const recipes = await api(API);
  if (!recipes.length) {
    grid.innerHTML = '<div class="empty"><p>No recipes yet!</p><a href="/add.html" class="btn btn-primary">Add Your First Recipe</a></div>';
    return;
  }
  grid.innerHTML = recipes.map(r => `
    <a href="/recipe.html?id=${r.id}" class="recipe-card">
      ${r.image_path ? `<img src="${r.image_path}" alt="${r.title}">` : '<div class="card-placeholder">🍽️</div>'}
      <div class="card-body">
        <span class="badge">${r.category || 'dinner'}</span>
        <h3>${r.title}</h3>
        <p>${(r.description || '').substring(0, 100)}</p>
        <div class="meta">
          ${r.prep_time ? `<span>⏱ Prep: ${timeStr(r.prep_time)}</span>` : ''}
          ${r.cook_time ? `<span>🔥 Cook: ${timeStr(r.cook_time)}</span>` : ''}
          ${r.servings ? `<span>🍽 ${r.servings} servings</span>` : ''}
        </div>
      </div>
    </a>
  `).join('');
}

// --- Recipe detail page ---
async function loadRecipe() {
  const detail = document.getElementById('recipe-detail');
  if (!detail) return;
  const id = getParam('id');
  if (!id) return location.href = '/';
  const r = await api(`${API}/${id}`);
  const ingredients = (() => { try { return JSON.parse(r.ingredients); } catch { return r.ingredients ? r.ingredients.split('\n') : []; } })();
  detail.innerHTML = `
    ${r.image_path ? `<img src="${r.image_path}" alt="${r.title}">` : ''}
    <span class="badge">${r.category || 'dinner'}</span>
    <h2>${r.title}</h2>
    <div class="meta">
      ${r.prep_time ? `<span>⏱ Prep: ${timeStr(r.prep_time)}</span>` : ''}
      ${r.cook_time ? `<span>🔥 Cook: ${timeStr(r.cook_time)}</span>` : ''}
      ${r.servings ? `<span>🍽 ${r.servings} servings</span>` : ''}
    </div>
    ${r.description ? `<p>${r.description}</p>` : ''}
    <div class="section"><h3>Ingredients</h3><ul>${(Array.isArray(ingredients) ? ingredients : [ingredients]).map(i => `<li>${i}</li>`).join('')}</ul></div>
    <div class="section"><h3>Instructions</h3><p style="white-space:pre-line">${r.instructions || ''}</p></div>
    <div class="actions">
      <a href="/add.html?id=${r.id}" class="btn btn-primary">Edit</a>
      <button onclick="deleteRecipe(${r.id})" class="btn btn-danger">Delete</button>
    </div>
  `;
}

async function deleteRecipe(id) {
  if (!confirm('Delete this recipe?')) return;
  await api(`${API}/${id}`, { method: 'DELETE' });
  location.href = '/';
}

// --- Add/Edit form ---
async function initForm() {
  const form = document.getElementById('recipe-form');
  if (!form) return;
  const id = getParam('id');
  if (id) {
    document.getElementById('form-title').textContent = 'Edit Recipe';
    const r = await api(`${API}/${id}`);
    form.title.value = r.title || '';
    form.description.value = r.description || '';
    form.ingredients.value = (() => { try { return JSON.parse(r.ingredients).join('\n'); } catch { return r.ingredients || ''; } })();
    form.instructions.value = r.instructions || '';
    form.category.value = r.category || 'dinner';
    form.prep_time.value = r.prep_time || '';
    form.cook_time.value = r.cook_time || '';
    form.servings.value = r.servings || '';
  }
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const fd = new FormData(form);
    const url = id ? `${API}/${id}` : API;
    const method = id ? 'PUT' : 'POST';
    await fetch(url, { method, body: fd });
    location.href = id ? `/recipe.html?id=${id}` : '/';
  });
}

// Init
document.addEventListener('DOMContentLoaded', () => {
  loadRecipes();
  loadRecipe();
  initForm();
});
