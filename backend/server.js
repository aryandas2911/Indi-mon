import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { verifyUser } from "./middleware/auth.js";
import supabase from "./config/supabase.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());

// attach JWT
app.use(async (req, res, next) => {
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (token) {
    await supabase.auth.setSession({
      access_token: token,
      refresh_token: "",
    });
  }
  next();
});

// Signup route
app.post("/signup", async (req, res) => {
  const { email, password, full_name, phone, organization } = req.body;

  // Step 1: Create Auth user
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (authError) return res.status(400).json(authError);

  const userId = authData.user.id;

  // Step 2: Create profile
  const { data, error } = await supabase
    .from("users")
    .insert([
      {
        id: userId,
        email,
        full_name,
        phone,
        organization,
      },
    ])
    .select();

  if (error) return res.status(400).json(error);

  res.json({
    message: "User created successfully",
    user: data,
  });
});

// Login route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) return res.status(400).json(error);

  res.json({
    message: "Login successful",
    session: data.session,
    user: data.user,
  });
});

// update route
app.put("/users", verifyUser, async (req, res) => {
  const { full_name, phone, organization } = req.body;

  const { data, error } = await supabase
    .from("users")
    .update({ full_name, phone, organization })
    .eq("id", req.user.id)
    .select();

  if (error) return res.status(400).json(error);

  res.json(data);
});

// delete route
app.delete("/users", verifyUser, async (req, res) => {
  const { data, error } = await supabase
    .from("users")
    .delete()
    .eq("id", req.user.id)
    .select();

  if (error) return res.status(400).json(error);

  res.json({ message: "User deleted", data });
});

// Home page
app.get("/", (req, res) => {
  res.send("<h1>Hello from localhost:5000!</h1>");
});

app.listen(5000, () => {
  console.log("Server running on port http://localhost:5000");
});
