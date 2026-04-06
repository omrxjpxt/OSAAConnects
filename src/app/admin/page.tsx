"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Download, LogOut, Tag, Users, Eye } from "lucide-react";
import { formatNumber } from "@/lib/utils";

// Sample data — in production fetched from Sanity
const CREATORS = [
  { id: "c1", name: "Priya Sharma", handle: "priyasharma", niche: "Fashion", followers: 145000, avgViews: 48000, status: "Available", selected: false },
  { id: "c2", name: "Arjun Mehra", handle: "arjunfits", niche: "Fitness", followers: 67000, avgViews: 22000, status: "Available", selected: false },
  { id: "c3", name: "Zara Ahmed", handle: "zaraaesthetic", niche: "Beauty", followers: 320000, avgViews: 95000, status: "Unavailable", selected: false },
  { id: "c4", name: "Rohan Kapoor", handle: "rohantech", niche: "Tech", followers: 89000, avgViews: 35000, status: "Available", selected: false },
];

const CAMPAIGN_STATUSES = ["pitched", "negotiating", "live", "completed"] as const;

const STATUS_COLORS: Record<string, string> = {
  Available: "bg-green-100 text-green-700",
  Unavailable: "bg-red-100 text-red-700",
  pitched: "bg-blue-100 text-blue-700",
  negotiating: "bg-yellow-100 text-yellow-700",
  live: "bg-green-100 text-green-700",
  completed: "bg-gray-100 text-gray-700",
};

export default function AdminDashboard() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [creators, setCreators] = useState(CREATORS);

  useEffect(() => {
    const stored = sessionStorage.getItem("osaa-admin-auth");
    if (stored === "ok") setAuthed(true);
  }, []);

  const login = () => {
    const secret = process.env.NEXT_PUBLIC_ADMIN_HINT || "osaaadmin";
    if (password === secret) {
      sessionStorage.setItem("osaa-admin-auth", "ok");
      setAuthed(true);
    } else {
      setError("Incorrect password");
    }
  };

  const toggleSelect = (id: string) =>
    setCreators((c) => c.map((cr) => cr.id === id ? { ...cr, selected: !cr.selected } : cr));

  const exportSelected = () => {
    const selected = creators.filter((c) => c.selected);
    if (!selected.length) return;
    const csv = [
      "Name,Handle,Niche,Followers,Avg Views,Status",
      ...selected.map((c) => `${c.name},@${c.handle},${c.niche},${c.followers},${c.avgViews},${c.status}`),
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `shortlist-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!authed) {
    return (
      <main className="min-h-screen bg-cream flex items-center justify-center pt-20">
        <div className="bg-white rounded-3xl shadow-modal p-8 w-full max-w-sm border border-beige">
          <h1 className="font-playfair font-bold text-charcoal text-2xl mb-6 text-center">Admin Access</h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && login()}
            placeholder="Enter password"
            className="input-field mb-3"
            aria-label="Admin password"
          />
          {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
          <button onClick={login} className="btn-primary w-full py-3">
            Sign In
          </button>
          <p className="text-xs text-muted text-center mt-4">
            For internal use only. <Link href="/" className="text-gold hover:underline">← Back to site</Link>
          </p>
        </div>
      </main>
    );
  }

  const selectedCount = creators.filter((c) => c.selected).length;

  return (
    <main className="min-h-screen bg-cream pt-20">
      <div className="container-site py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="section-label mb-1">Admin Dashboard</p>
            <h1 className="font-playfair font-bold text-charcoal text-3xl">Creator Shortlisting</h1>
          </div>
          <div className="flex gap-3">
            {selectedCount > 0 && (
              <button onClick={exportSelected} className="btn-primary text-sm gap-2">
                <Download size={16} /> Export {selectedCount} Selected
              </button>
            )}
            <button
              onClick={() => { sessionStorage.removeItem("osaa-admin-auth"); setAuthed(false); }}
              className="btn-ghost text-sm gap-2 text-muted"
            >
              <LogOut size={16} /> Sign Out
            </button>
          </div>
        </div>

        {/* Stats summary */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { icon: Users, label: "Total Creators", value: creators.length },
            { icon: Tag, label: "Selected", value: selectedCount },
            { icon: Eye, label: "Available", value: creators.filter((c) => c.status === "Available").length },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="bg-white rounded-2xl p-5 shadow-card border border-beige">
              <Icon size={18} className="text-gold mb-2" />
              <p className="font-bold text-charcoal text-2xl">{value}</p>
              <p className="text-muted text-body-sm">{label}</p>
            </div>
          ))}
        </div>

        {/* Creator table */}
        <div className="bg-white rounded-2xl shadow-card border border-beige overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full" aria-label="Creator shortlist">
              <thead className="bg-beige">
                <tr>
                  <th className="px-4 py-3 text-left text-label text-muted">Select</th>
                  <th className="px-4 py-3 text-left text-label text-muted">Creator</th>
                  <th className="px-4 py-3 text-left text-label text-muted">Niche</th>
                  <th className="px-4 py-3 text-left text-label text-muted">Followers</th>
                  <th className="px-4 py-3 text-left text-label text-muted">Avg Views</th>
                  <th className="px-4 py-3 text-left text-label text-muted">Status</th>
                  <th className="px-4 py-3 text-left text-label text-muted">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-beige">
                {creators.map((creator) => (
                  <tr key={creator.id} className={creator.selected ? "bg-gold/5" : "hover:bg-cream/50"}>
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={creator.selected}
                        onChange={() => toggleSelect(creator.id)}
                        className="w-4 h-4 accent-gold"
                        aria-label={`Select ${creator.name}`}
                      />
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-charcoal text-body-sm">{creator.name}</p>
                      <p className="text-muted text-xs">@{creator.handle}</p>
                    </td>
                    <td className="px-4 py-3">
                      <span className="tag text-xs">{creator.niche}</span>
                    </td>
                    <td className="px-4 py-3 text-body-sm text-charcoal font-medium">
                      {formatNumber(creator.followers)}
                    </td>
                    <td className="px-4 py-3 text-body-sm text-charcoal">
                      {formatNumber(creator.avgViews)}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${STATUS_COLORS[creator.status]}`}>
                        {creator.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <a
                        href={`https://instagram.com/${creator.handle}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gold text-xs font-medium hover:underline"
                      >
                        View IG ↗
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
