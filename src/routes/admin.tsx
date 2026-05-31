import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { Loader2, Trash2, Plus, Upload, LogOut, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin Dashboard" }, { name: "robots", content: "noindex" }] }),
  component: AdminPage,
  errorComponent: ({ error }) => <div className="p-8">Error: {error.message}</div>,
  notFoundComponent: () => <div className="p-8">Not found</div>,
});

type Row = Record<string, any>;

function AdminPage() {
  const navigate = useNavigate();
  const { user, isAdmin, loading } = useAuth();
  const [checking, setChecking] = useState(false);

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/login" });
  }, [user, loading, navigate]);

  const claimAdmin = async () => {
    setChecking(true);
    const { data, error } = await supabase.rpc("claim_admin_if_none");
    setChecking(false);
    if (error) return toast.error(error.message);
    if (data) {
      toast.success("Admin role granted. Reloading…");
      setTimeout(() => window.location.reload(), 700);
    } else {
      toast.error("An admin already exists. Ask them to grant you the role.");
    }
  };

  if (loading) return <div className="min-h-screen grid place-items-center"><Loader2 className="animate-spin" /></div>;
  if (!user) return null;

  if (!isAdmin) {
    return (
      <div className="min-h-screen grid place-items-center px-4 bg-background">
        <Toaster />
        <Card className="max-w-md w-full p-8 text-center space-y-4">
          <ShieldCheck className="w-10 h-10 mx-auto text-primary" />
          <h1 className="text-xl font-semibold">Admin access required</h1>
          <p className="text-sm text-muted-foreground">
            Your account ({user.email}) is signed in but not an admin. If no admin exists yet, you can claim that role now.
          </p>
          <div className="flex gap-2 justify-center">
            <Button onClick={claimAdmin} disabled={checking}>
              {checking && <Loader2 className="w-4 h-4 animate-spin mr-2" />}Claim admin role
            </Button>
            <Button variant="outline" onClick={async () => { await supabase.auth.signOut(); navigate({ to: "/login" }); }}>
              Sign out
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Toaster />
      <header className="border-b border-border/60 sticky top-0 bg-background/80 backdrop-blur z-10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-primary" />
            <span className="font-semibold">Portfolio Admin</span>
            <Badge variant="secondary" className="text-xs">{user.email}</Badge>
          </div>
          <div className="flex gap-2">
            <Link to="/"><Button variant="ghost" size="sm">View site</Button></Link>
            <Button variant="outline" size="sm" onClick={async () => { await supabase.auth.signOut(); navigate({ to: "/login" }); }}>
              <LogOut className="w-4 h-4 mr-1" /> Sign out
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="flex flex-wrap h-auto justify-start">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="certificates">Certificates</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="blogs">Blog</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
          </TabsList>

          <TabsContent value="profile"><ProfileSection /></TabsContent>
          <TabsContent value="projects"><ProjectsSection /></TabsContent>
          <TabsContent value="certificates"><CertificatesSection /></TabsContent>
          <TabsContent value="skills"><SkillsSection /></TabsContent>
          <TabsContent value="education"><EducationSection /></TabsContent>
          <TabsContent value="gallery"><GallerySection /></TabsContent>
          <TabsContent value="achievements"><AchievementsSection /></TabsContent>
          <TabsContent value="blogs"><BlogsSection /></TabsContent>
          <TabsContent value="messages"><MessagesSection /></TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

/* ------------- Helpers ------------- */

async function uploadFile(bucket: string, file: File): Promise<string> {
  const ext = file.name.split(".").pop();
  const path = `${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage.from(bucket).upload(path, file, { upsert: false });
  if (error) throw error;
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}

function FileUpload({ bucket, onUploaded, label = "Upload" }: { bucket: string; onUploaded: (url: string) => void; label?: string }) {
  const [busy, setBusy] = useState(false);
  return (
    <label className="inline-flex">
      <input
        type="file"
        className="hidden"
        onChange={async (e) => {
          const f = e.target.files?.[0];
          if (!f) return;
          setBusy(true);
          try {
            const url = await uploadFile(bucket, f);
            onUploaded(url);
            toast.success("Uploaded");
          } catch (err: any) {
            toast.error(err.message);
          } finally {
            setBusy(false);
            e.target.value = "";
          }
        }}
      />
      <Button type="button" variant="outline" size="sm" asChild disabled={busy}>
        <span className="cursor-pointer">
          {busy ? <Loader2 className="w-4 h-4 mr-1 animate-spin" /> : <Upload className="w-4 h-4 mr-1" />}{label}
        </span>
      </Button>
    </label>
  );
}

function useTable<T extends Row>(table: string, orderBy = "sort_order") {
  const [rows, setRows] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase.from(table).select("*").order(orderBy, { ascending: true });
    if (error) toast.error(error.message);
    setRows((data as T[]) || []);
    setLoading(false);
  }, [table, orderBy]);

  useEffect(() => { refresh(); }, [refresh]);

  return { rows, loading, refresh };
}

function SectionShell({ title, children, onAdd }: { title: string; children: React.ReactNode; onAdd?: () => void }) {
  return (
    <Card className="p-6 mt-4 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">{title}</h2>
        {onAdd && <Button size="sm" onClick={onAdd}><Plus className="w-4 h-4 mr-1" /> Add</Button>}
      </div>
      {children}
    </Card>
  );
}

/* ------------- Sections ------------- */

function ProfileSection() {
  const [row, setRow] = useState<Row | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    supabase.from("site_settings").select("*").eq("id", 1).maybeSingle().then(({ data }) => {
      setRow(data || { id: 1 });
    });
  }, []);

  if (!row) return <SectionShell title="Profile & Contact"><Loader2 className="animate-spin" /></SectionShell>;

  const save = async () => {
    setBusy(true);
    const { error } = await supabase.from("site_settings").upsert({ ...row, id: 1 });
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success("Saved");
  };

  const fields: [string, string, "input" | "textarea"][] = [
    ["full_name", "Full name", "input"],
    ["tagline", "Tagline", "input"],
    ["headline", "Headline", "input"],
    ["bio", "Bio", "textarea"],
    ["email", "Email", "input"],
    ["phone", "Phone", "input"],
    ["location", "Location", "input"],
    ["linkedin_url", "LinkedIn URL", "input"],
    ["github_url", "GitHub URL", "input"],
  ];

  return (
    <SectionShell title="Profile & Contact">
      <div className="grid md:grid-cols-2 gap-4">
        {fields.map(([k, label, kind]) => (
          <div key={k} className={kind === "textarea" ? "md:col-span-2 space-y-2" : "space-y-2"}>
            <Label>{label}</Label>
            {kind === "textarea" ? (
              <Textarea value={row[k] ?? ""} onChange={(e) => setRow({ ...row, [k]: e.target.value })} rows={4} />
            ) : (
              <Input value={row[k] ?? ""} onChange={(e) => setRow({ ...row, [k]: e.target.value })} />
            )}
          </div>
        ))}
        <div className="space-y-2">
          <Label>Profile photo</Label>
          <div className="flex items-center gap-3">
            {row.profile_photo_url && <img src={row.profile_photo_url} alt="" className="w-16 h-16 rounded-full object-cover" />}
            <Input value={row.profile_photo_url ?? ""} onChange={(e) => setRow({ ...row, profile_photo_url: e.target.value })} />
            <FileUpload bucket="profile" onUploaded={(url) => setRow({ ...row, profile_photo_url: url })} />
          </div>
        </div>
        <div className="space-y-2">
          <Label>Resume (PDF)</Label>
          <div className="flex items-center gap-3">
            {row.resume_url && <a className="text-xs underline truncate max-w-[200px]" href={row.resume_url} target="_blank">View</a>}
            <Input value={row.resume_url ?? ""} onChange={(e) => setRow({ ...row, resume_url: e.target.value })} />
            <FileUpload bucket="resume" onUploaded={(url) => setRow({ ...row, resume_url: url })} />
          </div>
        </div>
      </div>
      <Button onClick={save} disabled={busy}>{busy && <Loader2 className="w-4 h-4 animate-spin mr-2" />}Save</Button>
    </SectionShell>
  );
}

/* Generic editable list */
function ListSection<T extends Row>({
  title, table, fields, hasImage, imageBucket, defaults,
}: {
  title: string;
  table: string;
  fields: { key: string; label: string; type?: "text" | "textarea" | "number" | "tags" }[];
  hasImage?: keyof T | string;
  imageBucket?: string;
  defaults?: Row;
}) {
  const { rows, loading, refresh } = useTable<T>(table);
  const [drafts, setDrafts] = useState<Record<string, Row>>({});

  const getDraft = (r: Row) => drafts[r.id] ?? r;
  const setDraft = (id: string, patch: Row) => setDrafts((d) => ({ ...d, [id]: { ...getDraft({ id, ...rows.find((x) => x.id === id) }), ...patch } }));

  const add = async () => {
    const { error } = await supabase.from(table).insert({ ...(defaults || {}) });
    if (error) return toast.error(error.message);
    refresh();
  };

  const save = async (id: string) => {
    const patch = drafts[id];
    if (!patch) return;
    const { id: _id, created_at, updated_at, ...update } = patch as any;
    const { error } = await supabase.from(table).update(update).eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Saved");
    setDrafts((d) => { const n = { ...d }; delete n[id]; return n; });
    refresh();
  };

  const del = async (id: string) => {
    if (!confirm("Delete this item?")) return;
    const { error } = await supabase.from(table).delete().eq("id", id);
    if (error) return toast.error(error.message);
    refresh();
  };

  return (
    <SectionShell title={title} onAdd={add}>
      {loading ? <Loader2 className="animate-spin" /> : rows.length === 0 ? (
        <p className="text-sm text-muted-foreground">No items yet. Click Add.</p>
      ) : (
        <div className="space-y-4">
          {rows.map((r) => {
            const d = getDraft(r);
            const dirty = !!drafts[r.id];
            return (
              <Card key={r.id} className="p-4 space-y-3 bg-muted/20">
                <div className="grid md:grid-cols-2 gap-3">
                  {fields.map((f) => (
                    <div key={f.key} className={f.type === "textarea" ? "md:col-span-2 space-y-1" : "space-y-1"}>
                      <Label className="text-xs">{f.label}</Label>
                      {f.type === "textarea" ? (
                        <Textarea value={d[f.key] ?? ""} rows={3} onChange={(e) => setDraft(r.id, { [f.key]: e.target.value })} />
                      ) : f.type === "tags" ? (
                        <Input value={(d[f.key] ?? []).join(", ")} placeholder="comma, separated"
                          onChange={(e) => setDraft(r.id, { [f.key]: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })} />
                      ) : (
                        <Input type={f.type === "number" ? "number" : "text"}
                          value={d[f.key] ?? ""}
                          onChange={(e) => setDraft(r.id, { [f.key]: f.type === "number" ? Number(e.target.value) : e.target.value })} />
                      )}
                    </div>
                  ))}
                  {hasImage && (
                    <div className="md:col-span-2 space-y-1">
                      <Label className="text-xs">Image</Label>
                      <div className="flex items-center gap-3">
                        {d[hasImage as string] && <img src={d[hasImage as string]} alt="" className="w-16 h-16 rounded object-cover" />}
                        <Input value={d[hasImage as string] ?? ""} onChange={(e) => setDraft(r.id, { [hasImage as string]: e.target.value })} />
                        {imageBucket && <FileUpload bucket={imageBucket} onUploaded={(url) => setDraft(r.id, { [hasImage as string]: url })} />}
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex gap-2 justify-end">
                  <Button size="sm" onClick={() => save(r.id)} disabled={!dirty}>Save</Button>
                  <Button size="sm" variant="ghost" onClick={() => del(r.id)}><Trash2 className="w-4 h-4" /></Button>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </SectionShell>
  );
}

function ProjectsSection() {
  return <ListSection title="Projects" table="projects" hasImage="image_url" imageBucket="gallery"
    defaults={{ title: "New project", sort_order: 0 }}
    fields={[
      { key: "title", label: "Title" },
      { key: "category", label: "Category" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "tags", label: "Tags", type: "tags" },
      { key: "github_url", label: "GitHub URL" },
      { key: "demo_url", label: "Demo URL" },
      { key: "sort_order", label: "Order", type: "number" },
    ]} />;
}

function CertificatesSection() {
  return <ListSection title="Certificates" table="certificates" hasImage="image_url" imageBucket="certificates"
    defaults={{ name: "New certificate", sort_order: 0 }}
    fields={[
      { key: "name", label: "Name" },
      { key: "issuer", label: "Issuer" },
      { key: "category", label: "Category" },
      { key: "issue_date", label: "Issue date" },
      { key: "pdf_url", label: "PDF URL" },
      { key: "sort_order", label: "Order", type: "number" },
    ]} />;
}

function SkillsSection() {
  return <ListSection title="Skills" table="skills"
    defaults={{ name: "New skill", level: 80, sort_order: 0 }}
    fields={[
      { key: "name", label: "Name" },
      { key: "category", label: "Category" },
      { key: "level", label: "Level (0–100)", type: "number" },
      { key: "sort_order", label: "Order", type: "number" },
    ]} />;
}

function EducationSection() {
  return <ListSection title="Education" table="education"
    defaults={{ institution: "New institution", sort_order: 0 }}
    fields={[
      { key: "institution", label: "Institution" },
      { key: "degree", label: "Degree" },
      { key: "field", label: "Field of study" },
      { key: "start_year", label: "Start year" },
      { key: "end_year", label: "End year" },
      { key: "grade", label: "Grade / CGPA" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "sort_order", label: "Order", type: "number" },
    ]} />;
}

function GallerySection() {
  return <ListSection title="Gallery" table="gallery" hasImage="image_url" imageBucket="gallery"
    defaults={{ sort_order: 0 }}
    fields={[
      { key: "title", label: "Title" },
      { key: "category", label: "Category" },
      { key: "sort_order", label: "Order", type: "number" },
    ]} />;
}

function AchievementsSection() {
  return <ListSection title="Achievements" table="achievements"
    defaults={{ title: "New achievement", sort_order: 0 }}
    fields={[
      { key: "title", label: "Title" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "sort_order", label: "Order", type: "number" },
    ]} />;
}

function BlogsSection() {
  return <ListSection title="Blog posts" table="blogs" hasImage="cover_url" imageBucket="gallery"
    defaults={{ title: "New post", published: true }}
    fields={[
      { key: "title", label: "Title" },
      { key: "slug", label: "Slug" },
      { key: "excerpt", label: "Excerpt", type: "textarea" },
      { key: "content", label: "Content (markdown)", type: "textarea" },
      { key: "read_minutes", label: "Read minutes", type: "number" },
    ]} />;
}

function MessagesSection() {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const refresh = async () => {
    setLoading(true);
    const { data } = await supabase.from("contact_messages").select("*").order("created_at", { ascending: false });
    setRows(data || []);
    setLoading(false);
  };
  useEffect(() => { refresh(); }, []);

  const markRead = async (id: string, read: boolean) => {
    await supabase.from("contact_messages").update({ read }).eq("id", id);
    refresh();
  };
  const del = async (id: string) => {
    if (!confirm("Delete?")) return;
    await supabase.from("contact_messages").delete().eq("id", id);
    refresh();
  };

  return (
    <SectionShell title="Contact messages">
      {loading ? <Loader2 className="animate-spin" /> : rows.length === 0 ? (
        <p className="text-sm text-muted-foreground">No messages yet.</p>
      ) : (
        <div className="space-y-3">
          {rows.map((r) => (
            <Card key={r.id} className={`p-4 ${r.read ? "opacity-60" : ""}`}>
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{r.name}</span>
                    <span className="text-xs text-muted-foreground">{r.email}</span>
                    {!r.read && <Badge>New</Badge>}
                  </div>
                  <p className="text-sm whitespace-pre-wrap">{r.message}</p>
                  <p className="text-xs text-muted-foreground">{new Date(r.created_at).toLocaleString()}</p>
                </div>
                <div className="flex flex-col gap-1">
                  <Button size="sm" variant="outline" onClick={() => markRead(r.id, !r.read)}>{r.read ? "Mark unread" : "Mark read"}</Button>
                  <Button size="sm" variant="ghost" onClick={() => del(r.id)}><Trash2 className="w-4 h-4" /></Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </SectionShell>
  );
}
