import { useState } from "react";

const CATEGORIES = [
  "Automation Controls",
  "User Management",
  "Tags",
  "Learning",
  "Messaging",
  "Integrations",
];

const BLOCKS_BY_CATEGORY = {
  "Automation Controls": [
    {
      id: "delay",
      title: "Delay",
      description: "Pause the automation before the next step.",
      icon: DelayIcon,
    },
    {
      id: "branch",
      title: "Branch",
      description: "Split the flow based on conditions.",
      icon: BranchIcon,
    },
  ],
  "User Management": [],
  Tags: [],
  Learning: [],
  Messaging: [],
  Integrations: [],
};

function DelayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" width="28" height="28" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <polyline points="12 7 12 12 15.5 12" />
    </svg>
  );
}

function BranchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" width="28" height="28" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="6" cy="18" r="2" />
      <circle cx="18" cy="6" r="2" />
      <circle cx="18" cy="18" r="2" />
      <path d="M6 16V8a6 6 0 0 0 6 6h4" />
      <line x1="18" y1="8" x2="18" y2="16" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" width="16" height="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" width="18" height="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

export default function AddBuildingBlockModal({ onClose, onSelect }) {
  const [activeCategory, setActiveCategory] = useState("Automation Controls");
  const [search, setSearch] = useState("");

  const blocks = BLOCKS_BY_CATEGORY[activeCategory] ?? [];
  const filteredBlocks = search.trim()
    ? Object.values(BLOCKS_BY_CATEGORY)
        .flat()
        .filter(
          (b) =>
            b.title.toLowerCase().includes(search.toLowerCase()) ||
            b.description.toLowerCase().includes(search.toLowerCase())
        )
    : blocks;

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div style={styles.header}>
          <span style={styles.title}>Add building block</span>
          <div style={styles.searchWrapper}>
            <span style={styles.searchIcon}>
              <SearchIcon />
            </span>
            <input
              style={styles.searchInput}
              type="text"
              placeholder="Search for actions or aut..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button style={styles.closeBtn} onClick={onClose} aria-label="Close">
            <CloseIcon />
          </button>
        </div>

        <div style={styles.divider} />

        {/* Body */}
        <div style={styles.body}>
          {/* Sidebar */}
          <nav style={styles.sidebar}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                style={{
                  ...styles.catBtn,
                  ...(activeCategory === cat && !search ? styles.catBtnActive : {}),
                }}
                onClick={() => {
                  setActiveCategory(cat);
                  setSearch("");
                }}
              >
                {cat}
              </button>
            ))}
          </nav>

          {/* Block list */}
          <div style={styles.content}>
            {filteredBlocks.length === 0 ? (
              <p style={styles.empty}>No blocks found.</p>
            ) : (
              filteredBlocks.map((block) => {
                const Icon = block.icon;
                return (
                  <button
                    key={block.id}
                    style={styles.blockItem}
                    onClick={() => onSelect?.(block)}
                  >
                    <div style={styles.blockIcon}>
                      <Icon />
                    </div>
                    <div style={styles.blockText}>
                      <span style={styles.blockTitle}>{block.title}</span>
                      <span style={styles.blockDesc}>{block.description}</span>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.25)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  modal: {
    background: "#fff",
    borderRadius: "12px",
    width: "680px",
    maxWidth: "95vw",
    maxHeight: "85vh",
    display: "flex",
    flexDirection: "column",
    boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
    overflow: "hidden",
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "18px 20px",
  },
  title: {
    fontSize: "17px",
    fontWeight: "700",
    color: "#111",
    whiteSpace: "nowrap",
    marginRight: "4px",
  },
  searchWrapper: {
    flex: 1,
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  searchIcon: {
    position: "absolute",
    right: "10px",
    color: "#9ca3af",
    display: "flex",
    alignItems: "center",
    pointerEvents: "none",
  },
  searchInput: {
    width: "100%",
    padding: "7px 34px 7px 12px",
    border: "1px solid #e5e7eb",
    borderRadius: "8px",
    fontSize: "13.5px",
    color: "#374151",
    background: "#f9fafb",
    outline: "none",
    boxSizing: "border-box",
  },
  closeBtn: {
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "#6b7280",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "4px",
    borderRadius: "6px",
  },
  divider: {
    height: "1px",
    background: "#f0f0f0",
  },
  body: {
    display: "flex",
    flex: 1,
    overflow: "hidden",
    minHeight: "400px",
  },
  sidebar: {
    width: "190px",
    flexShrink: 0,
    padding: "12px 0",
    borderRight: "1px solid #f0f0f0",
    display: "flex",
    flexDirection: "column",
  },
  catBtn: {
    background: "none",
    border: "none",
    textAlign: "left",
    padding: "9px 20px",
    fontSize: "14px",
    fontWeight: "500",
    color: "#374151",
    cursor: "pointer",
    borderRadius: "0",
  },
  catBtnActive: {
    background: "#f3f4f6",
    fontWeight: "700",
    color: "#111",
  },
  content: {
    flex: 1,
    padding: "20px 24px",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  empty: {
    color: "#9ca3af",
    fontSize: "14px",
  },
  blockItem: {
    display: "flex",
    alignItems: "flex-start",
    gap: "16px",
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "0",
    textAlign: "left",
  },
  blockIcon: {
    width: "52px",
    height: "52px",
    background: "#d1d5db",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    flexShrink: 0,
  },
  blockText: {
    display: "flex",
    flexDirection: "column",
    gap: "3px",
    paddingTop: "4px",
  },
  blockTitle: {
    fontSize: "15px",
    fontWeight: "600",
    color: "#9ca3af",
  },
  blockDesc: {
    fontSize: "13px",
    color: "#9ca3af",
  },
};
