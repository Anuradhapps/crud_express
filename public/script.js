// public/script.js
document.addEventListener('DOMContentLoaded', function () {
    const userForm = document.getElementById('user-form');
    const usersList = document.getElementById('users-list');
  
    userForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
  
      const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email }),
      });
  
      if (response.ok) {
        loadUsers();
        userForm.reset();
      }
    });
  
    async function loadUsers() {
      const response = await fetch('http://localhost:3000/users');
      const users = await response.json();
      usersList.innerHTML = '';
  
      users.forEach((user) => {
        const userItem = document.createElement('li');
        userItem.textContent = `${user.name} - ${user.email}`;
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', () => editUser(user.id));
  
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => deleteUser(user.id));
  
        userItem.appendChild(editButton);
        userItem.appendChild(deleteButton);
        usersList.appendChild(userItem);
      });
    }
  
    async function editUser(id) {
      const name = prompt('Enter new name:');
      const email = prompt('Enter new email:');
      if (name && email) {
        const response = await fetch(`http://localhost:3000/users/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, email }),
        });
        if (response.ok) {
          loadUsers();
        }
      }
    }
  
    async function deleteUser(id) {
      const response = await fetch(`http://localhost:3000/users/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        loadUsers();
      }
    }
  
    loadUsers();
  });
  