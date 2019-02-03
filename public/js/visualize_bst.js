import { BinarySearchTree } from '../index.js';
import { createBinarySearchTreeElement } from '../components/index.js';

const bst = new BinarySearchTree();
const main = document.getElementById('main');

// insert
const insertButton = document.getElementById('insert_button');
const insertInput = document.getElementById('insert_value');
insertButton.onclick = async event => {
  try {
    if (!insertInput.value.length) throw new Error('채워지지 않은 필드가 있습니다.');

    event.target.innerText = 'progressing..';
    event.target.setAttribute('disabled', true);

    bst.insert(+insertInput.value, true);

    const snapshots = bst.returnSnapshots();
    for (let i = 0; i < snapshots.length; i += 1) {
      await new Promise((res, rej) => setTimeout(() => res(), 1000)); // 1초씩 딜레이 주기.
      main.innerHTML = null;
      main.appendChild(createBinarySearchTreeElement(snapshots[i]));
    }

    await new Promise((res, rej) => setTimeout(() => res(), 1000)); // 1초씩 딜레이 주기.
    main.innerHTML = null;
    main.appendChild(createBinarySearchTreeElement(bst));

    event.target.innerText = 'INSERT';
    event.target.removeAttribute('disabled');
  } catch (e) {
    alert(e);
  }
};

// remove
const removeButton = document.getElementById('remove_button');
const removeInput = document.getElementById('remove_value');
removeButton.onclick = async event => {
  try {
    if (!removeInput.value.length) throw new Error('채워지지 않은 필드가 있습니다.');

    event.target.innerText = 'progressing..';
    event.target.setAttribute('disabled', true);

    bst.remove(+removeInput.value, true);

    const snapshots = bst.returnSnapshots();
    for (let i = 0; i < snapshots.length; i += 1) {
      await new Promise((res, rej) => setTimeout(() => res(), 1000)); // 1초씩 딜레이 주기.
      main.innerHTML = null;
      main.appendChild(createBinarySearchTreeElement(snapshots[i]));
    }

    await new Promise((res, rej) => setTimeout(() => res(), 1000)); // 1초씩 딜레이 주기.
    main.innerHTML = null;
    main.appendChild(createBinarySearchTreeElement(bst));

    event.target.innerText = 'REMOVE';
    event.target.removeAttribute('disabled');
  } catch (e) {
    alert(e);
  }
};
