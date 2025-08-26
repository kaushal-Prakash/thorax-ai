import e from "express";
import 'dotenv/config';

const app = e();
app.use(e.json());

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
