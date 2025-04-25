import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../admin/admin.css";

function CaseNew() {
  const [formData, setFormData] = useState({
    title: "",
    short_description: "",
    description: "",
    tools_used: "",
    tags: "",
    demo_url: "",
    github_url: "",
    featured: false,
  });

  const [thumbnail, setThumbnail] = useState(null);
  const [message, setMessage] = useState("");
  const baseUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "tools_used" || key === "tags") {
        data.append(key, value.split(",").map(str => str.trim()));
      } else {
        data.append(key, value);
      }
    });

    if (thumbnail) {
      data.append("thumbnail", thumbnail);
    }

    try {
      const res = await fetch(`${baseUrl}/api/casestudies/createcasestudy`, {
        method: "POST",
        body: data,
      });

      if (!res.ok) throw new Error("Failed to create case study");

      setMessage(" Case study created successfully!");
      
      
      setTimeout(() => {
        navigate("/admin/case/list");
      }, 1000); 
    } catch (err) {
      console.error(err);
      setMessage(" Failed to create case study");
    }
  };

  return (
    <div className="new-case-page">
      <h1>Create New Case Study</h1>
      {message && <p>{message}</p>}

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="text" name="title" placeholder="Title" onChange={handleChange} required />
        <input type="text" name="short_description" placeholder="Short Description" onChange={handleChange} required />
        <textarea name="description" placeholder="Description" onChange={handleChange} required></textarea>

        <input type="text" name="tools_used" placeholder="Tools Used (comma-separated)" onChange={handleChange} />
        <input type="text" name="tags" placeholder="Tags (comma-separated)" onChange={handleChange} />

        <input type="text" name="demo_url" placeholder="Live Demo URL" onChange={handleChange} />
        <input type="text" name="github_url" placeholder="GitHub Repo URL" onChange={handleChange} />

        <label>
          <input type="checkbox" name="featured" onChange={handleChange} />
          Featured?
        </label>

        <label>
          Thumbnail Image:
          <input type="file" accept="image/*" onChange={(e) => setThumbnail(e.target.files[0])} />
        </label>

        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default CaseNew;
