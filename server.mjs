import express from 'express';

const app = express();

app.use(express.static('/Users/sangwoo/Desktop/programming/dataStructureJS/public'));
app.use(express.static('/Users/sangwoo/Desktop/programming/dataStructureJS'));

const port = 3000;
app.listen(port, () => {
  console.log(`server is listening at ${port}`);
});
