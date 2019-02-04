import LeaderLine from '../../node_modules/leader-line/leader-line.min.js';
import { Queue } from '../../../lib/index.js';

const drawLineBST = rootDom => {
  const lines = [];

  const q = new Queue();
  q.enqueue(rootDom.firstChild);

  while (q.size() > 0) {
    const container = q.dequeue();

    if (container.childNodes.length > 1) {
      for (let i = 0; i < 2; i += 1) {
        lines.push(
          new LeaderLine(container.childNodes[0], container.childNodes[1].childNodes[i], {
            path: 'straight',
            color: 'black'
          })
        );
        q.enqueue(container.childNodes[1].childNodes[i]);
      }
    }
  }

  return lines;
};

const drawLineLL = (rootDom, isDLL) => {
  const container = rootDom.firstChild;
  const lines = [];

  for (let i = 0; i < container.childNodes.length - 1; i += 1) {
    if (!isDLL || i) {
      lines.push(
        new LeaderLine(container.childNodes[i], container.childNodes[i + 1], {
          path: 'straight',
          color: 'black'
        })
      );
    }
    if (isDLL && i !== container.childNodes.length - 2) {
      lines.push(
        new LeaderLine(container.childNodes[i + 1], container.childNodes[i], {
          path: 'straight',
          color: 'black'
        })
      );
    }
  }

  return lines;
};

const drawLineHeap = rootDom => {
  let lines = [];
  const heap = rootDom.firstChild;

  for (let i = 0; i < heap.childNodes.length - 1; i += 1) {
    const container = heap.childNodes[i];
    const childrenContainer = heap.childNodes[i + 1];

    for (let parentIndex = 0; parentIndex < container.childNodes.length; parentIndex += 1) {
      for (let childIndex = parentIndex * 2; childIndex < parentIndex * 2 + 2; childIndex += 1) {
        lines.push(
          new LeaderLine(container.childNodes[parentIndex], childrenContainer.childNodes[childIndex], {
            path: 'straight',
            color: 'black'
          })
        );
      }
    }
  }

  return lines;
};

export { drawLineBST, drawLineLL, drawLineHeap };
