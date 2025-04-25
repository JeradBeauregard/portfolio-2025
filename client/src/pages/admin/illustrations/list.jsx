import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../admin/admin.css";

function IllustrationList() {
  const [illustrations, setIllustrations] = useState([]);
  const [loading, setLoading] = useState(true);

  const baseUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${baseUrl}/api/illustrations/getallillustrations`)
      .then((res) => res.json())
      .then((data) => {
        setIllustrations(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch illustrations", err);
        setLoading(false);
      });
  }, [baseUrl]);

  if (loading) return <p>Loading illustrations...</p>;

  return (
    <div className="illustration-list">
      <div className="illustration-list-header">
        <h1>Illustrations</h1>
        <Link to="/admin/illustration/new" className="btn new-btn">+ New Illustration</Link>
      </div>

      {illustrations.length === 0 ? (
        <p>No illustrations found.</p>
      ) : (
        illustrations.map((item) => (
          <div key={item._id} className="illustration-card">
            {item.image_url && (
              <img src={item.image_url} alt={item.alt_text || item.title} className="thumb" />
            )}
            <div className="illustration-info">
              <h2>{item.title}</h2>
              <p>{item.description}</p>
              {Array.isArray(item.tags) && item.tags.length > 0 && (
                <p><strong>Tags:</strong> {item.tags.join(", ")}</p>
              )}
              {item.alt_text && <p><strong>Alt Text:</strong> {item.alt_text}</p>}
              <div className="illustration-links">
                <Link to={`/admin/illustration/update/${item._id}`} className="btn">Update</Link>
                <Link to={`/admin/illustration/delete/${item._id}`} className="btn delete">Delete</Link>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default IllustrationList;
