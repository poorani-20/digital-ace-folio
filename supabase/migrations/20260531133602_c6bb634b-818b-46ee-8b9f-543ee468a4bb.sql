
-- =========== ROLES ===========
create type public.app_role as enum ('admin', 'user');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.app_role not null default 'user',
  created_at timestamptz not null default now(),
  unique (user_id, role)
);
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role = _role)
$$;

create policy "Users can view own roles" on public.user_roles
  for select to authenticated using (user_id = auth.uid());
create policy "Admins manage roles" on public.user_roles
  for all to authenticated using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

-- Auto-assign 'user' role on signup
create or replace function public.handle_new_user_role()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.user_roles (user_id, role) values (new.id, 'user') on conflict do nothing;
  return new;
end; $$;
create trigger on_auth_user_created_role
  after insert on auth.users for each row execute function public.handle_new_user_role();

-- =========== updated_at helper ===========
create or replace function public.tg_set_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end; $$;

-- =========== PROJECTS ===========
create table public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text,
  description text,
  image_url text,
  tags text[] default '{}',
  github_url text,
  demo_url text,
  sort_order int default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select on public.projects to anon, authenticated;
grant all on public.projects to service_role;
alter table public.projects enable row level security;
create policy "Projects are public" on public.projects for select to anon, authenticated using (true);
create policy "Admins manage projects" on public.projects for all to authenticated
  using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));
create trigger projects_updated_at before update on public.projects for each row execute function public.tg_set_updated_at();

-- =========== CERTIFICATES ===========
create table public.certificates (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  issuer text,
  category text,
  issue_date text,
  image_url text,
  pdf_url text,
  sort_order int default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select on public.certificates to anon, authenticated;
grant all on public.certificates to service_role;
alter table public.certificates enable row level security;
create policy "Certificates public" on public.certificates for select to anon, authenticated using (true);
create policy "Admins manage certificates" on public.certificates for all to authenticated
  using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));
create trigger certificates_updated_at before update on public.certificates for each row execute function public.tg_set_updated_at();

-- =========== GALLERY ===========
create table public.gallery (
  id uuid primary key default gen_random_uuid(),
  title text,
  category text,
  image_url text not null,
  sort_order int default 0,
  created_at timestamptz not null default now()
);
grant select on public.gallery to anon, authenticated;
grant all on public.gallery to service_role;
alter table public.gallery enable row level security;
create policy "Gallery public" on public.gallery for select to anon, authenticated using (true);
create policy "Admins manage gallery" on public.gallery for all to authenticated
  using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));

-- =========== ACHIEVEMENTS ===========
create table public.achievements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  sort_order int default 0,
  created_at timestamptz not null default now()
);
grant select on public.achievements to anon, authenticated;
grant all on public.achievements to service_role;
alter table public.achievements enable row level security;
create policy "Achievements public" on public.achievements for select to anon, authenticated using (true);
create policy "Admins manage achievements" on public.achievements for all to authenticated
  using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));

-- =========== BLOGS ===========
create table public.blogs (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique,
  excerpt text,
  content text,
  cover_url text,
  read_minutes int default 5,
  published boolean not null default true,
  published_at timestamptz default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select on public.blogs to anon, authenticated;
grant all on public.blogs to service_role;
alter table public.blogs enable row level security;
create policy "Published blogs public" on public.blogs for select to anon, authenticated using (published = true);
create policy "Admins manage blogs" on public.blogs for all to authenticated
  using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));
create trigger blogs_updated_at before update on public.blogs for each row execute function public.tg_set_updated_at();

-- =========== SITE SETTINGS (single row: profile + resume + photo) ===========
create table public.site_settings (
  id int primary key default 1,
  full_name text,
  tagline text,
  headline text,
  bio text,
  email text,
  phone text,
  location text,
  linkedin_url text,
  github_url text,
  resume_url text,
  profile_photo_url text,
  updated_at timestamptz not null default now(),
  constraint single_row check (id = 1)
);
grant select on public.site_settings to anon, authenticated;
grant all on public.site_settings to service_role;
alter table public.site_settings enable row level security;
create policy "Settings public" on public.site_settings for select to anon, authenticated using (true);
create policy "Admins manage settings" on public.site_settings for all to authenticated
  using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));
create trigger site_settings_updated_at before update on public.site_settings for each row execute function public.tg_set_updated_at();

insert into public.site_settings (id, full_name, tagline, headline, bio, email, phone, location, linkedin_url)
values (1,
  'Poorani M K',
  'Electronics & Communication Engineering Student',
  'Building the future with electronics, signals and code.',
  'Dedicated Electronics and Communication Engineering student at Sona College of Technology with strong foundations in Digital Electronics, Communication Systems, VLSI Design, Signal Processing and Image Processing. Passionate about solving real-world engineering problems through innovation and technology.',
  'poorani@example.com',
  '+91 00000 00000',
  'Salem, Tamil Nadu, India',
  'https://www.linkedin.com/in/poorani-mahendiran-902187326')
on conflict (id) do nothing;

-- =========== CONTACT MESSAGES ===========
create table public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz not null default now(),
  read boolean not null default false
);
grant insert on public.contact_messages to anon, authenticated;
grant select, update, delete on public.contact_messages to authenticated;
grant all on public.contact_messages to service_role;
alter table public.contact_messages enable row level security;
create policy "Anyone can submit" on public.contact_messages for insert to anon, authenticated with check (true);
create policy "Admins read messages" on public.contact_messages for select to authenticated
  using (public.has_role(auth.uid(),'admin'));
create policy "Admins manage messages" on public.contact_messages for all to authenticated
  using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));

-- =========== STORAGE BUCKETS ===========
insert into storage.buckets (id, name, public) values
  ('certificates', 'certificates', true),
  ('gallery', 'gallery', true),
  ('profile', 'profile', true),
  ('resume', 'resume', true)
on conflict (id) do nothing;

-- Public can read all 4 buckets; only admins can write
create policy "Public read certificates" on storage.objects for select to anon, authenticated using (bucket_id = 'certificates');
create policy "Public read gallery" on storage.objects for select to anon, authenticated using (bucket_id = 'gallery');
create policy "Public read profile" on storage.objects for select to anon, authenticated using (bucket_id = 'profile');
create policy "Public read resume" on storage.objects for select to anon, authenticated using (bucket_id = 'resume');

create policy "Admins write certificates" on storage.objects for all to authenticated
  using (bucket_id = 'certificates' and public.has_role(auth.uid(),'admin'))
  with check (bucket_id = 'certificates' and public.has_role(auth.uid(),'admin'));
create policy "Admins write gallery" on storage.objects for all to authenticated
  using (bucket_id = 'gallery' and public.has_role(auth.uid(),'admin'))
  with check (bucket_id = 'gallery' and public.has_role(auth.uid(),'admin'));
create policy "Admins write profile" on storage.objects for all to authenticated
  using (bucket_id = 'profile' and public.has_role(auth.uid(),'admin'))
  with check (bucket_id = 'profile' and public.has_role(auth.uid(),'admin'));
create policy "Admins write resume" on storage.objects for all to authenticated
  using (bucket_id = 'resume' and public.has_role(auth.uid(),'admin'))
  with check (bucket_id = 'resume' and public.has_role(auth.uid(),'admin'));
