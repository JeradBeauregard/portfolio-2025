import { useNavigate, useParams } from "react-router-dom";
import "../../admin/admin.css";

function IllustrationDelete() {
  const { id } = useParams();
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_API_URL;

  const handleDelete = async () => {
    try {
      const res = await fetch(`${baseUrl}/api/illustrations/deleteillustration/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete illustration");

      navigate("/admin/illustration/list");
    } catch (err) {
      console.error(err);
      alert("Failed to delete.");
    }
  };

  const handleCancel = () => {
    navigate("/admin/illustration/list");
  };

  return (
    <div className="confirm-delete">
      <h1>Confirm Delete</h1>
      <p>Are you sure you want to delete this illustration?</p>
      <button onClick={handleDelete} className="btn delete">Yes, Delete</button>
      <button onClick={handleCancel} className="btn">Cancel</button>
    </div>
  );
}

export default IllustrationDelete;
