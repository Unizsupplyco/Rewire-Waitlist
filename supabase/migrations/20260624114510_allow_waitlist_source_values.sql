alter table public.waitlist
  drop constraint if exists waitlist_source_length;

alter table public.waitlist
  add constraint waitlist_source_length
  check (char_length(source) between 1 and 80)
  not valid;

drop policy if exists "Public can join waitlist" on public.waitlist;

create policy "Public can join waitlist"
  on public.waitlist
  for insert
  to anon, authenticated
  with check (
    source is not null
    and btrim(source) <> ''
    and char_length(source) <= 80
  );
