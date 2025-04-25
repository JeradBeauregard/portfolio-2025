import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../admin/admin.css";

function IllustrationNew() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tags: "",
    alt_text: "",
  });
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const baseUrl = import.meta.env.VITE_API_URL;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "tags") {
        data.append(key, value.split(",").map(str => str.trim()));
      } else {
        data.append(key, value);
      }
    });

    if (image) {
      data.append("image", image);
    }

    try {
      const res = await fetch(`${baseUrl}/api/illustrations/createnewillustration`, {
        method: "POST",
        body: data,
      });

      if (!res.ok) throw new Error("Failed to create illustration");

      setMessage("✅ Illustration created!");
      setTimeout(() => navigate("/admin/illustration/list"), 1000);
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to create illustration");
    }
  };

  return (
    <div className="new-illustration-page">
      <h1>New Illustration</h1>
      {message && <p>{message}</p>}

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="text" name="title" placeholder="Title" onChange={handleChange} required />
        <textarea name="description" placeholder="Description" onChange={handleChange} required></textarea>
        <input type="text" name="tags" placeholder="Tags (comma-separated)" onChange={handleChange} />
        <input type="text" name="alt_text" placeholder="Alt Text" onChange={handleChange} />

        <label>
          Image:
          <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
        </label>

        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default IllustrationNew;
