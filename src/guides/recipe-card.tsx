import { useState } from "react";

const recipe = {
  title: "Miso-Glazed Salmon",
  subtitle: "with Pickled Radish & Sesame Rice",
  time: "35 min",
  servings: 2,
  difficulty: "Easy",
  calories: 480,
  tags: ["High Protein", "Pescatarian", "Gluten-Free"],
  image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&q=80",
  ingredients: [
    { amount: "2", unit: "fillets", name: "Salmon", emoji: "🐟" },
    { amount: "3", unit: "tbsp", name: "White Miso Paste", emoji: "🫙" },
    { amount: "2", unit: "tbsp", name: "Mirin", emoji: "🍶" },
    { amount: "1", unit: "tbsp", name: "Sesame Oil", emoji: "🫗" },
    { amount: "4", unit: "", name: "Radishes, thinly sliced", emoji: "🔴" },
    { amount: "1", unit: "cup", name: "Short-Grain Rice", emoji: "🍚" },
    { amount: "1", unit: "tbsp", name: "Rice Vinegar", emoji: "🧴" },
    { amount: "2", unit: "tbsp", name: "Sesame Seeds", emoji: "🌾" },
  ],
  steps: [
    "Whisk miso, mirin, and sesame oil. Marinate salmon for 15 minutes.",
    "Cook rice according to package directions. Fold in rice vinegar and sesame seeds.",
    "Quick-pickle radishes in salted rice vinegar while rice cooks.",
    "Broil salmon skin-side down for 8–10 minutes until caramelized.",
    "Plate over sesame rice, top with pickled radish and extra seeds.",
  ],
};

