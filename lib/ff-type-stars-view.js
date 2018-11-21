'use babel';

const emotionList = [
  '🌟',
	'🌞',
	'🌙',
	'🌈',
	'🐮',
	'🍌',
	'🍊',
	'🍓',
	'🍒',
	'🍑',
	'🍐',
	'🍏',
	'🍎',
	'🍍',
	'🍋',
	'🍉',
	'🥕',
	'🥦',
	'🥒',
	'🥑',
	'🌶',
	'🌽',
	'🍆',
	'🌸',
	'💐',
	'🥜',
	'🌱',
	'🌳',
	'🌵',
	'🌾',
	'🌿',
	'🍀',
	'🍃',
	'🍂',
];

const DURATION = 1000;
export default class StarView {
  constructor(cursor, layer) {
    // create star
    const e = document.createElement('div');
    const { x: topX, y: leftY, width, height } = cursor.getBoundingClientRect();

    const baseX = topX + width / 2;
    const baseY = leftY + height / 2;
    e.style.left = `${baseX}px`;
    e.style.top = `${baseY}px`;
    e.textContent = emotionList[0 | (emotionList.length * Math.random())];

    e.classList.add('ff-type-stars-star');
    layer.appendChild(e);

    const startTime = performance.now();
    const V = [Math.random() * 800 - 400, Math.random() * 900 - 800];
    const G = [0, 980];
    const eachFrame = (tm) => {
        const t = Math.min((tm - startTime) / DURATION, 1);
        const vX = V[0] + G[0] * t;
        const vY = V[1] + G[1] * t;
        const alpha = Math.atan2(vY, vX) - Math.PI / 2;

        const x = baseX + V[0] * t + G[0] * t * t;
        const y = baseY + V[1] * t + G[1] * t * t;
        const opacity = 1 - t;

        e.style.opacity = opacity;
        e.style.left = `${x}px`;
        e.style.top = `${y}px`;
        e.style.transform = `rotate(${alpha}rad)`;

        if(t < 1) {
          requestAnimationFrame(eachFrame);
        } else {
          e.remove();
        }
    };
    requestAnimationFrame(eachFrame);
  }
}
