import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../admin/admin.css";

function CaseUpdate() {
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
  const [loading, setLoading] = useState(true);

  const baseUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetch(`${baseUrl}/api/casestudies/getcasebyid/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setFormData({
          title: data.title || "",
          short_description: data.short_description || "",
          description: data.description || "",
          tools_used: Array.isArray(data.tools_used) ? data.tools_used.join(", ") : data.tools_used || "",
          tags: Array.isArray(data.tags) ? data.tags.join(", ") : data.tags || "",
          demo_url: data.demo_url || "",
          github_url: data.github_url || "",
          featured: data.featured || false,
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch case study", err);
        setMessage("❌ Failed to load case study");
        setLoading(false);
      });
  }, [id]);

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
      const res = await fetch(`${baseUrl}/api/casestudies/updatecasestudy/${id}`, {
        method: "PUT",
        body: data,
      });

      if (!res.ok) throw new Error("Failed to update case study");

      setMessage("✅ Case study updated successfully!");
      
      setTimeout(() => {
        navigate("/admin/case/list");
      }, 1000);
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to update case study");
    }
  };

  if (loading) return <p>Loading case study...</p>;

  return (
    <div className="update-case-page">
      <h1>Update Case Study</h1>
      {message && <p>{message}</p>}

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="text" name="title" value={formData.title} placeholder="Title" onChange={handleChange} required />
        <input type="text" name="short_description" value={formData.short_description} placeholder="Short Description" onChange={handleChange} required />
        <textarea name="description" value={formData.description} placeholder="Description" onChange={handleChange} required></textarea>

        <input type="text" name="tools_used" value={formData.tools_used} placeholder="Tools Used (comma-separated)" onChange={handleChange} />
        <input type="text" name="tags" value={formData.tags} placeholder="Tags (comma-separated)" onChange={handleChange} />

        <input type="text" name="demo_url" value={formData.demo_url} placeholder="Live Demo URL" onChange={handleChange} />
        <input type="text" name="github_url" value={formData.github_url} placeholder="GitHub Repo URL" onChange={handleChange} />

        <label>
          <input type="checkbox" name="featured" checked={formData.featured} onChange={handleChange} />
          Featured?
        </label>

        <label>
          Change Thumbnail:
          <input type="file" accept="image/*" onChange={(e) => setThumbnail(e.target.files[0])} />
        </label>

        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default CaseUpdate;
