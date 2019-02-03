import LeaderLine from '../../node_modules/leader-line/leader-line.min.js';
import { Queue } from '../../../lib/index.js';

const drawLine = rootDom => {
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

export { drawLine };
