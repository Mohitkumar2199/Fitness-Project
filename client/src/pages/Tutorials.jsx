import React, { useEffect, useState } from "react";
import { getTutorials, addTutorial } from "../api";
import { useSelector } from "react-redux";
import "./Tutorials.css";

const getYouTubeId = (url) => {
  if (!url) return null;
  const match = url.match(
    /(?:youtube\.com.*(?:\?|&)v=|youtu\.be\/|youtube\.com\/embed\/)([^&?/]+)/
  );
  return match ? match[1] : null;
};

const Tutorials = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [tutorials, setTutorials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    workoutName: "",
    category: "",
    youtubeUrl: "",
    description: "",
    benefits: "",
    precautions: "",
    preventiveMeasures: "",
  });

  const fetchTutorials = async () => {
    try {
      setError("");
      const res = await getTutorials();
      setTutorials(res.data);
    } catch (err) {
      setError("Couldn't load tutorials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTutorials();
  }, []);

  const toLines = (text) =>
    text
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => l.length > 0);

  const handleSubmit = async () => {
    if (!form.workoutName.trim() || !form.category.trim() || !form.youtubeUrl.trim())
      return;
    setSubmitting(true);
      const token = localStorage.getItem("fittrack-app-token");
    try {
      await addTutorial(token, {
        workoutName: form.workoutName,
        category: form.category,
        youtubeUrl: form.youtubeUrl,
        description: form.description,
        benefits: toLines(form.benefits),
        precautions: toLines(form.precautions),
        preventiveMeasures: toLines(form.preventiveMeasures),
      });
      setForm({
        workoutName: "",
        category: "",
        youtubeUrl: "",
        description: "",
        benefits: "",
        precautions: "",
        preventiveMeasures: "",
      });
      setShowForm(false);
      await fetchTutorials();
    } catch (err) {
      setError("Couldn't add tutorial. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="tutorials-page">
      <div className="tutorials-hero">
        <h1>Workout Tutorials</h1>
        <p>Learn proper form, benefits, and safety tips for every workout</p>
      </div>

      <div className="tutorials-container">
        <div className="tutorials-toolbar">
          <button
            className="toggle-form-btn"
            onClick={() => setShowForm((s) => !s)}
          >
            {showForm ? "Cancel" : "+ Add Tutorial"}
          </button>
        </div>

        {showForm && (
          <div className="tutorial-form-card">
            <h3>Add a new tutorial</h3>
            <div className="form-row">
              <input
                className="form-input"
                placeholder="Workout name (e.g. Back Squat)"
                value={form.workoutName}
                onChange={(e) =>
                  setForm({ ...form, workoutName: e.target.value })
                }
              />
              <input
                className="form-input"
                placeholder="Category (e.g. Legs)"
                value={form.category}
                onChange={(e) =>
                  setForm({ ...form, category: e.target.value })
                }
              />
            </div>
            <input
              className="form-input"
              placeholder="YouTube URL"
              value={form.youtubeUrl}
              onChange={(e) =>
                setForm({ ...form, youtubeUrl: e.target.value })
              }
            />
            <textarea
              className="form-textarea short"
              placeholder="Short description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
            <textarea
              className="form-textarea"
              placeholder={"Benefits (one per line)"}
              value={form.benefits}
              onChange={(e) => setForm({ ...form, benefits: e.target.value })}
            />
            <textarea
              className="form-textarea"
              placeholder={"Precautions (one per line)"}
              value={form.precautions}
              onChange={(e) =>
                setForm({ ...form, precautions: e.target.value })
              }
            />
            <textarea
              className="form-textarea"
              placeholder={"Preventive measures (one per line)"}
              value={form.preventiveMeasures}
              onChange={(e) =>
                setForm({ ...form, preventiveMeasures: e.target.value })
              }
            />
            <button
              className="submit-btn"
              onClick={handleSubmit}
              disabled={
                submitting ||
                !form.workoutName.trim() ||
                !form.category.trim() ||
                !form.youtubeUrl.trim()
              }
            >
              {submitting ? "Adding..." : "Add Tutorial"}
            </button>
          </div>
        )}

        {error && <div className="error-banner">{error}</div>}

        {loading ? (
          <div className="state-message">Loading tutorials...</div>
        ) : tutorials.length === 0 ? (
          <div className="state-message">
            No tutorials yet — add one to get started 🎬
          </div>
        ) : (
          <div className="tutorials-grid">
            {tutorials.map((t) => {
              const videoId = getYouTubeId(t.youtubeUrl);
              return (
                <div
                  key={t._id}
                  className="tutorial-card"
                  onClick={() => setSelected(t)}
                >
                  <div className="thumb-wrap">
                    {videoId ? (
                      <img
                        src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                        alt={t.workoutName}
                      />
                    ) : (
                      <div className="thumb-fallback">No preview</div>
                    )}
                    <span className="play-icon">▶</span>
                  </div>
                  <div className="tutorial-card-body">
                    <span className="category-tag">{t.category}</span>
                    <h3>{t.workoutName}</h3>
                    {t.description && <p>{t.description}</p>}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setSelected(null)}
            >
              ✕
            </button>

            <div className="video-wrap">
              {getYouTubeId(selected.youtubeUrl) ? (
                <iframe
                  src={`https://www.youtube.com/embed/${getYouTubeId(
                    selected.youtubeUrl
                  )}`}
                  title={selected.workoutName}
                  frameBorder="0"
                  allowFullScreen
                />
              ) : (
                <div className="thumb-fallback">Invalid video link</div>
              )}
            </div>

            <div className="modal-body">
              <span className="category-tag">{selected.category}</span>
              <h2>{selected.workoutName}</h2>
              {selected.description && <p className="modal-desc">{selected.description}</p>}

              <div className="info-section">
                <h4>✅ Benefits</h4>
                <ul>
                  {selected.benefits?.length ? (
                    selected.benefits.map((b, i) => <li key={i}>{b}</li>)
                  ) : (
                    <li className="muted">No benefits listed</li>
                  )}
                </ul>
              </div>

              <div className="info-section">
                <h4>⚠️ Precautions</h4>
                <ul>
                  {selected.precautions?.length ? (
                    selected.precautions.map((p, i) => <li key={i}>{p}</li>)
                  ) : (
                    <li className="muted">No precautions listed</li>
                  )}
                </ul>
              </div>

              <div className="info-section">
                <h4>🛡️ Preventive Measures</h4>
                <ul>
                  {selected.preventiveMeasures?.length ? (
                    selected.preventiveMeasures.map((p, i) => (
                      <li key={i}>{p}</li>
                    ))
                  ) : (
                    <li className="muted">No preventive measures listed</li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tutorials;