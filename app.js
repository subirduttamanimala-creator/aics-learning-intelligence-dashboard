const defaultState = {
  focus: 8.5,
  streak: 4,
  topics: [
    { name: 'Data Structures', confidence: 48, mastery: 'Retrieval practice overdue', weight: 4 },
    { name: 'Linear Algebra', confidence: 57, mastery: 'Vectors and matrices need review', weight: 3 },
    { name: 'Network Security', confidence: 63, mastery: 'Good conceptual base', weight: 3 },
    { name: 'Python Programming', confidence: 76, mastery: 'Strong recent practice', weight: 2 },
    { name: 'Machine Learning', confidence: 71, mastery: 'Ready for a small build', weight: 2 }
  ],
  plan: [
    { title: 'Data Structures: implement a stack from scratch', day: 'TODAY · 45 MIN', done: true },
    { title: 'Linear Algebra: matrix transformations practice', day: 'TUE · 35 MIN', done: false },
    { title: 'Network Security: review threat-model notes', day: 'THU · 30 MIN', done: false },
    { title: 'ML: explain train / validation split aloud', day: 'SAT · 40 MIN', done: false }
  ]
};

let state = JSON.parse(localStorage.getItem('aicsLearnState')) || structuredClone(defaultState);
const $ = (id) => document.getElementById(id);
const save = () => localStorage.setItem('aicsLearnState', JSON.stringify(state));
const average = () => Math.round(state.topics.reduce((sum, t) => sum + t.confidence, 0) / state.topics.length);
const readiness = () => Math.min(94, Math.round(average() * .72 + Math.min(state.focus * 2.5, 20) + state.plan.filter(p => p.done).length * 3));

function priorityTopics() {
  return [...state.topics].sort((a,b) => (a.confidence + a.weight * 4) - (b.confidence + b.weight * 4)).slice(0,3);
}

function render() {
  const avg = average(); const read = readiness(); const completed = state.plan.filter(p => p.done).length;
  $('focusHours').innerHTML = `${state.focus.toFixed(1)}<span>h</span>`;
  $('streak').innerHTML = `${state.streak}<span> days</span>`;
  $('avgConfidence').innerHTML = `${avg}<span>%</span>`;
  $('planProgress').innerHTML = `${completed}<span>/${state.plan.length}</span>`;
  $('planSummary').textContent = `${completed} complete`;
  $('readinessScore').textContent = read;
  $('readinessLabel').textContent = read >= 80 ? 'Excellent momentum' : read >= 65 ? 'Building momentum' : 'Reset your foundation';
  $('readinessCopy').textContent = read >= 80 ? 'You have a strong rhythm. Protect it with one focused session.' : 'You are on track. Strengthen one high-priority concept today.';
  $('priorityList').innerHTML = priorityTopics().map((t, i) => {
    const reason = t.confidence < 55 ? 'Low confidence + high course importance' : 'Needs a short retrieval-practice session';
    return `<div class="priority"><span class="rank">0${i+1}</span><div><strong>${t.name}</strong><p>${reason}</p></div><span class="time">${35 + t.weight * 5} min</span></div>`;
  }).join('');
  $('topicMap').innerHTML = state.topics.map(t => `<div class="topic-row"><span>${t.name}</span><div class="bar"><div class="fill ${t.confidence < 55 ? 'low' : t.confidence > 72 ? 'high' : ''}" style="width:${t.confidence}%"></div></div><strong>${t.confidence}%</strong></div>`).join('');
  $('planList').innerHTML = state.plan.map((item, i) => `<label class="plan-item ${item.done ? 'done' : ''}"><input type="checkbox" data-plan="${i}" ${item.done ? 'checked' : ''}><span>${item.title}</span><span class="day">${item.day}</span></label>`).join('');
  document.querySelectorAll('[data-plan]').forEach(box => box.addEventListener('change', () => { state.plan[box.dataset.plan].done = box.checked; save(); render(); }));
}

$('reflectionForm').addEventListener('submit', (event) => {
  event.preventDefault();
  const name = $('topicSelect').value; const confidence = Number($('confidenceSelect').value); const minutes = Number($('minutesInput').value);
  const topic = state.topics.find(t => t.name === name); topic.confidence = Math.round((topic.confidence + confidence) / 2); topic.mastery = 'Updated from your latest reflection';
  state.focus += minutes / 60; state.streak = Math.max(state.streak, 1); save(); render();
  event.target.querySelector('button').innerHTML = 'Reflection added <span>✓</span>';
  setTimeout(() => event.target.querySelector('button').innerHTML = 'Add reflection <span>→</span>', 1600);
});
$('shufflePriorities').addEventListener('click', () => { state.topics.forEach(t => t.confidence = Math.max(30, Math.min(95, t.confidence + Math.floor(Math.random()*7)-3))); save(); render(); });
$('resetData').addEventListener('click', () => { state = structuredClone(defaultState); save(); render(); });
render();

