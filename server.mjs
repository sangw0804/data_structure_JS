import express from 'express';

const app = express();

app.use(express.static('/Users/sangwoo/Desktop/programming/dataStructureJS/public'));
app.use(express.static('/Users/sangwoo/Desktop/programming/dataStructureJS'));

app.listen(3000, () => {
  console.log('server is listening');
});
