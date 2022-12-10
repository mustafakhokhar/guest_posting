import express from "express";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import postsApprovalRoutes from "./routes/postsApproval.js";
import cookieParser from "cookie-parser";
import multer from "multer";
import path from "path"

const app = express();
app.use('/static',express.static((__dirname+"/")))
app.use(express.json());
app.use(cookieParser());
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage });

app.post("/api/upload", upload.single("file"), function (req, res) {
  const file = req.file;
  res.status(200).json(file.filename);
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/postsApproval", postsApprovalRoutes);

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
  console.log("Connected!");
});