export default function RecipeCard() {
  const [activeTab, setActiveTab] = useState("ingredients");
  const [checkedSteps, setCheckedSteps] = useState(new Set());
  const [servingMultiplier, setServingMultiplier] = useState(1);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  const toggleStep = (i) => {
    setCheckedSteps((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  };

  const progress = (checkedSteps.size / recipe.steps.length) * 100;

  return (
    <div
      style={{
        fontFamily: "'DM Sans', sans-serif",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        background: "#f5f0eb",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,700;1,9..40,400&family=Playfair+Display:ital,wght@0,700;1,700&display=swap"
        rel="stylesheet"
      />

      <div
        style={{
          width: "100%",
          maxWidth: 440,
          background: "#fff",
          borderRadius: 28,
          overflow: "hidden",
          boxShadow:
            "0 4px 6px -1px rgba(0,0,0,0.04), 0 25px 50px -6px rgba(0,0,0,0.08)",
          position: "relative",
        }}
      >
        {/* Hero Image */}
        <div style={{ position: "relative", height: 260, overflow: "hidden" }}>
          <img
            src={recipe.image}
            alt={recipe.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
          {/* Gradient overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 50%)",
            }}
          />

          {/* Top action buttons */}
          <div
            style={{
              position: "absolute",
              top: 16,
              left: 16,
              right: 16,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <button
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.2)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.25)",
                color: "#fff",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 18,
              }}
            >
              ←
            </button>
            <div style={{ display: "flex", gap: 8 }}>
              <button
                onClick={() => setSaved(!saved)}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  background: saved
                    ? "rgba(255,255,255,0.95)"
                    : "rgba(255,255,255,0.2)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255,255,255,0.25)",
                  color: saved ? "#c0562a" : "#fff",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 18,
                  transition: "all 0.2s",
                }}
              >
                {saved ? "★" : "☆"}
              </button>
              <button
                onClick={() => setLiked(!liked)}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  background: liked
                    ? "rgba(255,255,255,0.95)"
                    : "rgba(255,255,255,0.2)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255,255,255,0.25)",
                  color: liked ? "#e03e3e" : "#fff",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 18,
                  transition: "all 0.2s",
                }}
              >
                {liked ? "♥" : "♡"}
              </button>
            </div>
          </div>

          {/* Difficulty badge */}
          <div
            style={{
              position: "absolute",
              bottom: 16,
              left: 16,
              background: "rgba(255,255,255,0.2)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.25)",
              borderRadius: 20,
              padding: "5px 14px",
              color: "#fff",
              fontSize: 12,
              fontWeight: 500,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
          >
            {recipe.difficulty}
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: "24px 24px 28px" }}>
          {/* Title */}
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 28,
              fontWeight: 700,
              color: "#1a1614",
              lineHeight: 1.15,
              margin: 0,
            }}
          >
            {recipe.title}
          </h1>
          <p
            style={{
              fontSize: 14,
              color: "#8a7e76",
              marginTop: 4,
              fontStyle: "italic",
              fontWeight: 300,
            }}
          >
            {recipe.subtitle}
          </p>

          {/* Stats row */}
          <div
            style={{
              display: "flex",
              gap: 6,
              marginTop: 18,
              flexWrap: "wrap",
            }}
          >
            {[
              { icon: "⏱", label: recipe.time },
              { icon: "🍽", label: `${recipe.servings * servingMultiplier} servings` },
              { icon: "🔥", label: `${recipe.calories * servingMultiplier} cal` },
            ].map((stat, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  background: "#faf7f4",
                  borderRadius: 12,
                  padding: "7px 14px",
                  fontSize: 13,
                  color: "#5c534b",
                  fontWeight: 400,
                }}
              >
                <span style={{ fontSize: 14 }}>{stat.icon}</span>
                {stat.label}
              </div>
            ))}
          </div>

          {/* Tags */}
          <div style={{ display: "flex", gap: 6, marginTop: 12, flexWrap: "wrap" }}>
            {recipe.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: 11,
                  fontWeight: 500,
                  color: "#c0562a",
                  background: "#fef3ec",
                  borderRadius: 8,
                  padding: "4px 10px",
                  letterSpacing: "0.02em",
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Serving adjuster */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 16,
              marginTop: 22,
              padding: "10px 0",
              borderTop: "1px solid #f0ebe6",
              borderBottom: "1px solid #f0ebe6",
            }}
          >
            <span style={{ fontSize: 13, color: "#8a7e76", fontWeight: 400 }}>
              Servings
            </span>
            {[0.5, 1, 2, 3].map((m) => (
              <button
                key={m}
                onClick={() => setServingMultiplier(m)}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  border: "none",
                  background:
                    servingMultiplier === m ? "#1a1614" : "#faf7f4",
                  color: servingMultiplier === m ? "#fff" : "#5c534b",
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                {m === 0.5 ? "½" : `${m * recipe.servings}`}
              </button>
            ))}
          </div>

          {/* Tabs */}
          <div
            style={{
              display: "flex",
              marginTop: 20,
              background: "#faf7f4",
              borderRadius: 14,
              padding: 4,
            }}
          >
            {["ingredients", "directions"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  flex: 1,
                  padding: "10px 0",
                  border: "none",
                  borderRadius: 11,
                  background: activeTab === tab ? "#fff" : "transparent",
                  boxShadow:
                    activeTab === tab
                      ? "0 1px 4px rgba(0,0,0,0.06)"
                      : "none",
                  color: activeTab === tab ? "#1a1614" : "#a09890",
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                  textTransform: "capitalize",
                  transition: "all 0.2s",
                  letterSpacing: "0.02em",
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div style={{ marginTop: 18, minHeight: 260 }}>
            {activeTab === "ingredients" ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {recipe.ingredients.map((ing, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "10px 12px",
                      borderRadius: 12,
                      transition: "background 0.15s",
                      cursor: "default",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = "#faf7f4")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "transparent")
                    }
                  >
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 12 }}
                    >
                      <span
                        style={{
                          width: 34,
                          height: 34,
                          borderRadius: 10,
                          background: "#fef3ec",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 16,
                          flexShrink: 0,
                        }}
                      >
                        {ing.emoji}
                      </span>
                      <span
                        style={{
                          fontSize: 14,
                          color: "#1a1614",
                          fontWeight: 400,
                        }}
                      >
                        {ing.name}
                      </span>
                    </div>
                    <span
                      style={{
                        fontSize: 13,
                        color: "#8a7e76",
                        fontWeight: 500,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {(parseFloat(ing.amount) * servingMultiplier) % 1 === 0
                        ? parseFloat(ing.amount) * servingMultiplier
                        : (parseFloat(ing.amount) * servingMultiplier).toFixed(1)}{" "}
                      {ing.unit}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div>
                {/* Progress bar */}
                <div
                  style={{
                    height: 4,
                    background: "#f0ebe6",
                    borderRadius: 2,
                    marginBottom: 18,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${progress}%`,
                      background:
                        "linear-gradient(90deg, #c0562a, #e08a5e)",
                      borderRadius: 2,
                      transition: "width 0.4s ease",
                    }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 4,
                  }}
                >
                  {recipe.steps.map((step, i) => {
                    const done = checkedSteps.has(i);
                    return (
                      <div
                        key={i}
                        onClick={() => toggleStep(i)}
                        style={{
                          display: "flex",
                          gap: 14,
                          padding: "12px",
                          borderRadius: 14,
                          cursor: "pointer",
                          background: done ? "#faf7f4" : "transparent",
                          transition: "all 0.2s",
                        }}
                      >
                        <div
                          style={{
                            width: 26,
                            height: 26,
                            borderRadius: "50%",
                            border: done
                              ? "none"
                              : "2px solid #d9d2cb",
                            background: done
                              ? "linear-gradient(135deg, #c0562a, #e08a5e)"
                              : "transparent",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                            marginTop: 1,
                            transition: "all 0.2s",
                            color: "#fff",
                            fontSize: 13,
                            fontWeight: 700,
                          }}
                        >
                          {done ? "✓" : (
                            <span style={{ fontSize: 11, color: "#a09890", fontWeight: 600 }}>
                              {i + 1}
                            </span>
                          )}
                        </div>
                        <p
                          style={{
                            fontSize: 14,
                            lineHeight: 1.55,
                            color: done ? "#a09890" : "#3d3530",
                            textDecoration: done
                              ? "line-through"
                              : "none",
                            margin: 0,
                            fontWeight: 300,
                            transition: "color 0.2s",
                          }}
                        >
                          {step}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* CTA */}
          <button
            style={{
              width: "100%",
              marginTop: 20,
              padding: "15px 0",
              border: "none",
              borderRadius: 16,
              background: "linear-gradient(135deg, #1a1614 0%, #3d3530 100%)",
              color: "#fff",
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
              letterSpacing: "0.04em",
              transition: "transform 0.15s, box-shadow 0.15s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-1px)";
              e.currentTarget.style.boxShadow =
                "0 6px 20px rgba(26,22,20,0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            Start Cooking →
          </button>
        </div>
      </div>
    </div>
  );
}