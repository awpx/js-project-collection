const addBtn = document.getElementById('add');

const notes = JSON.parse(localStorage.getItem('notes'));

if(notes) {
  notes.forEach(note => {
    addNote(note)
  })
}

addBtn.addEventListener('click', () => {
  addNote();

});

function addNote(noteText = '') {
  const note = document.createElement('div');
  note.classList.add('note')

  note.innerHTML = `
    <div>

      <div class="tools">
        <button class="edit"><i class="fas fa-edit"></i></button>
        <button class="delete"><i class="fas fa-trash-alt"></i></button>
      </div>

      <div class="main ${noteText ? '' : 'hidden'}">
      </div>

      <textarea class="${noteText ? 'hidden' : ''}"></textarea>
    </div>
    `;

  const editBtn = note.querySelector('.edit');
  const deleteBtn = note.querySelector('.delete');

  const main = note.querySelector('.main');
  const textArea = note.querySelector('textarea');

  textArea.value = noteText;
  main.innerHTML = marked(noteText);

  editBtn.addEventListener('click', () => {
    main.classList.toggle('hidden')
    textArea.classList.toggle('hidden')
  })

  deleteBtn.addEventListener('click', () => {
    note.remove()

    updateLs()
  })

  textArea.addEventListener('input', e => {
    const value =e.target.value

    main.innerHTML = marked(value)

    updateLs()
  })
  
  document.body.appendChild(note);

}

function updateLs() {
  const notesText = document.querySelectorAll('textarea');

  const notes = []

  notesText.forEach(note => {
    notes.push(note.value)
  })

  localStorage.setItem('notes', JSON.stringify(notes));
}


