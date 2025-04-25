import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../admin/admin.css";

function IllustrationUpdate() {
  const [item, setItem] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tags: "",
    alt_text: "",
  });
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const { id } = useParams();
  const baseUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${baseUrl}/api/illustrations/getillustrationbyid/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setItem(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch illustration", err);
        setLoading(false);
      });
  }, [id]);

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
      } else if (value !== "") {
        data.append(key, value); // only send if user filled it
      }
    });

    if (image) {
      data.append("image", image);
    }

    try {
      const res = await fetch(`${baseUrl}/api/illustrations/updateillustration/${id}`, {
        method: "PUT",
        body: data,
      });

      if (!res.ok) throw new Error("Failed to update illustration");

      setMessage("✅ Illustration updated!");
      setTimeout(() => navigate("/admin/illustration/list"), 1000);
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to update illustration");
    }
  };

  if (loading) return <p>Loading illustration...</p>;

  return (
    <div className="update-illustration-page">
      <h1>Update Illustration</h1>
      {message && <p>{message}</p>}

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          type="text"
          name="title"
          placeholder={item?.title || "Title"}
          value={formData.title}
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder={item?.description || "Description"}
          value={formData.description}
          onChange={handleChange}
        ></textarea>
        <input
          type="text"
          name="tags"
          placeholder={Array.isArray(item?.tags) ? item.tags.join(", ") : "Tags (comma-separated)"}
          value={formData.tags}
          onChange={handleChange}
        />
        <input
          type="text"
          name="alt_text"
          placeholder={item?.alt_text || "Alt Text"}
          value={formData.alt_text}
          onChange={handleChange}
        />

        <label>
          Change Image:
          <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
        </label>

        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default IllustrationUpdate;
