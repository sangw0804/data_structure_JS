import express from 'express';
import ejs from 'ejs';

const app = express();

app.set('view engine', 'ejs');

app.use(express.static('/Users/sangwoo/Desktop/programming/dataStructureJS/public'));
app.use(express.static('/Users/sangwoo/Desktop/programming/dataStructureJS'));

app.get('/:data_structure', (req, res) => {
  try {
    const dataStructure = req.params.data_structure;

    res.render(`${dataStructure}`);
  } catch (err) {
    res.render('bad', { err });
  }
});

app.get('/', (req, res) => {
  res.render('index');
});

const port = 3000;
app.listen(port, () => {
  console.log(`server is listening at ${port}`);
});
