import express from "express";
import {engine} from "express-handlebars"
import {router} from "./routes/jobSheetRoutes.js"
import connectDB from "./config/database.js";
import cors from "cors";
import methodOverride from "method-override";

const app = express();

connectDB();


app.engine(
  'handlebars',
  engine({
    helpers: {
      eq: function (a, b) {
        return a === b;
      }
    },
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true
    }
  })
);

app.set('view engine', 'handlebars');
app.use(express.static('public'));
app.use(methodOverride('_method', { methods: ['POST', 'GET'] }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use('/', router);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
