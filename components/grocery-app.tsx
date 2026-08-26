"use client";

import { useEffect, useMemo, useState } from "react";
import {
  familyMembers,
  initialProducts,
  initialStores,
  storageKeys,
  type Product,
  type Status,
  type Store,
} from "../lib/grocery-seed";

const statuses: { value: Status; label: string; color: string }[] = [
  { value: "have", label: "Have", color: "var(--good)" },
  { value: "need_to_buy", label: "Need to Buy", color: "var(--warn)" },
  { value: "missing", label: "Missing", color: "var(--bad)" },
];

type Snapshot = { stores: Store[]; products: Product[] };

function readSnapshot(): Snapshot {
  if (typeof window === "undefined") return { stores: initialStores, products: initialProducts };
  const stores = localStorage.getItem(storageKeys.stores);
  const products = localStorage.getItem(storageKeys.products);
  return {
    stores: stores ? (JSON.parse(stores) as Store[]) : initialStores,
    products: products ? (JSON.parse(products) as Product[]) : initialProducts,
  };
}

function saveSnapshot(snapshot: Snapshot) {
  localStorage.setItem(storageKeys.stores, JSON.stringify(snapshot.stores));
  localStorage.setItem(storageKeys.products, JSON.stringify(snapshot.products));
}

export function GroceryApp() {
  const [selectedName, setSelectedName] = useState("");
  const [stores, setStores] = useState<Store[]>(initialStores);
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [activeStoreId, setActiveStoreId] = useState(initialStores[0].id);
  const [filter, setFilter] = useState<"all" | "buy">("all");
  const [newProduct, setNewProduct] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newStoreName, setNewStoreName] = useState("");

  useEffect(() => {
    const family = localStorage.getItem(storageKeys.family) || "";
    setSelectedName(family);
    const snapshot = readSnapshot();
    setStores(snapshot.stores);
    setProducts(snapshot.products);
  }, []);

  useEffect(() => {
    const channel = new BroadcastChannel("supercasa-sync");
    channel.onmessage = (event) => {
      if (event.data?.type === "sync") {
        const snapshot = readSnapshot();
        setStores(snapshot.stores);
        setProducts(snapshot.products);
      }
    };
    return () => channel.close();
  }, []);

  useEffect(() => {
    saveSnapshot({ stores, products });
  }, [stores, products]);

  const currentStore = stores.find((store) => store.id === activeStoreId) ?? stores[0];
  const visibleProducts = products
    .filter((product) => product.store_id === currentStore?.id)
    .filter((product) => (filter === "all" ? true : product.status !== "have"));

  const categories = useMemo(() => {
    const grouped = new Map<string, Product[]>();
    for (const product of visibleProducts) {
      const key = product.category || "Uncategorized";
      const items = grouped.get(key) || [];
      items.push(product);
      grouped.set(key, items);
    }
    return [...grouped.entries()];
  }, [visibleProducts]);

  const publish = () => {
    const channel = new BroadcastChannel("supercasa-sync");
    channel.postMessage({ type: "sync" });
    channel.close();
  };

  const persistName = (name: string) => {
    setSelectedName(name);
    localStorage.setItem(storageKeys.family, name);
  };

  const ensureName = () => {
    if (!selectedName) persistName(familyMembers[0].name);
  };

  const updateStatus = (productId: string, status: Status) => {
    ensureName();
    const updated_by = selectedName || familyMembers[0].name;
    const updated_at = new Date().toISOString();
    setProducts((current) =>
      current.map((product) => (product.id === productId ? { ...product, status, updated_by, updated_at } : product)),
    );
    publish();
  };

  const cycleStatus = (product: Product) => {
    const next = product.status === "need_to_buy" ? "missing" : product.status === "missing" ? "have" : "need_to_buy";
    updateStatus(product.id, next);
  };

  const addStore = () => {
    const name = newStoreName.trim();
    if (!name) return;
    const store: Store = { id: crypto.randomUUID(), name, order_index: stores.length };
    setStores((current) => [...current, store]);
    setActiveStoreId(store.id);
    setNewStoreName("");
    publish();
  };

  const addProduct = () => {
    const name = newProduct.trim();
    if (!name || !currentStore) return;
    ensureName();
    const product: Product = {
      id: crypto.randomUUID(),
      store_id: currentStore.id,
      category: newCategory.trim() || null,
      name,
      order_index: visibleProducts.length,
      status: "need_to_buy",
      updated_by: selectedName || familyMembers[0].name,
      updated_at: new Date().toISOString(),
    };
    setProducts((current) => [...current, product]);
    setNewProduct("");
    setNewCategory("");
    publish();
  };

  const resetEverything = () => {
    if (!confirm("Reset the list back to the seeded groceries?")) return;
    setStores(initialStores);
    setProducts(initialProducts);
    localStorage.removeItem(storageKeys.stores);
    localStorage.removeItem(storageKeys.products);
    publish();
  };

  return (
    <main className="shell">
      <style jsx>{`
        .shell {
          max-width: 1080px;
          margin: 0 auto;
          padding: 20px;
          display: grid;
          gap: 16px;
        }
        .hero,
        .panel,
        .identity,
        .toolbar {
          background: rgba(15, 23, 36, 0.92);
          border: 1px solid var(--line);
          border-radius: 24px;
          padding: 16px;
          box-shadow: 0 24px 80px rgba(0, 0, 0, 0.35);
        }
        .hero { display: grid; gap: 16px; }
        .eyebrow { text-transform: uppercase; letter-spacing: 0.2em; color: var(--muted); font-size: 12px; }
        h1, h2, h3, p { margin: 0; }
        h1 { font-size: clamp(2rem, 5vw, 3.5rem); line-height: 0.95; max-width: 10ch; }
        .lede { margin-top: 12px; color: var(--muted); max-width: 54ch; }
        .chips, .tabs, .filters, .legend { display: flex; flex-wrap: wrap; gap: 10px; }
        .chip, .tab, .filter, .row, .panel button, input {
          border: 1px solid var(--line);
          background: var(--panel-2);
          color: var(--text);
          border-radius: 18px;
        }
        .chip, .tab, .filter, .panel button {
          padding: 12px 14px;
          min-height: 48px;
        }
        .chip.active, .tab.active, .filter.active { border-color: var(--accent); box-shadow: 0 0 0 1px rgba(139, 92, 246, 0.25) inset; }
        .panel { display: grid; gap: 14px; }
        .panel-head { display: flex; justify-content: space-between; align-items: center; gap: 12px; }
        .count { color: var(--muted); }
        .category { display: grid; gap: 10px; }
        .list { display: grid; gap: 10px; }
        .row { width: 100%; display: flex; justify-content: space-between; align-items: center; gap: 12px; padding: 14px; text-align: left; }
        .row-main { display: grid; gap: 6px; }
        .meta { color: var(--muted); font-size: 13px; }
        .badge { padding: 8px 12px; border-radius: 999px; color: #081019; font-weight: 700; }
        .form-grid { display: grid; gap: 10px; grid-template-columns: 1fr; }
        input { padding: 14px; width: 100%; }
        .legend-item { display: inline-flex; align-items: center; gap: 8px; color: var(--muted); }
        .legend-item i { width: 12px; height: 12px; border-radius: 999px; display: inline-block; }
        @media (min-width: 760px) {
          .hero { grid-template-columns: 1.2fr 1fr; align-items: start; }
          .form-grid { grid-template-columns: 1.2fr 0.8fr 1fr auto; }
        }
      `}</style>

      <section className="hero">
        <div>
          <p className="eyebrow">Super Casa</p>
          <h1>Shared grocery list, always in dark mode.</h1>
          <p className="lede">Tap fast, update live, and keep the whole family in sync on one phone or across browser tabs.</p>
        </div>
        <div className="identity">
          <label>Who is using the app?</label>
          <div className="chips" style={{ marginTop: 12 }}>
            {familyMembers.map((member) => (
              <button
                key={member.id}
                className={selectedName === member.name ? "chip active" : "chip"}
                onClick={() => persistName(member.name)}
              >
                {member.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="toolbar">
        <div className="tabs">
          {stores.map((store) => (
            <button key={store.id} className={store.id === activeStoreId ? "tab active" : "tab"} onClick={() => setActiveStoreId(store.id)}>
              {store.name}
            </button>
          ))}
        </div>
        <div className="filters" style={{ marginTop: 12 }}>
          <button className={filter === "all" ? "filter active" : "filter"} onClick={() => setFilter("all")}>All</button>
          <button className={filter === "buy" ? "filter active" : "filter"} onClick={() => setFilter("buy")}>
            Need to Buy + Missing
          </button>
        </div>
      </section>

      <section className="panel">
        <div className="panel-head">
          <h2>{currentStore?.name || "Stores"}</h2>
          <span className="count">{visibleProducts.length} items</span>
        </div>
        {categories.map(([category, items]) => (
          <div key={category} className="category">
            <h3>{category}</h3>
            <div className="list">
              {items.map((product) => {
                const badge = statuses.find((item) => item.value === product.status)!;
                return (
                  <button key={product.id} className="row" onClick={() => cycleStatus(product)}>
                    <div className="row-main">
                      <strong>{product.name}</strong>
                      <span className="meta">
                        Updated by {product.updated_by} at{" "}
                        {new Date(product.updated_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </span>
                    </div>
                    <span className="badge" style={{ backgroundColor: badge.color }}>
                      {badge.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </section>

      <section className="panel">
        <h2>Manage list</h2>
        <div className="form-grid">
          <input value={newStoreName} onChange={(e) => setNewStoreName(e.target.value)} placeholder="Add new store" />
          <button onClick={addStore}>Add store</button>
          <input value={newProduct} onChange={(e) => setNewProduct(e.target.value)} placeholder="Add new product" />
          <input value={newCategory} onChange={(e) => setNewCategory(e.target.value)} placeholder="Category" />
          <button onClick={addProduct}>Add item</button>
        </div>
        <button onClick={resetEverything}>Reset to seed list</button>
      </section>

      <section className="panel">
        <h2>Quick status guide</h2>
        <div className="legend">
          {statuses.map((status) => (
            <span key={status.value} className="legend-item">
              <i style={{ backgroundColor: status.color }} />
              {status.label}
            </span>
          ))}
        </div>
      </section>
    </main>
  );
}
